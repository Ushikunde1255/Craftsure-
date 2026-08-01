// Brand Ad for CraftSure NG — Brands pay you!
export default function BrandAd() {
  return (
    <div className="mx-4 my-4 rounded-xl bg-gradient-to-r from-yellow-400 to-orange-500 p-4 shadow-lg">
      <div className="flex justify-between items-center">
        <div>
          <p className="text-xs font-bold bg-black text-white px-2 py-1 rounded">AD • Sponsored</p>
          <h3 className="font-bold text-black mt-2">Need Building Materials?</h3>
          <p className="text-sm text-black/80">Get 10% off at Dangote Cement — Use code CRAFTSURE10</p>
        </div>
        <button className="bg-black text-white px-4 py-2 rounded-full text-sm font-bold">
          Shop Now
        </button>
      </div>
    </div>
  )
}
