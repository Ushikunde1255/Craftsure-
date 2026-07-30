import { useEffect, useState } from 'react';

export default function Escrow() {
  const [jobs, setJobs] = useState([]);
  const [selected, setSelected] = useState(null);
  const user = JSON.parse(localStorage.getItem('user') || 'null');

  useEffect(() => {
    if (!user) return;
    const id = user._id || user.id;
    fetch(`https://craftsure-1.onrender.com/api/escrow/my/${id}`)
     .then(r => r.json())
     .then(d => setJobs(Array.isArray(d)? d : []))
     .catch(() => setJobs([]));
  }, []);

  const uploadEvidence = async (stage) => {
    const input = document.createElement('input');
    input.type = 'file'; input.accept = 'image/*'; input.multiple = true;
    input.onchange = async (e) => {
      const files = Array.from(e.target.files);
      const photos = [];
      for (let f of files) {
        const reader = new FileReader();
        await new Promise(res => {
          reader.onload = () => {
            const img = new Image();
            img.onload = () => {
              const c = document.createElement('canvas');
              const max = 800; let w = img.width, h = img.height;
              if (w > h) { if (w > max) { h *= max / w; w = max } } else { if (h > max) { w *= max / h; h = max } }
              c.width = w; c.height = h;
              c.getContext('2d').drawImage(img, 0, 0, w, h);
              photos.push(c.toDataURL('image/jpeg', 0.6));
              res();
            };
            img.src = reader.result;
          };
          reader.readAsDataURL(f);
        });
      }
      await fetch(`https://craftsure-1.onrender.com/api/escrow/upload/${selected._id}/${stage}`, {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ photos })
      });
      alert(`${stage} evidence uploaded! Client will approve and pay!`);
      window.location.reload();
    };
    input.click();
  };

  const approve = async (stage) => {
    if (!confirm(`Approve ${stage}? Money will be marked as PAID to artisan (mock, no real Paystack yet)!`)) return;
    const res = await fetch(`https://craftsure-1.onrender.com/api/escrow/approve/${selected._id}/${stage}`, { method: 'POST' });
    const data = await res.json();
    alert(data.message || `${stage} Paid!`);
    window.location.reload();
  };

  if (selected) {
    const isClient = true; // for demo both can approve/upload
    const isArtisan = true;
    return (
      <div style={{ padding: '15px', background: '#f5f7fb', minHeight: '100vh' }}>
        <button onClick={() => setSelected(null)} style={{ background: 'white', border: '1px solid #ccc', padding: '8px 12px', borderRadius: '8px' }}>← Back</button>
        <h3 style={{ marginTop: '15px' }}>{selected.jobTitle}</h3>
        <p style={{ fontSize: '13px' }}>{selected.clientName} → {selected.artisanName} | {selected.overallStatus}</p>

        <div style={{ background: '#fffbeb', padding: '12px', borderRadius: '10px', marginTop: '10px', border: '1px solid #f59e0b' }}>
          <b style={{ fontSize: '13px' }}>💰 Fee Breakdown (CraftSure Safe Escrow - 15% total):</b><br />
          <span style={{ fontSize: '12px' }}>Artisan Price: ₦{selected.artisanPrice || selected.totalAmount}</span><br />
          <span style={{ fontSize: '12px' }}>Client Safety Fee (5%): ₦{selected.clientFee} - Paystack protection</span><br />
          <span style={{ fontSize: '12px' }}>Artisan Platform Fee (10%): ₦{selected.artisanFee}</span><br />
          <span style={{ fontSize: '13px' }}>You Pay Total: <b>₦{selected.totalPaidByClient}</b></span><br />
          <span style={{ fontSize: '13px' }}>Artisan Gets: <b>₦{selected.totalReceivedByArtisan}</b></span><br />
          <span style={{ fontSize: '12px', color: '#5a31f5', fontWeight:'bold' }}>CraftSure Profit: ₦{selected.craftsureProfit} 🔥</span>
        </div>

        {['m35', 'm75', 'm100'].map(stage => {
          const m = selected[stage];
          if (!m) return null;
          const label = stage === 'm35'? '35% Foundation/Start' : stage === 'm75'? '75% Plastering/Roofing' : '100% Final Completion';
          const artisanAmt = m.artisanAmount || (selected.totalReceivedByArtisan * m.percent / 100);
          return (
            <div key={stage} style={{ background: 'white', padding: '15px', borderRadius: '12px', marginTop: '12px', borderLeft: `5px solid ${m.status === 'paid'? '#22c55e' : m.status === 'uploaded'? '#f59e0b' : '#ccc'}` }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap:'wrap', gap:'6px' }}>
                <b>{label} - {m.percent}%</b>
                <span style={{ fontSize: '12px', background: m.status === 'paid'? '#dcfce7' : m.status === 'uploaded'? '#fef3c7' : '#eee', padding: '4px 8px', borderRadius: '6px' }}>{m.status.toUpperCase()}</span>
              </div>
              <div style={{ fontSize: '12px', marginTop: '4px' }}>Artisan gets: ₦{artisanAmt?.toFixed(0)} | CraftSure: ₦{m.craftsureAmount?.toFixed(0)}</div>

              {m.evidencePhotos?.length > 0 && (
                <div style={{ display: 'flex', gap: '8px', marginTop: '10px', overflowX: 'auto' }}>
                  {m.evidencePhotos.map((p, i) => <img key={i} src={p} style={{ width: '100px', height: '100px', objectFit: 'cover', borderRadius: '8px' }} />)}
                </div>
              )}

              <div style={{ marginTop: '10px', display: 'flex', gap: '8px', flexWrap:'wrap' }}>
                {m.status === 'pending' && <button onClick={() => uploadEvidence(stage)} style={{ background: '#5a31f5', color: 'white', border: 'none', padding: '10px 14px', borderRadius: '8px', fontWeight: 'bold' }}>📸 Artisan: Upload {stage} Evidence</button>}
                {m.status === 'uploaded' && <><span style={{ color: '#f59e0b', fontSize: '13px' }}>⏳ Waiting approval</span> <button onClick={() => approve(stage)} style={{ background: '#22c55e', color: 'white', border: 'none', padding: '10px 14px', borderRadius: '8px', fontWeight: 'bold' }}>✅ Client: Approve & Pay {m.percent}%</button></>}
                {m.status === 'paid' && <span style={{ color: '#22c55e', fontWeight:'bold' }}>✅ Paid ₦{artisanAmt?.toFixed(0)} to artisan!</span>}
              </div>
            </div>
          );
        })}
      </div>
    );
  }

  return (
    <div style={{ padding: '15px', background: '#f5f7fb', minHeight: '100vh' }}>
      <h2 style={{ color: '#111' }}>My Escrow Jobs - {jobs.length}</h2>
      <p style={{ fontSize: '13px', color: '#666' }}>Client pays 100% to Paystack, released 35% → 75% → 100% after photo evidence | CraftSure takes 5% client + 10% artisan = 15%</p>
      <div style={{ display: 'grid', gap: '12px', marginTop: '15px' }}>
        {jobs.map(j => (
          <div key={j._id} onClick={() => setSelected(j)} style={{ background: 'white', padding: '14px', borderRadius: '12px', cursor: 'pointer', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
            <b>{j.jobTitle}</b> - ₦{j.totalAmount || j.artisanPrice}<br />
            <span style={{ fontSize: '12px' }}>{j.clientName} → {j.artisanName}</span><br />
            <span style={{ fontSize: '11px', color: '#5a31f5' }}>m35:{j.m35?.status} | m75:{j.m75?.status} | m100:{j.m100?.status} | Profit: ₦{j.craftsureProfit}</span>
          </div>
        ))}
        {jobs.length === 0 && <div style={{ background:'white', padding:'20px', borderRadius:'12px', textAlign:'center' }}><p>No escrow jobs yet.</p><p style={{ fontSize:'12px' }}>Go to Jobs → Tap "Hire with Escrow 💰" to test! It will create a job with fee breakdown!</p></div>}
      </div>
    </div>
  );
            }
