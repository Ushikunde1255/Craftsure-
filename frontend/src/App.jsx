import {useState,useEffect,useRef} from "react";
import {createClient} from "@supabase/supabase-js";
const supa=createClient("https://unzohyrabvouclsjcpfu.supabase.co","sb_publishable_zB3k0KebVFw4-xf_TtdaUw_UlHsXk_q");
const ADMIN="nicholasu9@gmail.com";
const PAYSTACK_PK="pk_test_aaa1ae824c287d9865dd27a044670676c0df836d";
const LOGO="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Ccircle cx='50' cy='50' r='48' fill='%230A1931'/%3E%3Ctext x='50' y='80' text-anchor='middle' font-size='14' fill='%23FFD700' font-weight='bold'%3ECS%3C/text%3E%3C/svg%3E";

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
const [otpSent,setOtpSent]=useState("");const [otpInput,setOtpInput]=useState("");const [phoneVerified,setPhoneVerified]=useState(false);const [emailVerified,setEmailVerified]=useState(false);const [verMethod,setVerMethod]=useState("phone");const [verEmail,setVerEmail]=useState("");
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
useEffect(()=>{const s=document.createElement("script");s.src="https://js.paystack.co/v1/inline.js";s.async=true;document.body.appendChild(s);return()=>{try{document.body.removeChild(s);}catch{};};},[]);

const signup=async()=>{const {error}=await supa.auth.signUp({email,password:pass});if(error)return alert(error.message);const u={email,role:email===ADMIN?"admin":"user"};localStorage.setItem("cs_user",JSON.stringify(u));setUser(u);setTab("home");};
const login=async()=>{const {error}=await supa.auth.signInWithPassword({email,password:pass});if(error)return alert(error.message);const u={email,role:email===ADMIN?"admin":"user"};localStorage.setItem("cs_user",JSON.stringify(u));setUser(u);setTab("home");};
const compress=(b64,maxW,q)=>{return new Promise(r=>{const i=new Image();i.onload=()=>{const c=document.createElement("canvas");let w=i.width,h=i.height;if(w>maxW){h=h*maxW/w;w=maxW;}c.width=w;c.height=h;c.getContext("2d").drawImage(i,0,0,w,h);r(c.toDataURL("image/jpeg",q));};i.src=b64;});};
const up=e=>{const f=e.target.files[0];if(!f)return;const r=new FileReader();r.onload=ev=>{compress(ev.target.result,600,0.4).then(c=>setJi(c));};r.readAsDataURL(f);};
const upArt=e=>{const f=e.target.files[0];if(!f)return;const r=new FileReader();r.onload=ev=>{compress(ev.target.result,300,0.4).then(c=>setAport(c));};r.readAsDataURL(f);};
const upWorks=e=>{const files=Array.from(e.target.files).slice(0,5);files.forEach(f=>{const r=new FileReader();r.onload=ev=>{compress(ev.target.result,500,0.4).then(c=>setAworks(p=>[...p,c].slice(0,5)));};r.readAsDataURL(f);});};
const upAd=e=>{const f=e.target.files[0];if(!f)return;const r=new FileReader();r.onload=ev=>{compress(ev.target.result,500,0.5).then(c=>setAdImg(c));};r.readAsDataURL(f);};

const sendPhoneOtp=()=>{if(awhat.length<10)return alert("Enter valid phone");const c=Math.floor(100000+Math.random()*900000).toString();setOtpSent(c);alert("Phone Code: "+c+" (Demo)");};
const verifyPhoneOtp=()=>{if(otpInput===otpSent){setPhoneVerified(true);setVerMethod("phone");alert("Phone Verified ✅");}else alert("Wrong code");};
const sendEmailOtp=()=>{if(!verEmail.includes("@"))return alert("Enter email");const c=Math.floor(100000+Math.random()*900000).toString();setOtpSent(c);alert("Email Code to "+verEmail+": "+c+" (Demo)");};
const verifyEmailOtp=()=>{if(otpInput===otpSent){setEmailVerified(true);setVerMethod("email");alert("Email Verified ✅");}else alert("Wrong code");};

const postJob=async()=>{if(!user)return alert("Login first");if(!jt||!jl)return alert("Fill title & location");await supa.from("jobs").insert([{title:jt,location:jl,budget:jb,description:jd,image_url:ji,created_by:user.email}]);setJt("");setJl("");setJb("");setJd("");setJi("");load();setTab("home");};
const postArt=async()=>{
if(!an||!askill||!aloc)return alert("Fill Name, Skill, Location");
if(!aport)return alert("Profile Photo needed");
if(aworks.length===0)return alert("Upload 1 Jobs Done photo");
if(!phoneVerified&&!emailVerified)return alert("Verify Phone OR Email!");
const worksJson=JSON.stringify(aworks);
const payload={name:an,skill:askill,location:aloc,whatsapp:awhat||verEmail,portfolio:aport,bio:abio||"Verified - "+verMethod,works:worksJson,rating:4.9,jobs_done:aworks.length,verified:true,created_by:verEmail||awhat||user?.email||"guest",phone_verified:phoneVerified,email_verified:emailVerified,verification_method:verMethod};
const {error}=await supa.from("artisans").insert([payload]);
if(error)return alert(error.message);
alert("✅ "+an+" Created - "+verMethod+" verified - "+aworks.length+" photos!");
setAworks([]);setAn("");setAskill("");setAloc("");setAwhat("");setAport("");setAbio("");setPhoneVerified(false);setEmailVerified(false);setOtpSent("");load();setTab("artisans");
};
const postAd=async()=>{const amt=adPackage==="Basic"?20000:adPackage==="Premium"?50000:100000;await supa.from("ads").insert([{company_name:adCompany,title:adTitle,image_url:adImg,link:adLink,package:adPackage,amount:amt,created_by:user?.email,status:"active"}]);setAdCompany("");setAdTitle("");setAdImg("");setAdLink("");load();setTab("home");};
const delJob=async(id)=>{if(!confirm("Delete?"))return;await supa.from("jobs").delete().eq("id",id);load();};
const delAd=async(id)=>{if(!confirm("Delete ad?"))return;await supa.from("ads").delete().eq("id",id);load();};
const hireArtisan=async(em,name,jid)=>{const id=jid||(chatJob&&chatJob.id)||(jobs[0]&&jobs[0].id);if(!id)return alert("Select job");await supa.from("hires").insert([{job_id:id,client_email:user.email,artisan_email:em,artisan_name:name,status:"hired"}]);alert("Hired "+name);load();setSelectedArt(null);};
const sendMsg=async()=>{if(!chatTxt.trim()||!chatJob)return;await supa.from("messages").insert([{job_id:chatJob.id,sender:user.email,receiver:"all",message:chatTxt}]);setChatTxt("");load();};

const getBudget=(b)=>{let n=parseInt((b||"").replace(/[^0-9]/g,""))||0;if((b||"").toLowerCase().includes("k"))n=n*1000;return n;};
const hasPaid=(id,t)=>pays.some(p=>p.job_id===id&&p.percent_type===t+"%");
const isHired=(id)=>hires.find(h=>h.job_id===id);

// CORRECT SPLIT: Client 5% + Artisan 10% = 15%
const openPay=(job,stage)=>{
const b=getBudget(job.budget); // base e.g 100k
const clientFee=Math.floor(b*0.05); // client 5% = 5k
const artisanFee=Math.floor(b*0.10); // artisan 10% = 10k
const clientTotal=b+clientFee; // client pays 105k
const artisanTotal=b-artisanFee
