import {useState} from "react";
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
const [jobs,setJobs]=useState([]);
const [m,setM]=useState("");
const [chats,setChats]=useState({});
const [c,setC]=useState(null);
const [pv,setPv]=useState(null);
const arts=[{id:1,n:"Tunde Tiler"},{id:2,n:"Musa Carpenter"}];
const S={p:{background:'#f5f5f5',minHeight:'100vh',fontFamily:'sans-serif'},h:{background:'#4338ca',color:'#fff',padding:'10px',display:'flex',justifyContent:'space-between',position:'sticky',top:0,zIndex:10},b:{padding:'5px 8px',borderRadius:'8px',border:'none',color:'#fff',fontSize:'10px'},card:{background:'#fff',padding:'0',borderRadius:'10px',margin:'8px 15px',overflow:'hidden'},in:{width:'100%',padding:'9px',marginBottom:'6px',borderRadius:'6px',border:'1px solid #ddd',boxSizing:'border-box'}};

const up=e=>{const f=e.target.files[0];if(!f)return;const r=new FileReader();r.onload=x=>setJi(x.target.result);r.readAsDataURL(f);};

const post=()=>{if(!user)return alert("Login first");if(!jt||!jl)return alert("Fill title+loc");setJobs([{id:Date.now(),t:jt,l:jl,b:jb,d:jd,img:ji,by:user},...jobs]);setJt("");setJl("");setJb("");setJd("");setJi("");setTab("home");};

// WATERMARK + SAVE
const saveWithMark=async(src)=>{
const img=new Image();img.crossOrigin="anonymous";img.src=src;
img.onload=()=>{
const cv=document.createElement("canvas");cv.width=img.width;cv.height=img.height;
const x=cv.getContext("2d");x.drawImage(img,0,0);
x.font="bold "+Math.floor(cv.width/18)+"px sans-serif";x.fillStyle="rgba(255,255,255,0.7)";
x.textAlign="center";x.fillText("CraftSure 🇳🇬",cv.width/2,cv.height-30);
x.font=Math.floor(cv.width/28)+"px sans-serif";x.fillText("craftsure.vercel.app",cv.width/2,cv.height-10);
const a=document.createElement("a");a.download="CraftSure-"+Date.now()+".jpg";a.href=cv.toDataURL("image/jpeg",0.9);a.click();
};
};

const shareJob=(j)=>{
if(navigator.share){navigator.share({title:j.t,text:j.t+" - "+j.l+" - "+j.b+" on CraftSure",url:"https://craftsure.vercel.app"});}
else{navigator.clipboard.writeText("https://craftsure.vercel.app - "+j.t);alert("Link copied! Photo has watermark when saved");}
};

