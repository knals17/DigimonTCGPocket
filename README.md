# Digimon TCG Pocket

A premium web application for collecting and trading Digimon TCG cards.

## Features
- **Pack Opening**: Open a booster pack every 12 hours with realistic probabilities.
- **Collection**: Track your card collection (BT-01 Expansion).
- **Trading System**: Send offers to friends, receive counter-offers, and trade securely.
- **PWA**: Fully installable on mobile devices with App-like experience.

## Getting Started

### Prerequisites
- Node.js installed.
- PostgreSQL running locally.

### Setup

1. **Database Configuration**
   The project is configured to connect to Postgres at `127.0.0.1:5432`.
   - **User**: `root`
   - **Password**: `Koony1712!`
   - **DB Name**: `DigimonTCGPocket`
   
   If your credentials differ, please update the `.env` file.

2. **Initialize Database**
   Run the following commands to create the tables and seed initial cards:
   ```bash
   npx prisma db push
   node prisma/seed.js
   ```

3. **Start the App**
   ```bash
   npm run dev
   ```
   - Frontend: `http://localhost:5173`
   - Backend: `http://localhost:3000`

## Accounts
Create a new account on the Login screen.
To test trading, create two accounts (e.g., `Ash` and `Tai`) in incognito windows.
