import { useState } from "react";
export default function App(){
const [tab,setTab]=useState("home");
const [showLogin,setShowLogin]=useState(false);
const [isReg,setIsReg]=useState(false);
const [view,setView]=useState(null);
const [chat,setChat]=useState(null);
const [adminView,setAdminView]=useState(null);
const [msg,setMsg]=useState("");
const [jobs,setJobs]=useState([{id:1,title:"Tile my 3 bedroom flat",loc:"Ojo, Lagos",budget:"₦80,000",desc:"Need tiler for kitchen and 2 bathrooms, 2 days work"}]);
const [jTitle,setJTitle]=useState("");
const [jLoc,setJLoc]=useState("");
const [jBud,setJBud]=useState("");
const [jDesc,setJDesc]=useState("");
const [chats,setChats]=useState({});
const [loginVal,setLoginVal]=useState("");
const artisans=[{id:1,name:"Tunde Tiler",role:"Tiler • Ojo",rate:"5 • 47 jobs",gold:true},{id:2,name:"Musa Carpenter",role:"Carpenter • Onireke",rate:"4.9 • 32 jobs",gold:false}];
const send=()=>{if(!msg.trim()||!chat)return; const id=chat.id; setChats(p=>({...p,[id]:[...(p[id]||[]),{me:true,t:msg}]})); setMsg(""); setTimeout(()=>setChats(p=>({...p,[id]:[...(p[id]||[]),{me:false,t:"Oga I dey! I fit do am sharp 🔧"}]})),800)};
const postJob=()=>{if(!jTitle||!jLoc||!jBud||!jDesc){alert("Fill ALL: Title, Location, Budget, Description");return;} setJobs([{id:Date.now(),title:jTitle,loc:jLoc,budget:jBud,desc:jDesc},...jobs]); setJTitle(""); setJLoc(""); setJBud(""); setJDesc(""); setTab("home"); alert("Job Posted! ✅\n"+jTitle+"\n"+jLoc+"\n"+jBud);};

return(
<div style={{background:'#f5f5f5',minHeight:'100vh',fontFamily:'sans-serif',paddingBottom:'60px'}}>
<div style={{background:'#4338ca',color:'#fff',padding:'10px',display:'flex',justifyContent:'space-between',position:'sticky',top:0,zIndex:10}}>
<b>CraftSure 🇳🇬</b>
<div style={{display:'flex',gap:'4px'}}>
<button onClick={()=>setTab("home")} style={{background:'#7c3aed',color:'#fff',border:'none',padding:'5px 8px',borderRadius:'8px',fontSize:'10px'}}>Home</button>
<button onClick={()=>setTab("post")} style={{background:'#22c55e',color:'#fff',border:'none',padding:'5px 8px',borderRadius:'8px',fontSize:'10px'}}>Post Job</button>
<button onClick={()=>setTab("admin")} style={{background:'#f59e0b',color:'#fff',border:'none',padding:'5px 8px',borderRadius:'8px',fontSize:'10px'}}>Admin</button>
<button onClick={()=>setShowLogin(true)} style={{background:'#fff',color:'#4338ca',border:'none',padding:'5px 8px',borderRadius:'10px',fontSize:'10px',fontWeight:'bold'}}>Login</button>
</div>
</div>

{tab==="home"&&<div>
<h2 style={{padding:'12px 15px 0',margin:0,fontSize:'22px'}}>Craftsure NG 🔒</h2>
<p style={{padding:'0 15px',margin:'0 0 8px',fontSize:'10px',color:'#666'}}>5% Client + 10% Artisan = 15% Profit • Chat Monitored 🔍</p>
<div style={{margin:'10px 15px',padding:'12px',borderRadius:'10px',background:'linear-gradient(90deg,#fde047,#fb923c)',display:'flex',justifyContent:'space-between'}}>
<div><span style={{background:'black',color:'#fff',fontSize:'7px',padding:'2px 5px',borderRadius:'6px'}}>AD • SPONSORED</span><div style={{fontWeight:'bold',fontSize:'12px'}}>Materials? 🏗️</div><div style={{fontSize:'9px'}}>10% off CRAFTSURE10</div></div>
<button style={{background:'black',color:'#fff',border:'none',padding:'6px 10px',borderRadius:'12px',fontSize:'10px'}}>Shop Now</button>
</div>
<div style={{padding:'0 15px',display:'flex',justifyContent:'space-between'}}><b style={{fontSize:'12px'}}>Artisans</b><button onClick={()=>setTab("post")} style={{background:'#4338ca',color:'#fff',border:'none',padding:'4px 8px',borderRadius:'6px',fontSize:'9px'}}>+ Post Job</button></div>
{artisans.map(a=><div key={a.id} style={{margin:'8px 15px',background:'#fff',padding:'10px',borderRadius:'10px',border:a.gold?'2px solid gold':'1px solid #eee'}}>
<b style={{fontSize:'12px'}}>{a.name} {a.gold&&<span style={{background:'gold',fontSize:'7px',padding:'2px 4px',borderRadius:'4px'}}>SPONSORED</span>}</b><br/><small style={{fontSize:'10px'}}>{a.role} • ⭐ {a.rate}</small>
{chats[a.id]&&<div style={{fontSize:'9px',color:'green'}}>💬 {chats[a.id].length} msgs monitored</div>}
<div style={{marginTop:'6px',display:'flex',gap:'4px'}}>
<button onClick={()=>setView(a)} style={{flex:1,padding:'6px',background:'#eee',border:'none',borderRadius:'6px',fontSize:'10px'}}>Portfolio</button>
<button onClick={()=>setChat(a)} style={{flex:1,padding:'6px',background:'#e0e7ff',border:'none',borderRadius:'6px',fontSize:'10px',fontWeight:'bold',color:'#4338ca'}}>Chat</button>
<button onClick={()=>setView(a)} style={{flex:1,padding:'6px',background:'black',color:'#fff',border:'none',borderRadius:'6px',fontSize:'10px'}}>Hire 5%+10%</button>
</div>
</div>)}
</div>}

{tab==="post"&&<div style={{padding:'12px'}}>
<h3 style={{fontSize:'14px'}}>Post New Job — Full Details</h3>
<div style={{background:'#fff',padding:'12px',borderRadius:'10px'}}>
<input value={jTitle} onChange={e=>setJTitle(e.target.value)} placeholder="Job Title *" style={{width:'100%',padding:'9px',marginBottom:'6px',borderRadius:'6px',border:'1px solid #ddd',boxSizing:'border-box',fontSize:'12px'}}/>
<input value={jLoc} onChange={e=>setJLoc(e.target.value)} placeholder="Location * e.g. Ojo, Lagos" style={{width:'100%',padding:'9px',marginBottom:'6px',borderRadius:'6px',border:'1px solid #ddd',boxSizing:'border-box',fontSize:'12px'}}/>
<input value={jBud} onChange={e=>setJBud(e.target.value)} placeholder="Budget * e.g. ₦80,000" style={{width:'100%',padding:'9px',marginBottom:'6px',borderRadius:'6px',border:'1px solid #ddd',boxSizing:'border-box',fontSize:'12px'}}/>
<textarea value={jDesc} onChange={e=>setJDesc(e.target.value)} placeholder="Description * e.g. Need tiler for kitchen 12x14, materials ready, urgent" style={{width:'100%',padding:'9px',marginBottom:'8px',borderRadius:'6px',border:'1px solid #ddd',height:'80px',boxSizing:'border-box',fontSize:'12px'}}/>
<button onClick={postJob} style={{width:'100%',padding:'10px',background:'#4338ca',color:'#fff',border:'none',borderRadius:'8px',fontWeight:'bold',fontSize:'12px'}}>Post Job — Admin Verifies</button>
</div>
<div style={{marginTop:'12px'}}><b style={{fontSize:'12px'}}>Jobs ({jobs.length})</b>{jobs.map(j=><div key={j.id} style={{background:'#fff',padding:'10px',borderRadius:'8px',marginBottom:'8px',marginTop:'6px'}}><b style={{fontSize:'12px'}}>{j.title}</b><br/><small style={{fontSize:'11px'}}>📍 {j.loc} • 💰 {j.budget}</small><br/><small style={{fontSize:'11px',color:'#333'}}>{j.desc}</small></div>)}</div>
</div>}

{tab==="admin"&&<div style={{padding:'10px'}}>
<h3 style={{fontSize:'13px'}}>Admin — Monitor All Chats 🔍 + 5%+10%</h3>
<div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'6px'}}>
<div style={{background:'#fff',padding:'10px',borderRadius:'8px',textAlign:'center'}}><h3 style={{margin:0,color:'#4338ca',fontSize:'16px'}}>{artisans.length}</h3><small style={{fontSize:'9px'}}>Artisans</small></div>
<div style={{background:'#fff',padding:'10px',borderRadius:'8px',textAlign:'center'}}><h3 style={{margin:0,color:'#22c55e',fontSize:'16px'}}>{jobs.length}</h3><small style={{fontSize:'9px'}}>Jobs</small></div>
<div style={{background:'#fff',padding:'10px',borderRadius:'8px',textAlign:'center'}}><h3 style={{margin:0,color:'#f59e0b',fontSize:'14px'}}>₦{jobs.length*15000}</h3><small style={{fontSize:'9px'}}>Profit 15%</small></div>
<div style={{background:'#fff',padding:'10px',borderRadius:'8px',textAlign:'center'}}><h3 style={{margin:0,color:'#ef4444',fontSize:'16px'}}>{Object.values(chats).flat().length}</h3><small style={{fontSize:'9px'}}>Msgs Monitored</small></div>
</div>
<div style={{background:'#fff',marginTop:'8px',padding:'8px',borderRadius:'8px',fontSize:'10px'}}><b>Escrow: Client 5% + Artisan 10% = 15%</b><br/>₦100k → Client ₦105k, Artisan ₦90k, You ₦15k</div>
<div style={{background:'#fff',marginTop:'8px',padding:'8px',borderRadius:'8px'}}><b style={{fontSize:'11px'}}>Monitored Chats</b>{Object.keys(chats).length===0&&<div style={{fontSize:'10px',color:'#999'}}>No chats yet</div>}{Object.entries(chats).map(([id,msgs])=>{const art=artisans.find(x=>x.id==id); return<div key={id} style={{border:'1px solid #eee',borderRadius:'6px',padding:'6px',marginTop:'6px',display:'flex',justifyContent:'space-between',alignItems:'center'}}><div><small style={{fontSize:'10px',fontWeight:'bold'}}>Client ↔ {art?.name}</small><br/><small style={{fontSize:'9px'}}>{msgs.length} msgs</small></div><button onClick={()=>setAdminView({art,msgs})} style={{fontSize:'9px',background:'#4338ca',color:'#fff',border:'none',padding:'4px 8px',borderRadius:'4px'}}>View</button></div>})}</div>
</div>}

