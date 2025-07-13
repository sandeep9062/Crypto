import React from 'react';
import { Search, Filter, SortAsc } from 'lucide-react';

const Navbar = ({ search, setSearch, sortBy, setSortBy, filterBy, setFilterBy }) => {
  return (
    <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-6 px-6 py-4 bg-gradient-to-r from-[#0f172a] via-[#1e293b] to-[#0f172a] rounded-xl shadow-lg border border-slate-700 text-white">
      
      {/* Search Bar */}
      <div className="flex items-center w-full md:w-1/3 bg-slate-800 rounded-lg px-3 py-2 shadow-inner">
        <Search className="text-slate-400 w-4 h-4 mr-2" />
        <input
          type="text"
          placeholder="Search coin..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="bg-transparent outline-none text-white placeholder:text-slate-400 w-full"
        />
      </div>

      {/* Sort Dropdown */}
      <div className="flex items-center bg-slate-800 rounded-lg px-3 py-2 shadow-inner w-full md:w-auto">
        <SortAsc className="text-slate-400 w-4 h-4 mr-2" />
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="bg-transparent outline-none text-white w-full"
        >
          <option className="text-black" value="">Sort By</option>
          <option className="text-black" value="price">Price (High → Low)</option>
          <option className="text-black" value="marketCap">Market Cap (High → Low)</option>
        </select>
      </div>

      {/* Filter Dropdown */}
      <div className="flex items-center bg-slate-800 rounded-lg px-3 py-2 shadow-inner w-full md:w-auto">
        <Filter className="text-slate-400 w-4 h-4 mr-2" />
        <select
          value={filterBy}
          onChange={(e) => setFilterBy(e.target.value)}
          className="bg-transparent outline-none text-white w-full"
        >
          <option className="text-black" value="">All</option>
          <option className="text-black" value="positive">Gainers</option>
          <option className="text-black" value="negative">Losers</option>
        </select>
      </div>
    </div>
  );
};

export default Navbar;
