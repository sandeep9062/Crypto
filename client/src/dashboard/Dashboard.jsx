import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import CryptoTable from "../components/CryptoTable";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

const Dashboard = ({ token }) => {
  const [coins, setCoins] = useState([]);
  const [filteredCoins, setFilteredCoins] = useState([]);
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [filterBy, setFilterBy] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchCoins = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/api/coins`
      );
  
      setCoins(data);
    } catch (error) {
      toast.error("Error fetching coins");
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveHistory = async () => {
    try {
      await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/api/history`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      toast.success("Snapshot saved to DB!");
    } catch (err) {
      toast.error(" Failed to save snapshot");
      console.log(err);
    }
  };

  useEffect(() => {
    fetchCoins();
    const interval = setInterval(fetchCoins, 1800000); 
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    let result = [...coins];

    if (search) {
      result = result.filter(
        (coin) =>
          coin.name.toLowerCase().includes(search.toLowerCase()) ||
          coin.symbol.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (sortBy === "price") {
      result.sort((a, b) => b.current_price - a.current_price);
    } else if (sortBy === "marketCap") {
      result.sort((a, b) => b.market_cap - a.market_cap);
    }

    if (filterBy === "positive") {
      result = result.filter((coin) => coin.price_change_percentage_24h > 0);
    } else if (filterBy === "negative") {
      result = result.filter((coin) => coin.price_change_percentage_24h < 0);
    }

    setFilteredCoins(result);
  }, [coins, search, sortBy, filterBy]);

  return (
    <div className="p-6 bg-gradient-to-b from-slate-900 via-slate-950 to-black min-h-screen text-white">
      <div className="w-full bg-slate-800/40 backdrop-blur-lg rounded-xl border border-slate-700 shadow-lg p-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-6">
          <Navbar
            search={search}
            setSearch={setSearch}
            sortBy={sortBy}
            setSortBy={setSortBy}
            filterBy={filterBy}
            setFilterBy={setFilterBy}
          />

          {token && (
            <Button
              onClick={handleSaveHistory}
              className="bg-blue-600 hover:bg-blue-700 transition-all duration-200 px-6 py-2 font-semibold rounded-lg shadow-md"
            >
              Save Current Data
            </Button>
          )}
        </div>

        {loading ? (
          <div className="text-center text-slate-400 py-10 text-lg font-medium">
            Loading coins...
          </div>
        ) : (
          <CryptoTable coins={filteredCoins} />
        )}
      </div>
    </div>
  );
};

export default Dashboard;
