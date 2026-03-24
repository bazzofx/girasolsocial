import express from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import axios from 'axios';
import session from 'express-session';
import cookieParser from 'cookie-parser';
import { v4 as uuidv4 } from 'uuid';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

// Ensure uploads directory exists
const uploadsDir = path.join(__dirname, 'public', 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

app.use(express.json({ limit: '50mb' }));
app.use(cookieParser());
app.use(session({
  secret: process.env.SESSION_SECRET || 'social-splitter-secret',
  resave: false,
  saveUninitialized: true,
  cookie: { 
    secure: true, 
    sameSite: 'none',
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
  }
}));

// Serve uploaded images publicly for Instagram to fetch
app.use('/uploads', express.static(uploadsDir));

// --- OAuth Routes ---

app.get('/api/auth/facebook/url', (req, res) => {
  const appId = process.env.FACEBOOK_APP_ID;
  if (!appId) {
    return res.status(500).json({ error: 'FACEBOOK_APP_ID not configured' });
  }

  const redirectUri = `${req.protocol}://${req.get('host')}/api/auth/facebook/callback`;
  const scopes = [
    'instagram_basic',
    'instagram_content_publish',
    'pages_read_engagement',
    'pages_show_list'
  ].join(',');

  const authUrl = `https://www.facebook.com/v25.0/dialog/oauth?client_id=${appId}&redirect_uri=${encodeURIComponent(redirectUri)}&scope=${encodeURIComponent(scopes)}&response_type=code`;
  
  res.json({ url: authUrl });
});

app.get('/api/auth/facebook/callback', async (req, res) => {
  const { code } = req.query;
  const appId = process.env.FACEBOOK_APP_ID;
  const appSecret = process.env.FACEBOOK_APP_SECRET;
  const redirectUri = `${req.protocol}://${req.get('host')}/api/auth/facebook/callback`;

  if (!code) {
    return res.send(`
      <script>
        window.opener.postMessage({ type: 'FACEBOOK_AUTH_ERROR', error: 'No code provided' }, '*');
        window.close();
      </script>
    `);
  }

  try {
    const tokenRes = await axios.get(`https://graph.facebook.com/v25.0/oauth/access_token`, {
      params: {
        client_id: appId,
        client_secret: appSecret,
        redirect_uri: redirectUri,
        code
      }
    });

    req.session.accessToken = tokenRes.data.access_token;

    res.send(`
      <html>
        <body>
          <script>
            if (window.opener) {
              window.opener.postMessage({ type: 'FACEBOOK_AUTH_SUCCESS' }, '*');
              window.close();
            } else {
              window.location.href = '/';
            }
          </script>
          <p>Authentication successful. This window should close automatically.</p>
        </body>
      </html>
    `);
  } catch (error: any) {
    console.error('OAuth Callback Error:', error.response?.data || error.message);
    res.send(`
      <script>
        window.opener.postMessage({ type: 'FACEBOOK_AUTH_ERROR', error: '${error.message}' }, '*');
        window.close();
      </script>
    `);
  }
});

app.get('/api/instagram/accounts', async (req, res) => {
  const { accessToken } = req.session;
  if (!accessToken) {
    return res.status(401).json({ error: 'Not authenticated' });
  }

  try {
    const pagesRes = await axios.get(`https://graph.facebook.com/v25.0/me/accounts`, {
      params: { 
        fields: 'instagram_business_account{id,username,name,profile_picture_url}',
        access_token: accessToken 
      }
    });

    const accounts = pagesRes.data.data
      .filter((page: any) => page.instagram_business_account)
      .map((page: any) => page.instagram_business_account);

    res.json({ accounts });
  } catch (error: any) {
    console.error('Fetch Accounts Error:', error.response?.data || error.message);
    res.status(500).json({ error: 'Failed to fetch Instagram accounts' });
  }
});

// --- Sharing Routes ---

app.post('/api/temp-image', (req, res) => {
  const { data, mimeType } = req.body;
  const fileName = `${uuidv4()}.${mimeType.split('/')[1]}`;
  const filePath = path.join(uploadsDir, fileName);
  
  fs.writeFileSync(filePath, data, 'base64');
  
  const publicUrl = `${req.protocol}://${req.get('host')}/uploads/${fileName}`;
  res.json({ publicUrl });
});

app.post('/api/instagram/publish-carousel', async (req, res) => {
  const { instagramAccountId, imageUrls, caption } = req.body;
  const { accessToken } = req.session;

  if (!accessToken) {
    return res.status(401).json({ error: 'Not authenticated' });
  }

  try {
    // 1. Create media containers for each image
    const containerIds = [];
    for (const url of imageUrls) {
      const res = await axios.post(`https://graph.facebook.com/v25.0/${instagramAccountId}/media`, {
        image_url: url,
        is_carousel_item: true,
        access_token: accessToken
      });
      containerIds.push(res.data.id);
    }

    // 2. Create carousel container
    const carouselRes = await axios.post(`https://graph.facebook.com/v25.0/${instagramAccountId}/media`, {
      media_type: 'CAROUSEL',
      children: containerIds.join(','),
      caption: caption || '',
      access_token: accessToken
    });

    const carouselId = carouselRes.data.id;

    // 3. Publish carousel
    // Wait a bit for processing
    await new Promise(resolve => setTimeout(resolve, 5000));

    const publishRes = await axios.post(`https://graph.facebook.com/v25.0/${instagramAccountId}/media_publish`, {
      creation_id: carouselId,
      access_token: accessToken
    });

    res.json({ success: true, mediaId: publishRes.data.id });
  } catch (error: any) {
    console.error('Publish Carousel Error:', error.response?.data || error.message);
    res.status(500).json({ error: error.response?.data?.error?.message || error.message });
  }
});


// --- Vite / Static Serving ---

async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();

declare module 'express-session' {
  interface SessionData {
    accessToken?: string;
  }
}