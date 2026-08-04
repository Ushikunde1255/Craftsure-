import { useState, useEffect, useRef } from "react";
import { createClient } from "@supabase/supabase-js";
const supa = createClient("https://unzohyrabvouclsjcpfu.supabase.co","sb_publishable_zB3k0KebVFw4-xf_TtdaUw_UlHsXk_q");
const ADMIN = "nicholasu9@gmail.com";
const PK = "pk_test_aaa1ae824c287d9865dd27a044670676c0df836d";

const Logo = ()=>(
<div style={{display:"flex",alignItems:"center",gap:9}}>
<div style={{width:56,height:56,borderRadius:"50%",background:"#FFD700",border:"3px solid #fff",display:"flex",alignItems:"center",justifyContent:"center",padding:2}}>
<div style={{width:"100%",height:"100%",borderRadius:"50%",background:"#0A1931",display:"flex",alignItems:"center",justifyContent:"center"}}>
<div style={{position:"relative",width:32,height:32}}>
<div style={{position:"absolute",left:2,top:2,width:14,height:6,background:"#FFD700",borderRadius:3,transform:"rotate(-35deg)",transformOrigin:"right center"}}></div>
<div style={{position:"absolute",left:12,top:10,width:3,height:18,background:"#FFD700",transform:"rotate(-20deg)",borderRadius:2}}></div>
<div style={{position:"absolute",right:2,top:2,width:12,height:7,background:"#FFD700",borderRadius:2,transform:"rotate(35deg)",transformOrigin:"left center"}}></div>
<div style={{position:"absolute",right:10,top:10,width:3,height:18,background:"#FFD700",transform:"rotate(20deg)",borderRadius:2}}></div>
<div style={{position:"absolute",left:"50%",bottom:0,width:6,height:6,background:"#FFD700",borderRadius:"50%",transform:"translateX(-50%)"}}></div>
</div>
</div>
</div>
<div><b style={{color:"#fff",fontSize:16,lineHeight:"1.05"}}>CraftSure<br/>NG</b><div style={{color:"#FFD700",fontSize:8,fontWeight:"bold"}}>NIGERIA & GHANA - VERIFIED</div></div>
</div>
);

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
const [accNum,setAccNum]=useState(""); const [accName,setAccName]=useState("");
const [proofs,setProofs]=useState({});
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
const c7Total = (pays||[]).filter(p=>p.payer_type==="client").reduce((s,p)=>s+Math.floor((p.amount||0)*0.07/1.07),0);
const a3Total = (pays||[]).filter(p=>p.payer_type==="client").reduce((s,p)=>s+Math.floor((p.amount||0)*0.03/1.07),0);
const adTotal = (ads||[]).reduce((s,a)=>s+(a.amount||0),0);
const grand = c7Total + a3Total + adTotal;

const compress=(b64,maxW,q)=>{return new Promise(r=>{const i=new Image();i.onload=()=>{const c=document.createElement("canvas");let w=i.width,h=i.height;if(w>maxW){h=h*maxW/w;w=maxW;}c.width=w;c.height=h;c.getContext("2d").drawImage(i,0,0,w,h);r(c.toDataURL("image/jpeg",q));};i.src=b64;});};
const up=e=>{const f=e.target.files[0];if(!f)return;const r=new FileReader();r.onload=ev=>{compress(ev.target.result,600,0.4).then(c=>setJi(c));};r.readAsDataURL(f);};
const upArt=e=>{const f=e.target.files[0];if(!f)return;const r=new FileReader();r.onload=ev=>{compress(ev.target.result,300,0.4).then(c=>setAport(c));};r.readAsDataURL(f);};
const upWorks=e=>{const files=Array.from(e.target.files).slice(0,5);files.forEach(f=>{const r=new FileReader();r.onload=ev=>{compress(ev.target.result,500,0.4).then(c=>setAworks(p=>[...p,c].slice(0,5)));};r.readAsDataURL(f);});};
const upAd=e=>{const f=e.target.files[0];if(!f)return;const r=new FileReader();r.onload=ev=>{compress(ev.target.result,600,0.5).then(c=>setAdImg(c));};r.readAsDataURL(f);};
const upProof=(jobId,stage,e)=>{const f=e.target.files[0];if(!f)return;const r=new FileReader();r.onload=ev=>{compress(ev.target.result,700,0.5).then(c=>{setProofs(p=>({...p,[jobId]:{...p[jobId],[stage]:c}}));});};r.readAsDataURL(f);};

