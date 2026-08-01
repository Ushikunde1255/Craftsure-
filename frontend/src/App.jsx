import { useState } from "react";
export default function App(){
const [tab,setTab]=useState("home");
const [showLogin,setShowLogin]=useState(false);
const [isReg,setIsReg]=useState(false);
const [view,setView]=useState(null);
const [chat,setChat]=useState(null);
const [adminChatView,setAdminChatView]=useState(null);
const [msg,setMsg]=useState("");
const [jobs,setJobs]=useState([{id:1,title:"Tile my 3 bedroom",loc:"Ojo",budget:"₦80k"}]);
const [chats,setChats]=useState({});
const artisans=[{id:1,name:"Tunde Tiler",role:"Tiler • Ojo",rate:"5 • 47 jobs",gold:true},{id:2,name:"Musa Carpenter",role:"Carpenter • Onireke",rate:"4.9 • 32 jobs",gold:false}];
const send=()=>{if(!msg.trim())return;setChats(p=>({...p,[chat.id]:[...(p[chat.id]||[]),{me:true,t:msg,time:new Date().toLocaleTimeString(),client:"You"}]}));setMsg(""); setTimeout(()=>setChats(p=>({...p,[chat.id]:[...(p[chat.id]||[]),{me:false,t:"Oga I dey available! When we start? 🔧",time:new Date().toLocaleTimeString(),client:"You"}]})),800)};
return(
<div style={{background:'#f5f5f5',minHeight:'100vh',fontFamily:'sans-serif',paddingBottom:'60px'}}>
<div style={{background:'#4338ca',color:'#fff',padding:'12px',display:'flex',justifyContent:'space-between',position:'sticky',top:0,zIndex:10}}>
<b>CraftSure 🇳🇬</b>
<div style={{display:'flex',gap:'5px'}}>
<button onClick={()=>setTab("home")} style={{background:'#7c3aed',color:'#fff',border:'none',padding:'5px 9px',borderRadius:'8px',fontSize:'10px'}}>Home</button>
<button onClick={()=>setTab("jobs")} style={{background:'#22c55e',color:'#fff',border:'none',padding:'5px 9px',borderRadius:'8px',fontSize:'10px'}}>Jobs</button>
<button onClick={()=>setTab("admin")} style={{background:'#f59e0b',color:'#fff',border:'none',padding:'5px 9px',borderRadius:'8px',fontSize:'10px'}}>Admin {Object.keys(chats).length>0&&`(${Object.values(chats).flat().length})`}</button>
<button onClick={()=>setShowLogin(true)} style={{background:'#fff',color:'#4338ca',border:'none',padding:'5px 9px',borderRadius:'12px',fontSize:'10px',fontWeight:'bold'}}>Login</button>
</div>
</div>

{tab==="home"&&<>
<h2 style={{padding:'12px 15px 0',margin:0,fontSize:'24px'}}>Craftsure NG 🔒</h2><p style={{padding:'0 15px',margin:'0 0 8px',fontSize:'11px',color:'#666'}}>Escrow 5% + 10% = 15% profit • Pay only when done</p>
<div style={{margin:'12px 15px',padding:'14px',borderRadius:'12px',background:'linear-gradient(90deg,#fde047,#fb923c)',display:'flex',justifyContent:'space-between'}}><div><span style={{background:'black',color:'#fff',fontSize:'7px',padding:'2px 5px',borderRadius:'6px'}}>AD</span><div style={{fontWeight:'bold',fontSize:'13px',marginTop:'3px'}}>Building Materials? 🏗️</div><div style={{fontSize:'10px'}}>10% off — CRAFTSURE10</div></div><button style={{background:'black',color:'#fff',border:'none',padding:'6px 10px',borderRadius:'12px',fontSize:'10px'}}>Shop Now</button></div>
<div style={{padding:'0 15px',display:'flex',justifyContent:'space-between'}}><b style={{fontSize:'13px'}}>Artisans</b><button onClick={()=>setTab("jobs")} style={{background:'#4338ca',color:'#fff',border:'none',padding:'4px 8px',borderRadius:'6px',fontSize:'10px'}}>+ Post Job</button></div>
{artisans.map(a=><div key={a.id} style={{margin:'8px 15px',background:'#fff',padding:'10px',borderRadius:'10px',border:a.gold?'2px solid gold':'1px solid #eee'}}><b style={{fontSize:'13px'}}>{a.name} {a.gold&&<span style={{background:'gold',fontSize:'7px',padding:'2px 4px',borderRadius:'4px'}}>SPONSORED</span>}</b><br/><small style={{fontSize:'10px'}}>{a.role} • ⭐ {a.rate}</small>{chats[a.id]&&<div style={{fontSize:'9px',color:'green',fontWeight:'bold'}}>💬 {chats[a.id].length} msgs (Monitored by Admin 🔍)</div>}<div style={{marginTop:'6px',display:'flex',gap:'5px'}}><button onClick={()=>setView(a)} style={{flex:1,padding:'6px',background:'#eee',border:'none',borderRadius:'6px',fontSize:'10px'}}>Portfolio</button><button onClick={()=>setChat(a)} style={{flex:1,padding:'6px',background:'#e0e7ff',border:'none',borderRadius:'6px',fontSize:'10px',color:'#4338ca',fontWeight:'bold'}}>Chat</button><button onClick={()=>setView(a)} style={{flex:1,padding:'6px',background:'black',color:'#fff',border:'none',borderRadius:'6px',fontSize:'10px'}}>Hire</button></div></div>)}
</>}

{tab==="jobs"&&<div style={{padding:'12px'}}><h3 style={{fontSize:'14px'}}>Post New Job — All Details Required</h3>
<div style={{background:'#fff',padding:'12px',borderRadius:'10px'}}>
<input id="jt" placeholder="Job Title e.g. Tile my kitchen" style={{width:'100%',padding:'9px',marginBottom:'6px',borderRadius:'6px',border:'1px solid #ddd',boxSizing:'border-box',fontSize:'12px'}}/>
<input id="jl" placeholder="Location e.g. Ojo, Lagos" style={{width:'100%',padding:'9px',marginBottom:'6px',borderRadius:'6px',border:'1px solid #ddd',boxSizing:'border-box',fontSize:'12px'}}/>
<input id="jb" placeholder="Budget e.g. ₦80,000" type="text" style={{width:'100%',padding:'9px',marginBottom:'6px',borderRadius:'6px',border:'1px solid #ddd',boxSizing:'border-box',fontSize:'12px'}}/>
<textarea id="jd" placeholder="Description — What exactly needs to be done? Materials? Size? Urgency?" style={{width:'100%',padding:'9px',marginBottom:'8px',borderRadius:'6px',border:'1px solid #ddd',height:'70px',boxSizing:'border-box',fontSize:'12px'}}/>
<button onClick={()=>{const t=document.getElementById('jt').value; const l=document.getElementById('jl').value; const b=document.getElementById('jb').value; const d=document.getElementById('jd').value; if(!t||!l||!b||!d) return alert("Fill ALL fields: Title, Location, Budget, Description!"); setJobs([{id:Date.now(),title:t,loc:l,budget:b,desc:d},...jobs]); document.getElementById('jt').value=''; document.getElementById('jl').value=''; document.getElementById('jb').value=''; document.getElementById('jd').value=''; alert("Job posted! Title: "+t+"\nLocation: "+l+"\nBudget: "+b+"\nAdmin will verify");}} style={{width:'100%',padding:'10px',background:'#4338ca',color:'#fff',border:'none',borderRadius:'8px',fontWeight:'bold',fontSize:'12px'}}>+ Post Job with All Details</button>
</div>
<div style={{marginTop:'12px'}}><b style={{fontSize:'12px'}}>Posted Jobs ({jobs.length})</b>{jobs.map(j=><div key={j.id} style={{background:'#fff',padding:'10px',borderRadius:'8px',marginBottom:'8px'}}><b style={{fontSize:'12px'}}>{j.title}</b><br/><small style={{fontSize:'11px'}}>📍 {j.loc} • 💰 {j.budget}</small><br/><small style={{fontSize:'11px',color:'#444'}}>{j.desc}</small><br/><div style={{marginTop:'4px',fontSize:'9px',color:'#22c55e'}}>✅ Verified by Admin • Escrow 5%+10% • Chat Monitored 🔍</div></div>)}</div>
</div>}

<div style={{background:'#fff',marginTop:'10px',padding:'10px',borderRadius:'8px'}}>
<b style={{fontSize:'12px'}}>💰 Escrow: 5% Client + 10% Artisan = 15%</b><br/>
<small style={{fontSize:'10px'}}>₦100k job → Client pays ₦105k, Artisan gets ₦90k, You keep ₦15k</small>
</div>

<div style={{background:'#fff',marginTop:'10px',padding:'10px',borderRadius:'8px'}}>
<b style={{fontSize:'12px'}}>🔍 Monitored Chats — Client ↔ Artisan (Admin View)</b>
{Object.keys(chats).length===0&&<div style={{fontSize:'11px',color:'#999',marginTop:'6px'}}>No chats yet. When client chats artisan, it appears here for dispute resolution.</div>}
{Object.entries(chats).map(([artId,msgs])=>{
const art=artisans.find(x=>x.id==artId);
return<div key={artId} style={{border:'1px solid #eee',borderRadius:'8px',padding:'8px',marginTop:'8px'}}>
<div style={{display:'flex',justifyContent:'space-between'}}><small style={{fontWeight:'bold',fontSize:'11px'}}>Client ↔ {art?.name}</small><button onClick={()=>setAdminChatView({art,msgs})} style={{fontSize:'9px',background:'#4338ca',color:'#fff',border:'none',padding:'3px 8px',borderRadius:'4px'}}>View Full Chat</button></div>
<small style={{fontSize:'10px',color:'#666'}}>{msgs.length} messages • Last: {msgs[msgs.length-1]?.t.slice(0,30)}...</small>
</div>
})}
</div>
</div>}

{showLogin&&<div style={{position:'fixed',top:0,left:0,right:0,bottom:0,background:'rgba(0,0,0,0.6)',zIndex:99,padding:'20px'}}><div style={{background:'#fff',padding:'15px',borderRadius:'12px',maxWidth:'300px',margin:'30px auto'}}><div style={{display:'flex',justifyContent:'space-between'}}><h3 style={{margin:0,fontSize:'14px'}}>{isReg?"Register":"Login"}</h3><button onClick={()=>setShowLogin(false)} style={{border:'none',background:'#eee',width:'24px',height:'24px',borderRadius:'50%'}}>X</button></div>
<p style={{fontSize:'10px',color:'#666',margin:'6px 0'}}>Login with Phone Number OR Email</p>
{isReg&&<input id="rn" placeholder="Full Name" style={{width:'100%',padding:'9px',marginTop:'6px',borderRadius:'6px',border:'1px solid #ddd',boxSizing:'border-box',fontSize:'12px'}}/>}
<input id="re" placeholder="Phone Number OR Email e.g. 080... or you@gmail.com" style={{width:'100%',padding:'9px',marginTop:'6px',borderRadius:'6px',border:'1px solid #ddd',boxSizing:'border-box',fontSize:'12px'}}/>
<input id="rp" placeholder="Password" type="password" style={{width:'100%',padding:'9px',marginTop:'6px',borderRadius:'6px',border:'1px solid #ddd',boxSizing:'border-box',fontSize:'12px'}}/>
{isReg&&<select id="rr" style={{width:'100%',padding:'9px',marginTop:'6px',borderRadius:'6px',fontSize:'12px'}}><option value="client">I'm a Client — I need artisan</option><option value="artisan">I'm an Artisan — I want jobs</option></select>}
<button onClick={()=>{const e=document.getElementById('re').value; if(!e) return alert("Enter Phone OR Email!"); if(!e.includes('@')&&!e.startsWith('0')) return alert("Enter valid Phone starting with 0 or Email with @"); setShowLogin(false); alert((isReg?"Registered!":"Welcome!")+"\nLogin: "+e+"\nAll chats monitored 🔍");}} style={{width:'100%',marginTop:'8px',padding:'10px',background:'#4338ca',color:'#fff',border:'none',borderRadius:'8px',fontWeight:'bold',fontSize:'12px'}}>{isReg?"Create Account":"Login with Phone / Email"}</button>
<div style={{textAlign:'center',marginTop:'8px',fontSize:'11px'}}><span onClick={()=>setIsReg(!isReg)} style={{color:'#4338ca',fontWeight:'bold'}}>{isReg?"Have account? Login":"No account? Register as Client or Artisan"}</span></div>
</div></div>}

{view&&<div style={{position:'fixed',top:0,left:0,right:0,bottom:0,background:'rgba(0,0,0,0.7)',zIndex:80,padding:'12px',overflowY:'auto'}}><div style={{background:'#fff',padding:'12px',borderRadius:'12px',maxWidth:'320px',margin:'10px auto'}}>
<div style={{display:'flex',justifyContent:'space-between'}}><b style={{fontSize:'13px'}}>{view.name}</b><button onClick={()=>setView(null)} style={{border:'none',background:'#eee',width:'24px',height:'24px',borderRadius:'50%'}}>X</button></div>
<div style={{background:'#f3f4f6',padding:'10px',borderRadius:'8px',marginTop:'8px',fontSize:'11px'}}>
<div style={{display:'flex',justifyContent:'space-between'}}><span>Job:</span><b>₦100,000</b></div>
<div style={{display:'flex',justifyContent:'space-between',color:'#666',marginTop:'3px'}}><span>+ Client 5%:</span><span>₦5,000</span></div>
<div style={{display:'flex',justifyContent:'space-between',fontWeight:'bold',borderTop:'1px solid #ddd',marginTop:'5px',paddingTop:'5px'}}><span>You Pay:</span><span style={{color:'#4338ca'}}>₦105,000</span></div>
<div style={{display:'flex',justifyContent:'space-between',color:'#666',marginTop:'5px'}}><span>Artisan Gets:</span><span>₦90,000</span></div>
<div style={{background:'#dcfce7',padding:'5px',borderRadius:'5px',marginTop:'5px',textAlign:'center',color:'#166534',fontSize:'10px'}}>🔒 CraftSure Keeps ₦15k (5%+10%) — Escrow Protected • Chat Monitored 🔍</div>
</div>
<button onClick={()=>{alert("Escrow: You pay ₦105k\nArtisan gets ₦90k after approval\nYou profit ₦15k\nAll chats monitored by Admin!"); setView(null)}} style={{width:'100%',marginTop:'8px',padding:'10px',background:'#22c55e',color:'#fff',border:'none',borderRadius:'8px',fontWeight:'bold',fontSize:'12px'}}>🔒 Pay ₦105k to Escrow</button>
</div></div>}

{chat&&<div style={{position:'fixed',top:0,left:0,right:0,bottom:0,background:'#fff',zIndex:90,display:'flex',flexDirection:'column'}}><div style={{background:'#4338ca',color:'#fff',padding:'10px',display:'flex',justifyContent:'space-between'}}><div><b style={{fontSize:'12px'}}>💬 {chat.name}</b><div style={{fontSize:'9px',opacity:0.8}}>Chat monitored by Admin for escrow safety 🔍</div></div><button onClick={()=>setChat(null)} style={{background:'rgba(255,255,255,0.2)',color:'#fff',border:'none',width:'26px',height:'26px',borderRadius:'50%'}}>X</button></div><div style={{flex:1,padding:'10px',overflowY:'auto',background:'#f9fafb'}}>{(chats[chat.id]||[]).map((m,i)=><div key={i} style={{display:'flex',justifyContent:m.me?'flex-end':'flex-start',marginBottom:'6px'}}><div style={{background:m.me?'#4338ca':'#fff',color:m.me?'#fff':'#000',padding:'6px 10px',borderRadius:'12px',fontSize:'11px',maxWidth:'75%'}}>{m.t}</div></div>)}</div><div style={{display:'flex',gap:'5px',padding:'8px',borderTop:'1px solid #eee'}}><input value={msg} onChange={e=>setMsg(e.target.value)} onKeyDown={e=>e.key==='Enter'&&send()} placeholder="Message..." style={{flex:1,padding:'8px',borderRadius:'20px',border:'1px solid #ddd',fontSize:'11px'}}/><button onClick={send} style={{background:'#4338ca',color:'#fff',border:'none',padding:'0 14px',borderRadius:'20px',fontSize:'11px'}}>Send</button></div><div style={{padding:'5px',background:'#fffbeb',fontSize:'8px',textAlign:'center'}}>🔒 Don't pay outside app — Admin monitors this chat for dispute</div></div>}

{adminChatView&&<div style={{position:'fixed',top:0,left:0,right:0,bottom:0,background:'#fff',zIndex:100,display:'flex',flexDirection:'column'}}><div style={{background:'#111827',color:'#fff',padding:'10px',display:'flex',justifyContent:'space-between'}}><div><b style={{fontSize:'12px'}}>🔍 ADMIN MONITOR: {adminChatView.art.name}</b><div style={{fontSize:'9px'}}>Monitoring client conversation — For dispute resolution</div></div><button onClick={()=>setAdminChatView(null)} style={{background:'#374151',color:'#fff',border:'none',width:'26px',height:'26px',borderRadius:'50%'}}>X</button></div><div style={{flex:1,padding:'10px',overflowY:'auto',background:'#f3f4f6'}}>{adminChatView.msgs.map((m,i)=><div key={i} style
