import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend);

const CoinChartModal = ({ coinId, onClose }) => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [coinName, setCoinName] = useState('');

  const fetchHistory = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/history/${coinId}`);
      const data = await res.json();
      setHistory(data);
      if (data.length > 0) setCoinName(data[0].name);
    } catch (err) {
      console.error('Error fetching history', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (coinId) fetchHistory();
  }, [coinId]);

  const chartData = {
    labels: history.map((point) =>
      new Date(point.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    ),
    datasets: [
      {
        label: `${coinName} Price (USD)`,
        data: history.map((point) => point.current_price),
        borderColor: 'rgba(59, 130, 246, 0.8)',
        backgroundColor: 'rgba(59, 130, 246, 0.2)',
        fill: true,
        tension: 0.4,
      },
    ],
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 backdrop-blur-sm p-4">
      <div className="relative bg-slate-900 text-white rounded-xl shadow-2xl w-full max-w-3xl p-6 animate-fadeIn border border-slate-700">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-4 text-slate-400 hover:text-red-500 text-2xl font-bold"
        >
          ×
        </button>

        {/* Title */}
        <h2 className="text-2xl font-semibold mb-4 tracking-tight">
          📊 {coinName || 'Coin'} Price History
        </h2>

        {/* Chart */}
        {loading ? (
          <p className="text-center text-slate-400">Loading chart...</p>
        ) : (
          <Line data={chartData} />
        )}

        {/* Footer */}
        {history.length > 0 && (
          <p className="text-xs mt-4 text-slate-400 text-right">
            Last updated: {new Date(history[history.length - 1].createdAt).toLocaleString()}
          </p>
        )}
      </div>
    </div>
  );
};

export default CoinChartModal;
