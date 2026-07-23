import { useState } from 'react'
import api from '../api.js'
export default function Register(){
 const [form,setForm]=useState({name:'',email:'',password:'',role:'client'})
 const [msg,setMsg]=useState('')
 const submit=async(e)=>{
  e.preventDefault()
  try{
    await api.post('/auth/register',form)
    setMsg('Registered! Now go Login')
  }catch(err){ setMsg(err.response?.data?.message || err.message) }
 }
 return <div style={{padding:'30px',maxWidth:'400px',margin:'40px auto',background:'white',borderRadius:'12px'}}><h2>Register - Nigeria Only</h2><form onSubmit={submit} style={{display:'flex',flexDirection:'column',gap:'10px'}}><input placeholder="Full Name" value={form.name} onChange={e=>setForm({...form,name:e.target.value})} style={{padding:'10px'}}/><input placeholder="Email" value={form.email} onChange={e=>setForm({...form,email:e.target.value})} style={{padding:'10px'}}/><input placeholder="Password" type="password" value={form.password} onChange={e=>setForm({...form,password:e.target.value})} style={{padding:'10px'}}/><select value={form.role} onChange={e=>setForm({...form,role:e.target.value})} style={{padding:'10px'}}><option value="client">Client</option><option value="artisan">Artisan</option></select><button style={{background:'#7c3aed',color:'white',padding:'10px',borderRadius:'8px',border:'none'}} type="submit">Register</button></form><p>{msg}</p></div>
}
