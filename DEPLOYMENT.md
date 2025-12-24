# 🎴 Digimon TCG Pocket - Deployment Guide

## 📋 Prerequisites

- Docker & Docker Compose installed on your server
- Domain name pointing to your server (optional but recommended for HTTPS)
- Ports 3000 available

## 🚀 Quick Start

### 1. Clone or upload the project to your server

```bash
cd /path/to/your/server
# Upload your project files here
```

### 2. Create environment file

```bash
cp .env.example .env
nano .env
```

**Important:** Change these values in `.env`:
- `DB_PASSWORD`: Strong password for PostgreSQL
- `JWT_SECRET`: Random secret key (use `openssl rand -base64 32` to generate)

### 3. Build and start the containers

```bash
# Build the Docker image
docker-compose build

# Start all services
docker-compose up -d
```

### 4. Check if everything is running

```bash
# View logs
docker-compose logs -f

# Check container status
docker-compose ps
```

Your app should now be running on `http://your-server-ip:3000`

## 🔧 Management Commands

### Stop the application
```bash
docker-compose down
```

### Restart the application
```bash
docker-compose restart
```

### View logs
```bash
docker-compose logs -f app
docker-compose logs -f postgres
```

### Update the application
```bash
# Pull latest changes
git pull

# Rebuild and restart
docker-compose down
docker-compose build
docker-compose up -d
```

### Reset database (⚠️ WARNING: Deletes all data)
```bash
docker-compose down -v
docker-compose up -d
```

## 🌐 Setting up HTTPS with Nginx (Recommended)

### 1. Install Nginx on your server

```bash
sudo apt update
sudo apt install nginx certbot python3-certbot-nginx
```

### 2. Create Nginx configuration

```bash
sudo nano /etc/nginx/sites-available/digimon-tcg
```

Paste this configuration:

```nginx
server {
    listen 80;
    server_name your-domain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

### 3. Enable the site

```bash
sudo ln -s /etc/nginx/sites-available/digimon-tcg /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

### 4. Get SSL certificate

```bash
sudo certbot --nginx -d your-domain.com
```

## 📊 Monitoring

### Check database
```bash
docker-compose exec postgres psql -U digimon -d digimon_tcg
```

### Backup database
```bash
docker-compose exec postgres pg_dump -U digimon digimon_tcg > backup_$(date +%Y%m%d).sql
```

### Restore database
```bash
cat backup_20231224.sql | docker-compose exec -T postgres psql -U digimon digimon_tcg
```

## 🔒 Security Recommendations

1. **Change default passwords** in `.env`
2. **Use HTTPS** in production (setup Nginx with Let's Encrypt)
3. **Firewall**: Only expose ports 80, 443, and 22 (SSH)
4. **Regular backups**: Schedule daily database backups
5. **Update regularly**: Keep Docker images and dependencies updated

## 🐛 Troubleshooting

### App won't start
```bash
docker-compose logs app
```

### Database connection issues
```bash
docker-compose logs postgres
docker-compose exec postgres pg_isready -U digimon
```

### Port already in use
```bash
# Change port in docker-compose.yml
ports:
  - "8080:3000"  # Use port 8080 instead
```

## 📱 PWA Installation

Once deployed with HTTPS, users can install the app on their phones:

**Android:** Chrome menu → "Install app"
**iOS:** Safari → Share → "Add to Home Screen"

## 📞 Support

For issues, check the logs first:
```bash
docker-compose logs -f
```

---

Made with ❤️ for Digimon TCG fans
