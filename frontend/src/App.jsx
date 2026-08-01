import { useState, useEffect } from "react";
export default function App(){
const [tab,setTab]=useState("home");
const [showLogin,setShowLogin]=useState(false);
const [isReg,setIsReg]=useState(false);
const [view,setView]=useState(null);
const [chat,setChat]=useState(null);
const [msg,setMsg]=useState("");
const [jobs,setJobs]=useState([{id:1,title:"Tile my 3 bedroom",loc:"Ojo",budget:"₦80k"}]);
const [chats,setChats]=useState({});
const artisans=[{id:1,name:"Tunde Tiler",role:"Tiler • Ojo",rate:"5 • 47 jobs",gold:true},{id:2,name:"Musa Carpenter",role:"Carpenter • Onireke",rate:"4.9 • 32 jobs",gold:false}];
const send=()=>{if(!msg.trim())return;setChats(p=>({...p,[chat.id]:[...(p[chat.id]||[]),{me:true,t:msg}]}));setMsg(""); setTimeout(()=>setChats(p=>({...p,[chat.id]:[...(p[chat.id]||[]),{me:false,t:"Oga I dey available! 🔧"}]})),800) };
return(
<div style={{background:'#f5f5f5',minHeight:'100vh',fontFamily:'sans-serif',paddingBottom:'60px'}}>
<div style={{background:'#4338ca',color:'#fff',padding:'12px',display:'flex',justifyContent:'space-between'}}>
<b>CraftSure 🇳🇬</b>
<div style={{display:'flex',gap:'6px'}}>
<button onClick={()=>setTab("home")} style={{background:'#7c3aed',color:'#fff',border:'none',padding:'5px 10px',borderRadius:'8px',fontSize:'11px'}}>Home</button>
<button onClick={()=>setTab("jobs")} style={{background:'#22c55e',color:'#fff',border:'none',padding:'5px 10px',borderRadius:'8px',fontSize:'11px'}}>Jobs</button>
<button onClick={()=>setTab("admin")} style={{background:'#f59e0b',color:'#fff',border:'none',padding:'5px 10px',borderRadius:'8px',fontSize:'11px'}}>Admin</button>
<button onClick={()=>setShowLogin(true)} style={{background:'#fff',color:'#4338ca',border:'none',padding:'5px 10px',borderRadius:'12px',fontSize:'11px',fontWeight:'bold'}}>Login</button>
</div>
</div>

{tab==="home"&&<>
<h2 style={{padding:'15px 15px 0',margin:0}}>Craftsure NG 🔒</h2>
<p style={{padding:'0 15px',margin:'0 0 10px',fontSize:'12px',color:'#666'}}>Escrow • Pay only when job done</p>
<div style={{margin:'15px',padding:'16px',borderRadius:'12px',background:'linear-gradient(90deg,#fde047,#fb923c)',display:'flex',justifyContent:'space-between'}}>
<div><span style={{background:'black',color:'#fff',fontSize:'8px',padding:'2px 6px',borderRadius:'6px'}}>AD • SPONSORED</span><div style={{fontWeight:'bold',marginTop:'4px'}}>Need Building Materials? 🏗️</div><div style={{fontSize:'11px'}}>10% off — CRAFTSURE10</div></div>
<button style={{background:'black',color:'#fff',border:'none',padding:'8px 12px',borderRadius:'15px',fontSize:'11px'}}>Shop Now</button>
</div>
<div style={{padding:'0 15px',display:'flex',justifyContent:'space-between'}}><b>Artisans</b><button onClick={()=>setTab("jobs")} style={{background:'#4338ca',color:'#fff',border:'none',padding:'5px 10px',borderRadius:'6px',fontSize:'11px'}}>+ Post Job</button></div>
{artisans.map(a=><div key={a.id} style={{margin:'8px 15px',background:'#fff',padding:'12px',borderRadius:'10px',border:a.gold?'2px solid gold':'1px solid #eee'}}>
<b>{a.name} {a.gold&&<span style={{background:'gold',fontSize:'8px',padding:'2px 5px',borderRadius:'4px'}}>SPONSORED</span>}</b><br/><small>{a.role} • ⭐ {a.rate}</small>
<div style={{marginTop:'8px',display:'flex',gap:'6px'}}><button onClick={()=>setView(a)} style={{flex:1,padding:'6px',background:'#eee',border:'none',borderRadius:'6px',fontSize:'11px'}}>Portfolio</button><button onClick={()=>setChat(a)} style={{flex:1,padding:'6px',background:'#e0e7ff',border:'none',borderRadius:'6px',fontSize:'11px',color:'#4338ca',fontWeight:'bold'}}>💬 Chat</button><button style={{flex:1,padding:'6px',background:'black',color:'#fff',border:'none',borderRadius:'6px',fontSize:'11px'}}>Hire</button></div>
</div>)}
</>}

{tab==="jobs"&&<div style={{padding:'15px'}}><h3>Jobs</h3>{jobs.map(j=><div key={j.id} style={{background:'#fff',padding:'12px',borderRadius:'8px',marginBottom:'8px'}}><b>{j.title}</b><br/><small>{j.loc} • {j.budget}</small></div>)}<button onClick={()=>{const t=prompt("Job title?"); if(t) setJobs([{id:Date.now(),title:t,loc:"Lagos",budget:"₦50k"},...jobs])}} style={{width:'100%',padding:'12px',background:'#4338ca',color:'#fff',border:'none',borderRadius:'8px',fontWeight:'bold'}}>+ Post New Job</button></div>}

{tab==="admin"&&<div style={{padding:'15px'}}><h3>Admin Dashboard 📊</h3><div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'10px'}}><div style={{background:'#fff',padding:'15px',borderRadius:'10px',textAlign:'center'}}><h2 style={{margin:0,color:'#4338ca'}}>{artisans.length}</h2><small>Artisans</small></div><div style={{background:'#fff',padding:'15px',borderRadius:'10px',textAlign:'center'}}><h2 style={{margin:0,color:'#22c55e'}}>{jobs.length}</h2><small>Jobs</small></div></div><div style={{background:'#fff',marginTop:'12px',padding:'12px',borderRadius:'10px'}}><b>Sponsored Revenue</b><br/><small>Tunde: ₦2k/mo ✅ | Dangote Ad: ₦5k</small></div></div>}

