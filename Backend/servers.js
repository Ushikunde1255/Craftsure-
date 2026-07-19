require('dotenv').config();
const express = require('express');
const cors = require('cors');
const http = require('http');
const { Server } = require('socket.io');
const helmet = require('helmet');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');

const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*", methods: ["GET","POST"] } });
app.set('io', io);

app.use(helmet());
app.use(morgan('combined'));
app.use(cors({ origin: "*" }));
app.use(express.json({ verify: (req,res,buf)=>{ req.rawBody = buf; } }));
app.use(rateLimit({ windowMs: 60000, max: 200 }));

app.use('/auth', require('./routes/auth'));
app.use('/payments', require('./routes/payments'));
app.use('/webhooks', require('./routes/webhooks'));
app.use('/jobs', require('./routes/jobs'));

app.get('/', (req,res)=> res.json({ message: 'CraftSure v6 PERFECT Real-time LIVE 🇳🇬', status: 'online' }));
app.get('/health', (req,res)=> res.json({ ok: true }));

io.on('connection', (socket)=>{
  console.log('connected', socket.id);
  socket.on('join', (id)=> socket.join(`user:${id}`));
  socket.on('join_job', (id)=> socket.join(`job:${id}`));
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, ()=> console.log(`CraftSure PERFECT live ${PORT}`));
