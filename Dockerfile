FROM node:22.14.0-bullseye-slim


WORKDIR /app

# Install build tools for native modules
RUN apt-get update && apt-get install -y python3 g++ make git curl \
    && rm -rf /var/lib/apt/lists/*

COPY package*.json ./

RUN npm ci --force

COPY . .

# Set environment variable for API key
ARG API_KEY
ENV VITE_GEMINI_API_KEY=${API_KEY}
# Create .env.local file with API_KEY
RUN echo "VITE_GEMINI_API_KEY=${API_KEY}" > .env.local


EXPOSE 3099

# Start dev server reliably
CMD ["npx", "tsx", "server.ts"]