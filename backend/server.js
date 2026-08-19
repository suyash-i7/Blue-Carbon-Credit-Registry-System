require('dotenv').config();

if (!process.env.ADMIN_EMAIL) {
  console.error('FATAL ERROR: ADMIN_EMAIL environment variable is not defined.');
  console.error('Please configure ADMIN_EMAIL in your .env file to prevent lockout.');
  process.exit(1);
}

const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/admin', require('./routes/adminRoutes'));
app.use('/api/ngo', require('./routes/ngoRoutes'));
app.use('/api/company', require('./routes/companyRoutes'));

// Basic Health Check
app.get('/', (req, res) => {
  res.send('Veridian Registry API (Supabase) is running...');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
