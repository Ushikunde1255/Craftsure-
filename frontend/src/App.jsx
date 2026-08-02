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

const compressImage=(base64,maxWidth=600)=>{return new Promise((resolve)=>{const img=new Image();img.onload=()=>{const canvas=document.createElement("canvas");let w=img.width,h=img.height;if(w>maxWidth){h=h*maxWidth/w;w=maxWidth;}canvas.width=w;canvas.height=h;const ctx=canvas.getContext("2d");ctx.drawImage(img,0,0,w,h);resolve(canvas.toDataURL("image/jpeg",0.5));};img.src=base64;});};

const up=async(e)=>{const f=e.target.files[0];if(!f)return;const r=new FileReader();r.onload=async(v)=>{const c=await compressImage(v.target.result,800);setJi(c);};r.readAsDataURL(f);};
const upArt=async(e)=>{const f=e.target.files[0];if(!f)return;if(f.size>8000000){alert("Photo too large, pick <8MB");return;}const r=new FileReader();r.onload=async(v)=>{const c=await compressImage(v.target.result,400);setAport(c);};r.readAsDataURL(f);};
const upWorks=(e)=>{const files=Array.from(e.target.files).slice(0,5);files.forEach(f=>{if(f.size>8000000){alert(f.name+" too big");return;}const r=new FileReader();r.onload=async(v)=>{const c=await compressImage(v.target.result,600);setAworks(prev=>[...prev,c].slice(0,5));};r.readAsDataURL(f);});};
const upAd=async(e)=>{const f=e.target.files[0];if(!f)return;const r=new FileReader();r.onload=async(v)=>{const c=await compressImage(v.target.result,600);setAdImg(c);};r.readAsDataURL(f);};

const postJob=async()=>{if(!user)return alert("Login");if(!jt||!jb){alert("Title and budget needed");return;}const {error}=await supa.from("jobs").insert([{title:jt,location:jl,budget:jb,description:jd,image_url:ji,created_by:user.email}]);if(error){alert(error.message);return;}setJt("");setJl("");setJb("");setJd("");setJi("");load();setTab("home");};

const postArt=async()=>{
if(!an||!askill||!aloc){alert("Fill name, skill, location");return;}
if(!aport){alert("Upload profile photo");return;}
try{
const worksJson=JSON.stringify(aworks);
const {error}=await supa.from("artisans").insert([{name:an,skill:askill,location:aloc,whatsapp:awhat,portfolio:aport,bio:abio||"Professional artisan, verified by CraftSure",works:worksJson,rating:4.9,jobs_done:aworks.length,created_by:user.email,verified:true}]);
if(error)throw error;
alert(`✅ ${an} created with ${aworks.length} jobs done photos!`);
setAn("");setAskill("");setAloc("");setAwhat("");setAbio("");setAport("");setAworks([]);
load();setTab("artisans");
}catch(err){alert("Failed to create artisan: "+(err.message||err));}
};

const postAd=async()=>{if(!user)return alert("Login");const amt=adPackage==="Basic"?20000:adPackage==="Premium"?50000:100000;const {error}=await supa.from("ads").insert([{company_name:adCompany,title:adTitle,image_url:adImg,link:adLink,package:adPackage,amount:amt,created_by:user.email,status:"active"}]);if(error){alert(error.message);return;}setAdCompany("");setAdTitle("");setAdImg("");setAdLink("");load();setTab("home");};
const delJob=async(id)=>{if(!confirm("Delete job?"))return;await supa.from("jobs").delete().eq("id",id);load();};
const delAd=async(id)=>{if(!confirm("Delete ad?"))return;await supa.from("ads").delete().eq("id",id);load();};
const hireArtisan=async(artisanEmail,artisanName,jobId)=>{const jid=jobId||chatJob?.id||jobs[0]?.id;if(!jid)return alert("Select a job first");const {error}=await supa.from("hires").insert([{job_id:jid,client_email:user.email,artisan_email:artisanEmail,artisan_name:artisanName,status:"hired"}]);if(error){alert(error.message);return;}alert(`Hired ${artisanName}!`);load();setSelectedArt(null);};
const sendMsg=async()=>{if(!chatTxt.trim()||!chatJob)return;const {error}=await supa.from("messages").insert([{job_id:chatJob.id,sender:user.email,receiver:"all",message:chatTxt}]);if(error){alert("Chat error: "+error.message);return;}setChatTxt("");load();};

const getBudget=(b)=>{let n=parseInt((b||"").replace(/[^0-9]/g,""))||0;if((b||"").toLowerCase().includes("k"))n=n*1000;return n;};
const hasPaid=(jobId,type)=>pays.some(p=>p.job_id===jobId&&p.percent_type===type);
const clientPaid=(jobId)=>hasPaid(jobId,"5%_client");const bothPaid=(jobId)=>clientPaid(jobId)&&hasPaid(jobId,"10%_artisan");
const isHired=(jobId)=>hires.find(h=>h.job_id===jobId);
const openPay=(job,type)=>{const b=getBudget(job.budget);const fee=type==="client"?Math.floor(b*0.05):Math.floor(b*0.10);const total=type==="client"?b+fee:fee;setPayModal({job,type,budget:b,fee,total});};
const payWithPaystack=()=>{if(!payModal||!window.PaystackPop)return;const amountKobo=payModal.type==="client"?payModal.total*100:payModal.fee*100;const handler=window.PaystackPop.setup({key:PAYSTACK_PK,email:user.email,amount:amountKobo,currency:"NGN",ref:"CS_"+Math.floor(Math.random()*1000000000),callback:async function(response){await supa.from("payments").insert([{job_id:payModal.job.id,payer_email:user.email,payer_type:payModal.type,amount:payModal.fee,percent_type:payModal.type==="client"?"5%_client":"10%_artisan",status:"paid"}]);setPayModal(null);alert("✅ Paid! Ref: "+response.reference);load();},onClose:()=>{}});handler.openIframe();};

const filteredArts=arts.filter(a=>{const skillOk=!searchSkill||a.skill?.toLowerCase().includes(searchSkill.toLowerCase())||a.name?.toLowerCase().includes(searchSkill.toLowerCase());const locOk=!searchLoc||a.location?.toLowerCase().includes(searchLoc.toLowerCase());return skillOk&&locOk;});
const totalBudget=jobs.reduce((s,j)=>s+getBudget(j.budget),0);
const client5Total=pays.filter(p=>p.percent_type==="5%_client").reduce((s,p)=>s+p.amount,0);
const artisan10Total=pays.filter(p=>p.percent_type==="10%_artisan").reduce((s,p)=>s+p.amount,0);
const adTotal=ads.reduce((s,a)=>s+(a.amount||0),0);
const grand=client5Total+artisan10Total+adTotal;
const isAdmin=user?.email===ADMIN;
const parseWorks=(w)=>{try{const arr=JSON.parse(w||"[]");return Array.isArray(arr)?arr:[];}catch(e){return [];}};

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
<button onClick={()=>setTab("post")} style={{padding:"6px
