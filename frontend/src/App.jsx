import {useState,useEffect,useRef} from "react";
import {createClient} from "@supabase/supabase-js";
const supa=createClient("https://unzohyrabvouclsjcpfu.supabase.co","sb_publishable_zB3k0KebVFw4-xf_TtdaUw_UlHsXk_q");
const ADMIN="nicholasu9@gmail.com";
const PAYSTACK_PK="pk_test_aaa1ae824c287d9865dd27a044670676c0df836d";
const NAVY="#0A1931";
const GOLD="#FFD700";
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
const [loading,setLoading]=useState(false);
const chatEndRef=useRef(null);

// DATA SAVER - Load once only
const load=async()=>{
setLoading(true);
const {data:j}=await supa.from("jobs").select("*").order("id",{ascending:false}).limit(15);if(j)setJobs(j);
const {data:a}=await supa.from("artisans").select("*").order("id",{ascending:false}).limit(15);if(a)setArts(a);
const {data:m}=await supa.from("messages").select("*").order("id",{ascending:true}).limit(80);if(m)setMsgs(m);
const {data:p}=await supa.from("payments").select("*").order("id",{ascending:false}).limit(30);if(p)setPays(p);
const {data:h}=await supa.from("hires").select("*").order("id",{ascending:false}).limit(30);if(h)setHires(h);
const {data:ad}=await supa.from("ads").select("*").order("id",{ascending:false}).limit(8);if(ad)setAds(ad);
setLoading(false);
};
useEffect(()=>{load();},[]);
useEffect(()=>{if(chatEndRef.current)chatEndRef.current.scrollIntoView({behavior:"smooth"});},[msgs,chatJob]);
useEffect(()=>{const s=document.createElement("script");s.src="https://js.paystack.co/v1/inline.js";s.async=true;document.body.appendChild(s);return()=>{try{document.body.removeChild(s);}catch(e){}};},[]);

const signup=async()=>{const {error}=await supa.auth.signUp({email,password:pass});if(error)return alert(error.message);const u={email,role:email===ADMIN?"admin":"user"};localStorage.setItem("cs_user",JSON.stringify(u));setUser(u);setTab("home");};
const login=async()=>{const {error}=await supa.auth.signInWithPassword({email,password:pass});if(error)return alert(error.message);const u={email,role:email===ADMIN?"admin":"user"};localStorage.setItem("cs_user",JSON.stringify(u));setUser(u);setTab("home");};

const compressImage=(base64,maxWidth=400,quality=0.4)=>{return new Promise((res)=>{const img=new Image();img.onload=()=>{const c=document.createElement("canvas");let w=img.width,h=img.height;if(w>maxWidth){h=h*maxWidth/w;w=maxWidth;}c.width=w;c.height=h;c.getContext("2d").drawImage(img,0,0,w,h);res(c.toDataURL("image/jpeg",quality));};img.src=base64;});};
const up=async(e)=>{const f=e.target.files[0];if(!f)return;const r=new FileReader();r.onload=async(v)=>{setJi(await compressImage(v.target.result,600,0.4));};r.readAsDataURL(f);};
const upArt=async(e)=>{const f=e.target.files[0];if(!f)return;const r=new FileReader();r.onload=async(v)=>{setAport(await compressImage(v.target.result,300,0.4));};r.readAsDataURL(f);};
const upWorks=(e)=>{Array.from(e.target.files).slice(0,3).forEach(f=>{const r=new FileReader();r.onload=async(v)=>{setAworks(p=>[...p,await compressImage(v.target.result,400,0.4)].slice(0,3));};r.readAsDataURL(f);});};
const upAd=async(e)=>{const f=e.target.files[0];if(!f)return;const r=new FileReader();r.onload=async(v)=>{setAdImg(await compressImage(v.target.result,500,0.5));};r.readAsDataURL(f);};