{showLogin&&<div style={{position:'fixed',top:0,left:0,right:0,bottom:0,background:'rgba(0,0,0,0.6)',zIndex:99,padding:'20px'}}><div style={{background:'#fff',padding:'20px',borderRadius:'12px',maxWidth:'320px',margin:'40px auto'}}><div style={{display:'flex',justifyContent:'space-between'}}><h3 style={{margin:0}}>{isReg?"Register":"Login"}</h3><button onClick={()=>setShowLogin(false)} style={{border:'none',background:'#eee',width:'28px',height:'28px',borderRadius:'50%'}}>X</button></div><input placeholder="Phone" style={{width:'100%',padding:'10px',marginTop:'10px',borderRadius:'8px',border:'1px solid #ddd',boxSizing:'border-box'}}/><input placeholder="Password" type="password" style={{width:'100%',padding:'10px',marginTop:'8px',borderRadius:'8px',border:'1px solid #ddd',boxSizing:'border-box'}}/>{isReg&&<select style={{width:'100%',padding:'10px',marginTop:'8px',borderRadius:'8px'}}><option>Client</option><option>Artisan</option></select>}<button onClick={()=>setShowLogin(false)} style={{width:'100%',marginTop:'10px',padding:'10px',background:'#4338ca',color:'#fff',border:'none',borderRadius:'8px',fontWeight:'bold'}}>{isReg?"Create Account":"Login"}</button><div style={{textAlign:'center',marginTop:'10px',fontSize:'12px'}}><span onClick={()=>setIsReg(!isReg)} style={{color:'#4338ca',fontWeight:'bold'}}>{isReg?"Have account? Login":"No account? Register"}</span></div></div></div>}

{view&&<div style={{position:'fixed',top:0,left:0,right:0,bottom:0,background:'rgba(0,0,0,0.7)',zIndex:80,padding:'15px'}}><div style={{background:'#fff',padding:'15px',borderRadius:'12px',maxWidth:'350px',margin:'20px auto'}}><div style={{display:'flex',justifyContent:'space-between'}}><b>{view.name} Portfolio</b><button onClick={()=>setView(null)} style={{border:'none',background:'#eee',width:'28px',height:'28px',borderRadius:'50%'}}>X</button></div><div style={{background:'#ddd',height:'80px',borderRadius:'8px',marginTop:'10px',display:'flex',alignItems:'center',justifyContent:'center'}}>🛠️ Before/After</div><p style={{fontSize:'12px'}}>Kitchen Tiles - Lekki ✅ ⭐⭐⭐⭐⭐</p><button onClick={()=>{setChat(view); setView(null)}} style={{width:'100%',padding:'10px',background:'#4338ca',color:'#fff',border:'none',borderRadius:'8px'}}>💬 Chat to Hire</button></div></div>}

{chat&&<div style={{position:'fixed',top:0,left:0,right:0,bottom:0,background:'#fff',zIndex:90,display:'flex',flexDirection:'column'}}><div style={{background:'#4338ca',color:'#fff',padding:'12px',display:'flex',justifyContent:'space-between'}}><b>💬 {chat.name}</b><button onClick={()=>setChat(null)} style={{background:'rgba(255,255,255,0.2)',color:'#fff',border:'none',width:'28px',height:'28px',borderRadius:'50%'}}>X</button></div><div style={{flex:1,padding:'12px',overflowY:'auto',background:'#f9fafb'}}>{(chats[chat.id]||[]).map((m,i)=><div key={i} style={{display:'flex',justifyContent:m.me?'flex-end':'flex-start',marginBottom:'8px'}}><div style={{background:m.me?'#4338ca':'#fff',color:m.me?'#fff':'#000',padding:'8px 12px',borderRadius:'14px',fontSize:'12px',maxWidth:'75%'}}>{m.t}</div></div>)}</div><div style={{display:'flex',gap:'6px',padding:'10px',borderTop:'1px solid #eee'}}><input value={msg} onChange={e=>setMsg(e.target.value)} onKeyDown={e=>e.key==='Enter'&&send()} placeholder="Message..." style={{flex:1,padding:'10px',borderRadius:'20px',border:'1px solid #ddd'}}/><button onClick={send} style={{background:'#4338ca',color:'#fff',border:'none',padding:'0 16px',borderRadius:'20px'}}>Send</button></div></div>}

</div>
)
                                                                                     }
