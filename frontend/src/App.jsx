import { useState, useEffect, useRef } from "react";
import { createClient } from "@supabase/supabase-js";
const supa=createClient(
"https://unzohyrabvouclsjcpfu.supabase.co",
"sb_publishable_zB3k0KebVFw4-xf_TtdaUw_UlHsXk_q"
);
const ADMIN="nicholasu9@gmail.com";
const PK="pk_test_aaa1ae824c287d9865dd27a044670676c0df836d";
// PRECIOUS LOGO - Short lines - White+Yellow+Navy+Yellow tools
function Logo(){
return(
<svg viewBox="0 0 100 100" width="42" height="42"
style={{borderRadius:"50%",background:"#fff",
border:"2px solid #FFD700",padding:2}}>
<circle cx="50" cy="50" r="40" fill="none"
stroke="#FFD700" strokeWidth="11"/>
<circle cx="50" cy="50" r="28" fill="#0A1931"/>
<g fill="#FFD700">
<path d="M32 38 L46 26 L52 32 L42 43 L56 57 L50 63 L36 49 Z"/>
<path d="M58 30 L64 26 L70 30 L68 38 L62 42 L54 34 Z"/>
</g>
</svg>
);
}
export default function App(){
const [tab,setTab]=useState("home");
const [user,setUser]=useState(
JSON.parse(localStorage.getItem("cs_user")||"null")
);
const [email,setEmail]=useState("");
const [pass,setPass]=useState("");
const [jobs,setJobs]=useState([]);
const [arts,setArts]=useState([]);
const [pays,setPays]=useState([]);
const [hires,setHires]=useState([]);
const [ads,setAds]=useState([]);
const [jt,setJt]=useState("");const [jl,setJl]=useState("");
const [jb,setJb]=useState("");const [jd,setJd]=useState("");
const [ji,setJi]=useState("");const [pv,setPv]=useState(null);
const [an,setAn]=useState("");const [askill,setAskill]=useState("");
const [aloc,setAloc]=useState("");const [awhat,setAwhat]=useState("");
const [aport,setAport]=useState("");const [aworks,setAworks]=useState([]);
const [abio,setAbio]=useState("");
const [chatJob,setChatJob]=useState(null);
const [chatTxt,setChatTxt]=useState("");
const [msgs,setMsgs]=useState([]);
const [payM,setPayM]=useState(null);
const [proofs,setProofs]=useState(
JSON.parse(localStorage.getItem("cs_proofs")||"{}")
);
const [otpS,setOtpS]=useState("");
const [otpI,setOtpI]=useState("");
const [pVer,setPVer]=useState(false);
const [eVer,setEVer]=useState(false);
const [verM,setVerM]=useState("phone");
const [verE,setVerE]=useState("");
const [adC,setAdC]=useState("");const [adT,setAdT]=useState("");
const [adImg,setAdImg]=useState("");const [adL,setAdL]=useState("");
const [adP,setAdP]=useState("Basic");
const chatEndRef=useRef(null);
const load=async()=>{
const {data:j}=await supa.from("jobs").select("*")
.order("id",{ascending:false}).limit(20);
if(j)setJobs(j);
const {data:a}=await supa.from("artisans").select("*")
.order("id",{ascending:false}).limit(30);
if(a)setArts(a);
const {data:m}=await supa.from("messages").select("*")
.order("id",{ascending:true}).limit(100);
if(m)setMsgs(m);
const {data:p}=await supa.from("payments").select("*")
.order("id",{ascending:false}).limit(30);
if(p)setPays(p);
const {data:h}=await supa.from("hires").select("*")
.order("id",{ascending:false}).limit(30);
if(h)setHires(h);
const {data:ad}=await supa.from("ads").select("*")
.order("id",{ascending:false}).limit(8);
if(ad)setAds(ad);
};
useEffect(()=>{load();},[]);
useEffect(()=>{
if(chatEndRef.current)chatEndRef.current
.scrollIntoView({behavior:"smooth"});
},[msgs,chatJob]);
useEffect(()=>{
const s=document.createElement("script");
s.src="https://js.paystack.co/v1/inline.js";
s.async=true;document.body.appendChild(s);
},[]);
const getB=(b)=>{
let n=parseInt((b||"").replace(/[^0-9]/g,""))||0;
if((b||"").toLowerCase().includes("k"))n=n*1000;
return n;
};
const hasPaid=(id,t)=>pays.some(p=>p.job_id===id&&p.percent_type===t+"%");
const hasProof=(id,t)=>!!proofs[id+"_"+t];
const upProof=(e,id,t)=>{
const f=e.target.files[0];if(!f)return;
const r=new FileReader();
r.onload=ev=>{
const img=new Image();
img.onload=()=>{
const c=document.createElement("canvas");
let w=img.width,h=img.height;
if(w>600){h=h*600/w;w=600;}
c.width=w;c.height=h;
c.getContext("2d").drawImage(img,0,0,w,h);
const cc=c.toDataURL("image/jpeg",0.5);
const np={...proofs,[id+"_"+t]:cc};
setProofs(np);
localStorage.setItem("cs_proofs",JSON.stringify(np));
alert("✅ "+t+"% Proof Uploaded");
};
img.src=ev.target.result;
};
r.readAsDataURL(f);
};
const openPay=(job,stage)=>{
const b=getB(job.budget);
const cf=Math.floor(b*0.05);
const af=Math.floor(b*0.10);
const ct=b+cf;const at=b-af;
let sa=0,ag=0,sl="";
if(stage===35){sa=Math.floor(ct*0.35);ag=Math.floor(at*0.35);sl="35% Start";}
else if(stage===75){sa=Math.floor(ct*0.40);ag=Math.floor(at*0.40);sl="75% Mid";}
else{sa=Math.floor(ct*0.25);ag=Math.floor(at*0.25);sl="100% Final";}
setPayM({job,stage,budget:b,cf,af,ct,at,sa,ag,sl});
};
const payNow=()=>{
if(!payM||!window.PaystackPop)return;
const h=window.PaystackPop.setup({
key:PK,email:user.email,
amount:payM.sa*100,currency:"NGN",
ref:"CS"+Math.floor(Math.random()*1e9),
callback:async(r)=>{
await supa.from("payments").insert([{
job_id:payM.job.id,payer_email:user.email,
payer_type:"client",amount:payM.sa,
artisan_amount:payM.ag,
percent_type:payM.stage+"%",status:"paid",
paystack_ref:r.reference
}]);
setPayM(null);alert("Paid "+payM.sl);load();
},onClose:()=>{}
});
h.openIframe();
};
const parseW=(w)=>{
try{const a=JSON.parse(w||"[]");
return Array.isArray(a)?a:[];}catch{return [];}
};
const isAdmin=user&&user.email===ADMIN;
return(
<div style={{background:"#f5f7fb",minHeight:"100vh"}}>
<div style={{background:"#0A1931",color:"#fff",
padding:"10px 14px",display:"flex",
justifyContent:"space-between",borderBottom:"3px solid #FFD700"}}>
<div style={{display:"flex",alignItems:"center",gap:8}}>
<Logo/><b>CraftSure NG</b>
</div>
<div style={{display:"flex",gap:4,flexWrap:"wrap"}}>
<button onClick={()=>setTab("home")}>Home</button>
<button onClick={()=>setTab("arts")}>Artisans</button>
<button onClick={()=>setTab("join")}>+Join</button>
<button onClick={()=>setTab("post")}>Post</button>
</div>
</div>
{tab==="home"&&<div>
<div style={{padding:10,background:"#fff"}}>
<b>Jobs ({jobs.length}) - 35% 75% 100% Proof</b>
</div>
{jobs.map(j=>{
const b=getB(j.budget);
return(
<div key={j.id} style={{background:"#fff",margin:10,
borderRadius:12,border:"1px solid #ddd",overflow:"hidden"}}>
{j.image_url&&<img src={j.image_url}
style={{width:"100%",height:130,objectFit:"cover"}}
onClick={()=>setPv(j.image_url)} alt="job"/>}
<div style={{padding:10}}>
<b>{j.title}</b><br/>
<small>{j.location} - ₦{b.toLocaleString()}</small>
<div style={{display:"flex",flexDirection:"column",gap:6,marginTop:8}}>
<div style={{display:"flex",gap:6}}>
{!hasPaid(j.id,35)&&<button onClick={()=>openPay(j,35)}
style={{flex:1,padding:8,background:"#0A1931",color:"#FFD700",
border:"none",borderRadius:8}}>Pay 35% ₦{Math.floor(b*1.05*0.35).toLocaleString()}</button>}
{hasPaid(j.id,35)&&!hasPaid(j.id,75)&&!hasProof(j.id,35)&&<span style={{flex:1,padding:8,background:"#fff3cd",fontSize:9,borderRadius:8,textAlign:"center"}}>Wait 35% Proof</span>}
{hasPaid(j.id,35)&&!hasPaid(j.id,75)&&hasProof(j.id,35)&&<button onClick={()=>openPay(j,75)} style={{flex:1,padding:8,background:"#FFD700",border:"none",borderRadius:8}}>Pay 75%</button>}
{hasPaid(j.id,75)&&!hasPaid(j.id,100)&&!hasProof(j.id,75)&&<span style={{flex:1,padding:8,background:"#fff3cd",fontSize:9,borderRadius:8,textAlign:"center"}}>Wait 75% Proof</span>}
{hasPaid(j.id,75)&&!hasPaid(j.id,100)&&hasProof(j.id,75)&&<button onClick={()=>openPay(j,100)} style={{flex:1,padding:8,background:"#22c55e",color:"#fff",border:"none",borderRadius:8}}>Pay 100%</button>}
{hasPaid(j.id,100)&&<span style={{flex:1,padding:8,background:"#e6f4ea",fontSize:9,borderRadius:8,textAlign:"center"}}>Paid 100%</span>}
</div>
<div style={{background:"#fffbe6",padding:8,borderRadius:10,border:"2px dashed #FFD700"}}>
<small style={{fontSize:9,fontWeight:"bold"}}>ARTISAN UPLOAD PROOF 35% 75% 100%:</small>
<div style={{display:"flex",gap:6,marginTop:6}}>
{hasPaid(j.id,35)&&<div style={{flex:1,background:"#fff",padding:4,borderRadius:6,border:"1px solid #0A1931"}}><small style={{fontSize:8}}>35% Photo</small><br/>{hasProof(j.id,35)?<img src={proofs[j.id+"_35"]} style={{width:"100%",height:50,objectFit:"cover"}} alt="p35"/>:<input type="file" accept="image/*" onChange={e=>upProof(e,j.id,35)} style={{width:"100%",fontSize:8}}/>}</div>}
{hasPaid(j.id,75)&&<div style={{flex:1,background:"#fff",padding:4,borderRadius:6,border:"1px solid #0A1931"}}><small style={{fontSize:8}}>75% Photo</small><br/>{hasProof(j.id,75)?<img src={proofs[j.id+"_75"]} style={{width:"100%",height:50,objectFit:"cover"}} alt="p75"/>:<input type="file" accept="image/*" onChange={e=>upProof(e,j.id,75)} style={{width:"100%",fontSize:8}}/>}</div>}
{hasPaid(j.id,100)&&<div style={{flex:1,background:"#fff",padding:4,borderRadius:6,border:"1px solid #0A1931"}}><small style={{fontSize:8}}>100%</small><br/>{hasProof(j.id,100)?<img src={proofs[j.id+"_100"]} style={{width:"100%",height:50,objectFit:"cover"}} alt="p100"/>:<input type="file" accept="image/*" onChange={e=>upProof(e,j.id,100)} style={{width:"100%",fontSize:8}}/>}</div>}
</div>
</div>
</div>
</div>
</div>
);
})}
</div>}
{tab==="arts"&&<div style={{padding:10}}><b>Artisans - Past Work IN VIEW</b>{arts.map(a=>{const w=parseW(a.works);return(<div key={a.id} style={{background:"#fff",marginTop:10,borderRadius:12,border:"1px solid #ddd"}}><div style={{padding:10,display:"flex",gap:10}}>{a.portfolio?<img src={a.portfolio} style={{width:50,height:50,borderRadius:"50%",border:"2px solid #FFD700"}} alt="p"/>:<div style={{width:50,height:50,borderRadius:"50%",background:"#0A1931",color:"#FFD700",display:"flex",alignItems:"center",justifyContent:"center"}}>{a.name[0]}</div>}<div><b>{a.name}</b><br/><small>{a.skill} - {a.location}</small></div></div>{w.length>0&&<div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:2}}>{w.slice(0,6).map((x,i)=><img key={i} src={x} style={{width:"100%",height:70,objectFit:"cover"}} alt="work" onClick={()=>setPv(x)}/>)}</div>}</div>);})}</div>}
{payM&&<div style={{position:"fixed",top:0,left:0,right:0,bottom:0,background:"rgba(0,0,0,0.6)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:50}}><div style={{background:"#fff",padding:16,borderRadius:12,width:"90%",maxWidth:320}}><b>Pay {payM.sl}</b><br/><h3>₦{payM.sa.toLocaleString()}</h3><small>Artisan gets ₦{payM.ag.toLocaleString()}</small><br/><button onClick={payNow} style={{width:"100%",padding:12,background:"#0A1931",color:"#FFD700",border:"none",borderRadius:10,marginTop:10}}>Pay</button><button onClick={()=>setPayM(null)} style={{width:"100%",padding:10,marginTop:8,background:"#fff",border:"1px solid #ddd",borderRadius:10}}>Cancel</button></div></div>}
{pv&&<div style={{position:"fixed",top:0,left:0,right:0,bottom:0,background:"rgba(0,0,0,0.9)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:100}} onClick={()=>setPv(null)}><img src={pv} style={{maxWidth:"95%",maxHeight:"90%",borderRadius:10,border:"3px solid #FFD700"}} alt="view"/></div>}
</div>
);
  }