const postJob=async()=>{if(!user)return alert("Login");if(!jt||!jb){alert("Title and budget");return;}const {error}=await supa.from("jobs").insert([{title:jt,location:jl,budget:jb,description:jd,image_url:ji,created_by:user.email}]);if(error){alert(error.message);return;}setJt("");setJl("");setJb("");setJd("");setJi("");load();setTab("home");};
const postArt=async()=>{if(!an||!askill||!aloc){alert("Fill name, skill, location");return;}if(!aport){alert("Upload profile");return;}try{const {error}=await supa.from("artisans").insert([{name:an,skill:askill,location:aloc,whatsapp:awhat,portfolio:aport,bio:abio||"Verified by CraftSure",works:JSON.stringify(aworks),rating:4.9,jobs_done:aworks.length,created_by:user.email,verified:true}]);if(error)throw error;alert("Created "+an+" with "+aworks.length+" photos");setAn("");setAskill("");setAloc("");setAwhat("");setAbio("");setAport("");setAworks([]);load();setTab("artisans");}catch(err){alert("Failed: "+err.message);}};
const postAd=async()=>{if(!user)return alert("Login");const amt=adPackage==="Basic"?20000:adPackage==="Premium"?50000:100000;await supa.from("ads").insert([{company_name:adCompany,title:adTitle,image_url:adImg,link:adLink,package:adPackage,amount:amt,created_by:user.email,status:"active"}]);setAdCompany("");setAdTitle("");setAdImg("");setAdLink("");load();setTab("home");};
const delJob=async(id)=>{if(!confirm("Delete job?"))return;await supa.from("jobs").delete().eq("id",id);load();};
const delAd=async(id)=>{if(!confirm("Delete ad?"))return;await supa.from("ads").delete().eq("id",id);load();};
const hireArtisan=async(em,name,jid)=>{const id=jid||(chatJob&&chatJob.id)||(jobs[0]&&jobs[0].id);if(!id)return alert("Select job");const {error}=await supa.from("hires").insert([{job_id:id,client_email:user.email,artisan_email:em,artisan_name:name,status:"hired"}]);if(error){alert(error.message);return;}alert("Hired "+name+"!");load();setSelectedArt(null);};
const sendMsg=async()=>{if(!chatTxt.trim()||!chatJob)return;const {error}=await supa.from("messages").insert([{job_id:chatJob.id,sender:user.email,receiver:"all",message:chatTxt}]);if(error){alert(error.message);return;}setChatTxt("");const {data:m}=await supa.from("messages").select("*").order("id",{ascending:true}).limit(80);if(m)setMsgs(m);};

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
<div style={{background:"#f5f7fb",minHeight:"100vh",fontFamily:"Inter, sans-serif"}}>

{/* MATURED NAVY HEADER */}
<div style={{background:NAVY,color:"#fff",padding:"10px 14px",display:"flex",justifyContent:"space-between",alignItems:"center",position:"sticky",top:0,zIndex:20,borderBottom:`3px solid ${GOLD}`}}>
<div style={{display:"flex",alignItems:"center",gap:"9px"}}><img src={LOGO} style={{width:38,height:38,borderRadius:"50%",background:"#fff",padding:"2px",border:`2px solid ${GOLD}`}} alt="logo"/><div><b style={{fontSize:16,letterSpacing:"0.5px"}}>CraftSure</b><div style={{fontSize:8,color:GOLD,letterSpacing:"1px",fontWeight:"bold"}}>NIGERIA • VERIFIED ARTISANS</div></div></div>
<div style={{display:"flex",gap:"5px",flexWrap:"wrap"}}>
<button onClick={()=>setTab("home")} style={{padding:"7px 12px",borderRadius:8,border:"none",background:tab==="home"? "#fff": "#112240",color:tab==="home"?NAVY:"#fff",fontSize:11,fontWeight:"600"}}>Home</button>
<button onClick={()=>setTab("artisans")} style={{padding:"7px 12px",borderRadius:8,border:"none",background:tab==="artisans"?"#fff":"#112240",color:tab==="artisans"?NAVY:"#fff",fontSize:11,fontWeight:"600"}}>Artisans</button>
<button onClick={()=>setTab("brands")} style={{padding:"7px 12px",borderRadius:8,border:"none",background:tab==="brands"?GOLD:"#112240",color:tab==="brands"?NAVY:"#fff",fontSize:11,fontWeight:"bold"}}>Brands Ads</button>
{isAdmin&&<button onClick={()=>setTab("admin")} style={{padding:"7px 12px",borderRadius:8,border:"none",background:"#ef4444",color:"#fff",fontSize:11,fontWeight:"bold"}}>Admin 💰</button>}
{isAdmin&&<button onClick={()=>setTab("chats")} style={{padding:"7px 12px",borderRadius:8,border:"none",background:GOLD,color:NAVY,fontSize:11,fontWeight:"bold"}}>Chats 👁️</button>}
<button onClick={()=>setTab("post")} style={{padding:"7px 12px",borderRadius:8,border:"none",background:GOLD,color:NAVY,fontWeight:"bold",fontSize:11}}>Post Job</button>
{user?<button onClick={()=>{localStorage.removeItem("cs_user");setUser(null);}} style={{padding:"6px 9px",borderRadius:8,border:`1px solid ${GOLD}`,background:"#fff",fontSize:10,fontWeight:"600"}}>{user.email.slice(0,5)} Out</button>:<button onClick={()=>setTab("login")} style={{padding:"7px 12px",borderRadius:8,border:"none",background:"#fff",color:NAVY,fontWeight:"bold",fontSize:11}}>Login</button>}
</div>
</div>

{/* DATA SAVER BANNER - MATURED */}
<div style={{background:"#e6f4ea",padding:"7px 14px",display:"flex",justifyContent:"space-between",alignItems:"center",borderBottom:"1px solid #c3e6cb"}}>
<small style={{fontSize:10,color:"#155724",fontWeight:"600"}}>🌿 Data Saver • Clean • Matured • Navy Gold</small>
<button onClick={load} disabled={loading} style={{padding:"5px 12px",borderRadius:20,border:"none",background:NAVY,color:GOLD,fontSize:10,fontWeight:"bold"}}>{loading?"...":"🔄 Refresh"}</button>
</div>

