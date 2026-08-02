import {useState,useEffect,useRef} from "react";
import {createClient} from "@supabase/supabase-js";
const supa=createClient("https://unzohyrabvouclsjcpfu.supabase.co","sb_publishable_zB3k0KebVFw4-xf_TtdaUw_UlHsXk_q");
const ADMIN="nicholasu9@gmail.com";
const PAYSTACK_PK="pk_test_aaa1ae824c287d9865dd27a044670676c0df836d";
const LOGO="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Ccircle cx='50' cy='50' r='48' fill='%230A1931'/%3E%3Cpath d='M30 28 L45 28 L42 42 L32 50 L18 38 Z M55 42 L62 48 L38 78 L30 78 L22 70 L30 62 L40 62 L55 42 Z M70 22 C78 22 86 28 86 38 C86 44 83 48 78 50 L62 56 L58 40 L64 36 C62 32 64 26 70 22 Z' fill='%23FFD700'/%3E%3C/svg%3E";

export default function App(){
const [tab,setTab]=useState("home");const [user,setUser]=useState(JSON.parse(localStorage.getItem("cs_user")||"null"));
const [email,setEmail]=useState("");const [pass,setPass]=useState("");
const [jobs,setJobs]=useState([]);const [arts,setArts]=useState([]);const [msgs,setMsgs]=useState([]);const [pays,setPays]=useState([]);const [hires,setHires]=useState([]);const [ads,setAds]=useState([]);
const [jt,setJt]=useState("");const [jl,setJl]=useState("");const [jb,setJb]=useState("");const [jd,setJd]=useState("");const [ji,setJi]=useState("");const [pv,setPv]=useState(null);
const [an,setAn]=useState("");const [askill,setAskill]=useState("");const [aloc,setAloc]=useState("");const [awhat,setAwhat]=useState("");const [aport,setAport]=useState("");const [abio,setAbio]=useState("");const [aworks,setAworks]=useState([]);
const [chatJob,setChatJob]=useState(null);const [chatTxt,setChatTxt]=useState("");const [payModal,setPayModal]=useState(null);
const [searchSkill,setSearchSkill]=useState("");const [searchLoc,setSearchLoc]=useState("");const [selectedArt,setSelectedArt]=useState(null);
const [adCompany,setAdCompany]=useState("");const [adTitle,setAdTitle]=useState("");const [adImg,setAdImg]=useState("");const [adLink,setAdLink]=useState("");const [adPackage,setAdPackage]=useState("Basic");
const chatEndRef=useRef(null);

const load=async()=>{
const {data:j}=await supa.from("jobs").select("*").order("id",{ascending:false});if(j)setJobs(j);
const {data:a}=await supa.from("artisans").select("*").order("id",{ascending:false});if(a)setArts(a);
const {data:m}=await supa.from("messages").select("*").order("id",{ascending:true}).limit(200);if(m)setMsgs(m);
const {data:p}=await supa.from("payments").select("*").order("id",{ascending:false});if(p)setPays(p);
const {data:h}=await supa.from("hires").select("*").order("id",{ascending:false});if(h)setHires(h);
const {data:ad}=await supa.from("ads").select("*").order("id",{ascending:false});if(ad)setAds(ad);
};
useEffect(()=>{load();const t=setInterval(load,3000);return()=>clearInterval(t);},[]);
useEffect(()=>{if(chatEndRef.current)chatEndRef.current.scrollIntoView({behavior:"smooth"});},[msgs,chatJob]);
useEffect(()=>{const s=document.createElement("script");s.src="https://js.paystack.co/v1/inline.js";s.async=true;document.body.appendChild(s);return()=>{try{document.body.removeChild(s);}catch(e){}};},[]);

const signup=async()=>{const {error}=await supa.auth.signUp({email,password:pass});if(error)return alert(error.message);const u={email,role:email===ADMIN?"admin":"user"};localStorage.setItem("cs_user",JSON.stringify(u));setUser(u);setTab("home");};
const login=async()=>{const {error}=await supa.auth.signInWithPassword({email,password:pass});if(error)return alert(error.message);const u={email,role:email===ADMIN?"admin":"user"};localStorage.setItem("cs_user",JSON.stringify(u));setUser(u);setTab("home");};
const up=e=>{const f=e.target.files[0];if(!f)return;const r=new FileReader();r.onload=v=>setJi(v.target.result);r.readAsDataURL(f);};
const upArt=e=>{const f=e.target.files[0];if(!f)return;const r=new FileReader();r.onload=v=>setAport(v.target.result);r.readAsDataURL(f);};
const upWorks=e=>{
const files=Array.from(e.target.files).slice(0,5);
files.forEach(f=>{
const r=new FileReader();
r.onload=v=>{setAworks(prev=>[...prev, v.target.result].slice(0,5));};
r.readAsDataURL(f);
});
};
const upAd=e=>{const f=e.target.files[0];if(!f)return;const r=new FileReader();r.onload=v=>setAdImg(v.target.result);r.readAsDataURL(f);};

const postJob=async()=>{if(!user)return alert("Login");await supa.from("jobs").insert([{title:jt,location:jl,budget:jb,description:jd,image_url:ji,created_by:user.email}]);setJt("");setJl("");setJb("");setJd("");setJi("");load();setTab("home");};
const postArt=async()=>{
if(!user)return alert("Login");
const worksJson=JSON.stringify(aworks);
await supa.from("artisans").insert([{name:an,skill:askill,location:aloc,whatsapp:awhat,portfolio:aport,bio:abio,works:worksJson,rating:4.9,jobs_done:aworks.length,created_by:user.email,verified:true}]);
setAworks([]);load();setTab("artisans");
};
const postAd=async()=>{if(!user)return alert("Login");const amt=adPackage==="Basic"?20000:adPackage==="Premium"?50000:100000;await supa.from("ads").insert([{company_name:adCompany,title:adTitle,image_url:adImg,link:adLink,package:adPackage,amount:amt,created_by:user.email,status:"active"}]);setAdCompany("");setAdTitle("");setAdImg("");setAdLink("");load();setTab("home");};
const delJob=async(id)=>{if(!confirm("Delete job?"))return;await supa.from("jobs").delete().eq("id",id);load();};
const delAd=async(id)=>{if(!confirm("Delete ad?"))return;await supa.from("ads").delete().eq("id",id);load();};
const hireArtisan=async(artisanEmail,artisanName,jobId)=>{const jid=jobId||chatJob?.id||jobs[0]?.id;if(!jid)return alert("Select a job first");await supa.from("hires").insert([{job_id:jid,client_email:user.email,artisan_email:artisanEmail,artisan_name:artisanName,status:"hired"}]);alert(`Hired ${artisanName}!`);load();setSelectedArt(null);};

const sendMsg=async()=>{
if(!chatTxt.trim())return;if(!chatJob)return;
const {error}=await supa.from("messages").insert([{job_id:chatJob.id,sender:user.email,receiver:"all",message:chatTxt}]);
if(error){alert("Chat error: "+error.message);return;}
setChatTxt("");load();
};

const getBudget=(b)=>{let n=parseInt((b||"").replace(/[^0-9]/g,""))||0;if((b||"").toLowerCase().includes("k"))n=n*1000;return n;};
const hasPaid=(jobId,type)=>pays.some(p=>p.job_id===jobId&&p.percent_type===type);
const clientPaid=(jobId)=>hasPaid(jobId,"5%_client");const artisanPaid=(jobId)=>hasPaid(jobId,"10%_artisan");const bothPaid=(jobId)=>clientPaid(jobId)&&artisanPaid(jobId);
const isHired=(jobId)=>hires.find(h=>h.job_id===jobId);
const openPay=(job,type)=>{const b=getBudget(job.budget);const fee=type==="client"?Math.floor(b*0.05):Math.floor(b*0.10);const total=type==="client"?b+fee:fee;setPayModal({job,type,budget:b,fee,total});};
const payWithPaystack=()=>{
if(!payModal)return;if(!window.PaystackPop)return alert("Paystack loading, wait 2 sec");
const amountKobo=payModal.type==="client"?payModal.total*100:payModal.fee*100;
const handler=window.PaystackPop.setup({
key:PAYSTACK_PK,email:user.email,amount:amountKobo,currency:"NGN",ref:"CS_"+Math.floor(Math.random()*1000000000),
callback:async function(response){
await supa.from("payments").insert([{job_id:payModal.job.id,payer_email:user.email,payer_type:payModal.type,amount:payModal.fee,percent_type:payModal.type==="client"?"5%_client":"10%_artisan",status:"paid"}]);
setPayModal(null);alert("✅ Payment Successful! Ref: "+response.reference);load();
},
onClose:function(){alert("Payment cancelled");},
});
handler.openIframe();
};

const filteredArts=arts.filter(a=>{const skillOk=!searchSkill||a.skill?.toLowerCase().includes(searchSkill.toLowerCase())||a.name?.toLowerCase().includes(searchSkill.toLowerCase());const locOk=!searchLoc||a.location?.toLowerCase().includes(searchLoc.toLowerCase());return skillOk&&locOk;});

const totalBudget=jobs.reduce((s,j)=>s+getBudget(j.budget),0);
const client5Total=pays.filter(p=>p.percent_type==="5%_client").reduce((s,p)=>s+p.amount,0);
const artisan10Total=pays.filter(p=>p.percent_type==="10%_artisan").reduce((s,p)=>s+p.amount,0);
const adTotal=ads.reduce((s,a)=>s+(a.amount||0),0);
const earn15=client5Total+artisan10Total;
const grand=earn15+adTotal;
const isAdmin=user?.email===ADMIN;

const parseWorks=(w)=>{
try{const arr=JSON.parse(w||"[]");return Array.isArray(arr)?arr:[];}catch(e){return [];}
};

return(
<div style={{background:"#f5f7fb",minHeight:"100vh",fontFamily:"sans-serif"}}>
<div style={{background:"#0A1931",color:"#fff",padding:"10px 12px",display:"flex",justifyContent:"space-between",alignItems:"center",position:"sticky",top:0,zIndex:20}}>
<div style={{display:"flex",alignItems:"center",gap:"8px"}}><img src={LOGO} style={{width:38,height:38,borderRadius:"50%",background:"#fff",padding:"2px"}} alt="logo"/><div><b style={{fontSize:16}}>CraftSure</b><div style={{fontSize:9,color:"#FFD700"}}>Nigeria • Verified Artisans</div></div></div>
<div style={{display:"flex",gap:"4px",flexWrap:"wrap"}}>
<button onClick={()=>setTab("home")} style={{padding:"6px 10px",borderRadius:8,border:"none",background:tab==="home"?"#fff":"#1e3a8a",color:tab==="home"?"#0A1931":"#fff",fontSize:11}}>Home</button>
<button onClick={()=>setTab("artisans")} style={{padding:"6px 10px",borderRadius:8,border:"none",background:tab==="artisans"?"#fff":"#1e3a8a",color:tab==="artisans"?"#0A1931":"#fff",fontSize:11}}>Artisans</button>
<button onClick={()=>setTab("brands")} style={{padding:"6px 10px",borderRadius:8,border:"none",background:tab==="brands"?"#FFD700":"#1e3a8a",color:tab==="brands"?"#0A1931":"#fff",fontSize:11}}>Brands Ads</button>
{isAdmin&&<button onClick={()=>setTab("admin")} style={{padding:"6px 10px",borderRadius:8,border:"none",background:"#ef4444",color:"#fff",fontSize:11,fontWeight:"bold"}}>Admin 💰</button>}
{isAdmin&&<button onClick={()=>setTab("chats")} style={{padding:"6px 10px",borderRadius:8,border:"none",background:"#FFD700",color:"#0A1931",fontSize:11,fontWeight:"bold"}}>Chats 👁️</button>}
<button onClick={()=>setTab("post")} style={{padding:"6px 10px",borderRadius:8,border:"none",background:"#FFD700",color:"#0A1931",fontWeight:"bold",fontSize:11}}>Post Job</button>
{user?<button onClick={()=>{localStorage.removeItem("cs_user");setUser(null);}} style={{padding:"6px 8px",borderRadius:8,border:"none",background:"#fff",fontSize:10}}>{user.email.slice(0,5)} Out</button>:<button onClick={()=>setTab("login")} style={{padding:"6px 10px",borderRadius:8,border:"none",background:"#fff",color:"#0A1931",fontWeight:"bold",fontSize:11}}>Login</button>}
</div>
</div>

{tab==="home"&&<div>
{ads.length>0&&<div style={{background:"#0A1931",padding:"8px 10px"}}><div style={{display:"flex",gap:"8px",overflowX:"auto"}}>{ads.map(ad=><div key={ad.id} onClick={()=>window.open(ad.link,"_blank")} style={{minWidth:"280px",background:"#fff",borderRadius:10,overflow:"hidden",display:"flex",cursor:"pointer",border:"2px solid #FFD700"}}><img src={ad.image_url} style={{width:70,height:70,objectFit:"cover"}} alt="ad"/><div style={{padding:"6px",flex:1}}><small style={{background:"#FFD700",color:"#0A1931",padding:"1px 5px",borderRadius:10,fontSize:8,fontWeight:"bold"}}>Sponsored • {ad.package}</small><br/><b style={{fontSize:11}}>{ad.company_name}</b><br/><small style={{fontSize:9}}>{ad.title}</small></div></div>)}</div></div>}
<div style={{padding:"10px 15px"}}><b>Jobs ({jobs.length})</b><div style={{fontSize:10,color:"#666"}}>Chat to hire • Service fee at checkout • Real Paystack Live</div></div>
{jobs.map(j=>{
const b=getBudget(j.budget);const hired=isHired(j.id);const unlocked=bothPaid(j.id);
return(
<div key={j.id} style={{background:"#fff",margin:"10px 15px",borderRadius:12,overflow:"hidden",border:"1px solid #e5e7eb"}}>
{j.image_url&&<div style={{position:"relative"}} onClick={()=>setPv(j.image_url)}><img src={j.image_url} style={{width:"100%",height:180,objectFit:"cover"}} alt="job"/><div style={{position:"absolute",top:8,right:8,display:"flex",gap:"6px"}}>{hired&&<span style={{background:"#0A1931",color:"#FFD700",padding:"4px 8px",borderRadius:20,fontSize:9,fontWeight:"bold"}}>Hired: {hired.artisan_name}</span>}{user?.email===j.created_by&&<button onClick={(e)=>{e.stopPropagation();delJob(j.id);}} style={{background:"#fee2e2",color:"#ef4444",border:"none",borderRadius:"50%",width:28,height:28}}>🗑️</button>}</div><div style={{position:"absolute",bottom:0,left:0,right:0,background:"rgba(10,25,49,0.75)",color:"#FFD700",padding:"5px 8px",fontSize:9,display:"flex",justifyContent:"space-between"}}><span>🔒 Verified</span><span>₦{b.toLocaleString()}</span></div></div>}
<div style={{padding:"10px"}}>
<div style={{display:"flex",justifyContent:"space-between"}}><b>{j.title}</b>{hired&&<small style={{background:"#22c55e",color:"#fff",padding:"2px 6px",borderRadius:10,fontSize:8}}>HIRED</small>}</div>
<small>📍 {j.location} • 💰 ₦{b.toLocaleString()}</small><br/><small style={{color:"#555"}}>{j.description}</small>
<div style={{display:"flex",gap:6,marginTop:8}}>
<button onClick={()=>{if(!user)return alert("Login");setChatJob(j);}} style={{flex:1,padding:"10px",border:"none",borderRadius:8,background:"#0A1931",color:"#FFD700",fontWeight:"bold",fontSize:11}}>💬 Chat to Hire</button>
{!clientPaid(j.id)&&<button onClick={()=>openPay(j,"client")} style={{flex:1,padding:"10px",border:"none",borderRadius:8,background:"#FFD700",color:"#0A1931",fontWeight:"bold",fontSize:11}}>Unlock Contact</button>}
{unlocked&&<button style={{flex:1,padding:"10px",border:"none",borderRadius:8,background:"#22c55e",color:"#fff",fontWeight:"bold",fontSize:11}}>WhatsApp ✅</button>}
</div>
</div>
</div>
)})}
</div>}

{tab==="artisans"&&<div style={{padding:"12px"}}>
<h3>Artisans • Portfolio</h3>
<div style={{background:"#fff",padding:"10px",borderRadius:12,marginBottom:"10px",display:"flex",gap:"6px",border:"1px solid #e5e7eb"}}>
<input value={searchSkill} onChange={e=>setSearchSkill(e.target.value)} placeholder="Search skill" style={{flex:1,padding:"8px",borderRadius:8,border:"1px solid #ddd",fontSize:12}}/>
<input value={searchLoc} onChange={e=>setSearchLoc(e.target.value)} placeholder="Location" style={{flex:1,padding:"8px",borderRadius:8,border:"1px solid #ddd",fontSize:12}}/>
<button onClick={()=>{setSearchSkill("");setSearchLoc("");}} style={{padding:"8px 10px",borderRadius:8,border:"none",background:"#0A1931",color:"#FFD700",fontSize:11}}>Clear</button>
</div>
{filteredArts.map(a=>{
const works=parseWorks(a.works);
return(
<div key={a.id} onClick={()=>setSelectedArt(a)} style={{background:"#fff",padding:"10px",borderRadius:12,marginBottom:"10px",display:"flex",gap:"10px",border:"1px solid #e5e7eb",cursor:"pointer"}}>
{a.portfolio&&<img src={a.portfolio} style={{width:70,height:70,borderRadius:12,objectFit:"cover",border:"2px solid #FFD700"}} alt="port"/>}
<div style={{flex:1}}>
<div style={{display:"flex",alignItems:"center",gap:"6px"}}><b>{a.name}</b>{a.verified&&<span style={{background:"#0A1931",color:"#FFD700",padding:"1px 5px",borderRadius:10,fontSize:8}}>✓ Verified</span>}<small style={{background:"#0A1931",color:"#FFD700",padding:"2px 6px",borderRadius:10,fontSize:8}}>{a.skill}</small></div>
<div style={{display:"flex",alignItems:"center",gap:"4px",marginTop:"2px"}}><span style={{color:"#FFD700",fontSize:12}}>★★★★★</span><small style={{fontSize:10}}>{a.rating||"5.0"} • {works.length||a.jobs_done||0} jobs</small></div>
<small style={{fontSize:11}}>📍 {a.location}</small><br/>
<div style={{display:"flex",gap:"4px",marginTop:"4px"}}>{works.slice(0,3).map((w,i)=><img key={i} src={w} style={{width:24,height:24,borderRadius:4,objectFit:"cover",border:"1px solid #FFD700"}} alt="work"/>)}{works.length>3&&<small style={{fontSize:8,background:"#FFD700",padding:"2px 4px",borderRadius:10}}>+{works.length-3}</small>}</div>
</div>
<button style={{padding:"6px 12px",background:"#0A1931",color:"#FFD700",border:"none",borderRadius:8,fontSize:10,height:"32px",fontWeight:"bold"}}>View</button>
</div>
)
})}
<div style={{textAlign:"center",marginTop:"12px"}}><button onClick={()=>setTab("join")} style={{padding:"10px 16px",background:"#FFD700",color:"#0A1931",border:"none",borderRadius:8,fontWeight:"bold",fontSize:12}}>+ Join as Artisan - Upload Jobs Done</button></div>
</div>}

{tab==="brands"&&<div style={{padding:"12px"}}>
<h3>📢 Advertise Your Brand</h3>
<div style={{background:"#0A1931",color:"#fff",padding:"12px",borderRadius:12,marginTop:"10px"}}><b style={{color:"#FFD700"}}>Why Advertise on CraftSure?</b><br/><small>• 5000+ artisans • 2000+ clients monthly • Starting ₦20k/month</small></div>
<div style={{background:"#fff",padding:"12px",borderRadius:12,marginTop:"12px"}}>
<b>Post Ad</b>
<input value={adCompany} onChange={e=>setAdCompany(e.target.value)} placeholder="Company Name" style={{width:"100%",padding:"10px",marginTop:"8px",borderRadius:"8px",border:"1px solid #ddd"}}/>
<input value={adTitle} onChange={e=>setAdTitle(e.target.value)} placeholder="Ad Title" style={{width:"100%",padding:"10px",marginTop:"8px",borderRadius:"8px",border:"1px solid #ddd"}}/>
<input value={adLink} onChange={e=>setAdLink(e.target.value)} placeholder="Website Link" style={{width:"100%",padding:"10px",marginTop:"8px",borderRadius:"8px",border:"1px solid #ddd"}}/>
<select value={adPackage} onChange={e=>setAdPackage(e.target.value)} style={{width:"100%",padding:"10px",marginTop:"8px",borderRadius:"8px",border:"1px solid #ddd"}}>
<option>Basic - ₦20k</option><option>Premium - ₦50k</option><option>Gold - ₦100k</option>
</select>
<input type="file" accept="image/*" onChange={upAd} style={{marginTop:"8px"}}/>
{adImg&&<img src={adImg} style={{width:"100%",maxHeight:"180px",borderRadius:10,marginTop:"8px"}} alt="ad prev"/>}
<button onClick={postAd} style={{width:"100%",marginTop:"10px",padding:"12px",background:"#0A1931",color:"#FFD700",border:"none",borderRadius:10,fontWeight:"bold"}}>Post Ad - Paystack</button>
</div>
</div>}

{tab==="post"&&<div style={{padding:"12px"}}><h3>Post a Job</h3><div style={{background:"#fff",padding:"12px",borderRadius:12}}><input value={jt} onChange={e=>setJt(e.target.value)} placeholder="Job Title" style={{width:"100%",padding:"10px",marginBottom:"8px",borderRadius:"8px",border:"1px solid #ddd"}}/><input value={jl} onChange={e=>setJl(e.target.value)} placeholder="Location" style={{width:"100%",padding:"10px",marginBottom:"8px",borderRadius:"8px",border:"1px solid #ddd"}}/><input value={jb} onChange={e=>setJb(e.target.value)} placeholder="Budget e.g. 80000" style={{width:"100%",padding:"10px",marginBottom:"8px",borderRadius:"8px",border:"1px solid #ddd"}}/><textarea value={jd} onChange={e=>setJd(e.target.value)} placeholder="Description" style={{width:"100%",padding:"10px",marginBottom:"8px",borderRadius:"8px",border:"1px solid #ddd",height:"70px"}}/><input type="file" accept="image/*" onChange={up} style={{marginBottom:"8px"}}/>{ji&&<img src={ji} style={{width:"100%",maxHeight:"180px",borderRadius:"10px",marginBottom:"8px"}} alt="prev"/>}<button onClick={postJob} style={{width:"100%",padding:"12px",background:"#0A1931",color:"#FFD700",border:"none",borderRadius:"10px",fontWeight:"bold"}}>Post Job</button></div></div>}

{tab==="join"&&<div style={{padding:"12px"}}><h3>Join as Artisan - Upload Portfolio</h3><div style={{background:"#fff",padding:"12px",borderRadius:"12px"}}>
<input value={an} onChange={e=>setAn(e.target.value)} placeholder="Full Name" style={{width:"100%",padding:"10px",marginBottom:"8px",borderRadius:"8px",border:"1px solid #ddd"}}/>
<input value={askill} onChange={e=>setAskill(e.target.value)} placeholder="Skill e.g. Hairstylist, Tiler" style={{width:"100%",padding:"10px",marginBottom:"8px",borderRadius:"8px",border:"1px solid #ddd"}}/>
<input value={aloc} onChange={e=>setAloc(e.target.value)} placeholder="Location" style={{width:"100%",padding:"10px",marginBottom:"8px",borderRadius:"8px",border:"1px solid #ddd"}}/>
<input value={awhat} onChange={e=>setAwhat(e.target.value)} placeholder="WhatsApp e.g. 080..." style={{width:"100%",padding:"10px",marginBottom:"8px",borderRadius:"8px",border:"1px solid #ddd"}}/>
<input value={abio} onChange={e=>setAbio(e.target.value)} placeholder="Short bio e.g. 10 years experience" style={{width:"100%",padding:"10px",marginBottom:"8px",borderRadius:"8px",border:"1px solid #ddd"}}/>
<div style={{marginTop:"8px"}}><b style={{fontSize:12}}>Profile Photo (1)</b><input type="file" accept="image/*" onChange={upArt} style={{marginTop:"4px",marginBottom:"8px"}}/>{aport&&<img src={aport} style={{width:80,height:80,borderRadius:"50%",border:"3px solid #FFD700",objectFit:"cover"}} alt="port"/>}</div>
<div style={{marginTop:"12px",background:"#f5f7fb",padding:"10px",borderRadius:10,border:"1px dashed #0A1931"}}>
<b style={{fontSize:12}}>📸 Jobs Done Photos (Upload up to 5)</b><div style={{fontSize:10,color:"#666"}}>Show your best works - Clients will see this!</div>
<input type="file" accept="image/*" multiple onChange={upWorks} style={{marginTop:"8px"}}/>
<div style={{display:"flex",gap:"6px",flexWrap:"wrap",marginTop:"8px"}}>{aworks.map((w,i)=><div key={i} style={{position:"relative"}}><img src={w} style={{width:60,height:60,borderRadius:8,objectFit:"cover",border:"2px solid #FFD700"}} alt="work"/><button onClick={()=>setAworks(aworks.filter((_,idx)=>idx!==i))} style={{position:"absolute",top:-6,right:-6,background:"#ef4444",color:"#fff",border:"none",borderRadius:"50%",width:18,height:18,fontSize:10}}>X</button></div>)}</div>
{aworks.length>0&&<small style={{fontSize:10,color:"#22c55e"}}>✅ {aworks.length} photos added</small>}
</div>
<button onClick={postArt} style={{width:"100%",marginTop:"12px",padding:"12px",background:"#0A1931",color:"#FFD700",border:"none",borderRadius:10,fontWeight:"bold"}}>Create Portfolio with {aworks.length} Jobs</button>
</div></div>}

{tab==="login"&&<div style={{padding:"20px",display:"flex",justifyContent:"center"}}><div style={{background:"#fff",padding:"16px",borderRadius:12,width:"100%",maxWidth:"340px"}}><b>Login - Secure</b><input value={email} onChange={e=>setEmail(e.target.value)} placeholder="Email" style={{width:"100%",padding:"10px",marginTop:"10px",borderRadius:"8px",border:"1px solid #ddd"}}/><input type="password" value={pass} onChange={e=>setPass(e.target.value)} placeholder="Password" style={{width:"100%",padding:"10px",marginTop:"8px",borderRadius:"8px",border:"1px solid #ddd"}}/><button onClick={login} style={{width:"100%",padding:"11px",background:"#0A1931",color:"#FFD700",border:"none",borderRadius:"8px",fontWeight:"bold",marginTop:"10px"}}>Login</button><button onClick={signup} style={{width:"100%",padding:"11px",background:"#fff",color:"#0A1931",border:"1px solid #0A1931",borderRadius:"8px",fontWeight:"bold",marginTop:"8px"}}>Create Account</button></div></div>}

{tab==="admin"&&isAdmin&&<div style={{padding:"12px"}}><h2>💰 Admin Revenue</h2><div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"10px",marginTop:"10px"}}><div style={{background:"#0A1931",color:"#fff",padding:"12px",borderRadius:12}}><small>Total Jobs</small><h2 style={{color:"#FFD700"}}>{jobs.length}</h2></div><div style={{background:"#fff",padding:"12px",borderRadius:12,border:"1px solid #ddd"}}><small>Hired</small><h2>{hires.length}</h2></div><div style={{background:"#FFD700",color:"#0A1931",padding:"12px",borderRadius:12}}><small>Client 5%</small><h2>₦{client5Total.toLocaleString()}</h2></div><div style={{background:"#1e3a8a",color:"#fff",padding:"12px",borderRadius:12}}><small>Artisan 10%</small><h2>₦{artisan10Total.toLocaleString()}</h2></div><div style={{background:"#22c55e",color:"#fff",padding:"12px",borderRadius:12}}><small>Ads 💰</small><h2>₦{adTotal.toLocaleString()}</h2></div><div style={{background:"#0A1931",color:"#fff",padding:"12px",borderRadius:12,border:"2px solid #FFD700"}}><small style={{color:"#FFD700"}}>GRAND</small><h2 style={{color:"#FFD700"}}>₦{grand.toLocaleString()}</h2></div></div></div>}

