import {useState,useEffect} from "react";
import {createClient} from "@supabase/supabase-js";
const supa=createClient("https://unzohyrabvouclsjcpfu.supabase.co","sb_publishable_zB3k0KebVFw4-xf_TtdaUw_UlHsXk_q");
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
const load=async()=>{
const {data}=await supa.from("jobs").select("*").order("id",{ascending:false});
if(data)setJobs(data);
};
useEffect(()=>{load();},[]);
const up=e=>{
const f=e.target.files[0];if(!f)return;
const r=new FileReader();r.onload=v=>setJi(v.target.result);r.readAsDataURL(f);
};
const post=async()=>{
if(!user)return alert("Login first");
if(!jt||!jl)return alert("Title + Location needed");
const {error}=await supa.from("jobs").insert([{title:jt,location:jl,budget:jb,description:jd,image_url:ji,created_by:user}]);
if(error)alert(error.message);
else{setJt("");setJl("");setJb("");setJd("");setJi("");load();setTab("home");}
};
const saveWM=src=>{
const im=new Image();im.src=src;im.crossOrigin="anonymous";
im.onload=()=>{
const c=document.createElement("canvas");c.width=im.width;c.height=im.height;
const x=c.getContext("2d");x.drawImage(im,0,0);
x.fillStyle="rgba(255,255,255,0.6)";x.font=Math.floor(c.width/18)+"px sans-serif";x.textAlign="center";
x.fillText("CraftSure NG",c.width/2,c.height/2);
x.font=Math.floor(c.width/30)+"px sans-serif";x.fillText("craftsure.vercel.app",c.width/2,c.height/2+30);
const a=document.createElement("a");a.href=c.toDataURL("image/jpeg",0.85);a.download="CraftSure-"+Date.now()+".jpg";a.click();
};
};
const share= j=>{
const t=j.title+" - "+j.location+" on CraftSure";
const u="https://craftsure.vercel.app";
if(navigator.share)navigator.share({title:"CraftSure",text:t,url:u});
else{navigator.clipboard.writeText(u+" - "+t);alert("Link copied!");}
};
return(
<div style={{background:"#f5f5f5",minHeight:"100vh",fontFamily:"sans-serif"}}>
<div style={{background:"#4338ca",color:"#fff",padding:"10px",display:"flex",justifyContent:"space-between",position:"sticky",top:0,zIndex:10}}>
<div style={{display:"flex",alignItems:"center",gap:"6px"}}><div style={{width:28,height:28,background:"#fff",borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center",color:"#4338ca",fontWeight:"bold",fontSize:12}}>CS</div><b>CraftSure</b></div>
<div style={{display:"flex",gap:4}}>
<button onClick={()=>setTab("home")} style={{padding:"5px 8px",borderRadius:8,border:"none",color:"#fff",background:"#7c3aed",fontSize:10}}>Home</button>
<button onClick={()=>setTab("post")} style={{padding:"5px 8px",borderRadius:8,border:"none",color:"#fff",background:"#22c55e",fontSize:10}}>Post</button>
{user?<button onClick={()=>{setUser(null);localStorage.removeItem("cs_user");}} style={{padding:"5px 8px",borderRadius:8,border:"none",background:"#ef4444",color:"#fff",fontSize:9}}>{user.slice(0,6)} Out</button>:<button onClick={()=>setLog(true)} style={{padding:"5px 8px",borderRadius:8,border:"none",background:"#fff",color:"#4338ca",fontSize:10}}>Login</button>}
</div>
</div>
{tab==="home"&&<div>
<div style={{padding:"10px 15px"}}><b>Jobs ({jobs.length}) Live DB</b><div style={{fontSize:10,color:"#666"}}>Tap photo - Watermark protected</div></div>
{jobs.length===0&&<div style={{background:"#fff",margin:"10px 15px",padding:10,borderRadius:10}}><small>No jobs yet - Be first!</small></div>}
{jobs.map(j=><div key={j.id} style={{background:"#fff",margin:"10px 15px",borderRadius:10,overflow:"hidden",border:"1px solid #eee"}}>
{j.image_url&&<div style={{position:"relative"}} onClick={()=>setPv(j.image_url)}>
<img src={j.image_url} style={{width:"100%",height:200,objectFit:"cover"}} alt="job"/>
<div style={{position:"absolute",bottom:0,left:0,right:0,background:"rgba(0,0,0,0.6)",color:"#fff",padding:"5px 8px",fontSize:9,display:"flex",justifyContent:"space-between"}}><span>🔒 CraftSure NG</span><span>craftsure.vercel.app</span></div>
<div style={{position:"absolute",top:"40%",left:0,right:0,textAlign:"center",color:"rgba(255,255,255,0.25)",fontSize:22,fontWeight:"bold",transform:"rotate(-25deg)",pointerEvents:"none"}}>CraftSure NG</div>
</div>}
<div style={{padding:8}}>
<b style={{fontSize:12}}>{j.title}</b><br/><small>📍 {j.location} • {j.budget}</small><br/><small style={{fontSize:10}}>{j.description}</small><br/><small style={{fontSize:8,color:"#4338ca"}}>by {j.created_by}</small>
<div style={{display:"flex",gap:4,marginTop:6}}>
<button onClick={()=>setPv(j.image_url)} style={{flex:1,padding:6,border:"none",borderRadius:6,background:"#4338ca",color:"#fff",fontSize:10}}>View</button>
{j.image_url&&<button onClick={()=>saveWM(j.image_url)} style={{flex:1,padding:6,border:"none",borderRadius:6,background:"#22c55e",color:"#fff",fontSize:10}}>Save</button>}
<button onClick={()=>share(j)} style={{flex:1,padding:6,border:"none",borderRadius:6,background:"#f59e0b",color:"#fff",fontSize:10}}>Share</button>
</div>
</div>
</div>)}
</div>}
{tab==="post"&&<div style={{padding:12}}>
<h3 style={{fontSize:13}}>Post Job + Photo - Live DB</h3>
<div style={{background:"#fff",padding:10,borderRadius:10}}>
<input value={jt} onChange={e=>setJt(e.target.value)} placeholder="Job Title *" style={{width:"100%",padding:9,marginBottom:6,borderRadius:6,border:"1px solid #ddd",boxSizing:"border-box"}}/>
<input value={jl} onChange={e=>setJl(e.target.value)} placeholder="Location * Ojo Lagos" style={{width:"100%",padding:9,marginBottom:6,borderRadius:6,border:"1px solid #ddd",boxSizing:"border-box"}}/>
<input value={jb} onChange={e=>setJb(e.target.value)} placeholder="Budget * 80k" style={{width:"100%",padding:9,marginBottom:6,borderRadius:6,border:"1px solid #ddd",boxSizing:"border-box"}}/>
<textarea value={jd} onChange={e=>setJd(e.target.value)} placeholder="Description *" style={{width:"100%",padding:9,marginBottom:6,borderRadius:6,border:"1px solid #ddd",height:60,boxSizing:"border-box"}}/>
<div style={{border:"2px dashed #4338ca",borderRadius:8,padding:8,textAlign:"center",marginBottom:8}}>
<input type="file" accept="image/*" onChange={up} id="f" style={{display:"none"}}/>
<label htmlFor="f" style={{display:"block",padding:8,background:"#e0e7ff",borderRadius:6,fontSize:11,color:"#4338ca",fontWeight:"bold"}}>Add Photo - Watermark auto</label>
{ji&&<img src={ji} style={{width:"100%",maxHeight:180,borderRadius:8,marginTop:6}} alt="prev"/>}
</div>
<button onClick={post} style={{width:"100%",padding:11,background:user?"#4338ca":"#999",color:"#fff",border:"none",borderRadius:8,fontWeight:"bold"}}>{user?"Post to Live DB":"Login to Post"}</button>
</div>
</div>}
{log&&<div style={{position:"fixed",top:0,left:0,right:0,bottom:0,background:"rgba(0,0,0,0.6)",padding:15,zIndex:99}}><div style={{background:"#fff",padding:12,borderRadius:10,maxWidth:300,margin:"20px auto"}}><b>Login</b><button onClick={()=>setLog(false)} style={{float:"right",border:"none",background:"#eee",borderRadius:"50%",width:22}}>X</button><input value={lv} onChange={e=>setLv(e.target.value)} placeholder="080... or email" style={{width:"100%",padding:8,marginTop:10,borderRadius:6,border:"1px solid #ddd",boxSizing:"border-box"}}/><button onClick={()=>{if(!lv)return;setUser(lv);setLog(false);}} style={{width:"100%",padding:9,background:"#4338ca",color:"#fff",border:"none",borderRadius:6,marginTop:8}}>Login</button></div></div>}
{pv&&<div style={{position:"fixed",top:0,left:0,right:0,bottom:0,background:"rgba(0,0,0,0.95)",zIndex:100,display:"flex",flexDirection:"column"}}><div style={{display:"flex",justifyContent:"space-between",padding:10,color:"#fff"}}><b>CraftSure Photo</b><button onClick={()=>setPv(null)} style={{background:"#fff",border:"none",borderRadius:"50%",width:28,height:28}}>X</button></div><div style={{flex:1,display:"flex",alignItems:"center",justifyContent:"center",position:"relative"}}><img src={pv} style={{maxWidth:"100%",maxHeight:"100%"}} alt="full"/><div style={{position:"absolute",color:"rgba(255,255,255,0.3)",fontSize:32,fontWeight:"bold",transform:"rotate(-30deg)",pointerEvents:"none",textAlign:"center"}}>CraftSure NG<br/><small style={{fontSize:12}}>craftsure.vercel.app</small></div></div><div style={{padding:10,display:"flex",gap:6}}><button onClick={()=>saveWM(pv)} style={{flex:1,padding:10,background:"#22c55e",color:"#fff",border:"none",borderRadius:8,fontWeight:"bold"}}>Save with Watermark</button><button onClick={()=>share({title:"Job",location:"",budget:""})} style={{flex:1,padding:10,background:"#f59e0b",color:"#fff",border:"none",borderRadius:8,fontWeight:"bold"}}>Share Link</button></div></div>}
</div>
)
  }
