# StackSave Backend

Backend API for StackSave that fetches real-time staking data from Base Sepolia blockchain and serves it to the frontend.

## 🏗️ Architecture

```
┌─────────────┐
│  Frontend   │
└──────┬──────┘
       │ HTTP Requests
       ▼
┌─────────────┐
│  Express    │ ← REST API Endpoints
│  Server     │
└──────┬──────┘
       │
       ├─────────┐
       │         │
       ▼         ▼
┌──────────┐  ┌──────────┐
│PostgreSQL│  │  Cron    │ ← Auto-update every 5 min
│ Database │  │  Jobs    │
└──────────┘  └────┬─────┘
                   │
                   ▼
            ┌──────────────┐
            │  Blockchain  │
            │   Services   │ ← Fetch APY/TVL
            └──────┬───────┘
                   │
                   ▼
            ┌──────────────┐
            │ Base Sepolia │ ← DeFi Protocols
            │  Blockchain  │   (Aave, Moonwell, etc.)
            └──────────────┘
```

## 📦 Tech Stack

- **Node.js** + **TypeScript** - Runtime and type safety
- **Express** - Web framework
- **Prisma** - ORM for PostgreSQL
- **PostgreSQL** - Database
- **viem** - Ethereum library for blockchain interaction
- **node-cron** - Scheduled jobs
- **Winston** - Logging

## 🚀 Quick Start

### 1. Install Dependencies

```bash
cd backend
npm install
```

### 2. Set Up Database

