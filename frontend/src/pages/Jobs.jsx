import { useEffect, useState } from 'react';

export default function Jobs() {
  const [jobs, setJobs] = useState([]);
  const user = JSON.parse(localStorage.getItem('user') || 'null');

  useEffect(() => {
    fetch('https://craftsure-1.onrender.com/api/jobs')
     .then(r => r.json())
     .then(data => setJobs(Array.isArray(data)? data : data.jobs || []));
  }, []);

  const hireWithEscrow = async (job) => {
    if (!user) { alert('Please login!'); return; }
    const artisanName = prompt('Enter Artisan name to hire (e.g. James Ugee)', 'James Ugee');
    if (!artisanName) return;
    const amount = parseInt(prompt(`Hire ${artisanName} for "${job.title}"\nEnter price e.g. 70000`, job.budget || 70000));
    if (!amount) return;

    const clientFee = Math.round(amount * 0.05);
    const totalPay = amount + clientFee;
    if (!confirm(`💰 ESCROW:\nPrice: ₦${amount}\nSafety Fee 5%: ₦${clientFee}\nYou Pay: ₦${totalPay}\n\n🔒 Phone hidden! Chat inside app after you pay! Admin can see all chats to stop bypass!\n\nContinue?`)) return;

    const res = await fetch('https://craftsure-1.onrender.com/api/escrow/create', {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        jobId: job._id, jobTitle: job.title,
        clientId: user._id || user.id, clientName: user.name,
        artisanId: job.userId || 'artisan', artisanName, artisanPhone: '07066401403',
        totalAmount: amount
      })
    });
    const escrow = await res.json();
    alert(`✅ Escrow Created ${escrow._id}\nGo to Escrow page → Chat unlocked!`);
    window.location.href = '/escrow';
  };

  return (
    <div style={{ padding:'15px', background:'#f5f7fb', minHeight:'100vh' }}>
      <div style={{ display:'flex', justifyContent:'space-between' }}>
        <h2 style={{ color:'#5a31f5' }}>All Jobs - {jobs.length}</h2>
        <a href="/post" style={{ background:'#5a31f5', color:'white', padding:'10px 16px', borderRadius:'10px', textDecoration:'none', fontWeight:'bold' }}>+ Post Job</a>
      </div>
      <div style={{ display:'grid', gap:'16px', marginTop:'15px' }}>
        {jobs.map(job => (
          <div key={job._id} style={{ background:'white', borderRadius:'16px', overflow:'hidden', boxShadow:'0 4px 12px rgba(0,0,0,0.08)' }}>
            {job.image && <img src={job.image} style={{ width:'100%', height:'200px', objectFit:'cover' }} alt="job" />}
            <div style={{ padding:'14px' }}>
              <b>₦{job.budget} - {job.location}</b>
              <div style={{ marginTop:'6px' }}><b>{job.title}</b> - {job.description?.slice(0,100)}</div>
              <button onClick={()=>hireWithEscrow(job)} style={{ background:'#f59e0b', color:'white', border:'none', padding:'12px', borderRadius:'10px', fontWeight:'bold', width:'100%', marginTop:'12px' }}>Hire with Escrow 💰 - Chat Inside App (Safe!)</button>
              <div style={{ fontSize:'11px', color:'#666', marginTop:'6px' }}>🔒 Anti-bypass: Phone & WhatsApp hidden until you fund escrow. All chats monitored by Admin! 35%→75%→100% photo!</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