{tab==="chats"&&isAdmin&&<div style={{padding:"12px"}}>
<h2>👁️ All Chats ({msgs.length})</h2>
<div style={{background:"#fff",padding:"10px",borderRadius:12}}>
{msgs.length===0&&<div style={{textAlign:"center",padding:"20px",color:"#666"}}>No chats yet. Start chatting on a job!</div>}
{msgs.map(m=><div key={m.id} style={{borderBottom:"1px solid #eee",padding:"8px 0",fontSize:11}}><b style={{color:"#0A1931"}}>{m.sender?.split("@")[0]}</b> <small style={{background:"#FFD700",padding:"1px 4px",borderRadius:6,fontSize:8}}>Job {m.job_id}</small>: {m.message} <small style={{color:"#999",fontSize:8}}>{new Date(m.created_at).toLocaleTimeString()}</small></div>)}
</div>
</div>}

{selectedArt&&<div style={{position:"fixed",top:0,left:0,right:0,bottom:0,background:"#fff",zIndex:70,overflowY:"auto"}}>
<div style={{background:"#0A1931",color:"#fff",padding:"12px",display:"flex",justifyContent:"space-between",alignItems:"center",position:"sticky",top:0}}><div style={{display:"flex",alignItems:"center",gap:"8px"}}><img src={selectedArt.portfolio} style={{width:40,height:40,borderRadius:"50%",border:"2px solid #FFD700",objectFit:"cover"}} alt="art"/><div><b style={{color:"#FFD700"}}>{selectedArt.name}</b><div style={{fontSize:10}}>{selectedArt.skill} • {selectedArt.location}</div></div></div><button onClick={()=>setSelectedArt(null)} style={{background:"#fff",border:"none",borderRadius:"50%",width:32,height:32}}>X</button></div>
<div style={{padding:"12px"}}>
<img src={selectedArt.portfolio} style={{width:"100%",height:260,objectFit:"cover",borderRadius:12,border:"3px solid #FFD700"}} alt="portfolio"/>
<div style={{display:"flex",gap:"6px",marginTop:"10px",flexWrap:"wrap"}}><span style={{background:"#0A1931",color:"#FFD700",padding:"4px 10px",borderRadius:20,fontSize:11}}>✓ Verified</span><span style={{background:"#FFD700",color:"#0A1931",padding:"4px 10px",borderRadius:20,fontSize:11,fontWeight:"bold"}}>★ {selectedArt.rating||5.0}</span><span style={{background:"#22c55e",color:"#fff",padding:"4px 10px",borderRadius:20,fontSize:11}}>{parseWorks(selectedArt.works).length||selectedArt.jobs_done||0} Jobs</span></div>
<div style={{background:"#f5f7fb",padding:"10px",borderRadius:10,marginTop:"10px"}}><b style={{fontSize:12}}>About</b><p style={{fontSize:12,marginTop:"4px",color:"#555"}}>{selectedArt.bio||"Professional artisan, verified by CraftSure"}</p></div>

<div style={{marginTop:"12px"}}><b>📸 Jobs Done ({parseWorks(selectedArt.works).length})</b>
{parseWorks(selectedArt.works).length===0&&<div style={{background:"#fff",border:"1px dashed #ddd",padding:"10px",borderRadius:10,marginTop:"6px",fontSize:11,color:"#999"}}>No jobs photos uploaded yet</div>}
<div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:"8px",marginTop:"8px"}}>
{parseWorks(selectedArt.works).map((w,i)=><img key={i} src={w} onClick={()=>setPv(w)} style={{width:"100%",height:110,objectFit:"cover",borderRadius:10,border:"2px solid #FFD700",cursor:"pointer"}} alt="work"/>)}
</div>
</div>