Install PostgreSQL if you haven't:
- **Mac**: `brew install postgresql@16`
- **Windows**: Download from [postgresql.org](https://www.postgresql.org/download/)
- **Ubuntu**: `sudo apt install postgresql`

Create database:
```bash
createdb stacksave
```

### 3. Configure Environment

```bash
cp .env.example .env
```

Edit `.env` and add your values:
```env
DATABASE_URL="postgresql://user:password@localhost:5432/stacksave?schema=public"
BASE_SEPOLIA_RPC_URL="https://sepolia.base.org"
PORT=3001
```

### 4. Run Prisma Migrations

```bash
npm run prisma:migrate
npm run prisma:generate
```

### 5. Seed Initial Data (Optional)

```bash
npm run seed
```

### 6. Start Development Server

```bash
npm run dev
```

Server will start on `http://localhost:3001`

## 📡 API Endpoints

### Get All Strategies

```http
GET /api/strategies
```

**Response:**
```json
[
  {
    "id": "clx...",
    "name": "conservative",
    "displayName": "Conservative",
    "apyCurrent": 6.2,
    "apyMin": 5,
    "apyMax": 7,
    "riskLevel": "Low",
    "lockPeriod": 0,
    "minDeposit": 100000,
    "protocols": [
      {
        "name": "moonwell",
        "displayName": "Moonwell",
        "allocation": 60,
        "apy": 6.5
      },
      {
        "name": "aave",
        "displayName": "Aave v3",
        "allocation": 40,
        "apy": 5.8
      }
    ]
  }
]
```

### Get Single Strategy

```http
GET /api/strategies/:name
```

**Example:**
```http
GET /api/strategies/balanced
```

### Get All Protocols

```http
GET /api/protocols
```

**Response:**
```json
[
  {
    "id": "clx...",
    "name": "moonwell",
    "displayName": "Moonwell",
    "apy": 6.5,
    "tvl": 1250000,
    "isActive": true,
    "updatedAt": "2025-10-14T12:00:00Z"
  }
]
```

### Get Protocol History

```http
GET /api/protocols/:name/history?days=7
```

**Response:** APY history for the last N days

### Health Check

```http
GET /api/health
```

## 🔧 How It Works

### 1. Blockchain Data Fetching

The backend uses `viem` to interact with smart contracts on Base Sepolia:

```typescript
// services/aave.service.ts
export async function fetchAaveAPY(): Promise<number> {
  const reserveData = await publicClient.readContract({
    address: AAVE_POOL_ADDRESS,
    abi: aavePoolAbi,
    functionName: 'getReserveData',
    args: [USDC_ADDRESS]
  });

  // Convert liquidityRate to APY
  const RAY = 10n ** 27n;
  const SECONDS_PER_YEAR = 31536000n;
  const rate = reserveData.currentLiquidityRate;
  const apy = Number(rate * SECONDS_PER_YEAR / RAY) / 100;

  return apy;
}
```

### 2. Cron Jobs

Automated updates run every 5 minutes:

```typescript
// cron/updateAPY.cron.ts
cron.schedule('*/5 * * * *', async () => {
  console.log('Updating APY data...');

  // Fetch from all protocols
  const moonwellAPY = await fetchMoonwellAPY();
  const aaveAPY = await fetchAaveAPY();
  // ...

  // Update database
  await updateProtocolData('moonwell', moonwellAPY, tvl);
  await updateProtocolData('aave', aaveAPY, tvl);

  // Recalculate strategy APYs
  await recalculateStrategyAPYs();
});
```

### 3. APY Calculation

Strategy APY is weighted average of protocols:

```typescript
// Conservative: 60% Moonwell + 40% Aave
const conservativeAPY = (moonwellAPY * 0.6) + (aaveAPY * 0.4);

// Balanced: 40% Moonwell + 35% Aerodrome + 25% Aave
const balancedAPY = (moonwellAPY * 0.4) + (aerodromeAPY * 0.35) + (aaveAPY * 0.25);
```

## 🗄️ Database Schema

```prisma
model Strategy {
  id          String
  name        String  @unique
  apyCurrent  Float
  protocols   StrategyProtocol[]
}

model Protocol {
  id      String
  name    String  @unique
  apy     Float
  tvl     Float
  strategies StrategyProtocol[]
}

model StrategyProtocol {
  strategyId   String
  protocolId   String
  allocation   Float
}
```

## 📝 Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `DATABASE_URL` | PostgreSQL connection string | `postgresql://...` |
| `BASE_SEPOLIA_RPC_URL` | Base Sepolia RPC endpoint | `https://sepolia.base.org` |
| `PORT` | Server port | `3001` |
| `UPDATE_INTERVAL` | Cron interval in minutes | `5` |
| `CORS_ORIGIN` | Frontend URL for CORS | `http://localhost:3000` |

## 🛠️ Development

### Available Scripts

```bash
# Development with hot reload
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Prisma commands
npm run prisma:generate   # Generate Prisma client
npm run prisma:migrate    # Run migrations
npm run prisma:studio     # Open Prisma Studio GUI

# Code quality
npm run lint             # Run ESLint
npm run format           # Format with Prettier
```

### Adding a New Protocol

1. **Create ABI file** (`src/abis/newProtocol.ts`)
2. **Create service** (`src/services/newProtocol.service.ts`)
3. **Add to cron job** (`src/cron/updateAPY.cron.ts`)
4. **Seed database** with protocol data

Example:
```typescript
// src/services/newProtocol.service.ts
export async function fetchNewProtocolAPY(): Promise<number> {
  const data = await publicClient.readContract({
    address: PROTOCOL_ADDRESS,
    abi: protocolAbi,
    functionName: 'getAPY'
  });

  return Number(data) / 100;
}
```

## 🔐 Security

- Environment variables for sensitive data
- CORS configured for frontend origin only
- Input validation with Zod
- Rate limiting (TODO)
- API authentication (TODO for production)

## 📊 Monitoring

Logs are written to:
- Console (development)
- `logs/combined.log` (all logs)
- `logs/error.log` (errors only)
- Database (`system_logs` table)

## 🚢 Deployment

### Option 1: Railway

```bash
# Install Railway CLI
npm i -g @railway/cli

# Login
railway login

# Deploy
railway up
```

### Option 2: Heroku

```bash
heroku create stacksave-backend
heroku addons:create heroku-postgresql:mini
git push heroku main
```

### Option 3: VPS (DigitalOcean, AWS, etc.)

```bash
# On server
git clone your-repo
cd backend
npm install
npm run build
pm2 start dist/index.js --name stacksave-backend
```

## 🧪 Testing

```bash
# Run tests
npm test

# Test API endpoints
curl http://localhost:3001/api/strategies
curl http://localhost:3001/api/protocols
```

## 🐛 Troubleshooting

### Database Connection Error

```
Error: P1001: Can't reach database server
```

**Solution:** Check PostgreSQL is running and DATABASE_URL is correct

```bash
# Mac
brew services start postgresql@16

# Linux
sudo systemctl start postgresql
```

### RPC Rate Limit

```
Error: Too many requests
```

**Solution:** Use Alchemy or Infura for better rate limits:

```env
BASE_SEPOLIA_RPC_URL="https://base-sepolia.g.alchemy.com/v2/YOUR_KEY"
```

### Prisma Migration Error

```
Error: Migration failed
```

**Solution:** Reset database and re-migrate:

```bash
npm run prisma:migrate reset
npm run prisma:migrate
```

## 📚 Resources

- [Prisma Docs](https://www.prisma.io/docs)
- [viem Docs](https://viem.sh)
- [Express Docs](https://expressjs.com)
- [Base Sepolia Explorer](https://sepolia.basescan.org)

## 🤝 Contributing

1. Create feature branch
2. Make changes
3. Run `npm run lint` and `npm run format`
4. Submit PR

## 📄 License

MIT

---

**Need help?** Open an issue or contact the team.
