import {useState,useEffect} from "react";
import {createClient} from "@supabase/supabase-js";
const supa=createClient("https://unzohyrabvouclsjcpfu.supabase.co","sb_publishable_zB3k0KebVFw4-xf_TtdaUw_UlHsXk_q");
const ADMIN="nicholasu9@gmail.com";
const LOGO="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Ccircle cx='50' cy='50' r='48' fill='%230A1931'/%3E%3Cpath d='M30 28 L45 28 L42 42 L32 50 L18 38 Z M55 42 L62 48 L38 78 L30 78 L22 70 L30 62 L40 62 L55 42 Z M70 22 C78 22 86 28 86 38 C86 44 83 48 78 50 L62 56 L58 40 L64 36 C62 32 64 26 70 22 Z' fill='%23FFD700'/%3E%3C/svg%3E";

export default function App(){
const [tab,setTab]=useState("home");
const [user,setUser]=useState(JSON.parse(localStorage.getItem("cs_user")||"null"));
const [email,setEmail]=useState("");
const [pass,setPass]=useState("");
const [jobs,setJobs]=useState([]);
const [arts,setArts]=useState([]);
const [jt,setJt]=useState("");const [jl,setJl]=useState("");
const [jb,setJb]=useState("");const [jd,setJd]=useState("");
const [ji,setJi]=useState("");const [pv,setPv]=useState(null);
const [an,setAn]=useState("");const [askill,setAskill]=useState("");
const [aloc,setAloc]=useState("");const [awhat,setAwhat]=useState("");
const [aport,setAport]=useState("");

const load=async()=>{
const {data:j}=await supa.from("jobs").select("*").order("id",{ascending:false});
if(j)setJobs(j);
const {data:a}=await supa.from("artisans").select("*").order("id",{ascending:false});
if(a)setArts(a);
};
useEffect(()=>{load();},[]);

const signup=async()=>{
if(!email||!pass)return alert("Email & password needed");
const {data,error}=await supa.auth.signUp({email,password:pass});
if(error)return alert(error.message);
const u={email,role:email===ADMIN?"admin":"user"};
localStorage.setItem("cs_user",JSON.stringify(u));setUser(u);alert("Account created! Login now");
};
const login=async()=>{
if(!email||!pass)return alert("Enter email & password");
const {data,error}=await supa.auth.signInWithPassword({email,password:pass});
if(error)return alert(error.message);
const u={email,role:email===ADMIN?"admin":"user"};
localStorage.setItem("cs_user",JSON.stringify(u));setUser(u);setTab("home");
};

const up=e=>{
const f=e.target.files[0];if(!f)return;
const r=new FileReader();r.onload=v=>setJi(v.target.result);r.readAsDataURL(f);
};
const upArt=e=>{
const f=e.target.files[0];if(!f)return;
const r=new FileReader();r.onload=v=>setAport(v.target.result);r.readAsDataURL(f);
};

const postJob=async()=>{
if(!user)return alert("Login with password first!");
if(!jt||!jl)return alert("Title+Location");
const {error}=await supa.from("jobs").insert([{title:jt,location:jl,budget:jb,description:jd,image_url:ji,created_by:user.email}]);
if(error)alert(error.message);else{setJt("");setJl("");setJb("");setJd("");setJi("");load();setTab("home");}
};
const postArt=async()=>{
if(!user)return alert("Login first");
if(!an||!askill)return alert("Name+Skill");
const {error}=await supa.from("artisans").insert([{name:an,skill:askill,location:aloc,whatsapp:awhat,portfolio:aport,created_by:user.email,verified:false}]);
if(error){ // if table not exist, use local
alert("Artisan table not created yet - Creating local portfolio");
setArts([{id:Date.now(),name:an,skill:askill,location:aloc,whatsapp:awhat,portfolio:aport,verified:false},...arts]);
}else{load();setTab("artisans");}
setAn("");setAskill("");setAloc("");setAwhat("");setAport("");
};
const delJob=async(id)=>{if(!confirm("Delete?"))return;await supa.from("jobs").delete().eq("id",id);load();};

// REVENUE CALC - Only admin sees
const totalBudget=jobs.reduce((s,j)=>{let n=parseInt((j.budget||"0").replace(/[^0-9]/g,""))||0;return s+n;},0);
const earn15=Math.floor(totalBudget*0.15);
const adEarn=jobs.length*500; // N500 per job ad view estimate

const isAdmin=user?.email===ADMIN||user?.role==="admin";

return(
<div style={{background:"#f5f7fb",minHeight:"100vh",fontFamily:"sans-serif"}}>
<div style={{background:"#0A1931",color:"#fff",padding:"10px 12px",display:"flex",justifyContent:"space-between",alignItems:"center",position:"sticky",top:0,zIndex:10}}>
<div style={{display:"flex",alignItems:"center",gap:"8px"}}>
<img src={LOGO} style={{width:38,height:38,borderRadius:"50%",background:"#fff",padding:"2px"}} alt="logo"/>
<div><b style={{fontSize:16}}>CraftSure</b><div style={{fontSize:8,color:"#FFD700"}}>Nigeria • Verified Artisans</div></div>
</div>
<div style={{display:"flex",gap:4,flexWrap:"wrap"}}>
<button onClick={()=>setTab("home")} style={{padding:"6px 10px",borderRadius:8,border:"none",background:tab==="home"?"#fff":"#1e3a8a",color:tab==="home"?"#0A1931":"#fff",fontSize:11}}>Home</button>
<button onClick={()=>setTab("artisans")} style={{padding:"6px 10px",borderRadius:8,border:"none",background:tab==="artisans"?"#fff":"#1e3a8a",color:tab==="artisans"?"#0A1931":"#fff",fontSize:11}}>Artisans</button>
<button onClick={()=>setTab("post")} style={{padding:"6px 10px",borderRadius:8,border:"none",background:"#FFD700",color:"#0A1931",fontWeight:"bold",fontSize:11}}>Post Job</button>
<button onClick={()=>setTab("join")} style={{padding:"6px 10px",borderRadius:8,border:"none",background:"#22c55e",color:"#fff",fontSize:11}}>Join as Artisan</button>
{isAdmin&&<button onClick={()=>setTab("admin")} style={{padding:"6px 10px",borderRadius:8,border:"none",background:"#ef4444",color:"#fff",fontSize:11,fontWeight:"bold"}}>Admin 💰</button>}
{user?<button onClick={()=>{supa.auth.signOut();localStorage.removeItem("cs_user");setUser(null);}} style={{padding:"6px 8px",borderRadius:8,border:"none",background:"#fff",color:"#0A1931",fontSize:10}}>{user.email.slice(0,6)} Out</button>:<button onClick={()=>setTab("login")} style={{padding:"6px 10px",borderRadius:8,border:"none",background:"#fff",color:"#0A1931",fontWeight:"bold",fontSize:11}}>Login</button>}
</div>
</div>

{tab==="home"&&<div>
<div style={{padding:"12px 15px"}}>
<b>Jobs ({jobs.length}) Live • Portfolio Protected</b>
<div style={{fontSize:10,color:"#666"}}>Client posts → Artisan applies → You earn 15%</div>
</div>
{jobs.map(j=><div key={j.id} style={{background:"#fff",margin:"10px 15px",borderRadius:12,overflow:"hidden",border:"1px solid #e5e7eb"}}>
{j.image_url&&<div style={{position:"relative"}} onClick={()=>setPv(j.image_url)}>
<img src={j.image_url} style={{width:"100%",height:200,objectFit:"cover"}} alt="job"/>
<div style={{position:"absolute",bottom:0,left:0,right:0,background:"rgba(10,25,49,0.8)",color:"#FFD700",padding:"5px 8px",fontSize:9,display:"flex",justifyContent:"space-between"}}><span>🔒 CraftSure Protected</span><span>15% Secured</span></div>
</div>}
<div style={{padding:"10px"}}>
<div style={{display:"flex",justifyContent:"space-between"}}><b>{j.title}</b>{user?.email===j.created_by&&<button onClick={()=>delJob(j.id)} style={{border:"none",background:"#fee2e2",color:"#ef4444",borderRadius:6,padding:"2px 6px",fontSize:9}}>Delete</button>}</div>
<small>📍 {j.location} • 💰 {j.budget} • 15% = ₦{Math.floor((parseInt((j.budget||"0").replace(/[^0-9]/g,""))||0)*0.15)}</small><br/>
<small>{j.description}</small><br/>
<div style={{display:"flex",gap:6,marginTop:8}}>
<button onClick={()=>{if(!user)return alert("Login to contact");window.open(`https://wa.me/234${j.created_by?.replace(/\D/g,"").slice(-10)}?text=Hi, I want to apply for ${j.title} on CraftSure`,"_blank");}} style={{flex:1,padding:"8px",border:"none",borderRadius:8,background:"#22c55e",color:"#fff",fontWeight:"bold",fontSize:11}}>Apply via WhatsApp</button>
<button onClick={()=>setPv(j.image_url)} style={{padding:"8px 12px",borderRadius:8,border:"1px solid #0A1931",background:"#fff",fontSize:11}}>View</button>
</div>
</div>
</div>)}
</div>}

{tab==="artisans"&&<div style={{padding:"12px"}}>
<h3>Verified Artisans ({arts.length}) • Portfolio</h3>
{arts.map(a=><div key={a.id} style={{background:"#fff",padding:"10px",borderRadius:12,marginBottom:"10px",border:"1px solid #e5e7eb",display:"flex",gap:"10px"}}>
{a.portfolio&&<img src={a.portfolio} style={{width:70,height:70,borderRadius:10,objectFit:"cover"}} alt="port"/>}
<div style={{flex:1}}>
<b>{a.name} {a.verified&&"✅"}</b> <small style={{background:"#0A1931",color:"#FFD700",padding:"2px 6px",borderRadius:10,fontSize:9}}>{a.skill}</small><br/>
<small>📍 {a.location}</small><br/>
<button onClick={()=>window.open(`https://wa.me/${a.whatsapp}?text=Hi ${a.name}, I saw you on CraftSure`,"_blank")} style={{marginTop:"5px",padding:"6px 10px",background:"#22c55e",color:"#fff",border:"none",borderRadius:8,fontSize:10}}>Chat on WhatsApp</button>
</div>
</div>)}
</div>}

{tab==="post"&&<div style={{padding:"12px"}}><h3>Post Job - Client pays 15% to CraftSure</h3>
<div style={{background:"#fff",padding:"12px",borderRadius:12}}>
<input value={jt} onChange={e=>setJt(e.target.value)} placeholder="Job Title * e.g. Tiler" style={{width:"100%",padding:"10px",marginBottom:"8px",borderRadius:"8px",border:"1px solid #ddd"}}/>
<input value={jl} onChange={e=>setJl(e.target.value)} placeholder="Location * Ojo Lagos" style={{width:"100%",padding:"10px",marginBottom:"8px",borderRadius:"8px",border:"1px solid #ddd"}}/>
<input value={jb} onChange={e=>setJb(e.target.value)} placeholder="Budget * 80k (15% = your profit)" style={{width:"100%",padding:"10px",marginBottom:"8px",borderRadius:"8px",border:"1px solid #ddd"}}/>
<textarea value={jd} onChange={e=>setJd(e.target.value)} placeholder="Description *" style={{width:"100%",padding:"10px",marginBottom:"8px",borderRadius:"8px",border:"1px solid #ddd",height:"70px"}}/>
<input type="file" accept="image/*" onChange={up} style={{marginBottom:"8px"}}/>
{ji&&<img src={ji} style={{width:"100%",maxHeight:"180px",borderRadius:"10px",marginBottom:"8px"}} alt="prev"/>}
<button onClick={postJob} style={{width:"100%",padding:"12px",background:"#0A1931",color:"#FFD700",border:"none",borderRadius:"10px",fontWeight:"bold"}}>Post Job - Live DB</button>
</div></div>}

{tab==="join"&&<div style={{padding:"12px"}}><h3>Join as Artisan - Create Portfolio</h3>
<div style={{background:"#fff",padding:"12px",borderRadius:"12px"}}>
<input value={an} onChange={e=>setAn(e.target.value)} placeholder="Full Name *" style={{width:"100%",padding:"10px",marginBottom:"8px",borderRadius:"8px",border:"1px solid #ddd"}}/>
<input value={askill} onChange={e=>setAskill(e.target.value)} placeholder="Skill * e.g. Tiler, Plumber" style={{width:"100%",padding:"10px",marginBottom:"8px",borderRadius:"8px",border:"1px solid #ddd"}}/>
<input value={aloc} onChange={e=>setAloc(e.target.value)} placeholder="Location * Lagos" style={{width:"100%",padding:"10px",marginBottom:"8px",borderRadius:"8px",border:"1px solid #ddd"}}/>
<input value={awhat} onChange={e=>setAwhat(e.target.value)} placeholder="WhatsApp Number * 080..." style={{width:"100%",padding:"10px",marginBottom:"8px",borderRadius:"8px",border:"1px solid #ddd"}}/>
<input type="file" accept="image/*" onChange={upArt} style={{marginBottom:"8px"}}/>
{aport&&<img src={aport} style={{width:"100%",maxHeight:"180px",borderRadius:"10px",marginBottom:"8px"}} alt="port"/>}
<button onClick={postArt} style={{width:"100%",padding:"12px",background:"#22c55e",color:"#fff",border:"none",borderRadius:"10px",fontWeight:"bold"}}>Create Portfolio Profile</button>
</div></div>}

{tab==="login"&&<div style={{padding:"20px",display:"flex",justifyContent:"center"}}>
<div style={{background:"#fff",padding:"16px",borderRadius:12,width:"100%",maxWidth:"340px"}}>
<div style={{display:"flex",alignItems:"center",gap:"8px",marginBottom:"10px"}}><img src={LOGO} style={{width:32,height:32,borderRadius:"50%"}} alt="logo"/><b>Login with Password - Secure</b></div>
<input value={email} onChange={e=>setEmail(e.target.value)} placeholder="Email * nicholasu9@gmail.com" style={{width:"100%",padding:"10px",marginBottom:"8px",borderRadius:"8px",border:"1px solid #ddd",boxSizing:"border-box"}}/>
<input type="password" value={pass} onChange={e=>setPass(e.target.value)} placeholder="Password * min 6 chars" style={{width:"100%",padding:"10px",marginBottom:"8px",borderRadius:"8px",border:"1px solid #ddd",boxSizing:"border-box"}}/>
<button onClick={login} style={{width:"100%",padding:"11px",background:"#0A1931",color:"#FFD700",border:"none",borderRadius:"8px",fontWeight:"bold",marginBottom:"8px"}}>Login Secure</button>
<button onClick={signup} style={{width:"100%",padding:"11px",background:"#fff",color:"#0A1931",border:"1px solid #0A1931",borderRadius:"8px",fontWeight:"bold"}}>Create Account (Sign Up)</button>
<div style={{fontSize:10,color:"#666",marginTop:"8px",textAlign:"center"}}>Password protected • Supabase Auth • Only you can post/delete your jobs</div>
</div></div>}

{tab==="admin"&&isAdmin&&<div style={{padding:"12px"}}>
<h2>💰 Admin Dashboard - ONLY YOU CAN SEE THIS</h2>
<div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"10px",marginTop:"10px"}}>
<div style={{background:"#0A1931",color:"#fff",padding:"12px",borderRadius:12}}><small>Total Jobs</small><h2 style={{color:"#FFD700",margin:"4px 0"}}>{jobs.length}</h2></div>
<div style={{background:"#fff",padding:"12px",borderRadius:12,border:"1px solid #e5e7eb"}}><small>Total Budget Posted</small><h2>₦{totalBudget.toLocaleString()}</h2></div>
<div style={{background:"#22c55e",color:"#fff",padding:"12px",borderRadius:12}}><small>Your 15% Earnings</small><h2>₦{earn15.toLocaleString()}</h2><small>Commission</small></div>
<div style={{background:"#FFD700",color:"#0A1931",padding:"12px",borderRadius:12}}><small>Ad Revenue Est.</small><h2>₦{adEarn.toLocaleString()}</h2><small>N500/job view</small></div>
</div>
<div style={{background:"#fff",padding:"12px",borderRadius:12,marginTop:"12px"}}>
<b>How CraftSure Makes Money:</b><br/>
<small>1. 15% Commission: Client pays via Paystack, you keep 15% before paying artisan</small><br/>
<small>2. Ads: Google AdSense on job pages - ₦500 per 1000 views</small><br/>
<small>3. Featured Jobs: Artisans pay ₦1000 to boost portfolio top</small><br/><br/>
<div style={{background:"#f5f7fb",padding:"8px",borderRadius:"8px"}}>
<small>Total Revenue (15% + Ads): </small><b style={{fontSize:18}}>₦{(earn15+adEarn).toLocaleString()}</b>
</div>
</div>
<div style={{marginTop:"12px",background:"#fff",padding:"10px",borderRadius:12}}>
<b>All Users</b>{jobs.map(j=><div key={j.id} style={{fontSize:11,borderBottom:"1px solid #eee",padding:"4px 0"}}>{j.created_by} - {j.title} - {j.budget}</div>)}
</div>
</div>}

{pv&&<div style={{position:"fixed",top:0,left:0,right:0,bottom:0,background:"rgba(0,0,0,0.96)",zIndex:100,display:"flex",flexDirection:"column"}}>
<div style={{display:"flex",justifyContent:"space-between",padding:"12px",color:"#fff"}}><b style={{color:"#FFD700"}}>🔒 CraftSure Protected</b><button onClick={()=>setPv(null)} style={{background:"#fff",border:"none",borderRadius:"50%",width:32,height:32}}>X</button></div>
<div style={{flex:1,display:"flex",alignItems:"center",justifyContent:"center"}}><img src={pv} style={{maxWidth:"95%",maxHeight:"80vh",borderRadius:"8px"}} alt="full"/></div>
</div>}
</div>
)
                                     }
