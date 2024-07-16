const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

const clientIpMiddleware = require('./middlewares/clientIpMiddleware');
const authRoutes = require('./routes/authRoutes');
const urlRoutes = require('./routes/urlRoutes');
const statisticsRoutes = require('./routes/statisticsRoutes');
const { redirectUrl } = require('./controllers/urlController')

dotenv.config();

const app = express();


// Middleware
app.use(express.json());
app.use(clientIpMiddleware);

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI).then(() => {
  console.log('Connected to MongoDB');
}).catch((err) => {
  console.error('MongoDB connection error:', err);
});


app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/urls', urlRoutes);
app.use('/api/v1/statistics', statisticsRoutes);

//Redirecting from Root URL
app.get('/:shortUrl', redirectUrl);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


//mongodb+srv://imranhoseincse:focJXitFgPv0tBHf@cluster0.4tkndir.mongodb.net/