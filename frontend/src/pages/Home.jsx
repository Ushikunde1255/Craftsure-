import { useState } from "react";
import BrandAd from "../components/BrandAd";

const artisans = [
  { id: 1, name: "Tunde Tiler", skill: "Tiler • Ojo, Lagos", rating: 5.0, jobs: 47, sponsored: true },
  { id: 2, name: "Musa Carpenter", skill: "Carpenter • Onireke, Lagos", rating: 4.9, jobs: 32, sponsored: false },
  { id: 3, name: "Emeka Electrician", skill: "Electrician • Ikeja", rating: 4.8, jobs: 51, sponsored: false },
];

export default function Home() {
  const [search, setSearch] = useState("");

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-black text-white p-4 sticky top-0 z-10">
        <h1 className="text-xl font-bold">Craftsure NG 🔒</h1>
        <p className="text-xs text-gray-300">Escrow for Artisans • Pay only when job is done</p>
      </div>

      {/* Search */}
      <div className="p-4">
        <input
          type="text"
          placeholder="Find carpenter, tiler, plumber in Lagos..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full p-3 rounded-full border border-gray-300 focus:outline-none focus:border-black"
        />
      </div>

      {/* Categories */}
      <div className="px-4 flex gap-2 overflow-x-auto pb-2">
        {["All", "Carpenter", "Tiler", "Electrician", "Plumber", "Painter"].map((cat) => (
          <button key={cat} className="whitespace-nowrap px-4 py-2 bg-white rounded-full border text-sm font-medium hover:bg-black hover:text-white">
            {cat}
          </button>
        ))}
      </div>

      {/* 🔥 MONEY MAKER AD - SPONSORED ARTISAN */}
      <BrandAd />

      {/* Artisans List */}
      <div className="px-4 mt-4 space-y-3">
        <h2 className="font-bold">Verified Artisans near you</h2>
        {artisans.map((a) => (
          <div key={a.id} className={`bg-white p-4 rounded-xl shadow-sm border flex justify-between items-center ${a.sponsored? 'border-yellow-400 border-2' : ''}`}>
            <div>
              <div className="flex gap-2 items-center">
                <h3 className="font-bold">{a.name}</h3>
                {a.sponsored && <span className="text-[10px] bg-yellow-400 text-black px-2 py-0.5 rounded-full font-bold">SPONSORED</span>}
              </div>
              <p className="text-sm text-gray-500">{a.skill}</p>
              <p className="text-xs mt-1">⭐ {a.rating} • {a.jobs} jobs completed • Verified ✅</p>
            </div>
            <button className="bg-black text-white px-4 py-2 rounded-full text-sm">Hire</button>
          </div>
        ))}
      </div>

      {/* How Escrow Works */}
      <div className="m-4 p-4 bg-white rounded-xl border">
        <h3 className="font-bold mb-2">How Craftsure Protects You 🛡️</h3>
        <p className="text-sm text-gray-600">1. Pay to Craftsure (escrow) → 2. Artisan does work → 3. You approve → 4. We release money. 100% safe!</p>
      </div>
    </div>
  );
}
