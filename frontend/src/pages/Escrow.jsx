// Add Chat button + fix NaN
// Inside your Escrow.jsx map, replace Fee Breakdown line with:

<div style={{ background:'#fffbeb', padding:'12px', borderRadius:'10px', border:'1px solid #f59e0b' }}>
  <b>💰 Fee Breakdown (15% total):</b><br/>
  Artisan Price: ₦{j.artisanPrice || j.totalAmount || 0}<br/>
  Client Fee 5%: ₦{j.clientFee || Math.round((j.artisanPrice||0)*0.05)}<br/>
  Artisan Fee 10%: ₦{j.artisanFee || Math.round((j.artisanPrice||0)*0.1)}<br/>
  You Pay: ₦{j.totalPaidByClient || (j.artisanPrice||0) + Math.round((j.artisanPrice||0)*0.05)}<br/>
  Artisan Gets: ₦{j.totalReceivedByArtisan || (j.artisanPrice||0) - Math.round((j.artisanPrice||0)*0.1)}<br/>
  <span style={{ color:'#5a31f5', fontWeight:'bold' }}>CraftSure Profit: ₦{j.craftsureProfit || 0} 🔥</span>
  <div style={{ marginTop:'8px' }}>
    <a href={`/chat/${j._id}`} style={{ background:'#5a31f5', color:'white', padding:'8px 12px', borderRadius:'8px', textDecoration:'none', fontSize:'12px' }}>💬 Open Chat (Admin can spy!)</a>
  </div>
</div>

// For m35/m75/m100 amounts:
Artisan gets: ₦{m.artisanAmount || Math.round(((j.totalReceivedByArtisan||j.artisanPrice||70000)*m.percent/100))} | CraftSure: ₦{m.craftsureAmount || Math.round(((j.craftsureProfit||0)*m.percent/100))}
