import { useEffect, useState } from 'react'
import api from '../api.js'
export default function Dashboard(){
 const [jobs,setJobs]=useState([])
 const [msg,setMsg]=useState('Loading...')
 useEffect(()=>{
  api.get('/jobs').then(r=>{setJobs(r.data.jobs||r.data||[]); setMsg('')}).catch(e=>setMsg(e.message))
 },[])
 return <div style={{padding:'20px'}}><h2>Dashboard</h2><p>{msg}</p>{jobs.map(j=><div key={j._id||j.id} style={{background:'white',padding:'15px',margin:'10px 0',borderRadius:'8px'}}><h4>{j.title}</h4><p>Budget: N{j.budget}</p><p>Status: {j.status}</p></div>)}</div>
}
