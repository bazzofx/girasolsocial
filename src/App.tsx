/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { toPng } from 'html-to-image';
import { LandingPage } from './components/LandingPage';
import { Sidebar } from './components/Sidebar';
import { PreviewArea } from './components/PreviewArea';
import { CardStyle, SplitMode } from './types';
import { THEMES, FONTS, GRADIENTS, DECORATIVE_ELEMENTS, TEXTURES } from './constants';
import { X } from 'lucide-react';
import axios from 'axios';

export default function App() {
  const [isInstagramConnected, setIsInstagramConnected] = useState(false);
  const [instagramAccounts, setInstagramAccounts] = useState<any[]>([]);
  const [showAccountSelector, setShowAccountSelector] = useState(false);
  const [isSharing, setIsSharing] = useState(false);
  const [shareStatus, setShareStatus] = useState<'idle' | 'authenticating' | 'loading_accounts' | 'publishing' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [text, setText] = useState('');
  const [splitMode, setSplitMode] = useState<SplitMode>('separator');
  const [charLimit, setCharLimit] = useState(280);
  const [separator, setSeparator] = useState('\\\\');
  const [cards, setCards] = useState<string[]>([]);
  const [style, setStyle] = useState<CardStyle>({
    backgroundColor: '#ffffff',
    textColor: '#171717',
    borderColor: '#e5e5e5',
    borderWidth: 0,
    fontSize: 32,
    fontFamily: 'font-sans',
    textAlign: 'center',
    padding: 40,
    borderRadius: 24,
    showPageNumber: true,
    theme: 'Minimal',
    letterSpacing: 0,
    lineHeight: 1.2,
    textShadow: false,
    gradient: null,
    gradientAngle: 135,
    customGradient: false,
    gradientColor2: '#4f46e5',
    showInnerFrame: false,
    innerFrameColor: '#d4af37',
    innerFrameWidth: 2,
    innerFramePadding: 20,
    title: '',
    titleAlign: 'center',
    footer: '',
    footerAlign: 'center',
    elementIcon: 'none',
    elementColor: '#4f46e5',
    elementOpacity: 0.1,
    elementQuantity: 0,
    elementSize: 40,
    elementSeed: 42,
    elementRotation: 0,
    elementRandomRotation: true,
    elementBlendMode: 'normal',
    elementPositionMode: 'random',
    elementZIndex: 'behind',
    texture: 'none',
    textureOpacity: 0.1,
  });

  const [showLanding, setShowLanding] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    content: true,
    visual: false,
    typography: false,
    elements: false,
    border: false,
    innerBorder: false,
    title: false,
    footer: false,
    export: false
  });

  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const textareaRefs = useRef<(HTMLTextAreaElement | null)[]>([]);

  // --- Logic ---

  useEffect(() => {
    textareaRefs.current.forEach(textarea => {
      if (textarea) {
        textarea.style.height = 'auto';
        textarea.style.height = `${textarea.scrollHeight}px`;
      }
    });
  }, [cards, style.fontSize, style.padding]);

  useEffect(() => {
    if (!text) {
      setCards([]);
      return;
    }

    let newCards: string[] = [];
    if (splitMode === 'separator') {
      newCards = text.split(separator).map(s => s.trim()).filter(Boolean);
    } else {
      const words = text.split(/\s+/);
      let currentCard = '';
      
      words.forEach(word => {
        if ((currentCard + ' ' + word).length <= charLimit) {
          currentCard += (currentCard ? ' ' : '') + word;
        } else {
          if (currentCard) newCards.push(currentCard);
          currentCard = word;
        }
      });
      if (currentCard) newCards.push(currentCard);
    }
    setCards(newCards);
  }, [text, splitMode, charLimit, separator]);

  const handleCardEdit = (idx: number, newContent: string) => {
    const updatedCards = [...cards];
    updatedCards[idx] = newContent;
    setCards(updatedCards);
  };

  const handleExportAll = async () => {
    if (cards.length === 0) return;
    
    for (let i = 0; i < cards.length; i++) {
      const node = cardRefs.current[i];
      if (node) {
        try {
          const dataUrl = await toPng(node, { 
            pixelRatio: 3, 
            backgroundColor: style.backgroundColor,
            cacheBust: true 
          });
          const link = document.createElement('a');
          link.download = `social-card-${i + 1}.png`;
          link.href = dataUrl;
          link.click();
          // Small delay to avoid browser blocking multiple downloads
          await new Promise(resolve => setTimeout(resolve, 200));
        } catch (err) {
          console.error(`Failed to export card ${i + 1}`, err);
        }
      }
    }
  };

  const handleFacebookLogin = async () => {
    setShareStatus('authenticating');
    try {
      const { data } = await axios.get('/api/auth/facebook/url');
      const authWindow = window.open(data.url, 'facebook_auth', 'width=600,height=700');
      
      if (!authWindow) {
        alert('Please allow popups for this site to connect your Instagram account.');
        setShareStatus('idle');
        return;
      }

      const handleMessage = async (event: MessageEvent) => {
        if (event.data?.type === 'FACEBOOK_AUTH_SUCCESS') {
          window.removeEventListener('message', handleMessage);
          setIsInstagramConnected(true);
          fetchInstagramAccounts();
        }
      };
      window.addEventListener('message', handleMessage);
    } catch (err) {
      console.error('Facebook login failed', err);
      setShareStatus('error');
      setErrorMessage('Failed to initiate Facebook login');
    }
  };

  const fetchInstagramAccounts = async () => {
    setShareStatus('loading_accounts');
    try {
      const { data } = await axios.get('/api/instagram/accounts');
      setInstagramAccounts(data.accounts);
      if (data.accounts.length === 0) {
        setShareStatus('error');
        setErrorMessage('No Instagram Business accounts found');
      } else if (data.accounts.length === 1) {
        handleInstagramShare(data.accounts[0].id);
      } else {
        setShowAccountSelector(true);
        setShareStatus('idle');
      }
    } catch (err) {
      console.error('Failed to fetch Instagram accounts', err);
      setShareStatus('error');
      setErrorMessage('Failed to fetch Instagram accounts');
    }
  };

  const handleInstagramShare = async (accountId: string) => {
    setShowAccountSelector(false);
    setIsSharing(true);
    setShareStatus('publishing');
    
    try {
      const imageUrls = [];
      
      // 1. Generate and upload images to temp storage
      for (let i = 0; i < cards.length; i++) {
        const node = cardRefs.current[i];
        if (node) {
          const dataUrl = await toPng(node, { 
            quality: 1, 
            pixelRatio: 2, // 2 is enough for IG and faster
            backgroundColor: style.backgroundColor 
          });
          
          const base64Data = dataUrl.split(',')[1];
          const mimeType = dataUrl.split(',')[0].split(':')[1].split(';')[0];
          
          const { data } = await axios.post('/api/temp-image', {
            data: base64Data,
            mimeType
          });
          
          imageUrls.push(data.publicUrl);
        }
      }

      // 2. Publish carousel
      await axios.post('/api/instagram/publish-carousel', {
        instagramAccountId: accountId,
        imageUrls,
        caption: style.title || 'Created with Social Splitter'
      });

      setShareStatus('success');
      setTimeout(() => setShareStatus('idle'), 5000);
    } catch (err: any) {
      console.error('Instagram share failed', err);
      setShareStatus('error');
      setErrorMessage(err.response?.data?.error || 'Failed to publish to Instagram');
    } finally {
      setIsSharing(false);
    }
  };

  const applyTheme = (theme: typeof THEMES[0]) => {
    setStyle(prev => ({
      ...prev,
      backgroundColor: theme.bg,
      textColor: theme.text,
      borderColor: theme.border,
      theme: theme.name,
      customGradient: !!theme.gradient,
      gradient: null
    }));
  };

  const handleFeelingLucky = () => {
    const randomColor = () => '#' + Math.floor(Math.random()*16777215).toString(16).padStart(6, '0');
    const fonts = FONTS.map(f => f.value);
    const aligns: ('left' | 'center' | 'right')[] = ['left', 'center', 'right'];
    const elements = DECORATIVE_ELEMENTS.filter(e => e.value !== 'none').map(e => e.value);
    const textures = TEXTURES.map(t => t.value);
    
    const newStyle: CardStyle = {
      ...style,
      backgroundColor: randomColor(),
      textColor: randomColor(),
      borderColor: randomColor(),
      borderWidth: Math.floor(Math.random() * 20),
      fontSize: Math.floor(Math.random() * 40) + 20,
      fontFamily: fonts[Math.floor(Math.random() * fonts.length)],
      textAlign: aligns[Math.floor(Math.random() * aligns.length)],
      padding: Math.floor(Math.random() * 60) + 20,
      borderRadius: Math.floor(Math.random() * 50),
      letterSpacing: Math.floor(Math.random() * 10) - 2,
      lineHeight: parseFloat((Math.random() * 0.8 + 1).toFixed(1)),
      gradient: Math.random() > 0.7 ? GRADIENTS[Math.floor(Math.random() * GRADIENTS.length)].value : null,
      gradientAngle: Math.floor(Math.random() * 360),
      customGradient: Math.random() > 0.5,
      gradientColor2: randomColor(),
      showInnerFrame: Math.random() > 0.7,
      innerFrameColor: randomColor(),
      innerFrameWidth: Math.floor(Math.random() * 10) + 1,
      innerFramePadding: Math.floor(Math.random() * 40) + 10,
      theme: 'Custom',
      elementIcon: Math.random() > 0.3 ? elements[Math.floor(Math.random() * elements.length)] : 'none',
      elementColor: randomColor(),
      elementOpacity: parseFloat((Math.random() * 0.3 + 0.05).toFixed(2)),
      elementQuantity: Math.floor(Math.random() * 15),
      elementSize: Math.floor(Math.random() * 100) + 20,
      elementSeed: Math.floor(Math.random() * 1000),
      texture: Math.random() > 0.5 ? textures[Math.floor(Math.random() * textures.length)] : 'none',
      textureOpacity: parseFloat((Math.random() * 0.2 + 0.05).toFixed(2)),
    };
    setStyle(newStyle);

    // Sequential refresh: increase font size by 1px after randomization is done
    setTimeout(() => {
      setStyle(prev => ({
        ...prev,
        fontSize: prev.fontSize + 1
      }));
    }, 50);
  };

  if (showLanding) {
    return <LandingPage onStart={() => setShowLanding(false)} />;
  }

  return (
    <div className="flex h-screen bg-[#f8f9fa] text-[#1a1a1a] font-sans overflow-hidden relative">
      <Sidebar 
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
        setShowLanding={setShowLanding}
        text={text}
        setText={setText}
        splitMode={splitMode}
        setSplitMode={setSplitMode}
        charLimit={charLimit}
        setCharLimit={setCharLimit}
        separator={separator}
        setSeparator={setSeparator}
        cards={cards}
        style={style}
        setStyle={setStyle}
        expandedSections={expandedSections}
        toggleSection={toggleSection}
        handleFeelingLucky={handleFeelingLucky}
        handleExportAll={handleExportAll}
        handleInstagramShare={() => isInstagramConnected ? fetchInstagramAccounts() : handleFacebookLogin()}
        isInstagramConnected={isInstagramConnected}
        handleInstagramConnect={handleFacebookLogin}
        isSharing={isSharing}
        shareStatus={shareStatus}
        applyTheme={applyTheme}
      />

      {showAccountSelector && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm p-6">
          <div className="bg-white rounded-[32px] w-full max-w-md p-8 shadow-2xl animate-in fade-in zoom-in duration-300">
            <h3 className="text-2xl font-black uppercase italic tracking-tight mb-6">Select Instagram Account</h3>
            <div className="space-y-3">
              {instagramAccounts.map(account => (
                <button
                  key={account.id}
                  onClick={() => handleInstagramShare(account.id)}
                  className="w-full flex items-center gap-4 p-4 hover:bg-yellow-50 rounded-2xl border-2 border-transparent hover:border-yellow-100 transition-all text-left group"
                >
                  <img src={account.profile_picture_url} alt={account.username} className="w-12 h-12 rounded-full border-2 border-white shadow-sm" />
                  <div>
                    <div className="font-bold text-gray-900 group-hover:text-yellow-600 transition-colors">@{account.username}</div>
                    <div className="text-xs text-gray-400">{account.name}</div>
                  </div>
                </button>
              ))}
            </div>
            <button 
              onClick={() => setShowAccountSelector(false)}
              className="w-full mt-6 py-4 text-gray-400 font-bold uppercase text-xs tracking-widest hover:text-gray-600 transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {shareStatus === 'error' && (
        <div className="fixed bottom-6 right-6 z-[100] bg-rose-50 border border-rose-100 p-4 rounded-2xl shadow-xl animate-in slide-in-from-right duration-300">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-rose-500 rounded-full flex items-center justify-center text-white font-bold">!</div>
            <div>
              <div className="font-bold text-rose-900">Error</div>
              <div className="text-xs text-rose-600">{errorMessage}</div>
            </div>
            <button onClick={() => setShareStatus('idle')} className="ml-4 text-rose-400 hover:text-rose-600">
              <X className="w-8 h-8" />
            </button>
          </div>
        </div>
      )}

      {shareStatus === 'success' && (
        <div className="fixed bottom-6 right-6 z-[100] bg-emerald-50 border border-emerald-100 p-4 rounded-2xl shadow-xl animate-in slide-in-from-right duration-300">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center text-white font-bold">✓</div>
            <div>
              <div className="font-bold text-emerald-900">Success</div>
              <div className="text-xs text-emerald-600">Published to Instagram!</div>
            </div>
            <button onClick={() => setShareStatus('idle')} className="ml-4 text-emerald-400 hover:text-emerald-600">
              <X className="w-8 h-8" />
            </button>
          </div>
        </div>
      )}

      <PreviewArea 
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
        cards={cards}
        style={style}
        cardRefs={cardRefs}
        textareaRefs={textareaRefs}
        handleCardEdit={handleCardEdit}
      />

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 8s linear infinite;
        }
        textarea::-webkit-scrollbar,
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}} />
    </div>
  );
}