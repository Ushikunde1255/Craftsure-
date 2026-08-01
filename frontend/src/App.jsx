import {useState,useEffect} from "react";
import {createClient} from "@supabase/supabase-js";
const supa=createClient("https://unzohyrabvouclsjcpfu.supabase.co","sb_publishable_zB3k0KebVFw4-xf_TtdaUw_UlHsXk_q");
// Your REAL logo - Navy Shield Gold V - embedded, no public folder needed!
const LOGO="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Ccircle cx='50' cy='50' r='48' fill='%230A1931'/%3E%3Cpath d='M30 28 L45 28 L42 42 L32 50 L18 38 Z M55 42 L62 48 L38 78 L30 78 L22 70 L30 62 L40 62 L55 42 Z M70 22 C78 22 86 28 86 38 C86 44 83 48 78 50 L62 56 L58 40 L64 36 C62 32 64 26 70 22 Z' fill='%23FFD700'/%3E%3C/svg%3E";
export default function App(){
const [tab,setTab]=useState("home");
const [log,setLog]=useState(false);
const [user,setUser]=useState(localStorage.getItem("cs_user")||null);
const [lv,setLv]=useState("");
const [jt,setJt]=useState("");
const [jl,setJl]=useState("");
const [jb,setJb]=useState("");
const [jd,setJd]=useState("");
const [ji,setJi]=useState("");
const [jobs,setJobs]=useState([]);
const [pv,setPv]=useState(null);
const load=async()=>{const {data}=await supa.from("jobs").select("*").order("id",{ascending:false});if(data)setJobs(data);};
useEffect(()=>{load();},[]);
const up=e=>{const f=e.target.files[0];if(!f)return;const r=new FileReader();r.onload=v=>setJi(v.target.result);r.readAsDataURL(f);};
const post=async()=>{
if(!user)return alert("Login first");
if(!jt||!jl)return alert("Title+Location needed");
const {error}=await supa.from("jobs").insert([{title:jt,location:jl,budget:jb,description:jd,image_url:ji,created_by:user}]);
if(error)alert(error.message);else{setJt("");setJl("");setJb("");setJd("");setJi("");load();setTab("home");}
};
const delJob=async(id)=>{if(!confirm("Delete duplicate?"))return;await supa.from("jobs").delete().eq("id",id);load();};
const saveWM=src=>{
const im=new Image();im.src=src;im.onload=()=>{
const c=document.createElement("canvas");c.width=im.width;c.height=im.height;
const x=c.getContext("2d");x.drawImage(im,0,0);
x.fillStyle="rgba(255,255,255,0.32)";x.font=Math.floor(c.width/14)+"px sans-serif";x.textAlign="center";
x.fillText("CraftSure NG",c.width/2,c.height/2);x.font=Math.floor(c.width/26)+"px sans-serif";x.fillText("craftsure.vercel.app",c.width/2,c.height/2+32);
const a=document.createElement("a");a.href=c.toDataURL("image/jpeg",0.85);a.download="CraftSure-"+Date.now()+".jpg";a.click();
};};
return(
<div style={{background:"#f5f5f5",minHeight:"100vh",fontFamily:"sans-serif"}}>
<div style={{background:"#0A1931",color:"#fff",padding:"10px",display:"flex",justifyContent:"space-between",alignItems:"center",position:"sticky",top:0,zIndex:10}}>
<div style={{display:"flex",alignItems:"center",gap:"8px"}}>
<img src={LOGO} style={{width:36,height:36,borderRadius:"50%",background:"#fff",padding:"2px"}} alt="CraftSure"/>
<div><b style={{fontSize:15,letterSpacing:"0.5px"}}>CraftSure</b><div style={{fontSize:8,opacity:0.8,color:"#FFD700"}}>Nigeria • Verified Artisans</div></div>
</div>
<div style={{display:"flex",gap:4}}>
<button onClick={()=>setTab("home")} style={{padding:"6px 10px",borderRadius:8,border:"none",color:"#fff",background:"#1e3a8a",fontSize:11}}>Home</button>
<button onClick={()=>setTab("post")} style={{padding:"6px 10px",borderRadius:8,border:"none",color:"#0A1931",background:"#FFD700",fontSize:11,fontWeight:"bold"}}>Post</button>
{user?<button onClick={()=>{setUser(null);localStorage.removeItem("cs_user");}} style={{padding:"6px 8px",borderRadius:8,border:"none",background:"#fff",color:"#0A1931",fontSize:9,maxWidth:80,overflow:"hidden"}}>{user.slice(0,8)} ✕</button>:<button onClick={()=>setLog(true)} style={{padding:"6px 10px",borderRadius:8,border:"none",background:"#FFD700",color:"#0A1931",fontSize:11,fontWeight:"bold"}}>Login</button>}
</div>
</div>
{tab==="home"&&<div>
<div style={{padding:"12px 15px",display:"flex",justifyContent:"space-between"}}><div><b>Jobs ({jobs.length}) Live DB</b><div style={{fontSize:10,color:"#666"}}>Navy Gold V Logo • Watermark protected</div></div><button onClick={load} style={{padding:"4px 8px",borderRadius:6,border:"1px solid #0A1931",background:"#fff",color:"#0A1931",fontSize:10}}>Refresh</button></div>
{jobs.map(j=><div key={j.id} style={{background:"#fff",margin:"10px 15px",borderRadius:12,overflow:"hidden",border:"1px solid #e5e7eb"}}>
{j.image_url&&<div style={{position:"relative"}} onClick={()=>setPv(j.image_url)}>
<img src={j.image_url} style={{width:"100%",height:220,objectFit:"cover"}} alt="job"/>
<div style={{position:"absolute",bottom:0,left:0,right:0,background:"rgba(10,25,49,0.75)",color:"#FFD700",padding:"6px 10px",fontSize:9,display:"flex",justifyContent:"space-between",fontWeight:"bold"}}><span>🔒 CraftSure NG</span><span>craftsure.vercel.app</span></div>
<div style={{position:"absolute",top:"45%",left:0,right:0,textAlign:"center",color:"rgba(255,215,0,0.28)",fontSize:26,fontWeight:"bold",transform:"rotate(-25deg)",pointerEvents:"none"}}>CraftSure NG</div>
</div>}
<div style={{padding:"10px"}}>
<div style={{display:"flex",justifyContent:"space-between"}}><b style={{fontSize:13}}>{j.title}</b>{user===j.created_by&&<button onClick={()=>delJob(j.id)} style={{border:"none",background:"#fee2e2",color:"#ef4444",borderRadius:6,padding:"3px 8px",fontSize:10,fontWeight:"bold"}}>Delete</button>}</div>
<small>📍 {j.location} • 💰 {j.budget}</small><br/><small style={{fontSize:11}}>{j.description}</small><br/><small style={{fontSize:8,color:"#0A1931"}}>by {j.created_by}</small>
<div style={{display:"flex",gap:6,marginTop:8}}>
<button onClick={()=>setPv(j.image_url)} style={{flex:1,padding:"8px",border:"none",borderRadius:8,background:"#0A1931",color:"#fff",fontSize:11,fontWeight:"bold"}}>View</button>
<button onClick={()=>saveWM(j.image_url)} style={{flex:1,padding:"8px",border:"none",borderRadius:8,background:"#22c55e",color:"#fff",fontSize:11,fontWeight:"bold"}}>Save</button>
<button onClick={()=>{const t=j.title+" - "+j.location;if(navigator.share)navigator.share({title:"CraftSure",text:t,url:"https://craftsure.vercel.app"});else{alert("Link copied!");}}} style={{flex:1,padding:"8px",border:"none",borderRadius:8,background:"#FFD700",color:"#0A1931",fontSize:11,fontWeight:"bold"}}>Share</button>
</div>
</div>
</div>)}
</div>}
{tab==="post"&&<div style={{padding:12}}><h3 style={{fontSize:14}}>Post Job + Photo - Live DB</h3><div style={{background:"#fff",padding:12,borderRadius:12}}><input value={jt} onChange={e=>setJt(e.target.value)} placeholder="Job Title *" style={{width:"100%",padding:"10px",marginBottom:8,borderRadius:8,border:"1px solid #ddd",boxSizing:"border-box"}}/><input value={jl} onChange={e=>setJl(e.target.value)} placeholder="Location * Ojo Lagos" style={{width:"100%",padding:"10px",marginBottom:8,borderRadius:8,border:"1px solid #ddd",boxSizing:"border-box"}}/><input value={jb} onChange={e=>setJb(e.target.value)} placeholder="Budget * 80k" style={{width:"100%",padding:"10px",marginBottom:8,borderRadius:8,border:"1px solid #ddd",boxSizing:"border-box"}}/><textarea value={jd} onChange={e=>setJd(e.target.value)} placeholder="Description *" style={{width:"100%",padding:"10px",marginBottom:8,borderRadius:8,border:"1px solid #ddd",height:70,boxSizing:"border-box"}}/><div style={{border:"2px dashed #0A1931",borderRadius:10,padding:10,textAlign:"center",marginBottom:10}}><input type="file" accept="image/*" onChange={up} id="f" style={{display:"none"}}/><label htmlFor="f" style={{display:"block",padding:"10px",background:"#FEF08A",borderRadius:8,fontSize:12,color:"#0A1931",fontWeight:"bold"}}>{ji?"Change Photo":"Add Photo - Gold watermark"}</label>{ji&&<img src={ji} style={{width:"100%",maxHeight:200,borderRadius:10,marginTop:8}} alt="prev"/>}</div><button onClick={post} style={{width:"100%",padding:"12px",background:user?"#0A1931":"#999",color:user?"#FFD700":"#fff",border:"none",borderRadius:10,fontWeight:"bold"}}>{user?"Post to Live DB - Gold V Brand":"Login to Post"}</button></div></div>}
{log&&<div style={{position:"fixed",top:0,left:0,right:0,bottom:0,background:"rgba(0,0,0,0.7)",padding:"15px",zIndex:99,display:"flex",alignItems:"center",justifyContent:"center"}}><div style={{background:"#fff",padding:16,borderRadius:12,width:"100%",maxWidth:320}}><div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}><div style={{display:"flex",alignItems:"center",gap:8}}><img src={LOGO} style={{width:28,height:28,borderRadius:"50%"}} alt="logo"/><b>Login</b></div><button onClick={()=>setLog(false)} style={{border:"none",background:"#eee",borderRadius:"50%",width:24,height:24}}>X</button></div><input value={lv} onChange={e=>setLv(e.target.value)} placeholder="Email or Phone 080..." style={{width:"100%",padding:"10px",marginTop:12,borderRadius:8,border:"1px solid #ddd",boxSizing:"border-box"}}/><button onClick={()=>{if(!lv)return;localStorage.setItem("cs_user",lv);setUser(lv);setLog(false);}} style={{width:"100%",padding:"11px",background:"#0A1931",color:"#FFD700",border:"none",borderRadius:8,marginTop:10,fontWeight:"bold"}}>Login</button></div></div>}
{pv&&<div style={{position:"fixed",top:0,left:0,right:0,bottom:0,background:"rgba(0,0,0,0.96)",zIndex:100,display:"flex",flexDirection:"column"}}><div style={{display:"flex",justifyContent:"space-between",padding:"12px",color:"#fff",alignItems:"center"}}><div style={{display:"flex",alignItems:"center",gap:8}}><img src={LOGO} style={{width:28,height:28,borderRadius:"50%"}} alt="logo"/><b style={{color:"#FFD700"}}>CraftSure Protected</b></div><button onClick={()=>setPv(null)} style={{background:"#fff",border:"none",borderRadius:"50%",width:32,height:32,fontWeight:"bold"}}>X</button></div><div style={{flex:1,display:"flex",alignItems:"center",justifyContent:"center",position:"relative",padding:10}}><img src={pv} style={{maxWidth:"100%",maxHeight:"100%",borderRadius:8}} alt="full"/><div style={{position:"absolute",color:"rgba(255,215,0,0.35)",fontSize:36,fontWeight:"bold",transform:"rotate(-30deg)",pointerEvents:"none",textAlign:"center"}}>CraftSure NG<br/><small style={{fontSize:14}}>craftsure.vercel.app</small></div></div><div style={{padding:"12px",display:"flex",gap:8}}><button onClick={()=>saveWM(pv)} style={{flex:1,padding:"12px",background:"#22c55e",color:"#fff",border:"none",borderRadius:10,fontWeight:"bold"}}>Save with Watermark</button><button onClick={()=>setPv(null)} style={{flex:1,padding:"12px",background:"#FFD700",color:"#0A1931",border:"none",borderRadius:10,fontWeight:"bold"}}>Close</button></div></div>}
</div>
)
}
