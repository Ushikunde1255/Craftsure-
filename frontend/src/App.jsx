import {useState,useEffect} from "react";
import {createClient} from "@supabase/supabase-js";
const supa=createClient("https://unzohyrabvouclsjcpfu.supabase.co","sb_publishable_zB3k0KebVFw4-xf_TtdaUw_UlHsXk_q");
const ADMIN="nicholasu9@gmail.com";
const LOGO="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Ccircle cx='50' cy='50' r='48' fill='%230A1931'/%3E%3Cpath d='M30 28 L45 28 L42 42 L32 50 L18 38 Z M55 42 L62 48 L38 78 L30 78 L22 70 L30 62 L40 62 L55 42 Z M70 22 C78 22 86 28 86 38 C86 44 83 48 78 50 L62 56 L58 40 L64 36 C62 32 64 26 70 22 Z' fill='%23FFD700'/%3E%3C/svg%3E";

export default function App(){
const [tab,setTab]=useState("home");const [user,setUser]=useState(JSON.parse(localStorage.getItem("cs_user")||"null"));
const [email,setEmail]=useState("");const [pass,setPass]=useState("");
const [jobs,setJobs]=useState([]);const [arts,setArts]=useState([]);const [msgs,setMsgs]=useState([]);const [pays,setPays]=useState([]);const [hires,setHires]=useState([]);
const [jt,setJt]=useState("");const [jl,setJl]=useState("");const [jb,setJb]=useState("");const [jd,setJd]=useState("");const [ji,setJi]=useState("");const [pv,setPv]=useState(null);
const [an,setAn]=useState("");const [askill,setAskill]=useState("");const [aloc,setAloc]=useState("");const [awhat,setAwhat]=useState("");const [aport,setAport]=useState("");
const [chatJob,setChatJob]=useState(null);const [chatTxt,setChatTxt]=useState("");const [payModal,setPayModal]=useState(null);

const load=async()=>{
const {data:j}=await supa.from("jobs").select("*").order("id",{ascending:false});if(j)setJobs(j);
const {data:a}=await supa.from("artisans").select("*").order("id",{ascending:false});if(a)setArts(a);
const {data:m}=await supa.from("messages").select("*").order("id",{ascending:false}).limit(100);if(m)setMsgs(m);
const {data:p}=await supa.from("payments").select("*").order("id",{ascending:false});if(p)setPays(p);
const {data:h}=await supa.from("hires").select("*").order("id",{ascending:false});if(h)setHires(h);
};
useEffect(()=>{load();const t=setInterval(load,4000);return()=>clearInterval(t);},[]);

const signup=async()=>{const {error}=await supa.auth.signUp({email,password:pass});if(error)return alert(error.message);const u={email,role:email===ADMIN?"admin":"user"};localStorage.setItem("cs_user",JSON.stringify(u));setUser(u);setTab("home");};
const login=async()=>{const {error}=await supa.auth.signInWithPassword({email,password:pass});if(error)return alert(error.message);const u={email,role:email===ADMIN?"admin":"user"};localStorage.setItem("cs_user",JSON.stringify(u));setUser(u);setTab("home");};
const up=e=>{const f=e.target.files[0];if(!f)return;const r=new FileReader();r.onload=v=>setJi(v.target.result);r.readAsDataURL(f);};
const upArt=e=>{const f=e.target.files[0];if(!f)return;const r=new FileReader();r.onload=v=>setAport(v.target.result);r.readAsDataURL(f);};

const postJob=async()=>{if(!user)return alert("Login");await supa.from("jobs").insert([{title:jt,location:jl,budget:jb,description:jd,image_url:ji,created_by:user.email}]);setJt("");setJl("");setJb("");setJd("");setJi("");load();setTab("home");};
const postArt=async()=>{if(!user)return alert("Login");await supa.from("artisans").insert([{name:an,skill:askill,location:aloc,whatsapp:awhat,portfolio:aport,created_by:user.email,verified:false}]);load();setTab("artisans");};
const sendMsg=async()=>{if(!chatTxt)return;await supa.from("messages").insert([{job_id:chatJob.id,sender:user.email,message:chatTxt}]);setChatTxt("");load();};
const delJob=async(id)=>{if(!confirm("Delete this job? Only you can delete your own job."))return;await supa.from("jobs").delete().eq("id",id);load();};
const hireArtisan=async(artisanEmail,artisanName)=>{
if(!chatJob)return;
if(!confirm(`Hire ${artisanName} for ${chatJob.title}? This will mark job as hired.`))return;
await supa.from("hires").insert([{job_id:chatJob.id,client_email:user.email,artisan_email:artisanEmail,artisan_name:artisanName,status:"hired"}]);
alert(`Hired ${artisanName}! Now pay service fee to unlock contact.`);load();
};

const getBudget=(b)=>{let n=parseInt((b||"").replace(/[^0-9]/g,""))||0;if((b||"").toLowerCase().includes("k"))n=n*1000;return n;};
const hasPaid=(jobId,type)=>pays.some(p=>p.job_id===jobId&&p.percent_type===type);
const clientPaid=(jobId)=>hasPaid(jobId,"5%_client");
const artisanPaid=(jobId)=>hasPaid(jobId,"10%_artisan");
const bothPaid=(jobId)=>clientPaid(jobId)&&artisanPaid(jobId);
const isHired=(jobId)=>hires.find(h=>h.job_id===jobId);

const openPay=(job,type)=>{
const b=getBudget(job.budget);const fee=type==="client"?Math.floor(b*0.05):Math.floor(b*0.10);
const total=type==="client"?b+fee:fee;
setPayModal({job,type,budget:b,fee,total});
};
const confirmPay=async()=>{
if(!payModal)return;
await supa.from("payments").insert([{job_id:payModal.job.id,payer_email:user.email,payer_type:payModal.type,amount:payModal.fee,percent_type:payModal.type==="client"?"5%_client":"10%_artisan",status:"paid"}]);
setPayModal(null);load();
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
<div style={{display:"flex",alignItems:"center",gap:"8px"}}><img src={LOGO} style={{width:38,height:38,borderRadius:"50%",background:"#fff",padding:"2px"}} alt="logo"/><div><b style={{fontSize:16}}>CraftSure</b><div style={{fontSize:9,color:"#FFD700"}}>Nigeria • Verified Artisans</div></div></div>
<div style={{display:"flex",gap:"4px",flexWrap:"wrap"}}>
<button onClick={()=>setTab("home")} style={{padding:"6px 10px",borderRadius:8,border:"none",background:tab==="home"?"#fff":"#1e3a8a",color:tab==="home"?"#0A1931":"#fff",fontSize:11}}>Home</button>
<button onClick={()=>setTab("artisans")} style={{padding:"6px 10px",borderRadius:8,border:"none",background:tab==="artisans"?"#fff":"#1e3a8a",color:tab==="artisans"?"#0A1931":"#fff",fontSize:11}}>Artisans</button>
{isAdmin&&<button onClick={()=>setTab("admin")} style={{padding:"6px 10px",borderRadius:8,border:"none",background:"#ef4444",color:"#fff",fontSize:11,fontWeight:"bold"}}>Admin 💰</button>}
{isAdmin&&<button onClick={()=>setTab("chats")} style={{padding:"6px 10px",borderRadius:8,border:"none",background:"#FFD700",color:"#0A1931",fontSize:11,fontWeight:"bold"}}>Chats 👁️</button>}
<button onClick={()=>setTab("post")} style={{padding:"6px 10px",borderRadius:8,border:"none",background:"#FFD700",color:"#0A1931",fontWeight:"bold",fontSize:11}}>Post Job</button>
{user?<button onClick={()=>{localStorage.removeItem("cs_user");setUser(null);}} style={{padding:"6px 8px",borderRadius:8,border:"none",background:"#fff",fontSize:10}}>{user.email.slice(0,5)} Out</button>:<button onClick={()=>setTab("login")} style={{padding:"6px 10px",borderRadius:8,border:"none",background:"#fff",color:"#0A1931",fontWeight:"bold",fontSize:11}}>Login</button>}
</div>
</div>

{tab==="home"&&<div>
<div style={{padding:"10px 15px"}}><b>Jobs ({jobs.length})</b><div style={{fontSize:10,color:"#666"}}>Chat to hire • Service fee at checkout</div></div>
{jobs.map(j=>{
const b=getBudget(j.budget);const hired=isHired(j.id);const unlocked=bothPaid(j.id);
return(
<div key={j.id} style={{background:"#fff",margin:"10px 15px",borderRadius:12,overflow:"hidden",border:"1px solid #e5e7eb",opacity:hired?"0.9":"1"}}>
{j.image_url&&<div style={{position:"relative"}} onClick={()=>setPv(j.image_url)}><img src={j.image_url} style={{width:"100%",height:180,objectFit:"cover"}} alt="job"/><div style={{position:"absolute",top:8,right:8,display:"flex",gap:"6px"}}>
{hired&&<span style={{background:"#0A1931",color:"#FFD700",padding:"4px 8px",borderRadius:20,fontSize:9,fontWeight:"bold"}}>Hired: {hired.artisan_name}</span>}
{user?.email===j.created_by&&<button onClick={(e)=>{e.stopPropagation();delJob(j.id);}} style={{background:"#fee2e2",color:"#ef4444",border:"none",borderRadius:"50%",width:28,height:28,fontSize:14}}>🗑️</button>}
</div><div style={{position:"absolute",bottom:0,left:0,right:0,background:"rgba(10,25,49,0.75)",color:"#FFD700",padding:"5px 8px",fontSize:9,display:"flex",justifyContent:"space-between"}}><span>🔒 Verified</span><span>₦{b.toLocaleString()}</span></div></div>}
<div style={{padding:"10px"}}>
<div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}><b>{j.title}</b><div style={{display:"flex",gap:4}}>{hired&&<small style={{background:"#22c55e",color:"#fff",padding:"2px 6px",borderRadius:10,fontSize:8}}>HIRED</small>}{unlocked&&<small style={{background:"#0A1931",color:"#FFD700",padding:"2px 6px",borderRadius:10,fontSize:8}}>UNLOCKED</small>}</div></div>
<small>📍 {j.location} • 💰 ₦{b.toLocaleString()}</small><br/><small style={{color:"#555"}}>{j.description}</small>
<div style={{display:"flex",gap:6,marginTop:8}}>
<button onClick={()=>{if(!user)return alert("Login");setChatJob(j);}} style={{flex:1,padding:"10px",border:"none",borderRadius:8,background:"#0A1931",color:"#FFD700",fontWeight:"bold",fontSize:11}}>💬 Chat to Hire</button>
{!clientPaid(j.id)&&<button onClick={()=>openPay(j,"client")} style={{flex:1,padding:"10px",border:"none",borderRadius:8,background:"#FFD700",color:"#0A1931",fontWeight:"bold",fontSize:11}}>Unlock Contact</button>}
{unlocked&&<button onClick={()=>window.open(`https://wa.me/2348012345678?text=Hired for ${j.title}`,"_blank")} style={{flex:1,padding:"10px",border:"none",borderRadius:8,background:"#22c55e",color:"#fff",fontWeight:"bold",fontSize:11}}>WhatsApp ✅</button>}
</div>
</div>
</div>
)})}
</div>}

{tab==="artisans"&&<div style={{padding:"12px"}}><h3>Artisans • Portfolio</h3>{arts.map(a=><div key={a.id} style={{background:"#fff",padding:"10px",borderRadius:12,marginBottom:"10px",display:"flex",gap:"10px",border:"1px solid #e5e7eb"}}>{a.portfolio&&<img src={a.portfolio} style={{width:60,height:60,borderRadius:10,objectFit:"cover"}} alt="port"/>}<div style={{flex:1}}><b>{a.name}</b> <small style={{background:"#0A1931",color:"#FFD700",padding:"2px 6px",borderRadius:10,fontSize:9}}>{a.skill}</small><br/><small>📍 {a.location}</small><br/><small style={{fontSize:10,color:"#666"}}>{a.created_by}</small></div><button onClick={()=>{if(!user)return alert("Login");const job=jobs[0];if(job){setChatJob(job);hireArtisan(a.created_by,a.name);}}} style={{padding:"6px 10px",background:"#0A1931",color:"#FFD700",border:"none",borderRadius:8,fontSize:9,height:"30px"}}>Quick Hire</button></div>)}</div>}

{tab==="post"&&<div style={{padding:"12px"}}><h3>Post a Job</h3><div style={{background:"#fff",padding:"12px",borderRadius:12}}><input value={jt} onChange={e=>setJt(e.target.value)} placeholder="Job Title" style={{width:"100%",padding:"10px",marginBottom:"8px",borderRadius:"8px",border:"1px solid #ddd"}}/><input value={jl} onChange={e=>setJl(e.target.value)} placeholder="Location" style={{width:"100%",padding:"10px",marginBottom:"8px",borderRadius:"8px",border:"1px solid #ddd"}}/><input value={jb} onChange={e=>setJb(e.target.value)} placeholder="Budget e.g. 80000" style={{width:"100%",padding:"10px",marginBottom:"8px",borderRadius:"8px",border:"1px solid #ddd"}}/><textarea value={jd} onChange={e=>setJd(e.target.value)} placeholder="Description" style={{width:"100%",padding:"10px",marginBottom:"8px",borderRadius:"8px",border:"1px solid #ddd",height:"70px"}}/><input type="file" accept="image/*" onChange={up} style={{marginBottom:"8px"}}/>{ji&&<img src={ji} style={{width:"100%",maxHeight:"180px",borderRadius:"10px",marginBottom:"8px"}} alt="prev"/>}<button onClick={postJob} style={{width:"100%",padding:"12px",background:"#0A1931",color:"#FFD700",border:"none",borderRadius:"10px",fontWeight:"bold"}}>Post Job</button><small style={{display:"block",textAlign:"center",marginTop:"6px",color:"#666",fontSize:10}}>Service fee applies at checkout</small></div></div>}

{tab==="join"&&<div style={{padding:"12px"}}><h3>Join as Artisan</h3><div style={{background:"#fff",padding:"12px",borderRadius:"12px"}}><input value={an} onChange={e=>setAn(e.target.value)} placeholder="Full Name" style={{width:"100%",padding:"10px",marginBottom:"8px",borderRadius:"8px",border:"1px solid #ddd"}}/><input value={askill} onChange={e=>setAskill(e.target.value)} placeholder="Skill" style={{width:"100%",padding:"10px",marginBottom:"8px",borderRadius:"8px",border:"1px solid #ddd"}}/><input value={aloc} onChange={e=>setAloc(e.target.value)} placeholder="Location" style={{width:"100%",padding:"10px",marginBottom:"8px",borderRadius:"8px",border:"1px solid #ddd"}}/><input value={awhat} onChange={e=>setAwhat(e.target.value)} placeholder="WhatsApp" style={{width:"100%",padding:"10px",marginBottom:"8px",borderRadius:"8px",border:"1px solid #ddd"}}/><input type="file" accept="image/*" onChange={upArt} style={{marginBottom:"8px"}}/>{aport&&<img src={aport} style={{width:"100%",maxHeight:"180px",borderRadius:"10px",marginBottom:"8px"}} alt="port"/>}<button onClick={postArt} style={{width:"100%",padding:"12px",background:"#22c55e",color:"#fff",border:"none",borderRadius:"10px",fontWeight:"bold"}}>Create Portfolio</button></div></div>}

{tab==="login"&&<div style={{padding:"20px",display:"flex",justifyContent:"center"}}><div style={{background:"#fff",padding:"16px",borderRadius:12,width:"100%",maxWidth:"340px"}}><b>Login - Secure</b><input value={email} onChange={e=>setEmail(e.target.value)} placeholder="Email" style={{width:"100%",padding:"10px",marginTop:"10px",borderRadius:"8px",border:"1px solid #ddd"}}/><input type="password" value={pass} onChange={e=>setPass(e.target.value)} placeholder="Password" style={{width:"100%",padding:"10px",marginTop:"8px",borderRadius:"8px",border:"1px solid #ddd"}}/><button onClick={login} style={{width:"100%",padding:"11px",background:"#0A1931",color:"#FFD700",border:"none",borderRadius:"8px",fontWeight:"bold",marginTop:"10px"}}>Login</button><button onClick={signup} style={{width:"100%",padding:"11px",background:"#fff",color:"#0A1931",border:"1px solid #0A1931",borderRadius:"8px",fontWeight:"bold",marginTop:"8px"}}>Create Account</button></div></div>}

{tab==="admin"&&isAdmin&&<div style={{padding:"12px"}}>
<h2>💰 Admin Revenue (Only You)</h2>
<div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"10px",marginTop:"10px"}}>
<div style={{background:"#0A1931",color:"#fff",padding:"12px",borderRadius:12}}><small>Total Jobs</small><h2 style={{color:"#FFD700"}}>{jobs.length}</h2></div>
<div style={{background:"#fff",padding:"12px",borderRadius:12,border:"1px solid #ddd"}}><small>Hired Jobs</small><h2>{hires.length}</h2></div>
<div style={{background:"#FFD700",color:"#0A1931",padding:"12px",borderRadius:12}}><small>Client Fees (5%)</small><h2>₦{client5Total.toLocaleString()}</h2></div>
<div style={{background:"#1e3a8a",color:"#fff",padding:"12px",borderRadius:12}}><small>Artisan Fees (10%)</small><h2>₦{artisan10Total.toLocaleString()}</h2></div>
<div style={{background:"#22c55e",color:"#fff",padding:"12px",borderRadius:12,gridColumn:"span 2"}}><small>Total 15%</small><h2>₦{earn15.toLocaleString()}</h2></div>
</div>
<div style={{background:"#fff",padding:"12px",borderRadius:12,marginTop:"12px"}}>
<b>Hires:</b>{hires.map(h=><div key={h.id} style={{fontSize:11,borderBottom:"1px solid #eee",padding:"4px 0"}}>Job {h.job_id} - {h.artisan_name} hired by {h.client_email}</div>)}
</div>
<div style={{background:"#fff",padding:"12px",borderRadius:12,marginTop:"8px"}}>
<b>Payments:</b>{pays.map(p=><div key={p.id} style={{fontSize:11,borderBottom:"1px solid #eee",padding:"4px 0"}}>{p.payer_type} {p.percent_type} - Job {p.job_id} - ₦{p.amount}</div>)}
</div>
</div>}