{showLogin&&<div style={{position:'fixed',top:0,left:0,right:0,bottom:0,background:'rgba(0,0,0,0.6)',zIndex:50,padding:'15px'}}><div style={{background:'#fff',padding:'12px',borderRadius:'10px',maxWidth:'300px',margin:'20px auto'}}>
<div style={{display:'flex',justifyContent:'space-between'}}><b style={{fontSize:'13px'}}>{isReg?"Register":"Login — Phone OR Email"}</b><button onClick={()=>setShowLogin(false)} style={{border:'none',background:'#eee',width:'24px',height:'24px',borderRadius:'50%'}}>X</button></div>
<p style={{fontSize:'9px',color:'#666',margin:'4px 0'}}>Use Phone Number OR Email</p>
{isReg&&<input placeholder="Full Name" style={{width:'100%',padding:'8px',marginTop:'6px',borderRadius:'6px',border:'1px solid #ddd',boxSizing:'border-box',fontSize:'11px'}}/>}
<input value={loginVal} onChange={e=>setLoginVal(e.target.value)} placeholder="Phone e.g. 080123... OR Email e.g. you@gmail.com *" style={{width:'100%',padding:'8px',marginTop:'6px',borderRadius:'6px',border:'1px solid #ddd',boxSizing:'border-box',fontSize:'11px'}}/>
<input placeholder="Password *" type="password" style={{width:'100%',padding:'8px',marginTop:'6px',borderRadius:'6px',border:'1px solid #ddd',boxSizing:'border-box',fontSize:'11px'}}/>
{isReg&&<select style={{width:'100%',padding:'8px',marginTop:'6px',borderRadius:'6px',fontSize:'11px'}}><option>Client</option><option>Artisan</option></select>}
<button onClick={()=>{if(!loginVal){alert("Enter Phone OR Email!");return;} if(!loginVal.includes("@")&&!loginVal.startsWith("0")){alert("Phone must start with 0 OR Email must contain @");return;} setShowLogin(false); alert("Logged in as: "+loginVal);}} style={{width:'100%',marginTop:'8px',padding:'9px',background:'#4338ca',color:'#fff',border:'none',borderRadius:'6px',fontWeight:'bold',fontSize:'11px'}}>{isReg?"Create Account":"Login with Phone / Email"}</button>
<div style={{textAlign:'center',marginTop:'6px',fontSize:'10px'}}><span onClick={()=>setIsReg(!isReg)} style={{color:'#4338ca',fontWeight:'bold'}}>{isReg?"Have account? Login":"No account? Register"}</span></div>
</div></div>}