{tab==="home"&&<div>
{ads.length>0&&<div style={{background:NAVY,padding:"10px"}}><div style={{display:"flex",gap:"8px",overflowX:"auto"}}>{ads.map(ad=><div key={ad.id} onClick={()=>window.open(ad.link,"_blank")} style={{minWidth:"270px",background:"#fff",borderRadius:12,overflow:"hidden",display:"flex",cursor:"pointer",border:`2px solid ${GOLD}`,boxShadow:"0 2px 8px rgba(0,0,0,0.15)"}}><img loading="lazy" src={ad.image_url} style={{width:64,height:64,objectFit:"cover"}} alt="ad"/><div style={{padding:"7px",flex:1}}><small style={{background:GOLD,color:NAVY,padding:"2px 6px",borderRadius:10,fontSize:7,fontWeight:"bold"}}>SPONSORED • {ad.package}</small><br/><b style={{fontSize:11,color:NAVY}}>{ad.company_name}</b><br/><small style={{fontSize:9,color:"#555"}}>{ad.title}</small></div></div>)}</div></div>}
<div style={{padding:"12px 16px",background:"#fff",borderBottom:"1px solid #eee"}}><b style={{color:NAVY,fontSize:14}}>Jobs ({jobs.length})</b><div style={{fontSize:10,color:"#777"}}>Matured • Verified • Chat to hire • Paystack secure</div></div>
{jobs.map(j=>{const b=getBudget(j.budget);const hired=isHired(j.id);return(<div key={j.id} style={{background:"#fff",margin:"12px 16px",borderRadius:14,overflow:"hidden",border:"1px solid #e5e7eb",boxShadow:"0 2px 12px rgba(10,25,49,0.06)"}}>{j.image_url&&<div style={{position:"relative"}} onClick={()=>setPv(j.image_url)}><img loading="lazy" src={j.image_url} style={{width:"100%",height:170,objectFit:"cover"}} alt="job"/><div style={{position:"absolute",top:10,right:10,display:"flex",gap:"6px"}}>{hired&&<span style={{background:NAVY,color:GOLD,padding:"5px 10px",borderRadius:20,fontSize:9,fontWeight:"bold"}}>Hired: {hired.artisan_name}</span>}{user&&user.email===j.created_by&&<button onClick={(e)=>{e.stopPropagation();delJob(j.id);}} style={{background:"#fee2e2",color:"#ef4444",border:"none",borderRadius:"50%",width:28,height:28,fontSize:12}}>✕</button>}</div><div style={{position:"absolute",bottom:0,left:0,right:0,background:"rgba(10,25,49,0.85)",color:GOLD,padding:"6px 10px",fontSize:9,display:"flex",justifyContent:"space-between",fontWeight:"600"}}><span>🔒 Verified by CraftSure</span><span>₦{b.toLocaleString()}</span></div></div>}<div style={{padding:"12px"}}><b style={{fontSize:13,color:NAVY}}>{j.title}</b><br/><small style={{color:"#666",fontSize:11}}>📍 {j.location} • 💰 ₦{b.toLocaleString()}</small><br/><small style={{color:"#555",fontSize:11,marginTop:"4px",display:"block"}}>{j.description}</small><div style={{display:"flex",gap:8,marginTop:12}}><button onClick={()=>{if(!user)return alert("Login");setChatJob(j);}} style={{flex:1,padding:"10px",border:"none",borderRadius:10,background:NAVY,color:GOLD,fontWeight:"bold",fontSize:11}}>💬 Chat to Hire</button>{!hasPaid(j.id,"5%_client")&&<button onClick={()=>openPay(j,"client")} style={{flex:1,padding:"10px",border:"none",borderRadius:10,background:GOLD,color:NAVY,fontWeight:"bold",fontSize:11}}>Unlock Contact</button>}</div></div></div>);})}
</div>}

{tab==="artisans"&&<div style={{padding:"14px"}}>
<div style={{background:"#fff",padding:"14px",borderRadius:14,marginBottom:"12px",border:"1px solid #e5e7eb",boxShadow:"0 2px 8px rgba(0,0,0,0.04)"}}><b style={{color:NAVY}}>Artisans • Instagram Portfolio</b><div style={{display:"flex",gap:8,marginTop:"10px"}}><input value={searchSkill} onChange={e=>setSearchSkill(e.target.value)} placeholder="Search skill, e.g. Tiler" style={{flex:1,padding:"10px",borderRadius:10,border:"1px solid #ddd",fontSize:12}}/><input value={searchLoc} onChange={e=>setSearchLoc(e.target.value)} placeholder="Location" style={{flex:1,padding:"10px",borderRadius:10,border:"1px solid #ddd",fontSize:12}}/></div></div>
{filteredArts.map(a=>{const works=parseWorks(a.works);return(<div key={a.id} onClick={()=>setSelectedArt(a)} style={{background:"#fff",padding:"12px",borderRadius:14,marginBottom:"10px",display
