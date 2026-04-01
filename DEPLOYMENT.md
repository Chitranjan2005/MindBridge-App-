# 🌐 Deployment Guide

## Production Deployment Options

### Option 1: Vercel (Frontend) + Railway (Backend)

#### Frontend (Vercel)

```bash
cd frontend
npm run build

# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

#### Backend (Railway)

1. Go to https://railway.app
2. Create new project
3. Connect GitHub repo (backend folder)
4. Add environment variables
5. Deploy

---

### Option 2: Heroku (Full Stack)

#### Backend

```bash
cd backend

# Create Heroku app
heroku create mindbridge-api

# Set environment variables
heroku config:set ANTHROPIC_API_KEY=your_key_here

# Deploy
git push heroku main
```

#### Frontend

```bash
cd frontend

# Update API URL in code
# Create Heroku app
heroku create mindbridge-app

# Deploy
git push heroku main
```

---

### Option 3: DigitalOcean / AWS / GCP

#### Using Docker

**Backend Dockerfile:**

```dockerfile
FROM node:18
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 5000
CMD ["npm", "start"]
```

**Frontend Dockerfile:**

```dockerfile
FROM node:18 as build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

**docker-compose.yml:**

```yaml
version: "3"
services:
  backend:
    build: ./backend
    ports:
      - "5000:5000"
    env_file:
      - ./backend/.env

  frontend:
    build: ./frontend
    ports:
      - "80:80"
    depends_on:
      - backend
```

Deploy:

```bash
docker-compose up -d
```

---

## Environment Variables for Production

### Backend

```env
PORT=5000
NODE_ENV=production
ANTHROPIC_API_KEY=your_key
FRONTEND_URL=https://your-frontend-url.com
```

### Frontend

Update API URL in `vite.config.js`:

```js
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: "https://your-backend-url.com",
        changeOrigin: true,
      },
    },
  },
});
```

---

## Security Checklist

- [ ] Use HTTPS only
- [ ] Set CORS to specific domain
- [ ] Add rate limiting
- [ ] Sanitize user inputs
- [ ] Enable helmet.js
- [ ] Use environment variables
- [ ] Add request validation
- [ ] Implement logging
- [ ] Set up monitoring

---

## Performance Optimization

### Backend

```js
// Add to server.js
import compression from "compression";
import helmet from "helmet";

app.use(helmet());
app.use(compression());
```

### Frontend

```js
// Lazy loading
const ChatPage = lazy(() => import("./components/ChatPage"));

// Code splitting
```

---

## Monitoring

### Backend Monitoring

- Use PM2 for process management
- Set up error tracking (Sentry)
- Monitor API response times
- Track API usage/costs

### Frontend Monitoring

- Google Analytics
- Error boundary components
- Performance monitoring

---

## Cost Estimation

**Claude API (Anthropic):**

- ~$0.01 per 1000 tokens
- Avg conversation: $0.02-0.05
- 1000 users/month: ~$20-50

**Hosting:**

- Vercel (Frontend): Free tier available
- Railway (Backend): $5/month
- Total: ~$5-10/month for MVP

---

## Backup & Recovery

1. **Database Backups** (if using DB)
   - Daily automated backups
   - Store in S3/Cloud Storage

2. **Code Backups**
   - GitHub repository
   - Version control

3. **API Keys**
   - Store securely
   - Rotate regularly

---

## Scaling Strategy

**Phase 1: MVP (0-1000 users)**

- Single backend instance
- Static frontend
- Cost: ~$10/month

**Phase 2: Growth (1000-10000 users)**

- Load balancer
- Multiple backend instances
- Redis caching
- Cost: ~$100/month

**Phase 3: Scale (10000+ users)**

- Auto-scaling
- Database cluster
- CDN for frontend
- Cost: Variable

---

## Launch Checklist

- [ ] Test all emotion levels
- [ ] Verify crisis resources display
- [ ] Check mobile responsiveness
- [ ] Test API error handling
- [ ] Set up analytics
- [ ] Add privacy policy
- [ ] Test load capacity
- [ ] Set up monitoring
- [ ] Prepare support documentation
- [ ] Create backup plan

---

**Ready to launch? Remember: Start small, iterate fast, scale smart!**