{view&&<div style={{position:'fixed',top:0,left:0,right:0,bottom:0,background:'rgba(0,0,0,0.7)',zIndex:40,padding:'12px'}}><div style={{background:'#fff',padding:'12px',borderRadius:'10px',maxWidth:'320px',margin:'10px auto'}}>
<div style={{display:'flex',justifyContent:'space-between'}}><b style={{fontSize:'12px'}}>{view.name} — Escrow</b><button onClick={()=>setView(null)} style={{border:'none',background:'#eee',width:'24px',height:'24px',borderRadius:'50%'}}>X</button></div>
<div style={{background:'#f3f4f6',padding:'8px',borderRadius:'8px',marginTop:'8px',fontSize:'11px'}}>
<div style={{display:'flex',justifyContent:'space-between'}}><span>Job:</span><b>₦100k</b></div>
<div style={{display:'flex',justifyContent:'space-between',color:'#666'}}><span>+ Client 5%:</span><span>₦5k</span></div>
<div style={{display:'flex',justifyContent:'space-between',fontWeight:'bold',borderTop:'1px solid #ddd',marginTop:'4px',paddingTop:'4px'}}><span>You Pay:</span><span style={{color:'#4338ca'}}>₦105k</span></div>
<div style={{display:'flex',justifyContent:'space-between',color:'#666'}}><span>Artisan Gets:</span><span>₦90k</span></div>
<div style={{background:'#dcfce7',padding:'4px',borderRadius:'4px',marginTop:'4px',textAlign:'center',color:'#166534',fontSize:'9px'}}>CraftSure Profit ₦15k — Monitored 🔍</div>
</div>
<button onClick={()=>{alert("Escrow: Pay ₦105k, Artisan gets ₦90k after your approval, You keep ₦15k"); setView(null);}} style={{width:'100%',marginTop:'8px',padding:'9px',background:'#22c55e',color:'#fff',border:'none',borderRadius:'8px',fontWeight:'bold',fontSize:'11px'}}>🔒 Pay ₦105k to Escrow</button>
</div></div>}

