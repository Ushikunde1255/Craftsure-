import { useEffect, useState } from 'react';

export default function Admin() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    fetch('https://craftsure-1.onrender.com/api/escrow/admin/stats')
     .then(r => r.json())
     .then(setStats);
  }, []);

  if (!stats) return <div style={{ padding:'20px' }}>Loading profit dashboard... 💰</div>;

  return (
    <div style={{ padding:'15px', background:'#f5f7fb', minHeight:'100vh' }}>
      <h2 style={{ color:'#2d1b9c' }}>CraftSure Admin 💰 Profit Dashboard</h2>
      <p style={{ fontSize:'13px', color:'#666' }}>Founder: Ushi Nicholas | 5% client + 10% artisan = 15% per job</p>

      <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'12px', marginTop:'15px' }}>
        <div style={{ background:'white', padding:'15px', borderRadius:'12px', borderLeft:'5px solid #22c55e' }}>
          <div style={{ fontSize:'12px', color:'#666' }}>Total Jobs</div>
          <div style={{ fontSize:'24px', fontWeight:'bold' }}>{stats.totalJobs}</div>
        </div>
        <div style={{ background:'white', padding:'15px', borderRadius:'12px', borderLeft:'5px solid #5a31f5' }}>
          <div style={{ fontSize:'12px', color:'#666' }}>Total Profit (YOUR MONEY)</div>
          <div style={{ fontSize:'24px', fontWeight:'bold', color:'#5a31f5' }}>₦{stats.totalProfit}</div>
        </div>
        <div style={{ background:'white', padding:'15px', borderRadius:'12px' }}>
          <div style={{ fontSize:'12px', color:'#666' }}>Client Safety Fees (5%)</div>
          <div style={{ fontSize:'18px', fontWeight:'bold' }}>₦{stats.totalClientFee}</div>
        </div>
        <div style={{ background:'white', padding:'15px', borderRadius:'12px' }}>
          <div style={{ fontSize:'12px', color:'#666' }}>Artisan Platform Fees (10%)</div>
          <div style={{ fontSize:'18px', fontWeight:'bold' }}>₦{stats.totalArtisanFee}</div>
        </div>
        <div style={{ background:'white', padding:'15px', borderRadius:'12px' }}>
          <div style={{ fontSize:'12px', color:'#666' }}>Completed</div>
          <div style={{ fontSize:'18px', fontWeight:'bold', color:'#22c55e' }}>{stats.completed} ✅</div>
        </div>
        <div style={{ background:'white', padding:'15px', borderRadius:'12px' }}>
          <div style={{ fontSize:'12px', color:'#666' }}>Pending Approval</div>
          <div style={{ fontSize:'18px', fontWeight:'bold', color:'#f59e0b' }}>{stats.pending} ⏳</div>
        </div>
      </div>

      <div style={{ background:'white', padding:'15px', borderRadius:'12px', marginTop:'15px' }}>
        <b>Recent Escrow Jobs</b>
        <div style={{ marginTop:'10px' }}>
          {stats.allJobs.map(j => (
            <div key={j._id} style={{ display:'flex', justifyContent:'space-between', padding:'8px 0', borderBottom:'1px solid #eee', fontSize:'13px' }}>
              <span><b>{j.jobTitle}</b> - ₦{j.artisanPrice} - {j.clientName}→{j.artisanName}</span>
              <span style={{ color:'#5a31f5', fontWeight:'bold' }}>Profit ₦{j.craftsureProfit}</span>
            </div>
          ))}
        </div>
      </div>

      <div style={{ background:'#fffbeb', padding:'12px', borderRadius:'10px', marginTop:'15px', border:'1px solid #f59e0b' }}>
        <b>💡 Projection:</b><br/>
        <span style={{ fontSize:'13px' }}>If 10 jobs/day of ₦70k average:</span><br/>
        <span style={{ fontSize:'13px' }}>Profit/day = ₦105,000</span><br/>
        <span style={{ fontSize:'13px' }}>Profit/month = <b>₦3,150,000</b> 🔥</span><br/>
        <span style={{ fontSize:'13px' }}>If 10 jobs/day of ₦500k roofing:</span><br/>
        <span style={{ fontSize:'13px' }}>Profit/month = <b>₦22,500,000</b> 🚀</span>
      </div>
    </div>
  );
            }