<div style={{display:"flex",gap:"8px",marginTop:"14px",position:"sticky",bottom:10,background:"#fff",padding:"8px",borderRadius:10,border:"1px solid #e5e7eb"}}><button onClick={()=>{if(jobs.length>0){setChatJob(jobs[0]);setSelectedArt(null);}else{alert("No job to chat");}}} style={{flex:1,padding:"12px",background:"#0A1931",color:"#FFD700",border:"none",borderRadius:10,fontWeight:"bold"}}>💬 Chat</button><button onClick={()=>hireArtisan(selectedArt.created_by,selectedArt.name)} style={{flex:1,padding:"12px",background:"#FFD700",color:"#0A1931",border:"none",borderRadius:10,fontWeight:"bold"}}>Hire Now</button></div>
</div>
</div>}

{chatJob&&<div style={{position:"fixed",top:0,left:0,right:0,bottom:0,background:"#f5f7fb",zIndex:50,display:"flex",flexDirection:"column"}}>
<div style={{background:"#0A1931",color:"#fff",padding:"12px",display:"flex",justifyContent:"space-between",alignItems:"center"}}><div><b style={{color:"#FFD700"}}>Chat: {chatJob.title}</b><div style={{fontSize:10}}>Secure • Admin monitors • Real-time</div>{isHired(chatJob.id)&&<div style={{fontSize:10,color:"#22c55e"}}>Hired: {isHired(chatJob.id).artisan_name}</div>}</div><button onClick={()=>setChatJob(null)} style={{background:"#fff",border:"none",borderRadius:"50%",width:32,height:32}}>X</button></div>
<div style={{flex:1,overflowY:"auto",padding:"10px"}}>
{msgs.filter(m=>m.job_id===chatJob.id).length===0&&<div style={{textAlign:"center",marginTop:"40px",color:"#999"}}><div style={{fontSize:40}}>💬</div><b>No messages yet</b><br/><small>Start negotiating! Chat leads to hiring</small></div>}
{msgs.filter(m=>m.job_id===chatJob.id).map(m=>(
<div key={m.id} style={{background:m.sender===user.email?"#0A1931":"#fff",color:m.sender===user.email?"#FFD700":"#000",padding:"8px 12px",borderRadius:"12px",margin:"6px 0",maxWidth:"85%",marginLeft:m.sender===user.email?"auto":"0",fontSize:12,border:"1px solid #e5e7eb"}}>
<div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}><b style={{fontSize:9,opacity:0.7}}>{m.sender?.split("@")[0]}</b>{chatJob.created_by===user.email&&m.sender!==user.email&&<button onClick={()=>hireArtisan(m.sender,m.sender.split("@")[0],chatJob.id)} style={{background:"#FFD700",color:"#0A1931",border:"none",borderRadius:6,padding:"2px 6px",fontSize:8,fontWeight:"bold"}}>Hire</button>}</div>
<div style={{marginTop:"4px"}}>{m.message}</div>
</div>
))}
<div ref={chatEndRef}></div>
</div>
<div style={{padding:"10px",background:"#fff",display:"flex",gap:"6px",borderTop:"1px solid #e5e7eb"}}><input value={chatTxt} onChange={e=>setChatTxt(e.target.value)} placeholder="Negotiate price, timeline..." style={{flex:1,padding:"12px",borderRadius:20,border:"1px solid #ddd"}} onKeyPress={e=>{if(e.key==="Enter")sendMsg();}}/><button onClick={sendMsg} style={{padding:"10px 18px",background:"#0A1931",color:"#FFD700",border:"none",borderRadius:20,fontWeight:"bold"}}>Send</button></div>
</div>}

