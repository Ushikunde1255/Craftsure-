import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export default function Escrow() {
  const [jobs, setJobs] = useState([]);
  const [selected, setSelected] = useState(null);
  const user = JSON.parse(localStorage.getItem('user') || 'null');

  useEffect(()=>{
    if(!user) return;
    fetch(`https://craftsure-1.onrender.com/api/escrow/my/${user._id}`)
     .then(r=>r.json()).then(setJobs);
  },[]);

  const uploadEvidence = async (stage) => {
    const input = document.createElement('input');
    input.type='file'; input.accept='image/*'; input.multiple=true;
    input.onchange = async (e)=>{
      const files = Array.from(e.target.files);
      // compress like your other pages
      const photos = [];
      for(let f of files){
        const reader = new FileReader();
        await new Promise(res=>{
          reader.onload=()=>{
            const img=new Image();
            img.onload=()=>{
              const c=document.createElement('canvas');
              const max=800; let w=img.width, h=img.height;
              if(w>h){ if(w>max){h*=max/w; w=max} } else { if(h>max){w*=max/h; h=max} }
              c.width=w; c.height=h;
              c.getContext('2d').drawImage(img,0,0,w,h);
              photos.push(c.toDataURL('image/jpeg',0.6));
              res();
            };
            img.src=reader.result;
          };
          reader.readAsDataURL(f);
        });
      }
      await fetch(`https://craftsure-1.onrender.com/api/escrow/upload/${selected._id}/${stage}`,{
        method:'POST', headers:{'Content-Type':'application/json'},
        body: JSON.stringify({ photos })
      });
      alert(`${stage} evidence uploaded! Client will approve`);
      window.location.reload();
    };
    input.click();
  };

  const approve = async (stage)=>{
    if(!confirm(`Approve ${stage} payment? Money will go to artisan!`)) return;
    const res = await fetch(`https://craftsure-1.onrender.com/api/escrow/approve/${selected._id}/${stage}`,{method:'POST'});
    const data = await res.json();
    alert(data.message);
    window.location.reload();
  };

  if(selected){
    const isClient = selected.clientId.toString() === user._id.toString() || selected.clientName === user.name;
    const isArtisan = selected.artisanId.toString() === user._id.toString() || selected.artisanName === user.name;
    return (
      <div style={{ padding:'15px', background:'#f5f7fb', minHeight:'100vh' }}>
        <button onClick={()=>setSelected(null)} style={{ background:'white', border:'1px solid #ccc', padding:'8px 12px', borderRadius:'8px' }}>← Back</button>
        <h3 style={{ marginTop:'15px' }}>{selected.jobTitle} - ₦{selected.totalAmount}</h3>
        <p style={{ fontSize:'13px' }}>{selected.clientName} → {selected.artisanName} | {selected.overallStatus}</p>

        {['m35','m75','m100'].map(stage=>{
          const m = selected[stage];
          const label = stage==='m35'?'35% Foundation': stage==='m75'?'75% Plastering/Roofing':'100% Final Completion';
          return (
            <div key={stage} style={{ background:'white', padding:'15px', borderRadius:'12px', marginTop:'12px', borderLeft:`5px solid ${m.status==='paid'?'#22c55e': m.status==='uploaded'?'#f59e0b':'#ccc'}` }}>
              <div style={{ display:'flex', justifyContent:'space-between' }}>
                <b>{label} - {m.percent}% = ₦{(selected.totalAmount * m.percent/100 *0.9).toFixed(0)}</b>
                <span style={{ fontSize:'12px', background: m.status==='paid'?'#dcfce7': m.status==='uploaded'?'#fef3c7':'#eee', padding:'4px 8px', borderRadius:'6px' }}>{m.status.toUpperCase()}</span>
              </div>

              {m.evidencePhotos?.length>0 && (
                <div style={{ display:'flex', gap:'8px', marginTop:'10px', overflowX:'auto' }}>
                  {m.evidencePhotos.map((p,i)=><img key={i} src={p} style={{ width:'100px', height:'100px', objectFit:'cover', borderRadius:'8px' }} />)}
                </div>
              )}

              <div style={{ marginTop:'10px', display:'flex', gap:'8px' }}>
                {isArtisan && m.status==='pending' && <button onClick={()=>uploadEvidence(stage)} style={{ background:'#5a31f5', color:'white', border:'none', padding:'10px 14px', borderRadius:'8px', fontWeight:'bold' }}>📸 Upload {stage} Evidence</button>}
                {isArtisan && m.status==='uploaded' && <span style={{ color:'#f59e0b', fontSize:'13px' }}>⏳ Waiting for client approval</span>}
                {isClient && m.status==='uploaded' && <button onClick={()=>approve(stage)} style={{ background:'#22c55e', color:'white', border:'none', padding:'10px 14px', borderRadius:'8px', fontWeight:'bold' }}>✅ Approve & Pay {m.percent}%</button>}
                {m.status==='paid' && <span style={{ color:'#22c55e' }}>✅ Paid to artisan!</span>}
              </div>
            </div>
          );
        })}
      </div>
    );
  }

  return (
    <div style={{ padding:'15px', background:'#f5f7fb', minHeight:'100vh' }}>
      <h2>My Escrow Jobs - {jobs.length}</h2>
      <p style={{ fontSize:'13px', color:'#666' }}>Client pays 100% to Paystack, released 35% → 75% → 100% after photo evidence</p>
      <div style={{ display:'grid', gap:'12px', marginTop:'15px' }}>
        {jobs.map(j=>(
          <div key={j._id} onClick={()=>setSelected(j)} style={{ background:'white', padding:'14px', borderRadius:'12px', cursor:'pointer' }}>
            <b>{j.jobTitle}</b> - ₦{j.totalAmount}<br/>
            <span style={{ fontSize:'12px' }}>{j.clientName} → {j.artisanName}</span><br/>
            <span style={{ fontSize:'11px', color:'#5a31f5' }}>m35:{j.m35.status} | m75:{j.m75.status} | m100:{j.m100.status}</span>
          </div>
        ))}
        {jobs.length===0 && <p>No escrow jobs yet. When client hires you, it will appear here!</p>}
      </div>
    </div>
  );
    }
