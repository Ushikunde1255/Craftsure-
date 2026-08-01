import {useState,useEffect} from "react";
import {createClient} from "@supabase/supabase-js";
const supa=createClient("https://unzohyrabvouclsjcpfu.supabase.co","sb_publishable_zB3k0KebVFw4-xf_TtdaUw_UlHsXk_q");
const ADMIN="nicholasu9@gmail.com";
const LOGO="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Ccircle cx='50' cy='50' r='48' fill='%230A1931'/%3E%3Cpath d='M30 28 L45 28 L42 42 L32 50 L18 38 Z M55 42 L62 48 L38 78 L30 78 L22 70 L30 62 L40 62 L55 42 Z M70 22 C78 22 86 28 86 38 C86 44 83 48 78 50 L62 56 L58 40 L64 36 C62 32 64 26 70 22 Z' fill='%23FFD700'/%3E%3C/svg%3E";

export default function App(){
const [tab,setTab]=useState("home");const [user,setUser]=useState(JSON.parse(localStorage.getItem("cs_user")||"null"));
const [email,setEmail]=useState("");const [pass,setPass]=useState("");
const [jobs,setJobs]=useState([]);const [arts,setArts]=useState([]);const [msgs,setMsgs]=useState([]);const [pays,setPays]=useState([]);
const [jt,setJt]=useState("");const [jl,setJl]=useState("");const [jb,setJb]=useState("");const [jd,setJd]=useState("");const [ji,setJi]=useState("");const [pv,setPv]=useState(null);
const [an,setAn]=useState("");const [askill,setAskill]=useState("");const [aloc,setAloc]=useState("");const [awhat,setAwhat]=useState("");const [aport,setAport]=useState("");
const [chatJob,setChatJob]=useState(null);const [chatTxt,setChatTxt]=useState("");

const load=async()=>{
const {data:j}=await supa.from("jobs").select("*").order("id",{ascending:false});if(j)setJobs(j);
const {data:a}=await supa.from("artisans").select("*").order("id",{ascending:false});if(a)setArts(a);
const {data:m}=await supa.from("messages").select("*").order("id",{ascending:false}).limit(100);if(m)setMsgs(m);
const {data:p}=await supa.from("payments").select("*").order("id",{ascending:false});if(p)setPays(p);
};
useEffect(()=>{load();const t=setInterval(load,4000);return()=>clearInterval(t);},[]);

const signup=async()=>{const {error}=await supa.auth.signUp({email,password:pass});if(error)return alert(error.message);const u={email,role:email===ADMIN?"admin":"user"};localStorage.setItem("cs_user",JSON.stringify(u));setUser(u);setTab("home");};
const login=async()=>{const {error}=await supa.auth.signInWithPassword({email,password:pass});if(error)return alert(error.message);const u={email,role:email===ADMIN?"admin":"user"};localStorage.setItem("cs_user",JSON.stringify(u));setUser(u);setTab("home");};
const up=e=>{const f=e.target.files[0];if(!f)return;const r=new FileReader();r.onload=v=>setJi(v.target.result);r.readAsDataURL(f);};
const upArt=e=>{const f=e.target.files[0];if(!f)return;const r=new FileReader();r.onload=v=>setAport(v.target.result);r.readAsDataURL(f);};

const postJob=async()=>{if(!user)return alert("Login");await supa.from("jobs").insert([{title:jt,location:jl,budget:jb,description:jd,image_url:ji,created_by:user.email}]);setJt("");setJl("");setJb("");setJd("");setJi("");load();setTab("home");};
const postArt=async()=>{if(!user)return alert("Login");await supa.from("artisans").insert([{name:an,skill:askill,location:aloc,whatsapp:awhat,portfolio:aport,created_by:user.email,verified:false}]);load();setTab("artisans");};
const sendMsg=async()=>{if(!chatTxt)return;await supa.from("messages").insert([{job_id:chatJob.id,sender:user.email,message:chatTxt}]);setChatTxt("");load();};

const getBudget=(b)=>{let n=parseInt((b||"").replace(/[^0-9]/g,""))||0;if((b||"").toLowerCase().includes("k"))n=n*1000;return n;};
const hasPaid=(jobId,type,email)=>pays.some(p=>p.job_id===jobId&&p.percent_type===type&&(!email||p.payer_email===email));
const clientPaid=(jobId,email)=>hasPaid(jobId,"5%_client",email);
const artisanPaid=(jobId,email)=>hasPaid(jobId,"10%_artisan",email);
const bothPaid=(jobId)=>pays.filter(p=>p.job_id===jobId&&p.percent_type==="5%_client").length>0&&pays.filter(p=>p.job_id===jobId&&p.percent_type==="10%_artisan").length>0;

const payClient5=async(job)=>{
const amt=Math.floor(getBudget(job.budget)*0.05);
if(!confirm(`Client pays 5% = ₦${amt.toLocaleString()} to unlock chat? CraftSure keeps this as part of 15%.`))return;
await supa.from("payments").insert([{job_id:job.id,payer_email:user.email,payer_type:"client",amount:amt,percent_type:"5%_client",status:"paid"}]);
alert("Client 5% Paid! Now chat unlocked! Artisan must pay 10% to accept.");load();
};
const payArtisan10=async(job)=>{
const amt=Math.floor(getBudget(job.budget)*0.10);
if(!confirm(`Artisan pays 10% = ₦${amt.toLocaleString()} to accept job & get client WhatsApp?`))return;
await supa.from("payments").insert([{job_id:job.id,payer_email:user.email,payer_type:"artisan",amount:amt,percent_type:"10%_artisan",status:"paid"}]);
alert("Artisan 10% Paid! WhatsApp unlocked for both! Admin sees payment.");load();
};

const totalBudget=jobs.reduce((s,j)=>s+getBudget(j.budget),0);
const client5Total=pays.filter(p=>p.percent_type==="5%_client").reduce((s,p)=>s+p.amount,0);
const artisan10Total=pays.filter(p=>p.percent_type==="10%_artisan").reduce((s,p)=>s+p.amount,0);
const earn15=client5Total+artisan10Total;
const adEarn=jobs.length*500;
const isAdmin=user?.email===ADMIN;

return(
<div style={{background:"#f5f7fb",minHeight:"100vh",fontFamily:"sans-serif"}}>
<div style={{background:"#0A1931",color:"#fff",padding:"10px 12px",display:"flex",justifyContent:"space-between",alignItems:"center",position:"sticky",top:0,zIndex:20}}>
<div style={{display:"flex",alignItems:"center",gap:"8px"}}><img src={LOGO} style={{width:38,height:38,borderRadius:"50%",background:"#fff",padding:"2px"}} alt="logo"/><div><b style={{fontSize:16}}>CraftSure</b><div style={{fontSize:8,color:"#FFD700"}}>Navy Gold • 5% Client + 10% Artisan = 15%</div></div></div>
<div style={{display:"flex",gap:"4px",flexWrap:"wrap"}}>
<button onClick={()=>setTab("home")} style={{padding:"6px 10px",borderRadius:8,border:"none",background:tab==="home"?"#fff":"#1e3a8a",color:tab==="home"?"#0A1931":"#fff",fontSize:11}}>Home</button>
<button onClick={()=>setTab("artisans")} style={{padding:"6px 10px",borderRadius:8,border:"none",background:tab==="artisans"?"#fff":"#1e3a8a",color:tab==="artisans"?"#0A1931":"#fff",fontSize:11}}>Artisans</button>
{isAdmin&&<button onClick={()=>setTab("admin")} style={{padding:"6px 10px",borderRadius:8,border:"none",background:"#ef4444",color:"#fff",fontSize:11,fontWeight:"bold"}}>Admin 💰</button>}
{isAdmin&&<button onClick={()=>setTab("chats")} style={{padding:"6px 10px",borderRadius:8,border:"none",background:"#FFD700",color:"#0A1931",fontSize:11,fontWeight:"bold"}}>All Chats 👁️</button>}
<button onClick={()=>setTab("post")} style={{padding:"6px 10px",borderRadius:8,border:"none",background:"#FFD700",color:"#0A1931",fontWeight:"bold",fontSize:11}}>Post Job</button>
{user?<button onClick={()=>{localStorage.removeItem("cs_user");setUser(null);}} style={{padding:"6px 8px",borderRadius:8,border:"none",background:"#fff",fontSize:10}}>{user.email.slice(0,5)} Out</button>:<button onClick={()=>setTab("login")} style={{padding:"6px 10px",borderRadius:8,border:"none",background:"#fff",color:"#0A1931",fontWeight:"bold",fontSize:11}}>Login</button>}
</div>
</div>

{tab==="home"&&<div>
<div style={{padding:"10px 15px"}}><b>Jobs ({jobs.length}) • 5% Client + 10% Artisan = 15% for CraftSure</b><div style={{fontSize:10,color:"#666"}}>Chat inside app until both pay • Admin sees all</div></div>
{jobs.map(j=>{
const b=getBudget(j.budget);const c5=Math.floor(b*0.05);const a10=Math.floor(b*0.10);
const cp=pays.some(p=>p.job_id===j.id&&p.percent_type==="5%_client");
const ap=pays.some(p=>p.job_id===j.id&&p.percent_type==="10%_artisan");
const unlocked=cp&&ap;
return(
<div key={j.id} style={{background:"#fff",margin:"10px 15px",borderRadius:12,overflow:"hidden",border:"1px solid #e5e7eb"}}>
{j.image_url&&<div style={{position:"relative"}} onClick={()=>setPv(j.image_url)}><img src={j.image_url} style={{width:"100%",height:180,objectFit:"cover"}} alt="job"/><div style={{position:"absolute",bottom:0,left:0,right:0,background:"rgba(10,25,49,0.85)",color:"#FFD700",padding:"5px 8px",fontSize:9,display:"flex",justifyContent:"space-between"}}><span>🔒 {unlocked?"✅ Both Paid - WhatsApp Unlocked":"💬 5%+10%=15% to Unlock"}</span><span>₦{b.toLocaleString()}</span></div></div>}
<div style={{padding:"10px"}}>
<b>{j.title}</b> <small style={{background:unlocked?"#22c55e":"#0A1931",color:unlocked?"#fff":"#FFD700",padding:"2px 6px",borderRadius:10,fontSize:9}}>{unlocked?"UNLOCKED":`${cp?"Client 5% Paid":"Client 5% Pending"} • ${ap?"Artisan 10% Paid":"Artisan 10% Pending"}`}</small><br/>
<small>📍 {j.location} • 💰 ₦{b.toLocaleString()} • Client 5% = ₦{c5.toLocaleString()} • Artisan 10% = ₦{a10.toLocaleString()} • You keep 15% = ₦{(c5+a10).toLocaleString()}</small><br/><small>{j.description}</small>
<div style={{display:"flex",gap:6,marginTop:8,flexWrap:"wrap"}}>
<button onClick={()=>{if(!user)return alert("Login");setChatJob(j);}} style={{flex:1,padding:"10px",border:"none",borderRadius:8,background:"#0A1931",color:"#FFD700",fontWeight:"bold",fontSize:11}}>💬 Chat Inside CraftSure</button>
{!cp&&<button onClick={()=>payClient5(j)} style={{flex:1,padding:"10px",border:"none",borderRadius:8,background:"#FFD700",color:"#0A1931",fontWeight:"bold",fontSize:11}}>Client Pay 5% ₦{c5.toLocaleString()}</button>}
{cp&&!ap&&<button onClick={()=>payArtisan10(j)} style={{flex:1,padding:"10px",border:"none",borderRadius:8,background:"#1e3a8a",color:"#fff",fontWeight:"bold",fontSize:11}}>Artisan Pay 10% ₦{a10.toLocaleString()}</button>}
{unlocked&&<button onClick={()=>window.open(`https://wa.me/2348012345678?text=Paid for ${j.title}`,"_blank")} style={{flex:1,padding:"10px",border:"none",borderRadius:8,background:"#22c55e",color:"#fff",fontWeight:"bold",fontSize:11}}>WhatsApp Unlocked ✅</button>}
</div>
</div>
</div>
)})}
</div>}

{tab==="artisans"&&<div style={{padding:"12px"}}><h3>Artisans • Portfolio</h3>{arts.map(a=><div key={a.id} style={{background:"#fff",padding:"10px",borderRadius:12,marginBottom:"10px",display:"flex",gap:"10px",border:"1px solid #e5e7eb"}}>{a.portfolio&&<img src={a.portfolio} style={{width:60,height:60,borderRadius:10,objectFit:"cover"}} alt="port"/>}<div><b>{a.name}</b> <small style={{background:"#0A1931",color:"#FFD700",padding:"2px 6px",borderRadius:10,fontSize:9}}>{a.skill}</small><br/><small>📍 {a.location} • Pays 10% to accept jobs</small></div></div>)}</div>}

{tab==="post"&&<div style={{padding:"12px"}}><h3>Post Job - Split 5%+10%</h3><div style={{background:"#fff",padding:"12px",borderRadius:12}}><input value={jt} onChange={e=>setJt(e.target.value)} placeholder="Job Title" style={{width:"100%",padding:"10px",marginBottom:"8px",borderRadius:"8px",border:"1px solid #ddd"}}/><input value={jl} onChange={e=>setJl(e.target.value)} placeholder="Location" style={{width:"100%",padding:"10px",marginBottom:"8px",borderRadius:"8px",border:"1px solid #ddd"}}/><input value={jb} onChange={e=>setJb(e.target.value)} placeholder="Budget e.g. 80000" style={{width:"100%",padding:"10px",marginBottom:"8px",borderRadius:"8px",border:"1px solid #ddd"}}/><textarea value={jd} onChange={e=>setJd(e.target.value)} placeholder="Description" style={{width:"100%",padding:"10px",marginBottom:"8px",borderRadius:"8px",border:"1px solid #ddd",height:"70px"}}/><input type="file" accept="image/*" onChange={up} style={{marginBottom:"8px"}}/>{ji&&<img src={ji} style={{width:"100%",maxHeight:"180px",borderRadius:"10px",marginBottom:"8px"}} alt="prev"/>}<button onClick={postJob} style={{width:"100%",padding:"12px",background:"#0A1931",color:"#FFD700",border:"none",borderRadius:"10px",fontWeight:"bold"}}>Post Job - Client Pays 5% to Unlock</button></div></div>}

{tab==="join"&&<div style={{padding:"12px"}}><h3>Join as Artisan - Pay 10% per Job</h3><div style={{background:"#fff",padding:"12px",borderRadius:"12px"}}><input value={an} onChange={e=>setAn(e.target.value)} placeholder="Name" style={{width:"100%",padding:"10px",marginBottom:"8px",borderRadius:"8px",border:"1px solid #ddd"}}/><input value={askill} onChange={e=>setAskill(e.target.value)} placeholder="Skill" style={{width:"100%",padding:"10px",marginBottom:"8px",borderRadius:"8px",border:"1px solid #ddd"}}/><input value={aloc} onChange={e=>setAloc(e.target.value)} placeholder="Location" style={{width:"100%",padding:"10px",marginBottom:"8px",borderRadius:"8px",border:"1px solid #ddd"}}/><input value={awhat} onChange={e=>setAwhat(e.target.value)} placeholder="WhatsApp" style={{width:"100%",padding:"10px",marginBottom:"8px",borderRadius:"8px",border:"1px solid #ddd"}}/><input type="file" accept="image/*" onChange={upArt} style={{marginBottom:"8px"}}/>{aport&&<img src={aport} style={{width:"100%",maxHeight:"180px",borderRadius:"10px",marginBottom:"8px"}} alt="port"/>}<button onClick={postArt} style={{width:"100%",padding:"12px",background:"#22c55e",color:"#fff",border:"none",borderRadius:"10px",fontWeight:"bold"}}>Create Portfolio - Pay 10% to Accept Jobs Later</button></div></div>}

{tab==="login"&&<div style={{padding:"20px",display:"flex",justifyContent:"center"}}><div style={{background:"#fff",padding:"16px",borderRadius:12,width:"100%",maxWidth:"340px"}}><b>Login - Navy Gold Secure</b><input value={email} onChange={e=>setEmail(e.target.value)} placeholder="Email" style={{width:"100%",padding:"10px",marginTop:"10px",borderRadius:"8px",border:"1px solid #ddd"}}/><input type="password" value={pass} onChange={e=>setPass(e.target.value)} placeholder="Password" style={{width:"100%",padding:"10px",marginTop:"8px",borderRadius:"8px",border:"1px solid #ddd"}}/><button onClick={login} style={{width:"100%",padding:"11px",background:"#0A1931",color:"#FFD700",border:"none",borderRadius:"8px",fontWeight:"bold",marginTop:"10px"}}>Login</button><button onClick={signup} style={{width:"100%",padding:"11px",background:"#fff",color:"#0A1931",border:"1px solid #0A1931",borderRadius:"8px",fontWeight:"bold",marginTop:"8px"}}>Create Account</button></div></div>}

{tab==="admin"&&isAdmin&&<div style={{padding:"12px"}}>
<h2>💰 Admin - 5% Client + 10% Artisan = 15% - Navy Gold</h2>
<div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"10px",marginTop:"10px"}}>
<div style={{background:"#0A1931",color:"#fff",padding:"12px",borderRadius:12}}><small>Total Jobs</small><h2 style={{color:"#FFD700"}}>{jobs.length}</h2></div>
<div style={{background:"#fff",padding:"12px",borderRadius:12,border:"1px solid #ddd"}}><small>Total Budget</small><h2>₦{totalBudget.toLocaleString()}</h2></div>
<div style={{background:"#FFD700",color:"#0A1931",padding:"12px",borderRadius:12}}><small>Client 5% Earnings</small><h2>₦{client5Total.toLocaleString()}</h2><small>5% from clients</small></div>
<div style={{background:"#1e3a8a",color:"#fff",padding:"12px",borderRadius:12}}><small>Artisan 10% Earnings</small><h2>₦{artisan10Total.toLocaleString()}</h2><small>10% from artisans</small></div>
<div style={{background:"#22c55e",color:"#fff",padding:"12px",borderRadius:12,gridColumn:"span 2"}}><small>Your Total 15% Earnings (5%+10%)</small><h2>₦{earn15.toLocaleString()}</h2><small>Ad Revenue Est: ₦{adEarn.toLocaleString()} • Grand Total: ₦{(earn15+adEarn).toLocaleString()}</small></div>
</div>
<div style={{background:"#fff",padding:"12px",borderRadius:12,marginTop:"12px"}}>
<b>All Payments (Split):</b>{pays.map(p=><div key={p.id} style={{fontSize:11,borderBottom:"1px solid #eee",padding:"4px 0"}}>{p.payer_type} {p.percent_type} - Job {p.job_id} - ₦{p.amount} - {p.payer_email}</div>)}
</div>
</div>}

