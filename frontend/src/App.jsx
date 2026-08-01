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
const artisans=[{id:1,name:"Tunde Tiler",role:"Tiler • Ojo",rate:"5 • 47 jobs",gold:true},{id:2,name:"Musa Carpenter",role:"Carpenter • Onireke",rate:"4.9 • 32 jobs",gold:false},{id:3,name:"Emeka Electrician",role:"Electrician • Festac",rate:"4.8 • 28 jobs",gold:false}];

const send=()=>{
if(!msg.trim()||!chat) return;
const id=chat.id;
setChats(p=>({...p,[id]:[...(p[id]||[]),{me:true,t:msg,time:new Date().toLocaleTimeString()}]}));
setMsg("");
setTimeout(()=>setChats(p=>({...p,[id]:[...(p[id]||[]),{me:false,t:"Oga I dey available! When we start? 🔧",time:new Date().toLocaleTimeString()} ]})),800);
};

const postJob=()=>{
if(!jTitle||!jLoc||!jBud||!jDesc){alert("Fill ALL: Title, Location, Budget, Description");return;}
setJobs([{id:Date.now(),title:jTitle,loc:jLoc,budget:jBud,desc:jDesc},...jobs]);
setJTitle(""); setJLoc(""); setJBud(""); setJDesc(""); setTab("home");
alert("Job Posted! Admin will verify ✅");
};

return(
<div style={{background:'#f5f5f5',minHeight:'100vh',fontFamily:'sans-serif',paddingBottom:'60px'}}>

<div style={{background:'#4338ca',color:'#fff',padding:'10px 12px',display:'flex',justifyContent:'space-between',alignItems:'center',position:'sticky',top:0,zIndex:10}}>
<b>CraftSure 🇳🇬</b>
<div style={{display:'flex',gap:'4px'}}>
<button onClick={()=>setTab("home")} style={{background:tab==="home"?"#7c3aed":"rgba(255,255,255,0.2)",color:'#fff',border:'none',padding:'5px 9px',borderRadius:'8px',fontSize:'10px'}}>Home</button>
<button onClick={()=>setTab("post")} style={{background:tab==="post"?"#22c55e":"rgba(255,255,255,0.2)",color:'#fff',border:'none',padding:'5px 9px',borderRadius:'8px',fontSize:'10px'}}>Post Job</button>
<button onClick={()=>setTab("admin")} style={{background:tab==="admin"?"#f59e0b":"rgba(255,255,255,0.2)",color:'#fff',border:'none',padding:'5px 9px',borderRadius:'8px',fontSize:'10px'}}>Admin</button>
<button onClick={()=>setShowLogin(true)} style={{background:'#fff',color:'#4338ca',border:'none',padding:'5px 10px',borderRadius:'12px',fontSize:'10px',fontWeight:'bold'}}>Login</button>
</div>
</div>

{tab==="home"&&<div>
<div style={{padding:'12px 15px 0'}}><h2 style={{margin:'0',fontSize:'22px'}}>CraftSure NG 🔒</h2><p style={{margin:'2px 0 0',fontSize:'11px',color:'#666'}}>Escrow Protected • Pay only when satisfied • Chat Monitored 🔍</p></div>

<div style={{margin:'12px 15px',padding:'14px',borderRadius:'12px',background:'linear-gradient(90deg,#fde047,#fb923c)',display:'flex',justifyContent:'space-between',alignItems:'center'}}>
<div><span style={{background:'black',color:'#fff',fontSize:'7px',padding:'2px 6px',borderRadius:'6px'}}>AD • SPONSORED</span><div style={{fontWeight:'bold',fontSize:'13px',marginTop:'4px'}}>Need Building Materials? 🏗️</div><div style={{fontSize:'10px'}}>10% off — Use CRAFTSURE10</div></div>
<button style={{background:'black',color:'#fff',border:'none',padding:'8px 12px',borderRadius:'15px',fontSize:'10px'}}>Shop Now</button>
</div>

<div style={{padding:'0 15px',display:'flex',justifyContent:'space-between',alignItems:'center'}}><b style={{fontSize:'12px'}}>Verified Artisans Near You</b><button onClick={()=>setTab("post")} style={{background:'#4338ca',color:'#fff',border:'none',padding:'4px 9px',borderRadius:'6px',fontSize:'10px'}}>+ Post Job</button></div>

{artisans.map(a=><div key={a.id} style={{margin:'8px 15px',background:'#fff',padding:'11px',borderRadius:'10px',border:a.gold?'2px solid gold':'1px solid #eee'}}>
<div style={{display:'flex',justifyContent:'space-between'}}><div><b style={{fontSize:'13px'}}>{a.name} {a.gold&&<span style={{background:'gold',fontSize:'7px',padding:'2px 5px',borderRadius:'4px'}}>SPONSORED</span>}</b><br/><small style={{fontSize:'10px',color:'#555'}}>{a.role} • ⭐ {a.rate}</small></div></div>
{chats[a.id]&&<div style={{fontSize:'9px',color:'green',marginTop:'3px'}}>💬 {chats[a.id].length} msgs • Monitored by Admin 🔍</div>}
<div style={{marginTop:'8px',display:'flex',gap:'5px'}}>
<button onClick={()=>setView(a)} style={{flex:1,padding:'7px',background:'#f3f4f6',border:'none',borderRadius:'7px',fontSize:'10px'}}>Portfolio</button>
<button onClick={()=>setChat(a)} style={{flex:1,padding:'7px',background:'#e0e7ff',border:'none',borderRadius:'7px',fontSize:'10px',fontWeight:'bold',color:'#4338ca'}}>💬 Chat</button>
<button onClick={()=>setView(a)} style={{flex:1,padding:'7px',background:'black',color:'#fff',border:'none',borderRadius:'7px',fontSize:'10px',fontWeight:'bold'}}>Hire — Escrow 🔒</button>
</div>
</div>)}

<div style={{margin:'15px',background:'#fff',padding:'10px',borderRadius:'8px',fontSize:'10px',color:'#666',textAlign:'center'}}>By using CraftSure you agree to our <b>Terms</b> — 5% Client + 10% Artisan escrow fees apply • Secure by Paystack</div>
</div>}

{tab==="post"&&<div style={{padding:'12px'}}>
<h3 style={{fontSize:'14px',margin:'0 0 10px'}}>Post New Job — Full Details</h3>
<div style={{background:'#fff',padding:'12px',borderRadius:'10px'}}>
<input value={jTitle} onChange
