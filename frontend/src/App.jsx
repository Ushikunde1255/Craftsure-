import {useState,useEffect,useRef} from "react";
import {createClient} from "@supabase/supabase-js";
const supa=createClient("https://unzohyrabvouclsjcpfu.supabase.co","sb_publishable_zB3k0KebVFw4-xf_TtdaUw_UlHsXk_q");
const ADMIN="nicholasu9@gmail.com";
const PAYSTACK_PK="pk_test_aaa1ae824c287d9865dd27a044670676c0df836d";
const NAVY="#0A1931";const GOLD="#FFD700";
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

const compressImage=(base64,maxW,q)=>{return new Promise(res=>{const img=new Image();img.onload=()=>{const c=document.createElement("canvas");let w=img.width,h=img.height;if(w>maxW){h=h*maxW/w;w=maxW;}c.width=w;c.height=h;c.getContext("2d").drawImage(img,0,0,w,h);res(c.toDataURL("image/jpeg",q));};img.src=base64;});};

// FIXED: All uploads now use.then() - No await error!
const up=(e)=>{const f=e.target.files[0];if(!f)return;const r=new FileReader();r.onload=(ev)=>{compressImage(ev.target.result,600,0.4).then(c=>setJi(c));};r.readAsDataURL(f);};
const upArt=(e)=>{const f=e.target.files[0];if(!f)return;const r=new FileReader();r.onload=(ev)=>{compressImage(ev.target.result,300,0.4).then(c=>setAport(c));};r.readAsDataURL(f);};
const upWorks=(e)=>{const files=Array.from(e.target.files).slice(0,3);files.forEach(f=>{const r=new FileReader();r.onload=(ev)=>{compressImage(ev.target.result,400,0.4).then(c=>{setAworks(prev=>[...prev,c].slice(0,3));});};r.readAsDataURL(f);});};
const upAd=(e)=>{const f=e.target.files[0];if(!f)return;const r=new FileReader();r.onload=(ev)=>{compressImage(ev.target.result,500,0.5).then(c=>setAdImg(c));};r.readAsDataURL(f);};

const postJob=async()=>{if(!user)return alert("Login");if(!jt||!jb){alert("Title and budget");return;}const {error}=await supa.from("jobs").insert([{title:jt,location:jl,budget:jb,description:jd,image_url:ji,created_by:user.email}]);if(error){alert(error.message);return;}setJt("");setJl("");setJb("");setJd("");setJi("");load();setTab("home");};
const postArt=async()=>{if(!an||!askill||!aloc){alert("Fill name, skill, location");return;}if(!aport){alert("Upload profile");return;}try{const {error}=await supa.from("artisans").insert([{name:an,skill:askill,location:aloc,whatsapp:awhat,portfolio:aport,bio:abio||"Verified by CraftSure",works:JSON.stringify(aworks),rating:4.9,jobs_done:aworks.length,created_by:user.email,verified:true}]);if(error)throw error;alert("Created "+an+" with "+aworks.length+" photos");setAn("");setAskill("");setAloc("");setAwhat("");setAbio("");setAport("");setAworks([]);load();setTab("artisans");}catch(err){alert("Failed: "+err.message);}};
const postAd=async()=>{if(!user)return alert("Login");const amt=adPackage==="Basic"?20000:adPackage==="Premium"?50000:100000;await supa.from("ads").insert([{company_name:adCompany,title:adTitle,image_url:adImg,link:adLink,package:adPackage,amount:amt,created_by:user.email,status:"active"}]);setAdCompany("");setAdTitle("");setAdImg("");setAdLink("");load();setTab("home");};
const delJob=async(id)=>{if(!confirm("Delete?"))return;await supa.from("jobs").delete().eq("id",id);load();};
const delAd=async(id)=>{if(!confirm("Delete ad?"))return;await supa.from("ads").delete().eq("id",id);load();};
const hireArtisan=async(em,name,jid)=>{const id=jid||(chatJob&&chatJob.id)||(jobs[0]&&jobs[0].id);if(!id)return alert("Select job");const {error}=await supa.from("hires").insert([{job_id:id,client_email:user.email,artisan_email:em,artisan_name:name,status:"hired"}]);if(error){alert(error.message);return;}alert("Hired "+name+"!");load();setSelectedArt(null);};
const sendMsg=async()=>{if(!chatTxt.trim()||!chatJob)return;const {error}=await supa.from("messages").insert([{job_id:chatJob.id,sender:user.email,receiver:"all",message:chatTxt}]);if(error){alert(error.message);return;}setChatTxt("");const {data:m}=await supa.from("messages").select("*").order("id",{ascending:true}).limit(80);if(m)setMsgs(m);};

const getBudget=(b)=>{let n=parseInt((b||"").replace(/[^0-9]/g,""))||0;if((b||"").toLowerCase().includes("k"))n=n*1000;return n;};
const hasPaid=(id,t)=>pays.some(p=>p.job_id===id&&p.percent_type===t);
const isHired=(id)=>hires.find(h=>h.job_id===id);
const openPay=(job,type)=>{const b=getBudget(job.budget);const fee=type==="client"?Math.floor(b*0.05):Math.floor(b*0
