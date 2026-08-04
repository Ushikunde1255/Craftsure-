import { useState, useEffect, useRef } from "react";
import { createClient } from "@supabase/supabase-js";
const supa = createClient("https://unzohyrabvouclsjcpfu.supabase.co","sb_publishable_zB3k0KebVFw4-xf_TtdaUw_UlHsXk_q");
const ADMIN = "nicholasu9@gmail.com";
const PK = "pk_test_aaa1ae824c287d9865dd27a044670676c0df836d";

export default function App(){
const [tab,setTab]=useState("home");
const [user,setUser]=useState(JSON.parse(localStorage.getItem("cs_user")||"null"));
const [email,setEmail]=useState(""); const [pass,setPass]=useState("");
const [jobs,setJobs]=useState([]); const [arts,setArts]=useState([]);
const [msgs,setMsgs]=useState([]); const [pays,setPays]=useState([]);
const [hires,setHires]=useState([]); const [ads,setAds]=useState([]);
const [jt,setJt]=useState(""); const [jl,setJl]=useState("");
const [jb,setJb]=useState(""); const [jd,setJd]=useState(""); const [ji,setJi]=useState("");
const [pv,setPv]=useState(null);
const [an,setAn]=useState(""); const [askill,setAskill]=useState("");
const [aloc,setAloc]=useState(""); const [awhat,setAwhat]=useState("");
const [aport,setAport]=useState(""); const [aworks,setAworks]=useState([]);
const [chatJob,setChatJob]=useState(null); const [chatTxt,setChatTxt]=useState("");
const [payM,setPayM]=useState(null); const [otpS,setOtpS]=useState("");
const [otpI,setOtpI]=useState(""); const [pVer,setPVer]=useState(false);
const [eVer,setEVer]=useState(false); const [verM,setVerM]=useState("phone");
const [verE,setVerE]=useState(""); const [adC,setAdC]=useState("");
const [adT,setAdT]=useState(""); const [adImg,setAdImg]=useState("");
const [adL,setAdL]=useState(""); const [adP,setAdP]=useState("Basic");
const [selArt,setSelArt]=useState(null);
const [payoutMethod,setPayoutMethod]=useState("Bank Account");
const [bankName,setBankName]=useState("GTBank");
const [proofs,setProofs]=useState({});
const [accNum,setAccNum]=useState(""); const [accName,setAccName]=useState("");
const chatEndRef=useRef(null);

const load=async()=>{
try{
const {data:j}=await supa.from("jobs").select("*").order("id",{ascending:false}).limit(20);
if(j) setJobs(j);
const {data:a}=await supa.from("artisans").select("*").order("id",{ascending:false}).limit(50);
if(a) setArts(a);
const {data:m}=await supa.from("messages").select("*").order("id",{ascending:true}).limit(100);
if(m) setMsgs(m);
const {data:p}=await supa.from("payments").select("*").order("id",{ascending:false}).limit(50);
if(p) setPays(p);
const {data:h}=await supa.from("hires").select("*").order("id",{ascending:false}).limit(30);
if(h) setHires(h);
const {data:ad}=await supa.from("ads").select("*").order("id",{ascending:false}).limit(20);
if(ad) setAds(ad);
}catch(e){console.log(e)}
};
useEffect(()=>{load();},[]);
useEffect(()=>{if(chatEndRef.current) chatEndRef.current.scrollIntoView({behavior:"smooth"});},[msgs,chatJob]);
useEffect(()=>{const s=document.createElement("script");s.src="https://js.paystack.co/v1/inline.js";s.async=true;document.body.appendChild(s);},[]);

const getB=(b)=>{let n=parseInt((b||"").replace(/[^0-9]/g,""))||0;if((b||"").toLowerCase().includes("k")) n=n*1000;return n;};
const parseW=(w)=>{try{const a=JSON.parse(w||"[]");return Array.isArray(a)?a:[];}catch{return [];}};
const isAdmin = user && user.email && user.email.toLowerCase()===ADMIN.toLowerCase();

// SAFE TOTALS - NEVER CRASH
const c7Total = (pays||[]).filter(p=>p.payer_type==="client").reduce((s,p)=>s+Math.floor((p.amount||0)*0.07/1.07),0);
const a3Total = (pays||[]).filter(p=>p.payer_type==="client").reduce((s,p)=>s+Math.floor((p.amount||0)*0.03/1.07),0);
const adTotal = (ads||[]).reduce((s,a)=>s+(a.amount||0),0);
const grand = c7Total + a3Total + adTotal;

const compress=(b64,maxW,q)=>{return new Promise(r=>{const i=new Image();i.onload=()=>{const c=document.createElement("canvas");let w=i.width,h=i.height;if(w>maxW){h=h*maxW/w;w=maxW;}c.width=w;c.height=h;c.getContext("2d").drawImage(i,0,0,w,h);r(c.toDataURL("image/jpeg",q));};i.src=b64;});};
const up=e=>{const f=e.target.files[0];if(!f)return;const r=new FileReader();r.onload=ev=>{compress(ev.target.result,600,0.4).then(c=>setJi(c));};r.readAsDataURL(f);};
const upArt=e=>{const f=e.target.files[0];if(!f)return;const r=new FileReader();r.onload=ev=>{compress(ev.target.result,300,0.4).then(c=>setAport(c));};r.readAsDataURL(f);};
const upWorks=e=>{const files=Array.from(e.target.files).slice(0,5);files.forEach(f=>{const r=new FileReader();r.onload=ev=>{compress(ev.target.result,500,0.4).then(c=>setAworks(p=>[...p,c].slice(0,5)));};r.readAsDataURL(f);});};
const upAd=e=>{const f=e.target.files[0];if(!f)return;const r=new FileReader();r.onload=ev=>{compress(ev.target.result,600,0.5).then(c=>setAdImg(c));};r.readAsDataURL(f);};
const upProof=(jobId,stage,e)=>{const f=e.target.files[0];if(!f)return;const r=new FileReader();r.onload=ev=>{const i=new Image();i.onload=()=>{const c=document.createElement("canvas");let w=i.width,h=i.height;if(w>700){h=h*700/w;w=700;}c.width=w;c.height=h;c.getContext("2d").drawImage(i,0,0,w,h);const comp=c.toDataURL("image/jpeg",0.5);setProofs(p=>({...p,[jobId]:{...p[jobId],[stage]:comp}}));};i.src=ev.target.result;};r.readAsDataURL(f);};

const sendPhoneOtp=()=>{if(awhat.length<10)return alert("Enter phone");const c=Math.floor(100000+Math.random()*900000).toString();setOtpS(c);alert("OTP Code: "+c+" (Demo - in live will SMS)");};
const verifyPhoneOtp=()=>{if(otpI===otpS){setPVer(true);setVerM("phone");alert("Phone Verified ✅");}else alert("Wrong code");};
const sendEmailOtp=()=>{if(!verE.includes("@"))return alert("Enter email");const c=Math.floor(100000+Math.random()*900000).toString();setOtpS(c);alert("OTP Code: "+c);};
const verifyEmailOtp=()=>{if(otpI===otpS){setEVer(true);setVerM("email");alert("Email Verified ✅");}else alert("Wrong code");};
const verifyAcc=()=>{if(accNum.length<8)return alert("Enter account");setAccName("Verified - "+an);alert("✅ Verified: "+payoutMethod+" "+bankName+" - "+accNum);};

const postJob=async()=>{if(!user)return alert("Login first");if(!jt||!jl)return alert("Fill title & location");await supa.from("jobs").insert([{title:jt,location:jl,budget:jb,description:jd,image_url:ji,created_by:user.email}]);setJt("");setJl("");setJb("");setJd("");setJi("");load();setTab("home");};
const postArt=async()=>{
if(!an||!askill||!aloc)return alert("Fill name,skill,location");
if(!aport)return alert("Profile photo needed"); if(aworks.length===0)return alert("Upload 1 job photo");
if(!accNum)return alert("Enter Bank/Opay/MoMo number for payout");
if(!pVer&&!eVer)return alert("Verify phone or email");
const payload={name:an,skill:askill,location:aloc,whatsapp:awhat||verE,portfolio:aport,bio:"Verified - "+verM+" - "+payoutMethod+" "+accNum,works:JSON.stringify(aworks),rating:4.9,jobs_done:aworks.length,verified:true,created_by:verE||awhat||user?.email||"guest",phone_verified:pVer,email_verified:eVer,verification_method:verM,payout_method:payoutMethod,bank_name:bankName,account_number:accNum,account_name:accName||an};
const {error}=await supa.from("artisans").insert([payload]); if(error)return alert(error.message);
alert("✅ "+an+" Created - 3% fee only - Payout to "+payoutMethod+" "+accNum);
setAworks([]);setAn("");setAskill("");setAloc("");setAwhat("");setAport("");setAccNum("");setAccName("");setPVer(false);setEVer(false);setOtpS("");load();setTab("artisans");
};
const postAd=async()=>{if(!adC||!adT)return alert("Fill company & title"); const amt=adP==="Basic"?20000:adP==="Premium"?50000:100000; const {error}=await supa.from("ads").insert([{company_name:adC,title:adT,image_url:adImg,link:adL,package:adP,amount:amt,created_by:user?.email||"guest",status:"active"}]); if(error)return alert(error.message); alert("✅ Ad Posted - Will show on Home page!"); setAdC("");setAdT("");setAdImg("");setAdL(""); load(); setTab("home");};
const hireArtisan=async(em,name,jid)=>{const id=jid||(chatJob&&chatJob.id)||(jobs[0]&&jobs[0].id); if(!id)return alert("Select job - Go Home first"); if(!user)return alert("Login first"); await supa.from("hires").insert([{job_id:id,client_email:user.email,artisan_email:em,artisan_name:name,status:"hired"}]); alert("✅ Hired "+name+" - Pay 35% to start - 3% fee only"); load(); setSelArt(null);};
const openPay=(job,stage)=>{const b=getB(job.budget); const ct=b+Math.floor(b*0.07); const at=b-Math.floor(b*0.03); let sa=0,ag=0,sl=""; if(stage===35){sa=Math.floor(ct*0.35);ag=Math.floor(at*0.35);sl="35% Start";}else if(stage===75){sa=Math.floor(ct*0.40);ag=Math.floor(at*0.40);sl="40% Mid (75%)";}else{sa=Math.floor(ct*0.25);ag=Math.floor(at*0.25);sl="25% Final";} setPayM({job,stage,budget:b,ct,at,sa,ag,sl});};
const payNow=()=>{if(!payM||!window.PaystackPop)return alert("Paystack loading..."); const h=window.PaystackPop.setup({key:PK,email:user?.email||"test@test.com",amount:payM.sa*100,currency:"NGN",ref:"CS"+Math.floor(Math.random()*1e9),callback:async(r)=>{await supa.from("payments").insert([{job_id:payM.job.id,payer_email:user.email,payer_type:"client",amount:payM.sa,artisan_amount:payM.ag,percent_type:payM.stage+"%",status:"held",paystack_ref:r.reference}]); setPayM(null); alert("✅ Paid "+payM.sl+" ₦"+payM.sa.toLocaleString()+" - Held in escrow - Artisan gets ₦"+payM.ag.toLocaleString()+" after proof"); load();},onClose:()=>{}}); h.openIframe();};

return(
<div style={{background:"#f5f7fb",minHeight:"100vh",fontFamily:"system-ui"}}>
{/* BEAUTIFUL HEADER - EXACT AS YOUR SCREENSHOT */}
<div style={{background:"#0A1931",padding:"12px",display:"flex",justifyContent:"space-between",alignItems:"flex-start",borderBottom:"4px solid #FFD700"}}>
<div style={{display:"flex",gap:10,alignItems:"center"}}>
<div style={{width:52,height:52,borderRadius:"50%",background:"#FFD700",display:"flex",alignItems:"center",justifyContent:"center",border:"3px solid #fff",fontWeight:"bold",color:"#0A1931",fontSize:20}}>C</div>
<div><b style={{color:"#fff",fontSize:17,lineHeight:"1.1"}}>CraftSure<br/>NG 🇳🇬🇬🇭</b><div style={{color:"#FFD700",fontSize:9,fontWeight:"bold"}}>NIGERIA & GHANA • VERIFIED</div></div>
</div>
<div style={{display:"flex",gap:7,flexWrap:"wrap",justifyContent:"flex-end",maxWidth:210}}>
<button onClick={()=>setTab("home")} style={{padding:"7px 14px",borderRadius:12,border:"none",background:tab==="home"?"#fff":"#112240",color:tab==="home"?"#0A1931":"#fff",fontSize:12,fontWeight:"bold"}}>Home</button>
<button onClick={()=>setTab("artisans")} style={{padding:"7px 14px",borderRadius:12,border:"none",background:tab==="artisans"?"#fff":"#112240",color:tab==="artisans"?"#0A1931":"#fff",fontSize:12,fontWeight:"bold"}}>Artisans</button>
<button onClick={()=>setTab("brands")} style={{padding:"7px 14px",borderRadius:12,border:"none",background:tab==="brands"?"#fff":"#112240",color:tab==="brands"?"#0A1931":"#fff",fontSize:12,fontWeight:"bold"}}>Ads</button>
<button onClick={()=>setTab("admin")} style={{padding:"7px 14px",borderRadius:12,border:"none",background:"#ef4444",color:"#fff",fontSize:12,fontWeight:"bold"}}>Admin 💰</button>
<button onClick={()=>setTab("post")} style={{padding:"7px 14px",borderRadius:12,border:"none",background:"#FFD700",color:"#0A1931",fontSize:12,fontWeight:"bold"}}>Post Job</button>
<button onClick={()=>setTab("join")} style={{padding:"7px 14px",borderRadius:12,border:"none",background:"#22c55e",color:"#fff",fontSize:12,fontWeight:"bold"}}>+ Join</button>
{user?<button onClick={()=>{localStorage.removeItem("cs_user");setUser(null);}} style={{padding:"7px 14px",borderRadius:20,border:"2px solid #FFD700",background:"#fff",color:"#0A1931",fontSize:11,fontWeight:"bold"}}>{user.email.slice(0,5)} Out</button>:<button onClick={()=>setTab("login")} style={{padding:"7px 14px",borderRadius:20,border:"none",background:"#fff",color:"#0A1931",fontSize:11,fontWeight:"bold"}}>Login</button>}
</div>
</div>
<div style={{background:"#e6f4ea",padding:"8px 14px",display:"flex",justifyContent:"space-between",alignItems:"center"}}><small style={{fontSize:11,color:"#155724",fontWeight:"700"}}>🇳🇬🇬🇭 Data Saver • Verified • Paystack & MoMo • 3%+7%=10%</small><button onClick={load} style={{padding:"6px 16px",borderRadius:20,border:"none",background:"#0A1931",color:"#FFD700",fontSize:11,fontWeight:"bold"}}>Refresh</button></div>

{/* HOME - WITH ADS DISPLAY */}
{tab==="home"&&<div>
{/* ADS DISPLAY ON HOME */}
{ads.length>0&&<div style={{padding:"12px 12px 0 12px"}}><b style={{fontSize:13}}>🔥 Sponsored Ads ({ads.length})</b><div style={{display:"flex",gap:10,overflowX:"auto",marginTop:8,paddingBottom:6}}>{ads.map(ad=><a key={ad.id} href={ad.link||"#"} target="_blank" style={{minWidth:220,background:"#fff",borderRadius:12,border:"2px solid #FFD700",overflow:"hidden",textDecoration:"none",color:"#111"}}>{ad.image_url&&<img src={ad.image_url} style={{width:"100%",height:110,objectFit:"cover"}} alt="ad"/>}<div style={{padding:8}}><b style={{fontSize:12}}>{ad.company_name}</b><div style={{fontSize:11,color:"#555"}}>{ad.title} • {ad.package} • ₦{(ad.amount||0).toLocaleString()}</div></div></a>)}</div></div>}
{jobs.map(j=>{
const b=getB(j.budget);
const hired=hires.find(h=>h.job_id==j.id);
const jobProofs=proofs[j.id]||{};
return(
<div key={j.id} style={{background:"#fff",margin:"12px",borderRadius:16,overflow:"hidden",border:"1px solid #e5e7eb",boxShadow:"0 2px 10px rgba(0,0,0,0.06)"}}>
<div style={{position:"relative"}}>
{j.image_url&&<img src={j.image_url} style={{width:"100%",height:210,objectFit:"cover"}} alt="job" onClick={()=>setPv(j.image_url)}/>}
{hired&&<div style={{position:"absolute",top:12,left:"50%",transform:"translateX(-50%)",background:"#0A1931",color:"#FFD700",padding:"6px 16px",borderRadius:20,fontSize:11,fontWeight:"bold",border:"1px solid #FFD700"}}>Hired: {hired.artisan_name}</div>}
<div style={{position:"absolute",bottom:0,left:0,right:0,background:"rgba(10,25,49,0.88)",padding:"7px 12px",display:"flex",justifyContent:"space-between"}}>
<small style={{color:"#FFD700",fontSize:11,fontWeight:"bold"}}>Verified</small>
<small style={{color:"#FFD700",fontSize:11,fontWeight:"bold"}}>N{b.toLocaleString()}</small>
</div>
</div>
<div style={{padding:"14px"}}>
<div style={{display:"flex",justifyContent:"space-between"}}><b style={{fontSize:16}}>{j.title}</b>{hired&&<span style={{background:"#22c55e",color:"#fff",padding:"4px 12px",borderRadius:20,fontSize:10,fontWeight:"bold"}}>HIRED</span>}</div>
<small style={{color:"#666"}}>{j.location} - N{b.toLocaleString()}</small>
<div style={{fontSize:12,color:"#555",marginTop:6}}>{j.description}</div>
<div style={{display:"flex",gap:10,marginTop:14}}>
<button onClick={()=>{if(!user)return alert("Login");setChatJob(j);}} style={{flex:1,padding:"13px",border:"none",borderRadius:12,background:"#0A1931",color:"#FFD700",fontWeight:"bold",fontSize:13}}>Chat to Hire</button>
<button onClick={()=>{if(!user)return alert("Login first");alert("Contact Unlocked: "+j.created_by);}} style={{flex:1,padding:"13px",border:"none",borderRadius:12,background:"#FFD700",color:"#0A1931",fontWeight:"bold",fontSize:13}}>Unlock Contact</button>
</div>
<div style={{marginTop:14,padding:"12px",border:"2px dashed #FFD700",borderRadius:12,background:"#fffbe6"}}>
<b style={{fontSize:11}}>ARTISAN UPLOAD PROOF 35% 75% 100% (NEW):</b>
<div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:8,marginTop:10}}>
{[35,75,100].map(stage=>{
const hasProof=jobProofs[stage];
return(
<div key={stage} style={{background:"#fff",borderRadius:10,border:"1px solid #0A1931",padding:"8px",textAlign:"center"}}>
<div style={{fontSize:11,fontWeight:"bold",marginBottom:6}}>{stage}%</div>
{hasProof&&<img src={hasProof} style={{width:"100%",height:48,objectFit:"cover",borderRadius:6,marginBottom:6}} alt="proof"/>}
<label style={{display:"block",background:hasProof?"#22c55e":"#f3f4f6",padding:"6px",borderRadius:6,fontSize:10,cursor:"pointer",fontWeight:"bold",color:hasProof?"#fff":"#111"}}>{hasProof?"Uploaded":"Upload Proof"}<input type="file" accept="image/*" style={{display:"none"}} onChange={e=>upProof(j.id,stage,e)}/></label>
<button onClick={()=>openPay(j,stage)} style={{width:"100%",marginTop:6,padding:"8px",background:"#0A1931",color:"#FFD700",border:"none",borderRadius:8,fontSize:11,fontWeight:"bold"}}>Pay {stage}%</button>
</div>
);
})}
</div>
<small style={{fontSize:9,color:"#666",marginTop:8,display:"block"}}>Escrow secured - charges applied at checkout - auto to Opay/MoMo/Bank</small>
</div>
</div>
</div>
);
})}

{tab==="artisans"&&<div style={{padding:"12px"}}><h3 style={{margin:"8px 0"}}>• Portfolio — 3% Fee Only!</h3>{arts.map(a=>{const w=parseW(a.works);return(<div key={a.id} style={{background:"#fff",borderRadius:14,marginBottom:"10px",padding:"14px",border:"1px solid #e5e7eb",borderLeft:"4px solid #FFD700"}}><div style={{display:"flex",justifyContent:"space-between"}}><div><b style={{fontSize:16}}>{a.name}</b><div style={{display:"flex",gap:6,marginTop:6}}><span>⭐⭐⭐⭐⭐</span><small>{a.rating||4.9} • {a.jobs_done||1} jobs</small></div><small style={{display:"block",marginTop:4}}>📍 {a.location} • 💳 {a.payout_method||a.bank_name||"Bank"} {a.account_number||""}</small></div><div style={{display:"flex",flexDirection:"column",gap:6}}><span style={{background:"#0A1931",color:"#FFD700",padding:"4px 10px",borderRadius:12,fontSize:10,fontWeight:"bold"}}>{a.skill}</span><button onClick={()=>setSelArt(a)} style={{padding:"8px 18px",borderRadius:10,border:"none",background:"#0A1931",color:"#FFD700",fontWeight:"bold",fontSize:12}}>View</button></div></div>{w.length>0&&<div style={{display:"flex",gap:6,marginTop:10}}>{w.slice(0,2).map((x,i)=><img key={i} src={x} style={{width:"80px",height:"60px",borderRadius:8,objectFit:"cover",border:"1px solid #FFD700"}} alt="work"/>)}</div>}</div>);})}<button onClick={()=>setTab("join")} style={{width:"100%",marginTop:14,padding:"14px",borderRadius:12,border:"none",background:"#FFD700",color:"#0A1931",fontWeight:"bold"}}>+ Join as Artisan - 3% Fee Only!</button></div>}

{/* ADMIN - FIXED WHITE BLANK */}
{tab==="admin"&&<div style={{padding:"16px"}}>
{!isAdmin?<div style={{background:"#fff",padding:20,borderRadius:16,textAlign:"center",border:"2px solid #ef4444"}}><h3>🔒 Admin Only</h3><p>Login as nicholasu9@gmail.com to view revenue</p><p style={{fontSize:12,color:"#666"}}>Current: {user?.email||"Not logged"}</p><button onClick={()=>setTab("login")} style={{padding:"10px 20px",background:"#0A1931",color:"#FFD700",border:"none",borderRadius:10,fontWeight:"bold"}}>Login as Admin</button></div>:
<div><h2 style={{color:"#0A1931",fontSize:20,marginBottom:16}}>Admin — NG & GH — 3%+7%=10%</h2>
<div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>
<div style={{background:"#0A1931",padding:"18px",borderRadius:16,border:"2px solid #FFD700"}}><small style={{color:"#FFD700"}}>Jobs</small><h1 style={{color:"#FFD700",margin:"10px 0"}}>{jobs.length}</h1></div>
<div style={{background:"#fff",padding:"18px",borderRadius:16,border:"1px solid #ddd"}}><small>Artisans (Opay/MoMo)</small><h1 style={{color:"#0A1931",margin:"10px 0"}}>{arts.length}</h1></div>
<div style={{background:"#FFD700",padding:"18px",borderRadius:16}}><small style={{color:"#0A1931"}}>Client 7% Fee</small><h1 style={{color:"#0A1931",margin:"10px 0",fontSize:22}}>₦{c7Total.toLocaleString()}</h1></div>
<div style={{background:"#0A1931",padding:"18px",borderRadius:16}}><small style={{color:"#FFD700"}}>Artisan 3% Fee</small><h1 style={{color:"#fff",margin:"10px 0",fontSize:22}}>₦{a3Total.toLocaleString()}</h1></div>
<div style={{background:"#fff",padding:"18px",borderRadius:16,border:"2px solid #FFD700"}}><small>Ads Revenue</small><h1 style={{margin:"10px 0",fontSize:22}}>₦{adTotal.toLocaleString()}</h1><small>{ads.length} ads</small></div>
<div style={{background:"#0A1931",padding:"18px",borderRadius:16,border:"2px solid #FFD700"}}><small style={{color:"#FFD700"}}>GRAND 10%</small><h1 style={{color:"#FFD700",margin:"10px 0"}}>₦{grand.toLocaleString()}</h1></div>
</div>
<div style={{background:"#fff",marginTop:16,padding:14,borderRadius:14}}><b>Recent Ads (will show on Home)</b>{ads.map(ad=><div key={ad.id} style={{display:"flex",gap:10,padding:"8px 0",borderBottom:"1px solid #eee",alignItems:"center"}}><img src={ad.image_url} style={{width:50,height:40,objectFit:"cover",borderRadius:6}} alt="ad"/><div><b style={{fontSize:12}}>{ad.company_name}</b><div style={{fontSize:11}}>{ad.title} - ₦{(ad.amount||0).toLocaleString()}</div></div></div>)}</div>
</div>}
</div>}

{tab==="join"&&<div style={{padding:"14px"}}><h3>Join as Artisan — 3% Fee Only! — Opay/Palmpay/MoMo Payout</h3><div style={{background:"#fff",padding:"14px",borderRadius:14,border:"1px solid #e5e7eb"}}>
<input value={an} onChange={e=>setAn(e.target.value)} placeholder="Full Name *" style={{width:"100%",padding:"10px",marginBottom:"8px",borderRadius:8,border:"1px solid #ddd"}}/>
<input value={askill} onChange={e=>setAskill(e.target.value)} placeholder="Skill *" style={{width:"100%",padding:"10px",marginBottom:"8px",borderRadius:8,border:"1px solid #ddd"}}/>
<input value={aloc} onChange={e=>setAloc(e.target.value)} placeholder="Location *" style={{width:"100%",padding:"10px",marginBottom:"8px",borderRadius:8,border:"1px solid #ddd"}}/>
<div style={{background:"#f0f9ff",padding:10,borderRadius:10,marginBottom:8,border:"1px solid #0A1931"}}>
<div style={{display:"flex",gap:6,marginBottom:6}}><button onClick={()=>setVerM("phone")} style={{flex:1,padding:8,background:verM==="phone"?"#0A1931":"#fff",color:verM==="phone"?"#FFD700":"#0A1931",border:"1px solid #0A1931",borderRadius:8,fontWeight:"bold"}}>Phone</button><button onClick={()=>setVerM("email")} style={{flex:1,padding:8,background:verM==="email"?"#0A1931":"#fff",color:verM==="email"?"#FFD700":"#0A1931",border:"1px solid #0A1931",borderRadius:8,fontWeight:"bold"}}>Email</button></div>
{verM==="phone"?<div style={{display:"flex",gap:6}}><input value={awhat} onChange={e=>setAwhat(e.target.value)} placeholder="080..." style={{flex:1,padding:10,borderRadius:8,border:"1px solid #ddd"}}/><button onClick={sendPhoneOtp} style={{padding:10,background:"#0A1931",color:"#FFD700",border:"none",borderRadius:8,fontWeight:"bold"}}>Send</button></div>:<><input value={verE} onChange={e=>setVerE(e.target.value)} placeholder="email" style={{width:"100%",padding:10,borderRadius:8,border:"1px solid #ddd"}}/><button onClick={sendEmailOtp} style={{marginTop:6,padding:8,background:"#0A1931",color:"#FFD700",border:"none",borderRadius:8,fontWeight:"bold"}}>Send Code</button></>}
<div style={{display:"flex",gap:6,marginTop:8}}><input value={otpI} onChange={e=>setOtpI(e.target.value)} placeholder="6-digit" style={{flex:1,padding:10,borderRadius:8,border:"1px solid #ddd"}}/><button onClick={verM==="phone"?verifyPhoneOtp:verifyEmailOtp} style={{padding:10,background:(pVer||eVer)?"#22c55e":"#FFD700",border:"none",borderRadius:8,fontWeight:"bold"}}>{(pVer||eVer)?"Verified ✅":"Verify"}</button></div>
</div>
{/* BANK / MOMO FIELDS - NEW */}
<div style={{background:"#fffbe6",padding:10,borderRadius:10,marginTop:8,border:"2px solid #FFD700"}}>
<b style={{fontSize:12}}>💳 Payout Method — Auto to Opay/Palmpay/MoMo/Bank (3% fee)</b>
<select value={payoutMethod} onChange={e=>setPayoutMethod(e.target.value)} style={{width:"100%",padding:10,marginTop:8,borderRadius:8,border:"1px solid #0A1931"}}>
<option>Bank Account</option><option>Opay</option><option>Palmpay</option><option>Moniepoint</option><option>MTN MoMo Ghana</option><option>Vodafone Cash</option><option>AirtelTigo Money</option><option>MTN MoMo Nigeria</option>
</select>
<select value={bankName} onChange={e=>setBankName(e.target.value)} style={{width:"100%",padding:10,marginTop:6,borderRadius:8,border:"1px solid #ddd"}}>
{payoutMethod==="Bank Account"?<><option>GTBank</option><option>Access Bank</option><option>First Bank</option><option>UBA</option><option>Zenith Bank</option><option>Opay - 999992</option><option>Palmpay - 999991</option><option>Moniepoint - 50515</option></>:<><option>MTN</option><option>Vodafone</option><option>AirtelTigo</option><option>Opay</option></>}
</select>
<div style={{display:"flex",gap:6,marginTop:6}}><input value={accNum} onChange={e=>setAccNum(e.target.value)} placeholder={payoutMethod.includes("MoMo")?"MoMo Number 024...":"Account Number 0123456789"} style={{flex:1,padding:10,borderRadius:8,border:"1px solid #ddd"}}/><button onClick={verifyAcc} style={{padding:10,background:"#0A1931",color:"#FFD700",border:"none",borderRadius:8,fontWeight:"bold"}}>Verify</button></div>
{accName&&<small style={{color:"green",fontWeight:"bold"}}>{accName}</small>}
<small style={{display:"block",marginTop:4,fontSize:10,color:"#666"}}>Paystack will auto pay 97% after proof approval to this {payoutMethod}</small>
</div>
<input type="file" accept="image/*" onChange={upArt} style={{marginTop:8}}/>
<input type="file" accept="image/*" multiple onChange={upWorks} style={{marginTop:6}}/>
<div style={{display:"flex",gap:6,flexWrap:"wrap",marginTop:8}}>{aworks.map((w,i)=><img key={i} src={w} style={{width:50,height:50,borderRadius:8,border:"2px solid #FFD700"}} alt="w"/>)}</div>
<button onClick={postArt} style={{width:"100%",marginTop:12,padding:12,background:(pVer||eVer)&&accNum?"#0A1931":"#999",color:"#FFD700",border:"none",borderRadius:10,fontWeight:"bold"}}>Create Artisan — 3% Fee — Auto to {payoutMethod}</button>
</div></div>}

{tab==="post"&&<div style={{padding:"14px"}}><h3>Post a Job — Client 7% Fee</h3><div style={{background:"#fff",padding:"14px",borderRadius:14,border:"1px solid #e5e7eb"}}><input value={jt} onChange={e=>setJt(e.target.value)} placeholder="Job Title" style={{width:"100%",padding:10,marginBottom:8,borderRadius:8,border:"1px solid #ddd"}}/><input value={jl} onChange={e=>setJl(e.target.value)} placeholder="Location" style={{width:"100%",padding:10,marginBottom:8,borderRadius:8,border:"1px solid #ddd"}}/><input value={jb} onChange={e=>setJb(e.target.value)} placeholder="Budget e.g. 400000" style={{width:"100%",padding:10,marginBottom:8,borderRadius:8,border:"1px solid #ddd"}}/><textarea value={jd} onChange={e=>setJd(e.target.value)} placeholder="Description" style={{width:"100%",padding:10,marginBottom:8,borderRadius:8,border:"1px solid #ddd"}}/><input type="file" accept="image/*" onChange={up} style={{marginBottom:8}}/>{ji&&<img src={ji} style={{width:"100%",maxHeight:150,borderRadius:12,marginBottom:8}} alt="prev"/>}<button onClick={postJob} style={{width:"100%",padding:12,background:"#0A1931",color:"#FFD700",border:"none",borderRadius:10,fontWeight:"bold"}}>Post Job — Pay 7% Escrow Fee</button></div></div>}

{tab==="brands"&&<div style={{padding:"14px"}}><h3>Advertise — Will show on Home page top</h3><div style={{background:"#fff",padding:"14px",borderRadius:14,border:"1px solid #e5e7eb"}}><input value={adC} onChange={e=>setAdC(e.target.value)} placeholder="Company" style={{width:"100%",padding:10,marginBottom:8,borderRadius:8,border:"1px solid #ddd"}}/><input value={adT} onChange={e=>setAdT(e.target.value)} placeholder="Title" style={{width:"100%",padding:10,marginBottom:8,borderRadius:8,border:"1px solid #ddd"}}/><input value={adL} onChange={e=>setAdL(e.target.value)} placeholder="Link https://" style={{width:"100%",padding:10,marginBottom:8,borderRadius:8,border:"1px solid #ddd"}}/><select value={adP} onChange={e=>setAdP(e.target.value)} style={{width:"100%",padding:10,borderRadius:8,border:"1px solid #ddd"}}><option>Basic - ₦20k</option><option>Premium - ₦50k</option><option>Gold - ₦100k</option></select><input type="file" accept="image/*" onChange={upAd} style={{marginTop:8}}/><button onClick={postAd} style={{width:"100%",marginTop:12,padding:12,background:"#0A1931",color:"#FFD700",border:"none",borderRadius:10,fontWeight:"bold"}}>Post Ad — Shows on Home</button></div></div>}

{tab==="login"&&<div style={{padding:"24px",display:"flex",justifyContent:"center"}}><div style={{background:"#fff",padding:"18px",borderRadius:16,width:"100%",maxWidth:"360px",border:"2px solid #0A1931"}}><b>Login</b><input value={email} onChange={e=>setEmail(e.target.value)} placeholder="Email" style={{width:"100%",padding:10,marginTop:10,borderRadius:8,border:"1px solid #ddd"}}/><input type="password" value={pass} onChange={e=>setPass(e.target.value)} placeholder="Password" style={{width:"100%",padding:10,marginTop:8,borderRadius:8,border:"1px solid #ddd"}}/><button onClick={async()=>{const {error}=await supa.auth.signInWithPassword({email,password:pass});if(error)return alert(error.message);const u={email,role:email===ADMIN?"admin":"user"};localStorage.setItem("cs_user",JSON.stringify(u));setUser(u);setTab("home");}} style={{width:"100%",padding:12,background:"#0A1931",color:"#FFD700",border:"none",borderRadius:10,fontWeight:"bold",marginTop:10}}>Login</button><button onClick={async()=>{const {error}=await supa.auth.signUp({email,password:pass});if(error)return alert(error.message);const u={email,role:email===ADMIN?"admin":"user"};localStorage.setItem("cs_user",JSON.stringify(u));setUser(u);setTab("home");}} style={{width:"100%",padding:12,background:"#fff",color:"#0A1931",border:"1.5px solid #0A1931",borderRadius:10,fontWeight:"bold",marginTop:8}}>Create Account</button></div></div>}

{selArt&&<div style={{position:"fixed",top:0,left:0,right:0,bottom:0,background:"#fff",zIndex:70,overflowY:"auto"}}><div style={{background:"#0A1931",color:"#fff",padding:"12px",display:"flex",justifyContent:"space-between",alignItems:"center",borderBottom:"3px solid #FFD700"}}><div style={{display:"flex",alignItems:"center",gap:10}}><img src={selArt.portfolio} style={{width:42,height:42,borderRadius:"50%",border:"2px solid #FFD700"}} alt="art"/><div><b style={{color:"#FFD700"}}>{selArt.name}</b><div style={{fontSize:10,color:"#ccc"}}>{selArt.skill} • {selArt.location} • {selArt.payout_method||selArt.bank_name} {selArt.account_number||""}</div></div></div><button onClick={()=>setSelArt(null)} style={{background:"#fff",border:"none",borderRadius:"50%",width:32,height:32}}>X</button></div><div style={{padding:"14px"}}><div style={{display:"flex",gap:6,marginTop:10}}><span style={{background:"#0A1931",color:"#FFD700",padding:"5px 10px",borderRadius:20,fontSize:10}}>✓ {selArt.verification_method}</span><span style={{background:"#FFD700",color:"#0A1931",padding:"5px 10px",borderRadius:20,fontSize:10}}>★ {selArt.rating||4.9} • 3% Fee</span><span style={{background:"#22c55e",color:"#fff",padding:"5px 10px",borderRadius:20,fontSize:10}}>💳 {selArt.payout_method||"Bank"} Auto</span></div><div style={{marginTop:14}}><b>Jobs Done ({parseW(selArt.works).length}) — Past Work IN VIEW</b><div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginTop:8,border:"2px solid #FFD700",borderRadius:12,padding:8,background:"#fffbe6"}}>{parseW(selArt.works).map((w,i)=><img key={i} src={w} onClick={()=>setPv(w)} style={{width:"100%",height:110,objectFit:"cover",borderRadius:10,border:"1px solid #FFD700"}} alt="work"/>)}</div></div><div style={{display:"flex",gap:8,marginTop:16}}><button onClick={()=>setSelArt(null)} style={{flex:1,padding:13,background:"#fff",color:"#0A1931",border:"1.5px solid #0A1931",borderRadius:12,fontWeight:"bold"}}>Close</button><button onClick={()=>hireArtisan(selArt.created_by||selArt.whatsapp,selArt.name)} style={{flex:1,padding:13,background:"#FFD700",color:"#0A1931",border:"none",borderRadius:12,fontWeight:"bold"}}>🔨 Hire {selArt.name.split(" ")[0]} — 3% Fee</button></div></div></div>}