{tab==="chats"&&isAdmin&&<div style={{padding:"12px"}}><h2>👁️ All Chats - Admin Eyes Only</h2><div style={{background:"#fff",padding:"10px",borderRadius:12}}>{msgs.length===0?<small>No chats</small>:msgs.map(m=><div key={m.id} style={{borderBottom:"1px solid #eee",padding:"6px 0",fontSize:11}}><b>{m.sender}</b> Job {m.job_id}: {m.message} <small>{new Date(m.created_at).toLocaleTimeString()}</small></div>)}</div></div>}

{chatJob&&<div style={{position:"fixed",top:0,left:0,right:0,bottom:0,background:"#f5f7fb",zIndex:50,display:"flex",flexDirection:"column"}}>
<div style={{background:"#0A1931",color:"#fff",padding:"12px",display:"flex",justifyContent:"space-between",alignItems:"center"}}><div><b style={{color:"#FFD700"}}>Chat: {chatJob.title} - 5% Client + 10% Artisan</b><div style={{fontSize:10}}>Admin monitors • Pay to unlock WhatsApp</div></div><button onClick={()=>setChatJob(null)} style={{background:"#fff",border:"none",borderRadius:"50%",width:32,height:32}}>X</button></div>
<div style={{flex:1,overflowY:"auto",padding:"10px"}}>{msgs.filter(m=>m.job_id===chatJob.id).map(m=><div key={m.id} style={{background:m.sender===user.email?"#0A1931":"#fff",color:m.sender===user.email?"#FFD700":"#000",padding:"8px 10px",borderRadius:"12px",margin:"6px 0",maxWidth:"80%",marginLeft:m.sender===user.email?"auto":"0",fontSize:12,border:"1px solid #e5e7eb"}}><b style={{fontSize:9}}>{m.sender}</b><br/>{m.message}</div>)}</div>
<div style={{padding:"10px",background:"#fff",display:"flex",gap:"6px",borderTop:"1px solid #e5e7eb"}}><input value={chatTxt} onChange={e=>setChatTxt(e.target.value)} placeholder="Negotiate budget... Agree price..." style={{flex:1,padding:"10px",borderRadius:20,border:"1px solid #ddd"}}/><button onClick={sendMsg} style={{padding:"10px 16px",background:"#0A1931",color:"#FFD700",border:"none",borderRadius:20,fontWeight:"bold"}}>Send</button></div>
<div style={{padding:"8px",background:"#FFD700",display:"flex",gap:"6px"}}>
{!clientPaid(chatJob.id,user.email)&&chatJob.created_by===user.email&&<button onClick={()=>payClient5(chatJob)} style={{flex:1,padding:"8px",background:"#0A1931",color:"#FFD700",border:"none",borderRadius:8,fontWeight:"bold",fontSize:11}}>Pay 5% ₦{Math.floor(getBudget(chatJob.budget)*0.05).toLocaleString()} (Client)</button>}
{clientPaid(chatJob.id)&&!artisanPaid(chatJob.id,user.email)&&<button onClick={()=>payArtisan10(chatJob)} style={{flex:1,padding:"8px",background:"#1e3a8a",color:"#fff",border:"none",borderRadius:8,fontWeight:"bold",fontSize:11}}>Pay 10% ₦{Math.floor(getBudget(chatJob.budget)*0.10).toLocaleString()} (Artisan)</button>}
{bothPaid(chatJob.id)&&<div style={{flex:1,textAlign:"center",fontWeight:"bold",color:"#0A1931",fontSize:12}}>✅ Both Paid 5%+10% = WhatsApp Unlocked!</div>}
</div>
</div>}

{pv&&<div style={{position:"fixed",top:0,left:0,right:0,bottom:0,background:"rgba(0,0,0,0.96)",zIndex:100,display:"flex",flexDirection:"column"}}><div style={{display:"flex",justifyContent:"space-between",padding:"12px",color:"#fff"}}><b style={{color:"#FFD700"}}>Protected</b><button onClick={()=>setPv(null)} style={{background:"#fff",border:"none",borderRadius:"50%",width:32,height:32}}>X</button></div><div style={{flex:1,display:"flex",alignItems:"center",justifyContent:"center"}}><img src={pv} style={{maxWidth:"95%",maxHeight:"80vh",borderRadius:"8px"}} alt="full"/></div></div>}
</div>
)
  }
