import BrandAd from "./components/BrandAd"

function App() {
  return (
    <div style={{minHeight:'100vh', background:'#f9fafb', fontFamily:'sans-serif', paddingBottom:'50px'}}>
      {/* HEADER */}
      <div style={{background:'#4f46e5', color:'white', padding:'12px 16px', display:'flex', gap:'8px', alignItems:'center', flexWrap:'wrap'}}>
        <strong style={{fontSize:'20px'}}>CraftSure 🇳🇬🇬🇭</strong>
        <span style={{background:'#8b5cf6', padding:'6px 12px', borderRadius:'12px', fontSize:'12px'}}>Jobs</span>
        <span style={{background:'#6366f1', padding:'6px 12px', borderRadius:'12px', fontSize:'12px'}}>Artisans</span>
        <span style={{background:'#22c55e', padding:'6px 12px', borderRadius:'12px', fontSize:'12px'}}>Escrow</span>
        <span style={{background:'#f59e0b', padding:'6px 12px', borderRadius:'12px', fontSize:'12px'}}>Admin</span>
      </div>

      <h1 style={{padding:'16px', fontSize:'28px', fontWeight:'bold'}}>Craftsure NG 🔒</h1>
      <p style={{padding:'0 16px', color:'#555'}}>Escrow for Artisans • Pay only when job is done</p>

      <div style={{padding:'16px'}}>
        <input placeholder="Find carpenter, tiler, plumber in Lagos..." style={{width:'100%', padding:'12px', borderRadius:'8px', border:'1px solid #ccc'}} />
        <div style={{display:'flex', gap:'6px', marginTop:'10px', flexWrap:'wrap'}}>
          {['All','Carpenter','Tiler','Electrician','Plumber','Painter'].map(c=> <button key={c} style={{padding:'6px 12px', borderRadius:'6px', border:'1px solid #ccc', background:'white'}}>{c}</button>)}
        </div>
      </div>

      <BrandAd />

      <div style={{padding:'16px'}}>
        <h2 style={{fontWeight:'bold', fontSize:'20px'}}>Verified Artisans near you</h2>
        <div style={{background:'white', padding:'16px', borderRadius:'12px', marginTop:'12px', border:'2px solid #facc15'}}>
          <b>Tunde Tiler <span style={{background:'#facc15', fontSize:'10px', padding:'2px 6px', borderRadius:'8px'}}>SPONSORED</span></b>
          <p style={{fontSize:'14px', color:'#666'}}>Tiler • Ojo, Lagos</p>
          <p>⭐ 5 • 47 jobs completed • Verified ✅</p>
          <button style={{marginTop:'8px', padding:'6px 14px', borderRadius:'6px', border:'1px solid black'}}>Hire</button>
        </div>
      </div>
    </div>
  )
}
export default App