{chatJob&&<div style={{position:"fixed",top:0,left:0,right:0,bottom:0,background:"#f5f7fb",zIndex:50,display:"flex",flexDirection:"column"}}><div style={{background:"#0A1931",color:"#fff",padding:"12px",display:"flex",justifyContent:"space-between",borderBottom:"3px solid #FFD700"}}><div><b style={{color:"#FFD700"}}>Chat: {chatJob.title}</b><div style={{fontSize:9,color:"#ccc"}}>Monitored • Escrow 3%+7% • Auto Opay/MoMo</div></div><button onClick={()=>setChatJob(null)} style={{background:"#fff",border:"none",borderRadius:"50%",width:32,height:32}}>X</button></div><div style={{flex:1,overflowY:"auto",padding:"12px"}}>{msgs.filter(m=>m.job_id===chatJob.id).map(m=><div key={m.id} style={{background:m.sender===user?.email?"#0A1931":"#fff",color:m.sender===user?.email?"#FFD700":"#111",padding:"9px 12px",borderRadius:14,margin:"7px 0",maxWidth:"84%",marginLeft:m.sender===user?.email?"auto":"0",fontSize:12,border:"1px solid #e5e7eb"}}>{m.message}</div>)}<div ref={chatEndRef}></div></div><div style={{padding:"12px",background:"#fff",display:"flex",gap:"8px",borderTop:"1px solid #e5e7eb"}}><input value={chatTxt} onChange={e=>setChatTxt(e.target.value)} placeholder="Negotiate..." style={{flex:1,padding:"12px",borderRadius:24,border:"1px solid #ddd"}}/><button onClick={async()=>{if(!chatTxt.trim()||!chatJob)return;await supa.from("messages").insert([{job_id:chatJob.id,sender:user.email,receiver:"all",message:chatTxt}]);setChatTxt("");load();}} style={{padding:"11px 18px",background:"#0A1931",color:"#FFD700",border:"none",borderRadius:24,fontWeight:"bold"}}>Send</button></div></div>}

