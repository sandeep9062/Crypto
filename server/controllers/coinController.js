import axios from 'axios';
import Coin from '../models/Coin.js';
import History from '../models/History.js';

const COINGECKO_API = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1';

export const getCoins = async (req, res) => {
  try {
    const { data } = await axios.get(COINGECKO_API);

    const formattedCoins = data.map(coin => ({
      coinId: coin.id, // Ensure consistent ID
      name: coin.name,
      symbol: coin.symbol,
      current_price: coin.current_price,
      market_cap: coin.market_cap,
      price_change_percentage_24h: coin.price_change_percentage_24h,
      last_updated: coin.last_updated,
    }));

    await Coin.deleteMany();
    await Coin.insertMany(formattedCoins);

    res.json(formattedCoins);
  } catch (err) {
    console.error("Error in getCoins:", err);
    res.status(500).json({ error: 'Failed to fetch coins' });
  }
};

export const saveHistory = async (req, res) => {
  try {
    const { data } = await axios.get(COINGECKO_API);

    const formattedHistory = data.map(coin => ({
      coinId: coin.id,
      name: coin.name,
      symbol: coin.symbol,
      current_price: coin.current_price,
      market_cap: coin.market_cap,
      price_change_percentage_24h: coin.price_change_percentage_24h,
      last_updated: coin.last_updated,
    }));

    await History.insertMany(formattedHistory);

    res.json({ message: 'History saved' });
  } catch (err) {
    console.error("Error in saveHistory:", err);
    res.status(500).json({ error: 'Failed to save history' });
  }
};

export const getHistoryByCoinId = async (req, res) => {
  try {
    const coinId = req.params.coinId;
    const history = await History.find({ coinId }).sort({ createdAt: 1 });

    console.log("History of coin:", coinId, history.length);
    res.json(history);
  } catch (err) {
    console.error("Failed to fetch history by coinId", err);
    res.status(500).json({ error: 'Failed to fetch history' });
  }
};
