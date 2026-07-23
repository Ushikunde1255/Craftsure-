import { Link } from 'react-router-dom'
export default function Home(){
 return <div style={{padding:'30px',maxWidth:'800px',margin:'0 auto'}}><h1 style={{fontSize:'32px'}}>Real-time Escrow for Nigerian Artisans</h1><p>Clients post jobs, fund escrow via Paystack, artisans get 97% instant payout.</p><div style={{marginTop:'20px',display:'flex',gap:'10px'}}><Link to="/register" style={{background:'#7c3aed',color:'white',padding:'10px 20px',borderRadius:'8px',textDecoration:'none'}}>Get Started</Link><Link to="/jobs" style={{padding:'10px 20px',border:'1px solid #7c3aed',borderRadius:'8px',textDecoration:'none'}}>Browse Jobs</Link></div><p style={{marginTop:'20px',color:'#64748b'}}>Backend: https://craftsure-1.onrender.com/api</p></div>
}
