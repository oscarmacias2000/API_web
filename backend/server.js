const express = require('express');
const cors = require('cors');
const NodeCache = require('node-cache');
const authRoutes = require('./src/routes/authRoutes');
const dotenv = require('dotenv');
const { PrismaClient } = require('@prisma/client'); // 👈 AGREGADO

dotenv.config();

const app = express();
const cache = new NodeCache({ stdTTL: 300 });
const prisma = new PrismaClient(); // 👈 AGREGADO

const allowedOrigins = [
  'http://localhost:8081',
  'http://localhost:8082',
  'http://localhost:19006',
  'http://localhost:19007',
  'http://localhost:3000'
];

app.use(cors({
  origin: function(origin, callback) {
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
}));

app.use(express.json());

// Configurar CSP
app.use((req, res, next) => {
  res.setHeader(
    'Content-Security-Policy',
    "default-src 'self'; connect-src 'self' http://localhost:3002 ws://localhost:3002; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline'"
  );
  next();
});

// Middleware para loggear TODAS las peticiones (MOVERLO ANTES de las rutas)
app.use((req, res, next) => {
  console.log(`📨 ${req.method} ${req.url} - ${new Date().toISOString()}`);
  next();
});

const MOCK_DATA = {
  "DAI": {
    "price": 1.00,
    "supply": 1000000,
    "holders": 5000,
    "volume24h": 500000,
    "marketCap": 1000000 // 👈 AGREGADO para que funcione el endpoint market
  },
  "USDC": {
    "price": 1.00,
    "supply": 2000000,
    "holders": 8000,
    "volume24h": 1000000,
    "marketCap": 2000000
  },
  "USDT": {
    "price": 1.00,
    "supply": 3000000,
    "holders": 10000,
    "volume24h": 1500000,
    "marketCap": 3000000
  }
};

// Rutas de autenticación
app.use('/api/auth', authRoutes);

// Ruta raíz
app.get('/', (req, res) => {
  res.json({
    message: 'API funcionando',
    endpoints: ['/health', '/api/...']
  });
});

// Health check - CORREGIDO (solo una respuesta)
app.get('/health', (req, res) => {
  console.log('🟢 GET /health recibido');
  res.status(200).json({ status: 'ok', timestamp: new Date() });
});

// Endpoint para obtener datos de una stablecoin - CORREGIDO
app.get('/api/stablecoin/prices', (req, res) => {
  const { symbol } = req.query;
  const symbolList = symbol ? symbol.split(',') : Object.keys(MOCK_DATA);
  const result = {};

  symbolList.forEach(sym => {
    if (MOCK_DATA[sym]) {
      result[sym] = MOCK_DATA[sym];
    }
  });
  res.json(result);
});

app.get('/api/stablecoin/history', (req, res) => {
  const { symbol } = req.params;
  const { days = 7 } = req.query;

  const history = [];
  const now = Date.now();
  for (let i = 0; i < days; i++) {
    history.push({
      date: new Date(now - i * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      price: 1 + (Math.random() * 0.02 - 0.01)
    });
  }
  res.json({ symbol, history });
});

app.get('/api/stablecoin/market', (req, res) => {
  const totalMarketCap = Object.values(MOCK_DATA).reduce((sum, d) => sum + d.marketCap, 0);
  const totalVolume24h = Object.values(MOCK_DATA).reduce((sum, d) => sum + d.volume24h, 0);

  res.json({
    totalMarketCap,
    totalVolume: totalVolume24h,
    totalStableCoins: Object.keys(MOCK_DATA).length,
    timestamp: new Date().toISOString()
  });
});

app.get('/api/stablecoin/opportunities', (req, res) => {
  res.json([
    { from: 'DAI', to: 'USDC', profit: 0.01, exchange: 'Uniswap', exchange2: 'Coinbase' },
    { from: 'USDC', to: 'USDT', profit: 0.02, exchange: 'Sushiswap', exchange2: 'Binance' },
    { from: 'USDT', to: 'DAI', profit: 0.015, exchange: 'Curve', exchange2: 'Kraken' }
  ]);
});


const PORT = process.env.PORT || 3002;

app.listen(PORT, () => {
  console.log(`Server of backend running on port ${PORT}`);
});

// Manejadores de errores globales
process.on('uncaughtException', (error) => {
  console.error('💥 Uncaught Exception:', error);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('💥 Unhandled Rejection:', reason);
});