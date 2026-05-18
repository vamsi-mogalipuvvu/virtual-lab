# VIRTUAL-LAB Deployment Guide

## Quick Start (Development)

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start the frontend:**
   ```bash
   npm run dev
   ```
   Frontend will be available at `http://localhost:5173`

3. **Start the WebSocket server (optional, for multiplayer):**
   ```bash
   node server/index.js
   ```
   Server will run on `http://localhost:3001`

## Production Deployment

### Frontend (Vite/React App)

The built application is a single HTML file with all assets inlined, making deployment extremely simple.

#### Option 1: Static Hosting (Netlify, Vercel, GitHub Pages)

1. Build the project:
   ```bash
   npm run build
   ```

2. Deploy the `dist/index.html` file to your hosting provider:
   - **Netlify**: Drag and drop the `dist` folder
   - **Vercel**: `vercel --prod`
   - **GitHub Pages**: Push `dist` folder to `gh-pages` branch

#### Option 2: Traditional Web Server (Nginx, Apache)

1. Build the project:
   ```bash
   npm run build
   ```

2. Copy `dist/index.html` to your web server's public directory:
   ```bash
   cp dist/index.html /var/www/html/
   ```

### Backend (WebSocket Server)

For multiplayer functionality, you need to deploy the Node.js server.

#### Option 1: Deploy to Heroku

1. Create a `Procfile`:
   ```
   web: node server/index.js
   ```

2. Deploy:
   ```bash
   heroku create virtual-lab-server
   git push heroku main
   ```

3. Set environment variables:
   ```bash
   heroku config:set PORT=3001
   ```

#### Option 2: Deploy to DigitalOcean/AWS/VPS

1. SSH into your server

2. Install Node.js:
   ```bash
   curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
   sudo apt-get install -y nodejs
   ```

3. Clone your repository:
   ```bash
   git clone <your-repo-url>
   cd virtual-lab
   ```

4. Install dependencies:
   ```bash
   npm install
   ```

5. Use PM2 for process management:
   ```bash
   npm install -g pm2
   pm2 start server/index.js --name virtual-lab-server
   pm2 save
   pm2 startup
   ```

6. Configure Nginx as reverse proxy:
   ```nginx
   server {
       listen 80;
       server_name your-domain.com;

       location / {
           proxy_pass http://localhost:3001;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_cache_bypass $http_upgrade;
       }
   }
   ```

#### Option 3: Deploy to Railway

1. Create `railway.json`:
   ```json
   {
     "$schema": "https://railway.app/railway.schema.json",
     "build": {
       "builder": "NIXPACKS"
     },
     "deploy": {
       "startCommand": "node server/index.js"
     }
   }
   ```

2. Deploy via Railway CLI or connect your GitHub repo

### Environment Configuration

Create a `.env` file for production:

```env
# Frontend
VITE_SOCKET_URL=https://your-server-domain.com
VITE_API_URL=https://your-server-domain.com

# Backend
PORT=3001
MONGODB_URI=mongodb+srv://user:password@cluster.mongodb.net/virtual-lab
```

## MongoDB Experiment Storage

Saved experiments use the REST API in `server/index.js` and persist to MongoDB when `MONGODB_URI` is configured.

1. Set up a MongoDB Atlas cluster or a local MongoDB database.

2. Add `MONGODB_URI` to your backend environment.

3. Set `VITE_API_URL` to the deployed backend origin.

If `MONGODB_URI` is missing, the backend falls back to temporary memory storage for development.

## Docker Deployment

### Frontend Dockerfile
```dockerfile
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

### Backend Dockerfile
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY server/package*.json ./
RUN npm install
COPY server/ ./
EXPOSE 3001
CMD ["node", "index.js"]
```

### Docker Compose
```yaml
version: '3.8'

services:
  frontend:
    build:
      context: .
      dockerfile: Dockerfile.frontend
    ports:
      - "80:80"
    depends_on:
      - backend

  backend:
    build:
      context: .
      dockerfile: Dockerfile.backend
    ports:
      - "3001:3001"
    environment:
      - PORT=3001
```

## Performance Optimization

1. **Enable Gzip Compression** (Nginx):
   ```nginx
   gzip on;
   gzip_types text/plain text/css application/json application/javascript;
   ```

2. **Enable Caching**:
   ```nginx
   location ~* \.(js|css|png|jpg|jpeg|gif|ico)$ {
       expires 1y;
       add_header Cache-Control "public, immutable";
   }
   ```

3. **Use CDN** for static assets (Cloudflare, AWS CloudFront)

## Security Considerations

1. **CORS Configuration** (server/index.js):
   ```javascript
   const io = new Server(server, {
     cors: {
       origin: process.env.ALLOWED_ORIGINS || '*',
       methods: ['GET', 'POST']
     }
   });
   ```

2. **Rate Limiting**:
   ```javascript
   const rateLimit = require('express-rate-limit');
   const limiter = rateLimit({
     windowMs: 15 * 60 * 1000,
     max: 100
   });
   app.use(limiter);
   ```

3. **HTTPS**: Always use SSL in production
   - Use Let's Encrypt for free certificates
   - Configure SSL in Nginx/Apache

## Monitoring

1. **PM2 Monitoring**:
   ```bash
   pm2 monit
   pm2 logs virtual-lab-server
   ```

2. **Error Tracking**: Integrate Sentry
   ```javascript
   // Add to server/index.js
   const Sentry = require('@sentry/node');
   Sentry.init({ dsn: process.env.SENTRY_DSN });
   ```

## Troubleshooting

### WebSocket Connection Fails
- Check CORS settings
- Verify server is running
- Check firewall rules
- Ensure correct WebSocket URL in frontend

### Physics Engine Lag
- Reduce number of bodies
- Decrease physics update frequency
- Optimize constraint calculations

### Build Errors
- Clear node_modules: `rm -rf node_modules && npm install`
- Clear build cache: `rm -rf dist`
- Check Node.js version (requires v16+)

## Support

For issues and questions:
- Check the README.md
- Review server logs: `pm2 logs`
- Enable debug mode: `DEBUG=socket.io:* node server/index.js`
