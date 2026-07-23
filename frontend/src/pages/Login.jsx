import { useState } from 'react'
import api from '../api.js'
export default function Login(){
 const [email,setEmail]=useState('')
 const [password,setPassword]=useState('')
 const [msg,setMsg]=useState('')
 const submit=async(e)=>{
  e.preventDefault()
  try{
    const r=await api.post('/auth/login',{email,password})
    localStorage.setItem('token',r.data.token)
    setMsg('Login success! Go to Dashboard')
  }catch(err){ setMsg(err.response?.data?.message || err.message) }
 }
 return <div style={{padding:'30px',maxWidth:'400px',margin:'40px auto',background:'white',borderRadius:'12px'}}><h2>Login</h2><form onSubmit={submit} style={{display:'flex',flexDirection:'column',gap:'10px'}}><input placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} style={{padding:'10px'}}/><input placeholder="Password" type="password" value={password} onChange={e=>setPassword(e.target.value)} style={{padding:'10px'}}/><button style={{background:'#7c3aed',color:'white',padding:'10px',borderRadius:'8px',border:'none'}} type="submit">Login</button></form><p>{msg}</p></div>
}