{payModal&&<div style={{position:"fixed",top:0,left:0,right:0,bottom:0,background:"rgba(0,0,0,0.6)",zIndex:60,display:"flex",alignItems:"center",justifyContent:"center",padding:"15px"}}>
<div style={{background:"#fff",borderRadius:16,width:"100%",maxWidth:"360px",overflow:"hidden"}}>
<div style={{background:"#0A1931",color:"#fff",padding:"14px"}}><b style={{color:"#FFD700"}}>Secure Checkout • Paystack</b><div style={{fontSize:10,color:"#ccc"}}>Budget + Service fee (like tax)</div></div>
<div style={{padding:"14px"}}>
<div style={{display:"flex",justifyContent:"space-between",marginBottom:"8px"}}><span>Budget Amount</span><b>₦{payModal.budget.toLocaleString()}</b></div>
<div style={{display:"flex",justifyContent:"space-between",marginBottom:"8px",color:"#666",fontSize:12}}><span>Maintenance Fee ({payModal.type==="client"?"5%":"10%"})</span><span>₦{payModal.fee.toLocaleString()}</span></div>
<div style={{borderTop:"1px dashed #ddd",margin:"10px 0"}}></div>
<div style={{display:"flex",justifyContent:"space-between",fontWeight:"bold",fontSize:16}}><span>Total to Pay</span><span>₦{payModal.type==="client"?payModal.total.toLocaleString():payModal.fee.toLocaleString()}</span></div>
<button onClick={payWithPaystack} style={{width:"100%",marginTop:"12px",padding:"12px",background:"#0A1931",color:"#FFD700",border:"none",borderRadius:10,fontWeight:"bold"}}>Pay ₦{payModal.type==="client"?payModal.total.toLocaleString():payModal.fee.toLocaleString()} with Paystack</button>
<button onClick={()=>setPayModal(null)} style={{width:"100%",marginTop:"8px",padding:"10px",background:"#fff",color:"#0A1931",border:"1px solid #ddd",borderRadius:10}}>Cancel</button>
<div style={{textAlign:"center",marginTop:"8px"}}><small style={{fontSize:8,color:"#666"}}>🔒 Secured by Paystack • Test card: 4084084084084081</small></div>
</div>
</div>
</div>}

{pv&&<div style={{position:"fixed",top:0,left:0,right:0,bottom:0,background:"rgba(0,0,0,0.96)",zIndex:100,display:"flex",flexDirection:"column"}}><div style={{display:"flex",justifyContent:"space-between",padding:"12px",color:"#fff"}}><b style={{color:"#FFD700"}}>Protected</b><button onClick={()=>setPv(null)} style={{background:"#fff",border:"none",borderRadius:"50%",width:32,height:32}}>X</button></div><div style={{flex:1,display:"flex",alignItems:"center",justifyContent:"center"}}><img src={pv} style={{maxWidth:"95%",maxHeight:"80vh",borderRadius:"8px"}} alt="full"/></div></div>}
</div>
)
                }
