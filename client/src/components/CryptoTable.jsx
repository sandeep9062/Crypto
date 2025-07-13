import React, { useState } from 'react';
import CoinChartModal from './CoinChartModal';

const CryptoTable = ({ coins }) => {
  const [selectedCoinId, setSelectedCoinId] = useState(null);

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full table-auto border border-slate-700 rounded-lg bg-slate-800 text-white shadow-md">
        <thead className="bg-slate-900 border-b border-slate-700">
          <tr className="text-sm uppercase tracking-wide">
            <th className="px-4 py-3 text-left">Name</th>
            <th className="px-4 py-3 text-left">Symbol</th>
            <th className="px-4 py-3 text-left">Price (USD)</th>
            <th className="px-4 py-3 text-left">Market Cap</th>
            <th className="px-4 py-3 text-left">24h Change</th>
            <th className="px-4 py-3 text-center">Chart</th>
          </tr>
        </thead>
        <tbody>
          {coins.map((coin) => (
            <tr
              key={coin.id || coin._id}
              className="border-b border-slate-700 hover:bg-slate-700/40 transition duration-150"
            >
              <td className="px-4 py-3 font-medium">{coin.name}</td>
              <td className="px-4 py-3 uppercase text-slate-400">{coin.symbol}</td>
              <td className="px-4 py-3">${coin.current_price.toLocaleString()}</td>
              <td className="px-4 py-3">${coin.market_cap.toLocaleString()}</td>
              <td
                className={`px-4 py-3 font-medium ${
                  coin.price_change_percentage_24h >= 0
                    ? 'text-green-400'
                    : 'text-red-400'
                }`}
              >
                {coin.price_change_percentage_24h.toFixed(2)}%
              </td>
              <td className="px-4 py-3 text-center">
                <button
                  onClick={() => setSelectedCoinId(coin.id || coin.coinId)}
                  className="bg-blue-600 hover:bg-blue-700 text-white text-sm px-4 py-1.5 rounded-md font-medium shadow-sm transition"
                >
                  View
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {selectedCoinId && (
        <CoinChartModal
          coinId={selectedCoinId}
          onClose={() => setSelectedCoinId(null)}
        />
      )}
    </div>
  );
};

export default CryptoTable;