const sendPhoneOtp=()=>{if(awhat.length<10)return alert("Enter phone");const c=Math.floor(100000+Math.random()*900000).toString();setOtpS(c);alert("OTP: "+c+" (Demo)");};
const verifyPhoneOtp=()=>{if(otpI===otpS){setPVer(true);setVerM("phone");alert("Phone Verified");}else alert("Wrong code");};
const sendEmailOtp=()=>{if(!verE.includes("@"))return alert("Enter email");const c=Math.floor(100000+Math.random()*900000).toString();setOtpS(c);alert("OTP: "+c);};
const verifyEmailOtp=()=>{if(otpI===otpS){setEVer(true);setVerM("email");alert("Email Verified");}else alert("Wrong code");};
const verifyAcc=()=>{if(accNum.length<8)return alert("Enter account");setAccName("Verified - "+an);alert("Verified: "+payoutMethod+" "+bankName+" - "+accNum);};
const postJob=async()=>{if(!user)return alert("Login first");if(!jt||!jl)return alert("Fill title & location");await supa.from("jobs").insert([{title:jt,location:jl,budget:jb,description:jd,image_url:ji,created_by:user.email}]);setJt("");setJl("");setJb("");setJd("");setJi("");load();setTab("home");};
const postArt=async()=>{if(!an||!askill||!aloc)return alert("Fill name,skill,location");if(!aport)return alert("Profile photo needed"); if(aworks.length===0)return alert("Upload 1 job photo");if(!accNum)return alert("Enter Bank/Opay/MoMo number");if(!pVer&&!eVer)return alert("Verify phone or email");const payload={name:an,skill:askill,location:aloc,whatsapp:awhat||verE,portfolio:aport,bio:"Verified - "+verM+" - "+payoutMethod+" "+accNum,works:JSON.stringify(aworks),rating:4.9,jobs_done:aworks.length,verified:true,created_by:verE||awhat||user?.email||"guest",phone_verified:pVer,email_verified:eVer,verification_method:verM,payout_method:payoutMethod,bank_name:bankName,account_number:accNum,account_name:accName||an};const {error}=await supa.from("artisans").insert([payload]); if(error)return alert(error.message);alert("Created "+an); setAworks([]);setAn("");setAskill("");setAloc("");setAwhat("");setAport("");setAccNum("");setAccName("");setPVer(false);setEVer(false);setOtpS("");load();setTab("artisans");};
const postAd=async()=>{if(!adC||!adT)return alert("Fill company & title"); const amt=adP.includes("Basic")?20000:adP.includes("Premium")?50000:100000; const {error}=await supa.from("ads").insert([{company_name:adC,title:adT,image_url:adImg,link:adL,package:adP,amount:amt,created_by:user?.email||"guest",status:"active"}]); if(error)return alert(error.message); alert("Ad Posted - Shows on Home!"); setAdC("");setAdT("");setAdImg("");setAdL(""); load(); setTab("home");};
const hireArtisan=async(em,name,jid)=>{const id=jid||(chatJob&&chatJob.id)||(jobs[0]&&jobs[0].id); if(!id)return alert("Select job - Go Home first"); if(!user)return alert("Login first"); await supa.from("hires").insert([{job_id:id,client_email:user.email,artisan_email:em,artisan_name:name,status:"hired"}]); alert("Hired "+name); load(); setSelArt(null);};
const openPay=(job,stage)=>{const b=getB(job.budget);const ct=b+Math.floor(b*0.07);const at=b-Math.floor(b*0.03);let sa=0,ag=0,sl="";if(stage===35){sa=Math.floor(ct*0.35);ag=Math.floor(at*0.35);sl="35% Start";}else if(stage===75){sa=Math.floor(ct*0.40);ag=Math.floor(at*0.40);sl="40% Progress";}else{sa=Math.floor(ct*0.25);ag=Math.floor(at*0.25);sl="25% Final";}setPayM({job,stage,budget:b,ct,at,sa,ag,sl});};
const payNow=()=>{if(!payM||!window.PaystackPop)return alert("Paystack loading..."); const h=window.PaystackPop.setup({key:PK,email:user?.email||"test@test.com",amount:payM.sa*100,currency:"NGN",ref:"CS"+Math.floor(Math.random()*1e9),callback:async(r)=>{await supa.from("payments").insert([{job_id:payM.job.id,payer_email:user.email,payer_type:"client",amount:payM.sa,artisan_amount:payM.ag,percent_type:payM.stage+"%",status:"held",paystack_ref:r.reference}]); setPayM(null); alert("Paid "+payM.sl+" N"+payM.sa.toLocaleString()+" - Held"); load();},onClose:()=>{}}); h.openIframe();};

