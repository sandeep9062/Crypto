import express from 'express';
import {
  getCoins,
  saveHistory,
  getHistoryByCoinId
} from '../controllers/coinController.js';
import{authenticate} from "../middlewares/auth.js"

const router = express.Router();

router.get('/coins', getCoins); // public
router.post('/history', authenticate, saveHistory); // protected
router.get('/history/:coinId', getHistoryByCoinId); // public

export default router;