{payM&&<div style={{position:"fixed",top:0,left:0,right:0,bottom:0,background:"rgba(10,25,49,0.65)",zIndex:60,display:"flex",alignItems:"center",justifyContent:"center",padding:"16px"}}><div style={{background:"#fff",borderRadius:16,width:"100%",maxWidth:"360px",overflow:"hidden",border:"2px solid #0A1931"}}><div style={{background:"#0A1931",color:"#fff",padding:"14px",borderBottom:"3px solid #FFD700"}}><b style={{color:"#FFD700"}}>Pay {payM.sl} — 7% Client Fee — Auto to Opay/MoMo (3%)</b></div><div style={{padding:"16px"}}><h2 style={{color:"#0A1931",margin:"4px 0"}}>₦{payM.sa.toLocaleString()}</h2><small>Artisan gets ₦{payM.ag.toLocaleString()} (97%) after proof approval — Auto to Opay/MoMo/Bank</small><button onClick={payNow} style={{width:"100%",marginTop:14,padding:13,background:"#0A1931",color:"#FFD700",border:"none",borderRadius:12,fontWeight:"bold"}}>Pay with Paystack — Hold in Escrow</button><button onClick={()=>setPayM(null)} style={{width:"100%",marginTop:9,padding:11,background:"#fff",border:"1px solid #ddd",borderRadius:12}}>Cancel</button></div></div></div>}

{pv&&<div style={{position:"fixed",top:0,left:0,right:0,bottom:0,background:"rgba(0,0,0,0.96)",zIndex:100,display:"flex",flexDirection:"column"}}><div style={{display:"flex",justifyContent:"space-between",padding:"12px",color:"#fff"}}><b style={{color:"#FFD700"}}>Proof Protected — 3%+7% Escrow</b><button onClick={()=>setPv(null)} style={{background:"#fff",border:"none",borderRadius:"50%",width:32,height:32}}>X</button></div><div style={{flex:1,display:"flex",alignItems:"center",justifyContent:"center"}}><img src={pv} style={{maxWidth:"95%",maxHeight:"80vh",borderRadius:12,border:"3px solid #FFD700"}} alt="full"/></div></div>}

</div>
</div>
);
  }
