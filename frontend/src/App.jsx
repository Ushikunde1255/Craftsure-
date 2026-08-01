import {useState,useEffect} from "react";
export default function App(){
const [tab,setTab]=useState("home");
const [log,setLog]=useState(false);
const [user,setUser]=useState(null);
const [lv,setLv]=useState("");
const [jt,setJt]=useState("");
const [jl,setJl]=useState("");
const [jb,setJb]=useState("");
const [jd,setJd]=useState("");
const [ji,setJi]=useState("");
const [jobs,setJobs]=useState(()=>{
try{return JSON.parse(localStorage.getItem("cs_jobs")||"[]")}catch{return []}
});
const [pv,setPv]=useState(null);
useEffect(()=>{localStorage.setItem("cs_jobs",JSON.stringify(jobs))},[jobs]);
const up=e=>{
const f=e.target.files[0];if(!f)return;
const r=new FileReader();r.onload=v=>setJi(v.target.result);r.readAsDataURL(f);
};
const post=()=>{
if(!user)return alert("Login first");
if(!jt||!jl)return alert("Fill title and location");
setJobs([{id:Date.now(),t:jt,l:jl,b:jb,d:jd,img:ji,by:user},...jobs]);
setJt("");setJl("");setJb("");setJd("");setJi("");setTab("home");
};
const saveWM=src=>{
const im=new Image();im.src=src;im.crossOrigin="anonymous";
im.onload=()=>{
const c=document.createElement("canvas");
c.width=im.width;c.height=im.height;
const x=c.getContext("2d");
x.drawImage(im,0,0);
x.fillStyle="rgba(255,255,255,0.6)";
x.font=Math.floor(c.width/20)+"px sans-serif";
x.textAlign="center";
x.fillText("CraftSure NG",c.width/2,c.height/2);
x.font=Math.floor(c.width/30)+"px sans-serif";
x.fillText("craftsure.vercel.app",c.width/2,c.height/2+30);
const a=document.createElement("a");
a.href=c.toDataURL("image/jpeg",0.85);
a.download="CraftSure-"+Date.now()+".jpg";
a.click();
};
};
const shareLink=j=>{
const txt=j.t+" - "+j.l+" - "+j.b+" on CraftSure";
const url="https://craftsure.vercel.app";
if(navigator.share){navigator.share({title:"CraftSure",text:txt,url})}
else{navigator.clipboard.writeText(url+" - "+txt);alert("Link copied!");}
};
return(
<div style={{background:"#f5f5f5",minHeight:"100vh",fontFamily:"sans-serif"}}>
<div style={{background:"#4338ca",color:"#fff",padding:"10px",display:"flex",justifyContent:"space-between",position:"sticky",top:0,zIndex:10}}>
<b>CraftSure NG</b>
<div style={{display:"flex",gap:"4px"}}>
<button onClick={()=>setTab("home")} style={{padding:"5px 8px",borderRadius:"8px",border:"none",color:"#fff",background:"#7c3aed",fontSize:"10px"}}>Home</button>
<button onClick={()=>setTab("post")} style={{padding:"5px 8px",borderRadius:"8px",border:"none",color:"#fff",background:"#22c55e",fontSize:"10px"}}>Post</button>
<button onClick={()=>setTab("admin")} style={{padding:"5px 8px",borderRadius:"8px",border:"none",color:"#fff",background:"#f59e0b",fontSize:"10px"}}>Admin</button>
{user?<button onClick={()=>setUser(null)} style={{padding:"5px 8px",borderRadius:"8px",border:"none",background:"#ef4444",color:"#fff",fontSize:"9px"}}>{user.slice(0,6)} Out</button>:<button onClick={()=>setLog(true)} style={{padding:"5px 8px",borderRadius:"8px",border:"none",background:"#fff",color:"#4338ca",fontSize:"10px"}}>Login</button>}
</div>
</div>

{tab==="home"&&<div>
<div style={{padding:"10px 15px"}}><b>Jobs ({jobs.length})</b><div style={{fontSize:"10px",color:"#666"}}>Tap photo to view full - Watermark protected</div></div>
{jobs.length===0&&<div style={{background:"#fff",margin:"10px 15px",padding:"10px",borderRadius:"10px"}}><small>No jobs yet. Post with photo!</small></div>}
{jobs.map(j=><div key={j.id} style={{background:"#fff",margin:"10px 15px",borderRadius:"10px",overflow:"hidden",border:"1px solid #eee"}}>
{j.img&&<div style={{position:"relative"}} onClick={()=>setPv(j.img)}>
<img src={j.img} style={{width:"100%",height:"200px",objectFit:"cover"}} alt="job"/>
<div style={{position:"absolute",bottom:0,left:0,right:0,background:"rgba(0,0,0,0.6)",color:"#fff",padding:"5px 8px",fontSize:"9px",display:"flex",justifyContent:"space-between"}}><span>CraftSure NG</span><span>craftsure.vercel.app</span></div>
<div style={{position:"absolute",top:"40%",left:0,right:0,textAlign:"center",color:"rgba(255,255,255,0.25)",fontSize:"24px",fontWeight:"bold",transform:"rotate(-25deg)",pointerEvents:"none"}}>CraftSure NG</div>
</div>}
<div style={{padding:"8px"}}>
<b style={{fontSize:"12px"}}>{j.t}</b><br/>
<small>📍 {j.l} • {j.b}</small><br/>
<small style={{fontSize:"10px"}}>{j.d}</small>
<div style={{display:"flex",gap:"4px",marginTop:"6px"}}>
<button onClick={()=>setPv(j.img)} style={{flex:1,padding:"6px",border:"none",borderRadius:"6px",background:"#4338ca",color:"#fff",fontSize:"10px"}}>View</button>
{j.img&&<button onClick={()=>saveWM(j.img)} style={{flex:1,padding:"6px",border:"none",borderRadius:"6px",background:"#22c55e",color:"#fff",fontSize:"10px"}}>Save</button>}
<button onClick={()=>shareLink(j)} style={{flex:1,padding:"6px",border:"none",borderRadius:"6px",background:"#f59e0b",color:"#fff",fontSize:"10px"}}>Share</button>
</div>
</div>
</div>)}
</div>}

{tab==="post"&&<div style={{padding:"12px"}}>
<h3 style={{fontSize:"13px"}}>Post Job + Photo</h3>
<div style={{background:"#fff",padding:"10px",borderRadius:"10px"}}>
<input value={jt} onChange={e=>setJt(e.target.value)} placeholder="Job Title *" style={{width:"100%",padding:"9px",marginBottom:"6px",borderRadius:"6px",border:"1px solid #ddd",boxSizing:"border-box"}}/>
<input value={jl} onChange={e=>setJl(e.target.value)} placeholder="Location * Ojo Lagos" style={{width:"100%",padding:"9px",marginBottom:"6px",borderRadius:"6px",border:"1px solid #ddd",boxSizing:"border-box"}}/>
<input value={jb} onChange={e=>setJb(e.target.value)} placeholder="Budget * 80k" style={{width:"100%",padding:"9px",marginBottom:"6px",borderRadius:"6px",border:"1px solid #ddd",boxSizing:"border-box"}}/>
<textarea value={jd} onChange={e=>setJd(e.target.value)} placeholder="Description *" style={{width:"100%",padding:"9px",marginBottom:"6px",borderRadius:"6px",border:"1px solid #ddd",height:"60px",boxSizing:"border-box"}}/>
<div style={{border:"2px dashed #4338ca",borderRadius:"8px",padding:"8px",textAlign:"center",marginBottom:"8px"}}>
<input type="file" accept="image/*" onChange={up} id="f" style={{display:"none"}}/>
<label htmlFor="f" style={{display:"block",padding:"8px",background:"#e0e7ff",borderRadius:"6px",fontSize:"11px",color:"#4338ca",fontWeight:"bold"}}>Add Photo - Watermark auto</label>
{ji&&<div style={{marginTop:"6px",position:"relative"}}><img src={ji} style={{width:"100%",maxHeight:"180px",borderRadius:"8px"}} alt="prev"/><div style={{position:"absolute",bottom:0,left:0,right:0,background:"rgba(0,0,0,0.5)",color:"#fff",fontSize:"8px",padding:"3px",textAlign:"center"}}>CraftSure watermark on save</div></div>}
</div>
<button onClick={post} style={{width:"100%",padding:"11px",background:user?"#4338ca":"#999",color:"#fff",border:"none",borderRadius:"8px",fontWeight:"bold"}}>{user?"Post with Watermark":"Login to Post"}</button>
</div>
</div>}

{tab==="admin"&&<div style={{padding:"10px"}}><h3>Admin</h3><div style={{background:"#fff",padding:"10px",borderRadius:"8px"}}><b>Jobs:</b> {jobs.length} - All photos have CraftSure watermark</div></div>}

{log&&<div style={{position:"fixed",top:0,left:0,right:0,bottom:0,background:"rgba(0,0,0,0.6)",padding:"15px",zIndex:99}}><div style={{background:"#fff",padding:"12px",borderRadius:"10px",maxWidth:"300px",margin:"20px auto"}}><b>Login</b><button onClick={()=>setLog(false)} style={{float:"right",border:"none",background:"#eee",borderRadius:"50%",width:"22px"}}>X</button><input value={lv} onChange={e=>setLv(e.target.value)} placeholder="080... or email" style={{width:"100%",padding:"8px",marginTop:"10px",borderRadius:"6px",border:"1px solid #ddd",boxSizing:"border-box"}}/><button onClick={()=>{if(!lv)return;setUser(lv);setLog(false);}} style={{width:"100%",padding:"9px",background:"#4338ca",color:"#fff",border:"none",borderRadius:"6px",marginTop:"8px"}}>Login</button></div></div>}

{pv&&<div style={{position:"fixed",top:0,left:0,right:0,bottom:0,background:"rgba(0,0,0,0.95)",zIndex:100,display:"flex",flexDirection:"column"}}><div style={{display:"flex",justifyContent:"space-between",padding:"10px",color:"#fff"}}><b>CraftSure Photo</b><button onClick={()=>setPv(null)} style={{background:"#fff",border:"none",borderRadius:"50%",width:"28px",height:"28px"}}>X</button></div><div style={{flex:1,display:"flex",alignItems:"center",justifyContent:"center",position:"relative"}}><img src={pv} style={{maxWidth:"100%",maxHeight:"100%"}} alt="full"/><div style={{position:"absolute",color:"rgba(255,255,255,0.3)",fontSize:"32px",fontWeight:"bold",transform:"rotate(-30deg)",pointerEvents:"none",textAlign:"center"}}>CraftSure NG<br/><small style={{fontSize:"12px"}}>craftsure.vercel.app</small></div></div><div style={{padding:"10px",display:"flex",gap:"6px"}}><button onClick={()=>saveWM(pv)} style={{flex:1,padding:"10px",background:"#22c55e",color:"#fff",border:"none",borderRadius:"8px",fontWeight:"bold"}}>Save with Watermark</button><button onClick={()=>shareLink({t:"CraftSure Job",l:"",b:""})} style={{flex:1,padding:"10px",background:"#f59e0b",color:"#fff",border:"none",borderRadius:"8px",fontWeight:"bold"}}>Share Link</button></div></div>}

</div>
)
}
