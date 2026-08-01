function App() {
  return (
    <div style={{background:'#f5f5f5', minHeight:'100vh', fontFamily:'sans-serif'}}>
      <div style={{background:'#4338ca', color:'white', padding:'15px', display:'flex', gap:'8px', flexWrap:'wrap'}}>
        <b style={{fontSize:'18px'}}>CraftSure 🇳🇬🇬🇭</b>
        <span style={{background:'#7c3aed', padding:'5px 10px', borderRadius:'10px', fontSize:'12px'}}>Jobs</span>
        <span style={{background:'#22c55e', padding:'5px 10px', borderRadius:'10px', fontSize:'12px'}}>Escrow</span>
        <span style={{background:'#f59e0b', padding:'5px 10px', borderRadius:'10px', fontSize:'12px'}}>Admin</span>
      </div>

      <h1 style={{padding:'20px 15px 5px', margin:0}}>Craftsure NG 🔒</h1>
      <p style={{padding:'0 15px', margin:0, color:'#666'}}>Escrow for Artisans • Pay only when job is done</p>

      <div style={{padding:'15px'}}>
        <input placeholder="Find carpenter, tiler, plumber in Lagos..." style={{width:'100%', padding:'12px', borderRadius:'8px', border:'1px solid #ddd'}} />
      </div>

      {/* YELLOW AD - NO IMPORT NEEDED */}
      <div style={{margin:'15px', padding:'20px', borderRadius:'16px', background:'linear-gradient(90deg, #fde047, #fb923c)', display:'flex', justifyContent:'space-between', alignItems:'center'}}>
        <div>
          <div style={{background:'black', color:'white', display:'inline-block', fontSize:'10px', padding:'3px 8px', borderRadius:'10px', fontWeight:'bold'}}>AD • SPONSORED</div>
          <div style={{fontWeight:'bold', marginTop:'8px', fontSize:'18px', color:'black'}}>Need Building Materials? 🏗️</div>
          <div style={{fontSize:'14px', marginTop:'4px'}}>Get 10% off Dangote — Use CRAFTSURE10</div>
        </div>
        <button style={{background:'black', color:'white', border:'none', padding:'10px 18px', borderRadius:'20px', fontWeight:'bold'}}>Shop Now</button>
      </div>

      <h2 style={{padding:'0 15px'}}>Verified Artisans near you</h2>
      <div style={{margin:'10px 15px', background:'white', padding:'15px', borderRadius:'12px', border:'2px solid gold'}}>
        <b>Tunde Tiler <span style={{background:'gold', fontSize:'10px', padding:'2px 6px', borderRadius:'6px'}}>SPONSORED</span></b><br/>
        <small>Tiler • Ojo, Lagos</small><br/>
        ⭐ 5 • 47 jobs • Verified ✅<br/>
        <button style={{marginTop:'8px', padding:'6px 12px'}}>Hire</button>
      </div>

      <div style={{margin:'10px 15px', background:'white', padding:'15px', borderRadius:'12px'}}>
        <b>Musa Carpenter</b><br/>
        <small>Carpenter • Onireke, Lagos</small><br/>
        ⭐ 4.9 • 32 jobs • Verified ✅<br/>
        <button style={{marginTop:'8px', padding:'6px 12px'}}>Hire</button>
      </div>
    </div>
  )
}
export default App
