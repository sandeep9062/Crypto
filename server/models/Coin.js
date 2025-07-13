
import mongoose from 'mongoose';

const coinSchema = new mongoose.Schema({
  coinId: String,
  name: String,
  symbol: String,
  current_price: Number,
  market_cap: Number,
  price_change_percentage_24h: Number,
  last_updated: Date
});

export default mongoose.model('Coin', coinSchema);
