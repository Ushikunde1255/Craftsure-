export default function BrandAd() {
  return (
    <div style={{
      margin: '16px',
      padding: '16px',
      borderRadius: '16px',
      background: 'linear-gradient(to right, #facc15, #f97316)',
      boxShadow: '0 4px 10px rgba(0,0,0,0.2)',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    }}>
      <div>
        <span style={{fontSize:'10px', fontWeight:'bold', background:'black', color:'white', padding:'4px 8px', borderRadius:'12px'}}>AD • SPONSORED</span>
        <h3 style={{fontWeight:'bold', color:'black', marginTop:'8px', fontSize:'18px'}}>Need Building Materials? 🏗️</h3>
        <p style={{fontSize:'14px', color:'black'}}>Get 10% off Dangote Cement — Use CRAFTSURE10</p>
      </div>
      <button style={{background:'black', color:'white', padding:'10px 16px', borderRadius:'24px', fontWeight:'bold', border:'none'}}>Shop Now</button>
    </div>
  )
}