return(
<div style={{background:"#f5f7fb",minHeight:"100vh",fontFamily:"system-ui"}}>
<div style={{background:"#0A1931",padding:"10px 12px",display:"flex",justifyContent:"space-between",alignItems:"flex-start",borderBottom:"4px solid #FFD700"}}>
<Logo/>
<div style={{display:"flex",gap:7,flexWrap:"wrap",justifyContent:"flex-end",maxWidth:220}}>
<button onClick={()=>setTab("home")} style={{padding:"7px 12px",borderRadius:12,border:"none",background:tab==="home"?"#fff":"#112240",color:tab==="home"?"#0A1931":"#fff",fontSize:11,fontWeight:"bold"}}>Home</button>
<button onClick={()=>setTab("artisans")} style={{padding:"7px 12px",borderRadius:12,border:"none",background:tab==="artisans"?"#fff":"#112240",color:tab==="artisans"?"#0A1931":"#fff",fontSize:11,fontWeight:"bold"}}>Artisans</button>
<button onClick={()=>setTab("brands")} style={{padding:"7px 12px",borderRadius:12,border:"none",background:tab==="brands"?"#fff":"#112240",color:tab==="brands"?"#0A1931":"#fff",fontSize:11,fontWeight:"bold"}}>Ads</button>
<button onClick={()=>setTab("admin")} style={{padding:"7px 12px",borderRadius:12,border:"none",background:"#ef4444",color:"#fff",fontSize:11,fontWeight:"bold"}}>Admin</button>
<button onClick={()=>setTab("post")} style={{padding:"7px 12px",borderRadius:12,border:"none",background:"#FFD700",color:"#0A1931",fontSize:11,fontWeight:"bold"}}>Post Job</button>
<button onClick={()=>setTab("join")} style={{padding:"7px 12px",borderRadius:12,border:"none",background:"#22c55e",color:"#fff",fontSize:11,fontWeight:"bold"}}>+ Join</button>
{user?<button onClick={()=>{localStorage.removeItem("cs_user");setUser(null);}} style={{padding:"7px 10px",borderRadius:20,border:"2px solid #FFD700",background:"#fff",color:"#0A1931",fontSize:10,fontWeight:"bold"}}>{user.email.slice(0,5)} Out</button>:<button onClick={()=>setTab("login")} style={{padding:"7px 10px",borderRadius:20,border:"none",background:"#fff",color:"#0A1931",fontSize:10,fontWeight:"bold"}}>Login</button>}
</div>
</div>
<div style={{background:"#e6f4ea",padding:"8px 14px",display:"flex",justifyContent:"space-between",alignItems:"center"}}><small style={{fontSize:11,color:"#155724",fontWeight:"700"}}>NG GH Data Saver - Verified - Paystack & MoMo</small><button onClick={load} style={{padding:"6px 16px",borderRadius:20,border:"none",background:"#0A1931",color:"#FFD700",fontSize:11,fontWeight:"bold"}}>Refresh</button></div>

{tab==="home"&&<div>
{ads.length>0&&<div style={{padding:"10px 12px 0 12px"}}><b style={{fontSize:12}}>Sponsored Ads ({ads.length})</b><div style={{display:"flex",gap:10,overflowX:"auto",marginTop:8,paddingBottom:6}}>{ads.map(ad=><a key={ad.id} href={ad.link||"#"} target="_blank" style={{minWidth:210,background:"#fff",borderRadius:12,border:"2px solid #FFD700",overflow:"hidden",textDecoration:"none",color:"#111"}}>{ad.image_url&&<img src={ad.image_url} style={{width:"100%",height:105,objectFit:"cover"}} alt="ad"/>}<div style={{padding:7}}><b style={{fontSize:11}}>{ad.company_name}</b><div style={{fontSize:10,color:"#555"}}>{ad.title}</div></div></a>)}</div></div>}
{jobs.map(j=>{const b=getB(j.budget);const hired=hires.find(h=>h.job_id===j.id);const jobProofs=proofs[j.id]||{};return(
<div key={j.id} style={{background:"#fff",margin:"12px",borderRadius:16,overflow:"hidden",border:"1px solid #e5e7eb"}}>
<div style={{position:"relative"}}>{j.image_url&&<img src={j.image_url} style={{width:"100%",height:200,objectFit:"cover"}} alt="job" onClick={()=>setPv(j.image_url)}/>}{hired&&<div style={{position:"absolute",top:12,left:"50%",transform:"translateX(-50%)",background:"#0A1931",color:"#FFD700",padding:"6px 16px",borderRadius:20,fontSize:11,fontWeight:"bold",border:"1px solid #FFD700"}}>Hired: {hired.artisan_name}</div>}<div style={{position:"absolute",bottom:0,left:0,right:0,background:"rgba(10,25,49,0.85)",padding:"6px 12px",display:"flex",justifyContent:"space-between"}}><small style={{color:"#FFD700",fontSize:11}}>Verified</small><small style={{color:"#FFD700",fontSize:11}}>N{b.toLocaleString()}</small></div></div>
<div style={{padding:"14px"}}>
<div style={{display:"flex",justifyContent:"space-between"}}><b style={{fontSize:16}}>{j.title}</b>{hired&&<span style={{background:"#22c55e",color:"#fff",padding:"4px 12px",borderRadius:20,fontSize:10,fontWeight:"bold"}}>HIRED</span>}</div>
<small>{j.location} - N{b.toLocaleString()}</small>
<div style={{fontSize:12,color:"#555",marginTop:4}}>{j.description}</div>
<div style={{display:"flex",gap:10,marginTop:14}}>
<button onClick={()=>{if(!user)return alert("Login");setChatJob(j);}} style={{flex:1,padding:"13px",border:"none",borderRadius:12,background:"#0A1931",color:"#FFD700",fontWeight:"bold",fontSize:13}}>Chat to Hire</button>
<button onClick={()=>{if(!user)return alert("Login first");alert("Contact Unlocked: "+j.created_by);}} style={{flex:1,padding:"13px",border:"none",borderRadius:12,background:"#FFD700",color:"#0A1931",fontWeight:"bold",fontSize:13}}>Unlock Contact</button>
</div>
<div style={{marginTop:14,padding:"12px",border:"2px dashed #FFD700",borderRadius:12,background:"#fffbe6"}}>
<b style={{fontSize:11}}>ARTISAN UPLOAD PROOF 35% 75% 100% (NEW):</b>
<div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:8,marginTop:10}}>
{[35,75,100].map(stage=>{
const hasProof=jobProofs[stage];
return(<div key={stage} style={{background:"#fff",borderRadius:10,border:"1px solid #0A1931",padding:"8px",textAlign:"center"}}><div style={{fontSize:11,fontWeight:"bold",marginBottom:6}}>{stage}%</div>{hasProof&&<img src={hasProof} style={{width:"100%",height:45,objectFit:"cover",borderRadius:6,marginBottom:6}} alt="proof"/>}<label style={{display:"block",background:hasProof?"#22c55e":"#f3f4f6",padding:"6px",borderRadius:6,fontSize:10,cursor:"pointer"}}>{hasProof?"Uploaded":"Upload Proof"}<input type="file" accept="image/*" style={{display:"none"}} onChange={e=>upProof(j.id,stage,e)}/></label><button onClick={()=>openPay(j,stage)} style={{width:"100%",marginTop:6,padding:"8px",background:"#0A1931",color:"#FFD700",border:"none",borderRadius:8,fontSize:11,fontWeight:"bold"}}>Pay {stage}%</button></div>);
})}
</div>
<small style={{fontSize:9,color:"#666",marginTop:6,display:"block"}}>Escrow secured - charges applied at checkout - auto to Opay/MoMo/Bank</small>
</div>
</div>
</div>
);})}
</div>}