return(<div style={S.p}>
<div style={S.h}><b>CraftSure 🇳🇬</b><div style={{display:'flex',gap:'4px'}}>
<button onClick={()=>setTab("home")} style={{...S.b,background:'#7c3aed'}}>Home</button>
<button onClick={()=>setTab("post")} style={{...S.b,background:'#22c55e'}}>Post Job</button>
<button onClick={()=>setTab("admin")} style={{...S.b,background:'#f59e0b'}}>Admin</button>
{user?<button onClick={()=>setUser(null)} style={{...S.b,background:'#ef4444'}}>{user.slice(0,6)} Out</button>:<button onClick={()=>setLog(true)} style={{...S.b,background:'#fff',color:'#4338ca'}}>Login</button>}
</div></div>

{tab==="home"&&<div>
<div style={{padding:'10px 15px'}}><b>Jobs ({jobs.length}) - Tap photo to view</b></div>
{jobs.length===0&&<div style={{...S.card,padding:'10px'}}><small>No jobs yet. Post with photo!</small></div>}
{jobs.map(j=><div key={j.id} style={S.card}>
{j.img&&<div style={{position:'relative'}} onClick={()=>setPv(j.img)}>
<img src={j.img} style={{width:'100%',height:'200px',objectFit:'cover'}}/>
<div style={{position:'absolute',bottom:0,left:0,right:0,background:'linear-gradient(transparent,rgba(0,0,0,0.7))',color:'#fff',padding:'6px',fontSize:'10px',display:'flex',justifyContent:'space-between'}}>
<span>🔒 CraftSure 🇳🇬</span><span>craftsure.vercel.app</span>
</div>
<div style={{position:'absolute',top:0,left:0,right:0,bottom:0,display:'flex',alignItems:'center',justifyContent:'center',pointerEvents:'none'}}>
<span style={{color:'rgba(255,255,255,0.25)',fontSize:'28px',fontWeight:'bold',transform:'rotate(-30deg)'}}>CraftSure 🇳🇬</span>
</div>
</div>}
<div style={{padding:'8px'}}>
<b style={{fontSize:'12px'}}>{j.t}</b><br/><small>📍{j.l} • 💰{j.b}</small><br/><small style={{fontSize:'10px'}}>{j.d}</small>
<div style={{display:'flex',gap:'4px',marginTop:'6px'}}>
<button onClick={()=>setPv(j.img)} style={{...S.b,background:'#4338ca',flex:1}}>👁️ View</button>
{j.img&&<button onClick={()=>saveWithMark(j.img)} style={{...S.b,background:'#22c55e',flex:1}}>💾 Save</button>}
<button onClick={()=>shareJob(j)} style={{...S.b,background:'#f59e0b',flex:1}}>🔗 Share</button>
</div>
</div>
</div>)}
</div>}

{tab==="post"&&<div style={{padding:'12px'}}>
<h3 style={{fontSize:'13px'}}>Post New Job 📸 + Watermark</h3>
<div style={{background:'#fff',padding:'10px',borderRadius:'10px'}}>
<input value={jt} onChange={e=>setJt(e.target.value)} placeholder="Job Title *" style={S.in}/>
<input value={jl} onChange={e=>setJl(e.target.value)} placeholder="Location * Ojo, Lagos" style={S.in}/>
<input value={jb} onChange={e=>setJb(e.target.value)} placeholder="Budget * ₦80,000" style={S.in}/>
<textarea value={jd} onChange={e=>setJd(e.target.value)} placeholder="Description *" style={{...S.in,height:'60px'}}/>
<div style={{border:'2px dashed #4338ca',borderRadius:'8px',padding:'8px',textAlign:'center',marginBottom:'8px'}}>
<input type="file" accept="image/*" onChange={up} id="f" style={{display:'none'}}/>
<label htmlFor="f" style={{display:'block',padding:'8px',background:'#e0e7ff',borderRadius:'6px',fontSize:'11px',color:'#4338ca',fontWeight:'bold'}}>📷 Add Photo - Will get CraftSure Watermark</label>
{ji&&<div style={{position:'relative',marginTop:'6px'}}>
<img src={ji} style={{width:'100%',maxHeight:'200px',borderRadius:'8px'}}/>
<div style={{position:'absolute',bottom:0,left:0,right:0,background:'rgba(0,0,0,0.6)',color:'#fff',padding:'4px',fontSize:'9px',textAlign:'center'}}>🔒 CraftSure 🇳🇬 watermark will be added on save</div>
</div>}
</div>
<button onClick={post} style={{width:'100%',padding:'11px',background:user?'#4338ca':'#999',color:'#fff',border:'none',borderRadius:'8px',fontWeight:'bold'}}>{user?"Post Job with Watermark":"Login to Post"}</button>
</div>
</div>}

{tab==="admin"&&<div style={{padding:'10px'}}><h3>Admin</h3><div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'6px'}}><div style={{...S.card,padding:'10px',textAlign:'center'}}><h3 style={{margin:0}}>{jobs.length}</h3><small>Jobs</small></div><div style={{...S.card,padding:'10px',textAlign:'center'}}><h3 style={{margin:0}}>₦{jobs.length*15000}</h3><small>Profit</small></div></div></div>}

{log&&<div style={{position:'fixed',top:0,left:0,right:0,bottom:0,background:'rgba(0,0,0,0.6)',padding:'15px',zIndex:99}}><div style={{background:'#fff',padding:'12px',borderRadius:'10px',maxWidth:'300px',margin:'20px auto'}}><b>Login</b><button onClick={()=>setLog(false)} style={{float:'right',border:'none',background:'#eee',borderRadius:'50%',width:'22px'}}>X</button><input value={lv} onChange={e=>setLv(e.target.value)} placeholder="080... or email" style={{...S.in,marginTop:'10px'}}/><button onClick={()=>{if(!lv)return;setUser(lv);setLog(false);}} style={{width:'100%',padding:'9px',background:'#4338ca',color:'#fff',border:'none',borderRadius:'6px'}}>Login</button></div></div>}

{pv&&<div style={{position:'fixed',top:0,left:0,right:0,bottom:0,background:'rgba(0,0,0,0.95)',zIndex:100,display:'flex',flexDirection:'column'}}><div style={{display:'flex',justifyContent:'space-between',padding:'10px',color:'#fff'}}><b>CraftSure 🇳🇬 Photo</b><button onClick={()=>setPv(null)} style={{background:'#fff',color:'#000',border:'none',borderRadius:'50%',width:'28px',height:'28px'}}>X</button></div><div style={{flex:1,display:'flex',alignItems:'center',justifyContent:'center',position:'relative'}}><img src={pv} style={{maxWidth:'100%',maxHeight:'100%',objectFit:'contain'}}/><div style={{position:'absolute',bottom:'20%',left:0,right:0,textAlign:'center',pointerEvents:'none'}}><span style={{color:'rgba(255,255,255,0.3)',fontSize:'32px',fontWeight:'bold',transform:'rotate(-30deg)',display:'inline-block'}}>CraftSure 🇳🇬<br/><small style={{fontSize:'12px'}}>craftsure.vercel.app</small></span></div></div><div style={{padding:'10px',display:'flex',gap:'6px'}}><button onClick={()=>saveWithMark(pv)} style={{flex:1,padding:'10px',background:'#22c55e',color:'#fff',border:'none',borderRadius:'8px',fontWeight:'bold'}}>💾 Save with Watermark</button><button onClick={()=>{if(navigator.share){navigator.share({title:"CraftSure Job",url:"https://craftsure.vercel.app"});}else{alert("Link: craftsure.vercel.app");}}} style={{flex:1,padding:'10px',background:'#f59e0b',color:'#fff',border:'none',borderRadius:'8px',fontWeight:'bold'}}>🔗 Share Link</button></div></div>}

</div>)
  }
