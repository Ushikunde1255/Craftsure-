import { useEffect, useState } from 'react'
import api from '../api.js'
export default function Jobs(){
 const [jobs,setJobs]=useState([])
 const [title,setTitle]=useState('')
 const [budget,setBudget]=useState('')
 const [desc,setDesc]=useState('')
 const load=()=>api.get('/jobs').then(r=>setJobs(r.data.jobs||r.data||[]))
 useEffect(()=>{load()},[])
 const postJob=async(e)=>{
  e.preventDefault()
  try{
    await api.post('/jobs',{title,description:desc,budget:Number(budget),category:'general',location:'Lagos, Nigeria'})
    alert('Job posted!')
    setTitle('');setBudget('');setDesc('')
    load()
  }catch(err){alert(err.response?.data?.message||err.message)}
 }
 return <div style={{padding:'20px',maxWidth:'800px',margin:'0 auto'}}><h2>Jobs - Nigeria Marketplace</h2><form onSubmit={postJob} style={{background:'white',padding:'20px',borderRadius:'12px',display:'flex',flexDirection:'column',gap:'10px'}}><h3>Post New Job</h3><input placeholder="Title e.g. Fix my sink" value={title} onChange={e=>setTitle(e.target.value)} style={{padding:'10px'}}/><input placeholder="Budget in Naira e.g. 5000" value={budget} onChange={e=>setBudget(e.target.value)} style={{padding:'10px'}}/><textarea placeholder="Description" value={desc} onChange={e=>setDesc(e.target.value)} style={{padding:'10px'}}/><button style={{background:'#7c3aed',color:'white',padding:'10px',borderRadius:'8px',border:'none'}} type="submit">Post Job</button></form><div style={{marginTop:'20px'}}>{jobs.map(j=><div key={j._id||Math.random()} style={{background:'white',padding:'15px',margin:'10px 0',borderRadius:'8px'}}><b>{j.title}</b><p>{j.description}</p><p>N{j.budget} - {j.location||'Nigeria'}</p></div>)}</div></div>
}