{tab==="chats"&&isAdmin&&<div style={{padding:"12px"}}><h2>👁️ All Chats</h2><div style={{background:"#fff",padding:"10px",borderRadius:12}}>{msgs.map(m=><div key={m.id} style={{borderBottom:"1px solid #eee",padding:"6px 0",fontSize:11}}><b>{m.sender}</b> Job {m.job_id}: {m.message}</div>)}</div></div>}

{chatJob&&<div style={{position:"fixed",top:0,left:0,right:0,bottom:0,background:"#f5f7fb",zIndex:50,display:"flex",flexDirection:"column"}}>
<div style={{background:"#0A1931",color:"#fff",padding:"12px",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
<div><b style={{color:"#FFD700"}}>Chat: {chatJob.title}</b><div style={{fontSize:10}}>Chat to hire • Admin monitors</div>{isHired(chatJob.id)&&<div style={{fontSize:10,color:"#22c55e"}}>Hired: {isHired(chatJob.id).artisan_name}</div>}</div>
<button onClick={()=>setChatJob(null)} style={{background:"#fff",border:"none",borderRadius:"50%",width:32,height:32}}>X</button>
</div>
<div style={{flex:1,overflowY:"auto",padding:"10px"}}>
{msgs.filter(m=>m.job_id===chatJob.id).map(m=>(
<div key={m.id} style={{background:m.sender===user.email?"#0A1931":"#fff",color:m.sender===user.email?"#FFD700":"#000",padding:"8px 10px",borderRadius:"12px",margin:"6px 0",maxWidth:"85%",marginLeft:m.sender===user.email?"auto":"0",fontSize:12,border:"1px solid #e5e7eb"}}>
<div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}><b style={{fontSize:9}}>{m.sender}</b>{chatJob.created_by===user.email&&m.sender!==user.email&&<button onClick={()=>hireArtisan(m.sender,m.sender.split("@")[0])} style={{background:"#FFD700",color:"#0A1931",border:"none",borderRadius:6,padding:"2px 6px",fontSize:8,fontWeight:"bold"}}>Hire</button>}</div>
<div style={{marginTop:"4px"}}>{m.message}</div>
</div>
))}
</div>
<div style={{padding:"10px",background:"#fff",display:"flex",gap:"6px",borderTop:"1px solid #e5e7eb"}}><input value={chatTxt} onChange={e=>setChatTxt(e.target.value)} placeholder="Negotiate..." style={{flex:1,padding:"10px",borderRadius:20,border:"1px solid #ddd"}}/><button onClick={sendMsg} style={{padding:"10px 16px",background:"#0A1931",color:"#FFD700",border:"none",borderRadius:20,fontWeight:"bold"}}>Send</button></div>
<div style={{padding:"8px",background:"#FFD700",display:"flex",gap:"6px",justifyContent:"center"}}>
{!isHired(chatJob.id)&&chatJob.created_by===user.email&&<small style={{fontSize:10,color:"#0A1931"}}>💡 Tip: Click Hire button on artisan message to hire them</small>}
{isHired(chatJob.id)&&!clientPaid(chatJob.id)&&<button onClick={()=>openPay(chatJob,"client")} style={{flex:1,padding:"8px",background:"#0A1931",color:"#FFD700",border:"none",borderRadius:8,fontWeight:"bold",fontSize:11}}>Pay Service Fee to Unlock Contact</button>}
{isHired(chatJob.id)&&clientPaid(chatJob.id)&&!artisanPaid(chatJob.id)&&<small style={{fontSize:10,color:"#0A1931",fontWeight:"bold"}}>Waiting for artisan to pay 10% service fee...</small>}
{bothPaid(chatJob.id)&&<small style={{fontSize:11,fontWeight:"bold",color:"#0A1931"}}>✅ Hired & Paid - WhatsApp Unlocked!</small>}
</div>
</div>}

{payModal&&<div style={{position:"fixed",top:0,left:0,right:0,bottom:0,background:"rgba(0,0,0,0.6)",zIndex:60,display:"flex",alignItems:"center",justifyContent:"center",padding:"15px"}}>
<div style={{background:"#fff",borderRadius:16,width:"100%",maxWidth:"360px",overflow:"hidden"}}>
<div style={{background:"#0A1931",color:"#fff",padding:"14px"}}><b style={{color:"#FFD700"}}>{payModal.type==="client"?"Checkout - Client":"Checkout - Artisan"}</b></div>
<div style={{padding:"14px"}}>
<div style={{display:"flex",justifyContent:"space-between",marginBottom:"8px"}}><span>Budget</span><b>₦{payModal.budget.toLocaleString()}</b></div>
<div style={{display:"flex",justifyContent:"space-between",marginBottom:"8px",color:"#666",fontSize:12}}><span>Service Fee ({payModal.type==="client"?"5%":"10%"} Maintenance)</span><span>₦{payModal.fee.toLocaleString()}</span></div>
<div style={{borderTop:"1px dashed #ddd",margin:"10px 0"}}></div>
<div style={{display:"flex",justifyContent:"space-between",fontWeight:"bold",fontSize:16}}><span>Total</span><span>₦{payModal.type==="client"?payModal.total.toLocaleString():payModal.fee.toLocaleString()}</span></div>
<button onClick={confirmPay} style={{width:"100%",marginTop:"12px",padding:"12px",background:"#0A1931",color:"#FFD700",border:"none",borderRadius:10,fontWeight:"bold"}}>Pay via Paystack</button>
<button onClick={()=>setPayModal(null)} style={{width:"100%",marginTop:"8px",padding:"10px",background:"#fff",color:"#0A1931",border:"1px solid #ddd",borderRadius:10}}>Cancel</button>
</div>
</div>
</div>}

{pv&&<div style={{position:"fixed",top:0,left:0,right:0,bottom:0,background:"rgba(0,0,0,0.96)",zIndex:100,display:"flex",flexDirection:"column"}}><div style={{display:"flex",justifyContent:"space-between",padding:"12px",color:"#fff"}}><b style={{color:"#FFD700"}}>Protected</b><button onClick={()=>setPv(null)} style={{background:"#fff",border:"none",borderRadius:"50%",width:32,height:32}}>X</button></div><div style={{flex:1,display:"flex",alignItems:"center",justifyContent:"center"}}><img src={pv} style={{maxWidth:"95%",maxHeight:"80vh",borderRadius:"8px"}} alt="full"/></div></div>}
</div>
)
                                                                }
