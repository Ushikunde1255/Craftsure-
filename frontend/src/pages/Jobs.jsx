import { useState, useEffect } from 'react';
const API_URL = 'https://craftsure-1.onrender.com/api';

export default function Jobs() {
  const [jobs, setJobs] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [budget, setBudget] = useState('');
  const [location, setLocation] = useState('Makurdi, Benue');
  const [category, setCategory] = useState('Plumbing');
  const [customCategory, setCustomCategory] = useState('');
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState('');
  const [loading, setLoading] = useState(false);

  const fetchJobs = async () => {
    const res = await fetch(`${API_URL}/jobs`);
    const data = await res.json();
    setJobs(Array.isArray(data) ? data : data.jobs || []);
  };
  useEffect(() => { fetchJobs(); }, []);

  const handleImage = (e) => {
    const file = e.target.files[0];
    if(file){ setImage(file); setPreview(URL.createObjectURL(file)); }
  };

  const handlePostJob = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    if(!token){ alert('Login first!'); return; }
    const finalCategory = category==='Other'?customCategory.trim():category;
    setLoading(true);
    try{
      let imageUrl='';
      if(image){
        const form = new FormData(); form.append('image', image);
        const upRes = await fetch(`${API_URL}/upload`, { method:'POST', headers:{'x-auth-token':token,'Authorization':`Bearer ${token}`}, body:form });
        const upData = await upRes.json();
        console.log('Upload result:', upData);
        if(upRes.ok) imageUrl = upData.url; else alert('Photo upload failed: ' + upData.msg);
      }
      const res = await fetch(`${API_URL}/jobs`, { method:'POST', headers:{'Content-Type':'application/json','x-auth-token':token,'Authorization':`Bearer ${token}`}, body: JSON.stringify({title:title.trim(),description:description.trim(),budget:Number(budget),location,category:finalCategory,image:imageUrl}) });
      const data = await res.json();
      if(res.ok){ alert('Job posted with photo! ✅'); setTitle(''); setDescription(''); setBudget(''); setImage(null); setPreview(''); fetchJobs(); }
      else alert(data.msg);
    }catch(err){ alert(err.message); } finally{ setLoading(false); }
  };

  return(
    <div style={{padding:'20px',maxWidth:'800px',margin:'0 auto'}}>
      <h1>Jobs - Nigeria</h1>
      <div style={{border:'1px solid #ddd',padding:'20px',borderRadius:'10px',background:'#f9f9ff'}}>
        <h2>Post Job + Photo</h2>
        <form onSubmit={handlePostJob}>
          <input type="text" placeholder="Job Title" value={title} onChange={e=>setTitle(e.target.value)} style={{width:'100%',padding:'12px',margin:'8px 0',borderRadius:'6px',border:'1px solid #ccc'}} required />
          <select value={category} onChange={e=>setCategory(e.target.value)} style={{width:'100%',padding:'12px',margin:'8px 0',borderRadius:'6px',fontWeight:'bold'}}>
            <option>Plumbing</option><option>Electrical</option><option>Carpentry</option><option>Bricklaying</option><option>Other</option>
          </select>
          {category==='Other' && <input type="text" placeholder="Type your job..." value={customCategory} onChange={e=>setCustomCategory(e.target.value)} style={{width:'100%',padding:'12px',margin:'8px 0',borderRadius:'6px',border:'2px solid #5a31f5'}} required />}
          <input type="text" placeholder="Location" value={location} onChange={e=>setLocation(e.target.value)} style={{width:'100%',padding:'12px',margin:'8px 0',borderRadius:'6px',border:'1px solid #ccc'}} />
          <input type="number" placeholder="Budget Naira" value={budget} onChange={e=>setBudget(e.target.value)} style={{width:'100%',padding:'12px',margin:'8px 0',borderRadius:'6px',border:'1px solid #ccc'}} required />
          <label style={{display:'block',padding:'12px',border:'2px dashed #5a31f5',borderRadius:'8px',textAlign:'center',margin:'8px 0',cursor:'pointer',background:'white'}}>
            📷 {preview?'Change Photo':'Add Photo - Tap to pick house image'} 
            <input type="file" accept="image/*" onChange={handleImage} style={{display:'none'}} />
          </label>
          {preview && <img src={preview} alt="preview" style={{width:'100%',height:'200px',objectFit:'cover',borderRadius:'8px',marginBottom:'8px'}} />}
          <textarea placeholder="Describe work..." value={description} onChange={e=>setDescription(e.target.value)} rows="3" style={{width:'100%',padding:'12px',margin:'8px 0',borderRadius:'6px',border:'1px solid #ccc'}} required />
          <button type="submit" disabled={loading} style={{width:'100%',padding:'14px',background:'#5a31f5',color:'white',border:'none',borderRadius:'8px',fontWeight:'bold'}}>{loading?'Uploading Photo...':`Post Job - ₦${budget||'0'}`}</button>
        </form>
      </div>
      <div style={{marginTop:'30px'}}>
        <h2>All Jobs ({jobs.length})</h2>
        {jobs.map(job=>(
  <div key={job._id} style={{background:'white',borderRadius:'12px',marginBottom:'15px',overflow:'hidden',boxShadow:'0 2px 6px rgba(0,0,0,0.1)',border:'1px solid #eee'}}>
    {/* PHOTO SHOW HERE */}
    {(job.photoUrl || job.image) && (
      <img 
        src={job.photoUrl || job.image} 
        alt={job.category}
        style={{width:'100%',height:'200px',objectFit:'cover',display:'block'}} 
        onError={(e)=> e.target.style.display='none'}
      />
    )}
    <div style={{padding:'15px'}}>
      <h3 style={{margin:'0 0 5px 0'}}>{job.category || job.title} - ₦{Number(job.budget || 0).toLocaleString()}</h3>
      <p style={{fontSize:'14px',margin:'8px 0'}}>{job.description}</p>
      <p style={{color:'#5a31f5',fontWeight:'bold',fontSize:'13px'}}>
        ₦{Number(job.budget).toLocaleString()} - {job.customerName || 'School owner'} - {job.location}
      </p>
      <button style={{width:'100%',padding:'12px',background:'#00aa00',color:'white',border:'none',borderRadius:'8px',marginTop:'10px',fontWeight:'bold'}}>
        🔨 Apply For This Job
      </button>
    </div>
  </div>
))}
