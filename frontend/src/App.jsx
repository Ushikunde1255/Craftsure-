import {useState,useEffect,useRef} from "react";
import {createClient} from "@supabase/supabase-js";
const supa=createClient("https://unzohyrabvouclsjcpfu.supabase.co","sb_publishable_zB3k0KebVFw4-xf_TtdaUw_UlHsXk_q");
const ADMIN="nicholasu9@gmail.com";
const PAYSTACK_PK="pk_test_aaa1ae824c287d9865dd27a044670676c0df836d";
const LOGO="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Ccircle cx='50' cy='50' r='48' fill='%230A1931'/%3E%3Cpath d='M30 28 L45 28 L42 42 L32 50 L18 38 Z M55 42 L62 48 L38 78 L30 78 L22 70 L30 62 L40 62 L55 42 Z M70 22 C78 22 86 28 86 38 C86 44 83 48 78 50 L62 56 L58 40 L64 36 C62 32 64 26 70 22 Z' fill='%23FFD700'/%3E%3C/svg%3E";
export default function App(){
const [tab,setTab]=useState("home");
const [user,setUser]=useState(JSON.parse(localStorage.getItem("cs_user")||"null"));
const [email,setEmail]=useState("");const [pass,setPass]=useState("");
const [jobs,setJobs]=useState([]);const [arts,setArts]=useState([]);const [msgs,setMsgs]=useState([]);const [pays,setPays]=useState([]);const [hires,setHires]=useState([]);const [ads,setAds]=useState([]);
const [jt,setJt]=useState("");const [jl,setJl]=useState("");const [jb,setJb]=useState("");const [jd,setJd]=useState("");const [ji,setJi]=useState("");const [pv,setPv]=useState(null);
const [an,setAn]=useState("");const [askill,setAskill]=useState("");const [aloc,setAloc]=useState("");const [awhat,setAwhat]=useState("");const [aport,setAport]=useState("");const [abio,setAbio]=useState("");const [aworks,setAworks]=useState([]);
const [chatJob,setChatJob]=useState(null);const [chatTxt,setChatTxt]=useState("");const [payModal,setPayModal]=useState(null);
const [searchSkill,setSearchSkill]=useState("");const [searchLoc,setSearchLoc]=useState("");const [selectedArt,setSelectedArt]=useState(null);
const [adCompany,setAdCompany]=useState("");const [adTitle,setAdTitle]=useState("");const [adImg,setAdImg]=useState("");const [adLink,setAdLink]=useState("");const [adPackage,setAdPackage]=useState("Basic");
const [otpSent,setOtpSent]=useState("");const [otpInput,setOtpInput]=useState("");const [phoneVerified,setPhoneVerified]=useState(false);const [verEmail,setVerEmail]=useState("");
const chatEndRef=useRef(null);
const load=async()=>{
const {data:j}=await supa.from("jobs").select("*").order("id",{ascending:false}).limit(20);if(j)setJobs(j);
const {data:a}=await supa.from("artisans").select("*").order("id",{ascending:false}).limit(30);if(a)setArts(a);
const {data:m}=await supa.from("messages").select("*").order("id",{ascending:true}).limit(100);if(m)setMsgs(m);
const {data:p}=await supa.from("payments").select("*").order("id",{ascending:false}).limit(30);if(p)setPays(p);
const {data:h}=await supa.from("hires").select("*").order("id",{ascending:false}).limit(30);if(h)setHires(h);
const {data:ad}=await supa.from("ads").select("*").order("id",{ascending:false}).limit(8);if(ad)setAds(ad);
};
useEffect(()=>{load();},[]);
useEffect(()=>{if(chatEndRef.current)chatEndRef.current.scrollIntoView({behavior:"smooth"});},[msgs,chatJob]);
useEffect(()=>{const s=document.createElement("script");s.src="https://js.paystack.co/v1/inline.js";s.async=true;document.body.appendChild(s);return()=>{try{document.body.removeChild(s);}catch(e){}};},[]);
const signup=async()=>{const {error}=await supa.auth.signUp({email,password:pass});if(error)return alert(error.message);const u={email,role:email===ADMIN?"admin":"user"};localStorage.setItem("cs_user",JSON.stringify(u));setUser(u);setTab("home");};
const login=async()=>{const {error}=await supa.auth.signInWithPassword({email,password:pass});if(error)return alert(error.message);const u={email,role:email===ADMIN?"admin":"user"};localStorage.setItem("cs_user",JSON.stringify(u));setUser(u);setTab("home");};
const compress=(b64,maxW,q)=>{return new Promise(r=>{const i=new Image();i.onload=()=>{const c=document.createElement("canvas");let w=i.width,h=i.height;if(w>maxW){h=h*maxW/w;w=maxW;}c.width=w;c.height=h;c.getContext("2d").drawImage(i,0,0,w,h);r(c.toDataURL("image/jpeg",q));};i.src=b64;});};
const up=e=>{const f=e.target.files[0];if(!f)return;const r=new FileReader();r.onload=ev=>{compress(ev.target.result,600,0.4).then(c=>setJi(c));};r.readAsDataURL(f);};
const upArt=e=>{const f=e.target.files[0];if(!f)return;const r=new FileReader();r.onload=ev=>{compress(ev.target.result,300,0.4).then(c=>setAport(c));};r.readAsDataURL(f);};
const upWorks=e=>{const files=Array.from(e.target.files).slice(0,5);files.forEach(f=>{const r=new FileReader();r.onload=ev=>{compress(ev.target.result,500,0.4).then(c=>setAworks(p=>[...p,c].slice(0,5)));};r.readAsDataURL(f);});};
const upAd=e=>{const f=e.target.files[0];if(!f)return;const r=new FileReader();r.onload=ev=>{compress(ev.target.result,500,0.5).then(c=>setAdImg(c));};r.readAsDataURL(f);};
const sendOtp=()=>{if(awhat.length<10)return alert("Enter valid phone");const code=Math.floor(100000+Math.random()*900000).toString();setOtpSent(code);alert("CraftSure NG code: "+code+" (Demo SMS)");};
const const verifyOtp=()=>{if(otpInput===otpSent){setPhoneVerified(true);alert("Phone verified! ✅");}else alert("Wrong code");};
const postJob=async()=>{if(!user)return alert("Login first!");await supa.from("jobs").insert([{title:jt,location:jl,budget:jb,description:jd,image_url:ji,created_by:user.email}]);setJt("");setJl("");setJb("");setJd("");setJi("");load();setTab("home");};
const postArt=async()=>{
if(!aport)return alert("Upload profile photo!");
if(aworks.length===0)return alert("Upload at least 1 Jobs Done photo");
if(!phoneVerified &&!emailVerified)return alert("Verify EITHER Phone OR Email! Choose one.");
const worksJson=JSON.stringify(aworks);
const const payload={name:an,skill:askill,location:aloc,portfolio:aport,bio:abio||"Verified by CraftSure NG",works:worksJson,rating:4.9,jobs_done:aworks.length,verified:true,created_by:verEmail||awhat||user?.email||"guest"};
const {error}=await supa.from("artisans").insert([payload]);
if(error){alert("Error: "+error.message);return;}
alert("✅ "+an+" - Instagram portfolio saved! "+aworks.length+" photos - Verified via "+verMethod);
setAworks([]);setAn("");setAskill("");setAloc("");setAwhat("");setAport("");setAbio("");setPhoneVerified(false);setEmailVerified(false);setOtpSent("");setOtpInput("");load();setTab("artisans");
};
const postAd=async()=>{if(!user)return alert("Login");const amt=adPackage==="Basic"?20000:adPackage==="Premium"?50000:100000;await supa.from("ads").insert([{company_name:adCompany,title:adTitle,image_url:adImg,link:adLink,package:adPackage,amount:amt,created_by:user.email,status:"active"}]);setAdCompany("");setAdTitle("");setAdImg("");setAdLink("");load();setTab("home");};
const delJob=async(id)=>{if(!confirm("Delete?"))return;await supa.from("jobs").delete().eq("id",id);load();};
const delAd=async(id)=>{if(!confirm("Delete ad?"))return;await supa.from("ads").delete().eq("id",id);load();};
const hireArtisan=async(em,name,jid)=>{const id=jid||(chatJob&&chatJob.id)||(jobs[0]&&jobs[0].id);if(!id)return alert("Select job");await supa.from("hires").insert([{job_id:id,client_email:user.email,artisan_email:em,artisan_name:name,status:"hired"}]);alert("Hired "+name+"!");load();setSelectedArt(null);};
const sendMsg=async()=>{if(!chatTxt.trim()||!chatJob)return;await supa.from("messages").insert([{job_id:chatJob.id,sender:user.email,receiver:"all",message:chatTxt}]);setChatTxt("");load();};
const getBudget=(b)=>{let n=parseInt((b||"").replace(/[^0-9]/g,""))||0;if((b||"").toLowerCase().includes("k"))n=n*1000;return n;};
const hasPaid=(id,t)=>pays.some(p=>p.job_id===id&&p.percent_type===t);
const isHired=(id)=>hires.find(h=>h.job_id===id);
const openPay=(job,type)=>{const b=getBudget(job.budget);const fee=type==="client"?Math.floor(b*0.05):Math.floor(b*0.10);const total=type==="client"?b+fee:fee;setPayModal({job,type,budget:b,fee,total});};
const payWithPaystack=()=>{if(!payModal||!window.PaystackPop)return;const kobo=payModal.type==="client"?payModal.total*100:payModal.fee*100;const h=window.PaystackPop.setup({key:PAYSTACK_PK,email:user.email,amount:kobo,currency:"NGN",ref:"CS_"+Math.floor(Math.random()*1000000000),callback:async(r)=>{await supa.from("payments").insert([{job_id:payModal.job.id,payer_email:user.email,payer_type:payModal.type,amount:payModal.fee,percent_type:payModal.type==="client"?"5%_client":"10%_artisan",status:"paid"}]);setPayModal(null);alert("Paid! Ref: "+r.reference);load();},onClose:()=>{}});h.openIframe();};
const filteredArts=arts.filter(a=>{const sOk=!searchSkill||a.skill.toLowerCase().includes(searchSkill.toLowerCase())||a.name.toLowerCase().includes(searchSkill.toLowerCase());const lOk=!searchLoc||a.location.toLowerCase().includes(searchLoc.toLowerCase());return sOk&&lOk;});
const client5Total=pays.filter(p=>p.percent_type==="5%_client").reduce((s,p)=>s+p.amount,0);
const artisan10Total=pays.filter(p=>p.percent_type==="10%_artisan").reduce((s,p)=>s+p.amount,0);
const adTotal=ads.reduce((s,a)=>s+(a.amount||0),0);
const grand=client5Total+artisan10Total+adTotal;
const isAdmin=user&&user.email===ADMIN;
const parseWorks=(w)=>{try{const a=JSON.parse(w||"[]");return Array.isArray(a)?a:[];}catch(e){return [];}};
return(
<div style={{background:"#f5f7fb",minHeight:"100vh",fontFamily:"sans-serif"}}>
<div style={{background:"#0A1931",color:"#fff",padding:"10px 14px",display:"flex",justifyContent:"space-between",alignItems:"center",position:"sticky",top:0,zIndex:20,borderBottom:"3px solid #FFD700"}}>
<div style={{display:"flex",alignItems:"center",gap:"9px"}}><img src={LOGO} style={{width:38,height:38,borderRadius:"50%",background:"#fff",padding:"2px",border:"2px solid #FFD700"}} alt="logo"/><div><b style={{fontSize:16}}>CraftSure NG 🇳🇬🇬🇭</b><div style={{fontSize:8,color:"#FFD700",fontWeight:"bold"}}>NIGERIA & GHANA • VERIFIED</div></div></div>
<div style={{display:"flex",gap:"5px",flexWrap:"wrap"}}>
<button onClick={()=>setTab("home")} style={{padding:"7px 12px",borderRadius:8,border:"none",background:tab==="home"?"#fff":"#112240",color:tab==="home"?"#0A1931":"#fff",fontSize:11,fontWeight:"600"}}>Home</button>
<button onClick={()=>setTab("artisans")} style={{padding:"7px 12px",borderRadius:8,border:"none",background:tab==="artisans"?"#fff":"#112240",color:tab==="artisans"?"#0A1931":"#fff",fontSize:11,fontWeight:"600"}}>Artisans</button>
<button onClick={()=>setTab("brands")} style={{padding:"7px 12px",borderRadius:8,border:"none",background:tab==="brands"?"#FFD700":"#112240",color:tab==="brands"?"#0A1931":"#fff",fontSize:11,fontWeight:"bold"}}>Ads</button>
{isAdmin&&<button onClick={()=>setTab("admin")} style={{padding:"7px 12px",borderRadius:8,border:"none",background:"#ef4444",color:"#fff",fontSize:11,fontWeight:"bold"}}>Admin</button>}
<button onClick={()=>setTab("post")} style={{padding:"7px 12px",borderRadius:8,border:"none",background:"#FFD700",color:"#0A1931",fontWeight:"bold",fontSize:11}}>Post Job</button>
<button onClick={()=>setTab("join")} style={{padding:"7px 12px",borderRadius:8,border:"none",background:"#22c55e",color:"#fff",fontWeight:"bold",fontSize:11}}>+ Join</button>
{user?<button onClick={()=>{localStorage.removeItem("cs_user");setUser(null);}} style={{padding:"6px 9px",borderRadius:8,border:"1px solid #FFD700",background:"#fff",fontSize:10}}>{user.email.slice(0,5)} Out</button>:<button onClick={()=>setTab("login")} style={{padding:"7px 12px",borderRadius:8,border:"none",background:"#fff",color:"#0A1931",fontWeight:"bold",fontSize:11}}>Login</button>}
</div>
</div>
<div style={{background:"#e6f4ea",padding:"7px 14px",display:"flex",justifyContent:"space-between"}}><small style={{fontSize:10,color:"#155724",fontWeight:"600"}}>🇳🇬🇬🇭 Data Saver • Verified • Paystack & MoMo</small><button onClick={load} style={{padding:"5px 12px",borderRadius:20,border:"none",background:"#0A1931",color:"#FFD700",fontSize:10,fontWeight:"bold"}}>Refresh</button></div>
{tab==="home"&&<div>{ads.length>0&&<div style={{background:"#0A1931",padding:"10px"}}><div style={{display:"flex",gap:"8px",overflowX:"auto"}}>{ads.map(ad=><div key={ad.id} onClick={()=>window.open(ad.link,"_blank")} style={{minWidth:"270px",background:"#fff",borderRadius:12,overflow:"hidden",display:"flex",cursor:"pointer",border:"2px solid #FFD700"}}><img loading="lazy" src={ad.image_url} style={{width:64,height:64,objectFit:"cover"}} alt="ad"/><div style={{padding:"7px",flex:1}}><small style={{background:"#FFD700",color:"#0A1931",padding:"2px 6px",borderRadius:10,fontSize:7,fontWeight:"bold"}}>SPONSORED</small><br/><b style={{fontSize:11,color:"#0A1931"}}>{ad.company_name}</b><br/><small style={{fontSize:9}}>{ad.title}</small></div></div>)}</div></div>}<div style={{padding:"12px 16px",background:"#fff"}}><b style={{color:"#0A1931"}}>Jobs ({jobs.length}) 🇳🇬🇬🇭</b></div>{jobs.map(j=>{const b=getBudget(j.budget);const hired=isHired(j.id);return(<div key={j.id} style={{background:"#fff",margin:"12px 16px",borderRadius:14,overflow:"hidden",border:"1px solid #e5e7eb"}}>{j.image_url&&<div style={{position:"relative"}} onClick={()=>setPv(j.image_url)}><img loading="lazy" src={j.image_url} style={{width:"100%",height:170,objectFit:"cover"}} alt="job"/><div style={{position:"absolute",top:10,right:10,display:"flex",gap:"6px"}}>{hired&&<span style={{background:"#0A1931",color:"#FFD700",padding:"5px 10px",borderRadius:20,fontSize:9,fontWeight:"bold"}}>Hired: {hired.artisan_name}</span>}{user&&user.email===j.created_by&&<button onClick={(e)=>{e.stopPropagation();delJob(j.id);}} style={{background:"#fee2e2",color:"#ef4444",border:"none",borderRadius:"50%",width:28,height:28}}>X</button>}</div></div>}<div style={{padding:"12px"}}><b style={{fontSize:13,color:"#0A1931"}}>{j.title}</b><br/><small style={{color:"#666",fontSize:11}}>📍 {j.location} • 💰 ₦{b.toLocaleString()} / GH₵</small><br/><small style={{color:"#555",fontSize:11}}>{j.description}</small><div style={{display:"flex",gap:8,marginTop:12}}><button onClick={()=>{if(!user)return alert("Login");setChatJob(j);}} style={{flex:1,padding:"10px",border:"none",borderRadius:10,background:"#0A1931",color:"#FFD700",fontWeight:"bold",fontSize:11}}>Chat to Hire</button>{!hasPaid(j.id,"5%_client")&&<button onClick={()=>openPay(j,"client")} style={{flex:1,padding:"10px",border:"none",borderRadius:10,background:"#FFD700",color:"#0A1931",fontWeight:"bold",fontSize:11}}>Unlock</button>}</div></div></div>);})}</div>}
{tab==="artisans"&&<div style={{padding:"14px"}}><div style={{background:"#fff",padding:"14px",borderRadius:14,marginBottom:"12px",border:"1px solid #e5e7eb"}}><b style={{color:"#0A1931"}}>Artisans NG & GH • Verified Portfolio 🇳🇬🇬🇭</b><div style={{display:"flex",gap:8,marginTop:"10px"}}><input value={searchSkill} onChange={e=>setSearchSkill(e.target.value)} placeholder="Search skill" style={{flex:1,padding:"10px",borderRadius:10,border:"1px solid #ddd",fontSize:12}}/><input value={searchLoc} onChange={e=>setSearchLoc(e.target.value)} placeholder="Lagos, Accra..." style={{flex:1,padding:"10px",borderRadius:10,border:"1px solid #ddd",fontSize:12}}/></div></div>{filteredArts.map(a=>{const works=parseWorks(a.works);return(<div key={a.id} onClick={()=>setSelectedArt(a)} style={{background:"#fff",padding:"12px",borderRadius:14,marginBottom:"10px",display:"flex",gap:"12px",border:"1px solid #e5e7eb",cursor:"pointer"}}>{a.portfolio&&<img loading="lazy" src={a.portfolio} style={{width:62,height:62,borderRadius:14,objectFit:"cover",border:"2px solid #FFD700"}} alt="port"/>}<div style={{flex:1}}><div style={{display:"flex",alignItems:"center",gap:6}}><b style={{fontSize:12,color:"#0A1931"}}>{a.name}</b><small style={{background:"#0A1931",color:"#FFD700",padding:"3px 7px",borderRadius:10,fontSize:8,fontWeight:"bold"}}>{a.skill}</small>{a.phone_verified&&<small style={{background:"#22c55e",color:"#fff",padding:"2px 5px",borderRadius:10,fontSize:7}}>✓ Phone</small>}</div><small style={{fontSize:10,color:"#666"}}>📍 {a.location} • {works.length} jobs</small></div><button style={{padding:"7px 12px",background:"#0A1931",color:"#FFD700",border:"none",borderRadius:10,fontSize:10,height:"32px",fontWeight:"bold"}}>View</button></div>);})}</div>}
{tab==="join"&&<div style={{padding:"14px"}}><h3 style={{color:"#0A1931"}}>Join as Artisan — CraftSure NG 🇳🇬🇬🇭</h3><div style={{background:"#fff",padding:"14px",borderRadius:14,border
