import cron from 'node-cron';
import axios from 'axios';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import History from '../models/History.js';

dotenv.config();

const COINGECKO_API = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1';

mongoose.connect(process.env.MONGO_DB, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('CRON MongoDB connected for history fetch');
}).catch(err => {
  console.error('CRON MongoDB error:', err);
});

cron.schedule('0 * * * *', async () => {
  try {
    const { data } = await axios.get(COINGECKO_API);
    await History.insertMany(data);
    console.log(` History saved at ${new Date().toLocaleString()}`);
  } catch (err) {
    console.error('Error saving history:', err.message);
  }
});