{tab==="artisans"&&<div style={{padding:"12px"}}><h3 style={{margin:"8px 0"}}>Portfolio - 3% Fee Only!</h3>{arts.map(a=>{const w=parseW(a.works);return(<div key={a.id} style={{background:"#fff",borderRadius:14,marginBottom:"10px",padding:"14px",border:"1px solid #e5e7eb",borderLeft:"4px solid #FFD700"}}><div style={{display:"flex",justifyContent:"space-between"}}><div><b style={{fontSize:15}}>{a.name}</b><div style={{display:"flex",gap:6,marginTop:6}}><span>*****</span><small>{a.rating||4.9} - {a.jobs_done||1} jobs</small></div><small style={{display:"block",marginTop:4}}>{a.location} - {a.payout_method||"Bank"}</small></div><div style={{display:"flex",flexDirection:"column",gap:6}}><span style={{background:"#0A1931",color:"#FFD700",padding:"4px 10px",borderRadius:12,fontSize:10,fontWeight:"bold"}}>{a.skill}</span><button onClick={()=>setSelArt(a)} style={{padding:"8px 18px",borderRadius:10,border:"none",background:"#0A1931",color:"#FFD700",fontWeight:"bold",fontSize:12}}>View</button></div></div>{w.length>0&&<div style={{display:"flex",gap:6,marginTop:10}}>{w.slice(0,2).map((x,i)=><img key={i} src={x} style={{width:"80px",height:"60px",borderRadius:8,objectFit:"cover",border:"1px solid #FFD700"}} alt="work"/>)}</div></div>);})}<button onClick={()=>setTab("join")} style={{width:"100%",marginTop:14,padding:"14px",borderRadius:12,border:"none",background:"#FFD700",color:"#0A1931",fontWeight:"bold"}}>+ Join as Artisan</button></div>}

{tab==="admin"&&<div style={{padding:"16px"}}>
{!isAdmin?<div style={{background:"#fff",padding:20,borderRadius:16,textAlign:"center",border:"2px solid #ef4444"}}><h3>Admin Only</h3><p>Login as nicholasu9@gmail.com</p><button onClick={()=>setTab("login")} style={{padding:"10px 20px",background:"#0A1931",color:"#FFD700",border:"none",borderRadius:10,fontWeight:"bold"}}>Login</button></div>:
<div><h2 style={{color:"#0A1931",fontSize:18}}>Admin - 3%+7%=10%</h2>
<div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12,marginTop:12}}>
<div style={{background:"#0A1931",padding:"16px",borderRadius:16,border:"2px solid #FFD700"}}><small style={{color:"#FFD700"}}>Jobs</small><h1 style={{color:"#FFD700"}}>{jobs.length}</h1></div>
<div style={{background:"#fff",padding:"16px",borderRadius:16,border:"1px solid #ddd"}}><small>Artisans</small><h1>{arts.length}</h1></div>
<div style={{background:"#FFD700",padding:"16px",borderRadius:16}}><small>Client 7%</small><h1 style={{fontSize:20}}>N{c7Total.toLocaleString()}</h1></div>
<div style={{background:"#0A1931",padding:"16px",borderRadius:16}}><small style={{color:"#FFD700"}}>Artisan 3%</small><h1 style={{color:"#fff",fontSize:20}}>N{a3Total.toLocaleString()}</h1></div>
<div style={{background:"#fff",padding:"16px",borderRadius:16,border:"2px solid #FFD700"}}><small>Ads</small><h1>N{adTotal.toLocaleString()}</h1></div>
<div style={{background:"#0A1931",padding:"16px",borderRadius:16,border:"2px solid #FFD700"}}><small style={{color:"#FFD700"}}>GRAND</small><h1 style={{color:"#FFD700"}}>N{grand.toLocaleString()}</h1></div>
</div>
<div style={{background:"#fff",marginTop:16,padding:14,borderRadius:14,border:"2px solid #0A1931"}}>
<b style={{fontSize:14}}>Live Chat Monitoring - {msgs.length} msgs</b>
<div style={{maxHeight:300,overflowY:"auto",border:"1px solid #eee",borderRadius:10,padding:8,background:"#f9fafb",marginTop:8}}>
{msgs.slice(-30).reverse().map(m=><div key={m.id} style={{padding:"8px",borderBottom:"1px solid #eee",fontSize:11}}><b>{m.sender?.slice(0,20)} - Job #{m.job_id}</b><div style={{marginTop:4,background:m.message?.match(/\d{3}.*\d{3}/)?"#fee2e2":"#fff",padding:"6px",borderRadius:6}}>{m.message} {m.message?.match(/\d{3}.*\d{3}/)&&<span style={{color:"red",fontWeight:"bold"}}> Phone!</span>}</div></div>)}
</div>
</div>
</div>}
</div>}

{tab==="join"&&<div style={{padding:"14px"}}><h3>Join as Artisan - 3% Fee Only!</h3><div style={{background:"#fff",padding:"14px",borderRadius:14,border:"1px solid #e5e7eb"}}>
<input value={an} onChange={e=>setAn(e.target.value)} placeholder="Full Name *" style={{width:"100%",padding:"10px",marginBottom:"8px",borderRadius:8,border:"1px solid #ddd"}}/>
<input value={askill} onChange={e=>setAskill(e.target.value)} placeholder="Skill *" style={{width:"100%",padding:"10px",marginBottom:"8px",borderRadius:8,border:"1px solid #ddd"}}/>
<input value={aloc} onChange={e=>setAloc(e.target.value)} placeholder="Location *" style={{width:"100%",padding:"10px",marginBottom:"8px",borderRadius:8,border:"1px solid #ddd"}}/>
<div style={{background:"#f0f9ff",padding:10,borderRadius:10,marginBottom:8,border:"1px solid #0A1931"}}>
<div style={{display:"flex",gap:6,marginBottom:6}}><button onClick={()=>setVerM("phone")} style={{flex:1,padding:8,background:verM==="phone"?"#0A1931":"#fff",color:verM==="phone"?"#FFD700":"#0A1931",border:"1px solid #0A1931",borderRadius:8,fontWeight:"bold"}}>Phone</button><button onClick={()=>setVerM("email")} style={{flex:1,padding:8,background:verM==="email"?"#0A1931":"#fff",color:verM==="email"?"#FFD700":"#0A1931",border:"1px solid #0A1931",borderRadius:8,fontWeight:"bold"}}>Email</button></div>
{verM==="phone"?<div style={{display:"flex",gap:6}}><input value={awhat} onChange={e=>setAwhat(e.target.value)} placeholder="080..." style={{flex:1,padding:10,borderRadius:8,border:"1px solid #ddd"}}/><button onClick={sendPhoneOtp} style={{padding:10,background:"#0A1931",color:"#FFD700",border:"none",borderRadius:8,fontWeight:"bold"}}>Send</button></div>:<><input value={verE} onChange={e=>setVerE(e.target.value)} placeholder="email" style={{width:"100%",padding:10,borderRadius:8,border:"1px solid #ddd"}}/><button onClick={sendEmailOtp} style={{marginTop:6,padding:8,background:"#0A1931",color:"#FFD700",border:"none",borderRadius:8,fontWeight:"bold"}}>Send Code</button></>}
<div style={{display:"flex",gap:6,marginTop:8}}><input value={otpI} onChange={e=>setOtpI(e.target.value)} placeholder="6-digit" style={{flex:1,padding:10,borderRadius:8,border:"1px solid #ddd"}}/><button onClick={verM==="phone"?verifyPhoneOtp:verifyEmailOtp} style={{padding:10,background:(pVer||eVer)?"#22c55e":"#FFD700",border:"none",borderRadius:8,fontWeight:"bold"}}>{(pVer||eVer)?"Verified":"Verify"}</button></div>
</div>
<div style={{background:"#fffbe6",padding:10,borderRadius:10,border:"2px solid #FFD700"}}>
<b style={{fontSize:12}}>Payout - Auto to Opay/Palmpay/MoMo/Bank</b>
<select value={payoutMethod} onChange={e=>setPayoutMethod(e.target.value)} style={{width:"100%",padding:10,marginTop:8,borderRadius:8,border:"1px solid #0A1931"}}>
<option>Bank Account</option><option>Opay</option><option>Palmpay</option><option>Moniepoint</option><option>MTN MoMo Ghana</option><option>Vodafone Cash</option><option>AirtelTigo Money</option><option>MTN MoMo Nigeria</option>
</select>
<select value={bankName} onChange={e=>setBankName(e.target.value)} style={{width:"100%",padding:10,marginTop:6,borderRadius:8,border:"1px solid #ddd"}}>
<option>GTBank</option><option>Access Bank</option><option>First Bank</option><option>UBA</option><option>Zenith Bank</option><option>Opay - 999992</option><option>Palmpay - 999991</option>
</select>
<div style={{display:"flex",gap:6,marginTop:6}}><input value={accNum} onChange={e=>setAccNum(e.target.value)} placeholder="Account / MoMo Number" style={{flex:1,padding:10,borderRadius:8,border:"1px solid #ddd"}}/><button onClick={verifyAcc} style={{padding:10,background:"#0A1931",color:"#FFD700",border:"none",borderRadius:8,fontWeight:"bold"}}>Verify</button></div>
{accName&&<small style={{color:"green",fontWeight:"bold"}}>{accName}</small>}
</div>
<input type="file" accept="image/*" onChange={upArt} style={{marginTop:8}}/>
<input type="file" accept="image/*" multiple onChange={upWorks} style={{marginTop:6}}/>
<div style={{display:"flex",gap:6,flexWrap:"wrap",marginTop:8}}>{aworks.map((w,i)=><img key={i} src={w} style={{width:50
