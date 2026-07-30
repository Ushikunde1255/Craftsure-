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
    if (!user) { alert('Please login first! Go to + Post and login'); return; }

    const artisanId = prompt('Enter Artisan ID to hire (copy from Artisans page URL) or enter name:\n\nFor demo, enter artisan name e.g. James Ugee');
    if (!artisanId) return;

    const artisanName = artisanId;
    const artisanPhone = '07066401403'; // will fetch real later

    const amount = parseInt(prompt(`Hire ${artisanName} for job "${job.title}"\n\nEnter agreed price (e.g. 1800000):`, job.budget || 100000));
    if (!amount) return;

    // Calculate your fee!
    const clientFee = amount * 0.05;
    const artisanFee = amount * 0.10;
    const totalPay = amount + clientFee;
    const artisanGet = amount - artisanFee;
    const yourProfit = clientFee + artisanFee;

    if (!confirm(`💰 ESCROW BREAKDOWN:\n\nArtisan Price: ₦${amount}\nClient Safety Fee (5%): ₦${clientFee}\nYou Pay Total: ₦${totalPay}\n\nArtisan Receives: ₦${artisanGet}\nCraftSure Profit: ₦${yourProfit}\n\nMoney held safely! Released 35% -> 75% -> 100% after photo evidence!\n\nContinue?`)) return;

    try {
      const res = await fetch('https://craftsure-1.onrender.com/api/escrow/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          jobId: job._id,
          jobTitle: job.title,
          clientId: user._id || user.id,
          clientName: user.name,
          artisanId: job.userId || user._id, // demo: use job poster as artisan
          artisanName: artisanName,
          artisanPhone: artisanPhone,
          totalAmount: amount
        })
      });
      const escrow = await res.json();
      alert(`✅ Escrow Created!\n\nID: ${escrow._id}\nGo to Escrow 💰 page to see 35% 75% 100% milestones!`);
      window.location.href = '/escrow';
    } catch (e) {
      alert('Error: ' + e.message);
    }
  };

  return (
    <div style={{ padding: '15px', background: '#f5f7fb', minHeight: '100vh' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2 style={{ color: '#5a31f5' }}>All Jobs - {jobs.length}</h2>
        <a href="/post" style={{ background: '#5a31f5', color: 'white', padding: '10px 16px', borderRadius: '10px', textDecoration: 'none', fontWeight: 'bold' }}>+ Post Job</a>
      </div>

      <div style={{ display: 'grid', gap: '16px', marginTop: '15px' }}>
        {jobs.map(job => (
          <div key={job._id} style={{ background: 'white', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 4px 12px rgba(0,0,0,0.08)' }}>
            {job.image && <img src={job.image} style={{ width: '100%', height: '200px', objectFit: 'cover' }} alt="job" />}
            <div style={{ padding: '14px' }}>
              <b style={{ fontSize: '16px' }}>₦{job.budget || job.amount} - {job.clientName || job.postedBy || 'Client'} - {job.location}</b>
              <div style={{ marginTop: '6px', fontSize: '14px' }}>
                <b>{job.title}</b> - {job.description?.slice(0, 120)}
              </div>
              <div style={{ display: 'flex', gap: '8px', marginTop: '12px' }}>
                <a href={`https://wa.me/${job.phone || job.whatsapp}?text=Hi, I saw your job ${job.title} on CraftSure`} style={{ background: '#22c55e', color: 'white', padding: '10px', borderRadius: '10px', textDecoration: 'none', flex: 1, textAlign: 'center', fontWeight: 'bold' }}>WhatsApp Client</a>
                <button onClick={() => hireWithEscrow(job)} style={{ background: '#f59e0b', color: 'white', border: 'none', padding: '10px 12px', borderRadius: '10px', fontWeight: 'bold', flex: 1 }}>Hire with Escrow 💰</button>
              </div>
              <div style={{ fontSize: '11px', color: '#666', marginTop: '6px' }}>💡 Hire with Escrow = Paystack holds money, released 35% → 75% → 100% after photos! Safe!</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