{chat&&<div style={{position:'fixed',top:0,left:0,right:0,bottom:0,background:'#fff',zIndex:60,display:'flex',flexDirection:'column'}}><div style={{background:'#4338ca',color:'#fff',padding:'8px',display:'flex',justifyContent:'space-between'}}><div><b style={{fontSize:'11px'}}>💬 {chat.name}</b><div style={{fontSize:'8px'}}>Monitored by Admin 🔍</div></div><button onClick={()=>setChat(null)} style={{background:'rgba(255,255,255,0.2)',color:'#fff',border:'none',width:'24px',height:'24px',borderRadius:'50%'}}>X</button></div><div style={{flex:1,padding:'8px',overflowY:'auto',background:'#f9fafb'}}>{(chats[chat.id]||[]).map((m,i)=><div key={i} style={{display:'flex',justifyContent:m.me?'flex-end':'flex-start',marginBottom:'6px'}}><div style={{background:m.me?'#4338ca':'#fff',color:m.me?'#fff':'#000',padding:'6px 10px',borderRadius:'12px',fontSize:'11px',maxWidth:'70%'}}>{m.t}</div></div>)}</div><div style={{display:'flex',gap:'4px',padding:'8px',borderTop:'1px solid #eee'}}><input value={msg} onChange={e=>setMsg(e.target.value)} onKeyDown={e=>e.key==='Enter'&&send()} placeholder="Message..." style={{flex:1,padding:'8px',borderRadius:'20px',border:'1px solid #ddd',fontSize:'11px'}}/><button onClick={send} style={{background:'#4338ca',color:'#fff',border:'none',padding:'0 12px',borderRadius:'20px',fontSize:'11px'}}>Send</button></div></div>}

{adminView&&<div style={{position:'fixed',top:0,left:0,right:0,bottom:0,background:'#fff',zIndex:70,display:'flex',flexDirection:'column'}}><div style={{background:'#111827',color:'#fff',padding:'8px',display:'flex',justifyContent:'space-between'}}><b style={{fontSize:'11px'}}>🔍 ADMIN MONITOR: {adminView.art.name}</b><button onClick={()=>setAdminView(null)} style={{background:'#374151',color:'#fff',border:'none',width:'24px',height:'24px',borderRadius:'50%'}}>X</button></div><div style={{flex:1,padding:'8px',overflowY:'auto',background:'#f3f4f6'}}>{adminView.msgs.map((m,i)=><div key={i} style={{background:m.me?'#dbeafe':'#fff',padding:'6px 8px',borderRadius:'6px',marginBottom:'4px',borderLeft:m.me?'3px solid #4338ca':'3px solid #22c55e',fontSize:'11px'}}><b style={{fontSize:'9px'}}>{m.me?'Client: ':'Artisan: '}</b>{m.t}</div>)}</div></div>}

</div>
)
}
