import { useState, useEffect, useRef } from 'react';
const API_URL = 'https://craftsure-1.onrender.com/api';

export default function Jobs(){
  const [jobs,setJobs]=useState([]);
  const [category,setCategory]=useState('Plumbing');
  const [location,setLocation]=useState('Makurdi, Benue');
  const [budget,setBudget]=useState('');
  const [desc,setDesc]=useState('');
  const [photo,setPhoto]=useState(null);
  const [preview,setPreview]=useState('');
  const fileRef = useRef(null);

  const fetchJobs = async()=>{
    try{
      const res = await fetch(`${API_URL}/jobs`);
      const data = await res.json();
      setJobs(data.reverse());
    }catch(e){}
  };
  useEffect(()=>{fetchJobs()},[]);

  const handlePhoto = (e)=>{
    const file = e.target.files[0];
    if(file){
      setPhoto(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const postJob = async(e)=>{
    e.preventDefault();
    if(!desc || desc.length < 20) return alert('Describe work well, at least 20 chars! Real jobs only!');
    if(!budget || Number(budget) < 1000) return alert('Budget must be at least ₦1,000!');
    if(!photo) return alert('Add photo! Real jobs need photo proof!');

    const form = new FormData();
    form.append('category', category);
    form.append('title', category);
    form.append('location', location);
    form.append('budget', budget);
    form.append('description', desc);
    form.append('photo', photo); // <-- MUST be 'photo'

    const token = localStorage.getItem('token');
    if(!token) return alert('Please login again');

    try{
      const res = await fetch(`${API_URL}/jobs`,{
        method:'POST',
        headers:{Authorization: token},
        body: form
      });
      const data = await res.json();
      if(res.ok){
        alert('✅ Job with photo posted!');
        setDesc(''); setBudget(''); setPhoto(null); setPreview('');
        fetchJobs();
      } else alert(data.msg);
    }catch(err){ alert('Network error: '+err.message) }
  };

  return(
    <div style={{maxWidth:'600px',margin:'0 auto',padding:'15px'}}>
      <div style={{background:'white',padding:'20px',borderRadius:'12px'}}>
        <h3>📢 Post a Real Job (Open for All)</h3>
        <form onSubmit={postJob}>
          <select value={category} onChange={e=>setCategory(e.target.value)} style={{width:'100%',padding:'12px',margin:'8px 0'}}>
            <option>Plumbing</option><option>Electrical</option><option>Carpentry</option><option>Tailoring</option><option>Hair Dressing</option><option>Masonry</option><option>Teaching</option><option>Other</option>
          </select>
          <input value={location} onChange={e=>setLocation(e.target.value)} style={{width:'100%',padding:'12px',margin:'8px 0'}} placeholder="Makurdi, Benue" required />
          <input type="number" value={budget} onChange={e=>setBudget(e.target.value)} style={{width:'100%',padding:'12px',margin:'8px 0'}} placeholder="Budget Naira - Min 1000" required />

          <input type="file" ref={fileRef} accept="image/*" onChange={handlePhoto} style={{display:'none'}} />
          <div onClick={()=>fileRef.current.click()} style={{border:'2px dashed #5a31f5',padding:'20px',textAlign:'center',borderRadius:'8px',margin:'10px 0',cursor:'pointer',background: preview ? '#f0f0ff' : 'white'}}>
            {preview ? <img src={preview} style={{width:'100%',maxHeight:'200px',objectFit:'cover',borderRadius:'8px'}} /> : '📷 Tap to pick photo - REQUIRED'}
            <p style={{margin:'5px 0 0 0',fontSize:'12px'}}>{photo ? photo.name : 'Tap here to add house/hairstyle image'}</p>
          </div>

          <textarea value={desc} onChange={e=>setDesc(e.target.value)} style={{width:'100%',padding:'12px',height:'100px'}} placeholder="Describe work... at least 20 chars. Real jobs only!" required></textarea>
          <button type="submit" style={{width:'100%',padding:'14px',background:'#5a31f5',color:'white',border:'none',borderRadius:'8px',fontWeight:'bold',marginTop:'10px'}}>Post Job {budget? `- ₦${Number(budget).toLocaleString()}` : '- ₦0'}</button>
        </form>
      </div>

      <h2 style={{margin:'20px 0'}}>All Jobs ({jobs.length})</h2>
      {jobs.map(job=>(
        <div key={job._id} style={{background:'white',borderRadius:'12px',marginBottom:'15px',overflow:'hidden',boxShadow:'0 2px 6px rgba(0,0,0,0.1)'}}>
          {(job.photoUrl || job.image) ? (
            <img src={job.photoUrl || job.image} alt="job" style={{width:'100%',height:'220px',objectFit:'cover'}} />
          ) : (
            <div style={{background:'#eee',height:'50px',display:'flex',alignItems:'center',justifyContent:'center',color:'#999',fontSize:'12px'}}>No photo - Old job</div>
          )}
          <div style={{padding:'15px'}}>
            <h3 style={{margin:0}}>{job.category || job.title}</h3>
            <p style={{fontSize:'14px',margin:'8px 0'}}>{job.description}</p>
            <p style={{color:'#5a31f5',fontWeight:'bold'}}>₦{Number(job.budget).toLocaleString()} - {job.customerName} - {job.location}</p>
          </div>
        </div>
      ))}
    </div>
  );
            }
