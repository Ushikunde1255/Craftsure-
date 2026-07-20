require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const http = require('http');
const { Server } = require('socket.io');

const connectDB = require('./db/connect');

const authRoutes = require('./routes/auth');
const jobRoutes = require('./routes/jobs');
const paymentRoutes = require('./routes/payments');
const webhookRoutes = require('./routes/webhooks');
const proofRoutes = require('./routes/proofs');

const app = express();
const server = http.createServer(app);

// ===== SECURITY MIDDLEWARE =====
app.use(helmet());

// CORS - LOCKED to your frontend only
const allowedOrigins = [
  process.env.FRONTEND_URL,
  'http://localhost:5173',
  'http://localhost:3000'
].filter(Boolean);

app.use(cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));

// Rate limiting - prevent brute force
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 mins
  max: 100, // 100 requests per 15 mins
  message: { msg: 'Too many requests, try again later' },
  standardHeaders: true,
  legacyHeaders: false
});
app.use('/api/', limiter);

// Stricter limit for auth
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: { msg: 'Too many login attempts, try again after 15 mins' }
});
app.use('/api/auth', authLimiter);

// Body parsers - webhook needs raw body for HMAC
app.use('/api/webhooks', express.raw({ type: 'application/json' }));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// ===== SOCKET.IO =====
const io = new Server(server, {
  cors: { origin: allowedOrigins, credentials: true }
});

io.on('connection', (socket) => {
  console.log('User connected:', socket.id);
  socket.on('join', (userId) => {
    socket.join(userId);
  });
  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

app.set('io', io);

// ===== ROUTES =====
app.get('/', (req, res) => {
  res.json({ msg: 'CraftSure Nigeria API v6 Running 🇳🇬', status: 'ok' });
});

app.use('/api/auth', authRoutes);
app.use('/api/jobs', jobRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/api/webhooks', webhookRoutes);
app.use('/api/proofs', proofRoutes);

// 404 handler
app.use((req, res) => {
  res.status(404).json({ msg: 'Route not found' });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ msg: 'Server error', error: err.message });
});

const PORT = process.env.PORT || 5000;

connectDB().then(() => {
  server.listen(PORT, () => {
    console.log(`CraftSure server running on port ${PORT}`);
  });
});
