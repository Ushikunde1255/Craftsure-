import {useState} from "react";
export default function App(){
const [tab,setTab]=useState("home");
const [log,setLog]=useState(false);
const [reg,setReg]=useState(false);
const [v,setV]=useState(null);
const [c,setC]=useState(null);
const [av,setAv]=useState(null);
const [m,setM]=useState("");
const [jt,setJt]=useState("");
const [jl,setJl]=useState("");
const [jb,setJb]=useState("");
const [jd,setJd]=useState("");
const [ji,setJi]=useState("");
const [lv,setLv]=useState("");
const [user,setUser]=useState(null);
const [jobs,setJobs]=useState([{id:1,t:"Tile my flat",l:"Ojo",b:"₦80k",d:"Need tiler for 2 bathrooms",img:"",by:""}]);
const [chats,setChats]=useState({});
const arts=[{id:1,n:"Tunde Tiler",r:"Tiler • Ojo",s:"5 • 47",g:1},{id:2,n:"Musa Carpenter",r:"Carpenter • Onireke",s:"4.9 • 32",g:0}];
const send=()=>{if(!m.trim()||!c)return;const id=c.id;setChats(p=>({...p,[id]:[...(p[id]||[]),{me:1,x:m}]}));setM("");setTimeout(()=>setChats(p=>({...p,[id]:[...(p[id]||[]),{me:0,x:"Oga I see the photo! I fit do am 🔧"}]})),700);};
const onImg=e=>{const f=e.target.files[0];if(!f)return;const r=new FileReader();r.onload=ev=>setJi(ev.target.result);r.readAsDataURL(f);};
const post=()=>{if(!user)return alert("Please Login first!");if(!jt||!jl||!jb||!jd)return alert("Fill Title, Location, Budget, Description");setJobs([{id:Date.now(),t:jt,l:jl,b:jb,d:jd,img:ji,by:user},...jobs]);setJt("");setJl("");setJb("");setJd("");setJi("");setTab("home");alert("Job with Photo Posted!");};
return(<div style={{background:'#f5f5f5',minHeight:'100vh',fontFamily:'sans-serif',paddingBottom:'60px'}}>
<div style={{background:'#4338ca',color:'#fff',padding:'10px',display:'flex',justifyContent:'space-between',position:'sticky',top:0,zIndex:10}}><b>CraftSure 🇳🇬</b><div style={{display:'flex',gap:'4px'}}>
<button onClick={()=>setTab("home")} style={{background:'#7c3aed',color:'#fff',border:'none',padding:'5px 8px',borderRadius:'8px',fontSize:'10px'}}>Home</button>
<button onClick={()=>setTab("post")} style={{background:'#22c55e',color:'#fff',border:'none',padding:'5px 8px',borderRadius:'8px',fontSize:'10px'}}>Post Job</button>
<button onClick={()=>setTab("admin")} style={{background:'#f59e0b',color:'#fff',border:'none',padding:'5px 8px',borderRadius:'8px',fontSize:'10px'}}>Admin</button>
{user?<div style={{display:'flex',alignItems:'center',gap:'3px'}}><span style={{fontSize:'8px',background:'rgba(0,0,0,0.3)',padding:'3px 5px',borderRadius:'10px',maxWidth:'60px',overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap'}}>{user}</span><button onClick={()=>setUser(null)} style={{background:'#ef4444',color:'#fff',border:'none',padding:'4px 6px',borderRadius:'8px',fontSize:'8px'}}>Out</button></div>:<button onClick={()=>setLog(true)} style={{background:'#fff',color:'#4338ca',border:'none',padding:'5px 9px',borderRadius:'10px',fontSize:'10px',fontWeight:'bold'}}>Login</button>}
</div></div>

{tab==="home"&&<div>
<div style={{padding:'10px 15px'}}><b style={{fontSize:'18px'}}>CraftSure NG 🔒</b><div style={{fontSize:'10px',color:'#666'}}>Escrow Protected • Pay only when satisfied {user&&<span style={{color:'#22c55e',fontWeight:'bold'}}>• {user}</span>}</div></div>
<div style={{margin:'10px 15px',padding:'12px',borderRadius:'10px',background:'linear-gradient(90deg,#fde047,#fb923c)',display:'flex',justifyContent:'space-between'}}><div><span style={{background:'black',color:'#fff',fontSize:'7px',padding:'2px 5px',borderRadius:'5px'}}>AD</span><div style={{fontWeight:'bold',fontSize:'12px'}}>Materials? 🏗️</div><div style={{fontSize:'9px'}}>10% off CRAFTSURE10</div></div><button style={{background:'black',color:'#fff',border:'none',padding:'6px 10px',borderRadius:'10px',fontSize:'10px'}}>Shop</button></div>
<div style={{padding:'0 15px'}}><b style={{fontSize:'12px'}}>Recent Jobs with Photos</b></div>
{jobs.map(j=><div key={j.id} style={{margin:'8px 15px',background:'#fff',borderRadius:'10px',overflow:'hidden',border:'1px solid #eee'}}>
{j.img&&<img src={j.img} style={{width:'100%',height:'160px',objectFit:'cover'}}/>}
<div style={{padding:'8px'}}><b style={{fontSize:'12px'}}>{j.t}</b> {j.by&&<small style={{fontSize:'8px',color:'#4338ca'}}> by {j.by}</small>}<br/><small style={{fontSize:'10px'}}>📍 {j.l} • 💰 {j.b}</small><br/><small style={{fontSize:'10px',color:'#333'}}>{j.d}</small></div>
</div>)}
<div style={{padding:'0 15px',marginTop:'10px',display:'flex',justifyContent:'space-between'}}><b style={{fontSize:'12px'}}>Artisans</b></div>
{arts.map(a=><div key={a.id} style={{margin:'8px 15px',background:'#fff',padding:'10px',borderRadius:'10px',border:a.g?'2px solid gold':'1px solid #eee'}}><b style={{fontSize:'12px'}}>{a.n} {a.g?<span style={{background:'gold',fontSize:'7px',padding:'2px 4px',borderRadius:'4px'}}>SPONSORED</span>:null}</b><br/><small style={{fontSize:'10px'}}>{a.r} • ⭐ {a.s}</small><div style={{display:'flex',gap:'4px',marginTop:'6px'}}><button onClick={()=>setV(a)} style={{flex:1,padding:'6px',background:'#eee',border:'none',borderRadius:'6px',fontSize:'10px'}}>Portfolio</button><button onClick={()=>setC(a)} style={{flex:1,padding:'6px',background:'#e0e7ff',border:'none',borderRadius:'6px',fontSize:'10px',fontWeight:'bold',color:'#4338ca'}}>Chat</button><button onClick={()=>setV(a)} style={{flex:1,padding:'6px',background:'black',color:'#fff',border:'none',borderRadius:'6px',fontSize:'10px',fontWeight:'bold'}}>Hire 🔒</button></div></div>)}
</div>}

{tab==="post"&&<div style={{padding:'12px'}}><h3 style={{fontSize:'13px'}}>Post New Job + Photo 📸 {user?<span style={{color:'#22c55e',fontSize:'10px'}}>as {user}</span>:<span style={{color:'#ef4444',fontSize:'10px'}}>Login required</span>}</h3><div style={{background:'#fff',padding:'10px',borderRadius:'10px'}}>
<input value={jt} onChange={e=>setJt(e.target.value)} placeholder="Job Title * e.g. Fix leaking roof" style={{width:'100%',padding:'9px',marginBottom:'6px',borderRadius:'6px',border:'1px solid #ddd',boxSizing:'border-box',fontSize:'11px'}}/>
<input value={jl} onChange={e=>setJl(e.target.value)} placeholder="Location * Ojo, Lagos" style={{width:'100%',padding:'9px',marginBottom:'6px',borderRadius:'6px',border:'1px solid #ddd',boxSizing:'border-box',fontSize:'11px'}}/>
<input value={jb} onChange={e=>setJb(e.target.value)} placeholder="Budget * ₦80,000" style={{width:'100%',padding:'9px',marginBottom:'6px',borderRadius:'6px',border:'1px solid #ddd',boxSizing:'border-box',fontSize:'11px'}}/>
<textarea value={jd} onChange={e=>setJd(e.target.value)} placeholder="Description * What to do?" style={{width:'100%',padding:'9px',marginBottom:'8px',borderRadius:'6px',border:'1px solid #ddd',height:'70px',boxSizing:'border-box',fontSize:'11px'}}/>
<div style={{border:'2px dashed #4338ca',borderRadius:'8px',padding:'8px',textAlign:'center',marginBottom:'8px'}}>
<input type="file" accept="image/*" capture="environment" onChange={onImg} id="fileUp" style={{display:'none'}}/>
<label htmlFor="fileUp" style={{display:'block',padding:'6px',background:'#e0e7ff',borderRadius:'6px',fontSize:'11px',fontWeight:'bold',color:'#4338ca'}}>📷 Add Photo of Job — Camera or Gallery</label>
{ji&&<div style={{marginTop:'8px'}}><img src={ji} style={{width:'100%',maxHeight:'180px',borderRadius:'8px',objectFit:'cover'}}/><div style={{fontSize:'9px',color:'green',marginTop:'4px'}}>✅ Photo added — Will show in job list</div><button onClick={()=>setJi("")} style={{marginTop:'4px',fontSize:'9px',background:'#ef4444',color:'#fff',border:'none',padding:'4px 8px',borderRadius:'4px'}}>Remove Photo</button></div>}
{!ji&&<div style={{fontSize:'9px',color:'#999',marginTop:'4px'}}>Take photo of broken item, site, etc — Increases hire rate 3X!</div>}
</div>
<button onClick={post} style={{width:'100%',padding:'11px',background:user?'#4338ca':'#999',color:'#fff',border:'none',borderRadius:'8px',fontWeight:'bold',fontSize:'12px'}}>{user?"Post Job with Photo 📸":"Login First"}</button>
</div><div style={{marginTop:'10px'}}><b style={{fontSize:'11px'}}>Jobs ({jobs.length})</b>{jobs.map(j=><div key={j.id} style={{background:'#fff',borderRadius:'8px',marginTop:'6px',overflow:'hidden'}}>{j.img&&<img src={j.img} style={{width:'100%',height:'140px',objectFit:'cover'}}/>}<div style={{padding:'8px'}}><b style={{fontSize:'11px'}}>{j.t}</b><br/><small style={{fontSize:'10px'}}>📍 {j.l} • 💰 {j.b}</small><br/><small style={{fontSize:'10px'}}>{j.d}</small></div></div>)}</div></div>}

{tab==="admin"&&<div style={{padding:'10px'}}><h3 style={{fontSize:'12px'}}>Admin — Private 🔍</h3><div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'6px'}}>
<div style={{background:'#fff',padding:'10px',borderRadius:'8px',textAlign:'center'}}><h3 style={{margin:0,color:'#4338ca'}}>{arts.length}</h3><small style={{fontSize:'9px'}}>Artisans</small></div>
<div style={{background:'#fff',padding:'10px',borderRadius:'8px',textAlign:'center'}}><h3 style={{margin:0,color:'#22c55e'}}>{jobs.length}</h3><small style={{fontSize:'9px'}}>Jobs</small></div>
<div style={{background:'#fff',padding:'10px',borderRadius:'8px',textAlign:'center'}}><h3 style={{margin:0,color:'#f59e0b',fontSize:'14px'}}>₦{jobs.length*15000}</h3><small style={{fontSize:'9px'}}>Profit Private</small></div>
<div style={{background:'#fff',padding:'10px',borderRadius:'8px',textAlign:'center'}}><h3 style={{margin:0,color:'#ef4444'}}>{Object.values(chats).flat().length}</h3><small style={{fontSize:'9px'}}>Monitored</small></div>
</div></div>}

{log&&<div style={{position:'fixed',top:0,left:0,right:0,bottom:0,background:'rgba(0,0,0,0.6)',zIndex:50,padding:'15px'}}><div style={{background:'#fff',padding:'12px',borderRadius:'10px',maxWidth:'300px',margin:'20px auto'}}><div style={{display:'flex',justifyContent:'space-between'}}><b style={{fontSize:'12px'}}>{reg?"Register":"Login — Phone OR Email"}</b><button onClick={()=>setLog(false)} style={{border:'none',background:'#eee',width:'22px',height:'22px',borderRadius:'50%'}}>X</button></div><input value={lv} onChange={e=>setLv(e.target.value)} placeholder="080... OR you@gmail.com *" style={{width:'100%',padding:'8px',marginTop:'6px',borderRadius:'6px',border:'1px solid #ddd',boxSizing:'border-box',fontSize:'10px'}}/><input placeholder="Password *" type="password" style={{width:'100%',padding:'8px',marginTop:'5px',borderRadius:'6px',border:'1px solid #ddd',boxSizing:'border-box',fontSize:'10px'}}/><button onClick={()=>{if(!lv)return alert("Enter Phone or Email");if(!lv.includes("@")&&!lv.startsWith("0"))return alert("Phone start 0 or Email @");setUser(lv);setLog(false);alert("Welcome: "+lv);}} style={{width:'100%',marginTop:'8px',padding:'9px',background:'#4338ca',color:'#fff',border:'none',borderRadius:'6px',fontWeight:'bold',fontSize:'11px'}}>{reg?"Create":"Login"}</button><div style={{textAlign:'center',marginTop:'6px',fontSize:'10px'}}><span onClick={()=>setReg(!reg)} style={{color:'#4338ca',fontWeight:'bold'}}>{reg?"Have account? Login":"No account? Register"}</span></div></div></div>}

{v&&<div style={{position:'fixed',top:0,left:0,right:0,bottom:0,background:'rgba(0,0,0,0.7)',zIndex:40,padding:'12px'}}><div style={{background:'#fff',padding:'12px',borderRadius:'10px',maxWidth:'300px',margin:'10px auto'}}><div style={{display:'flex',justifyContent:'space-between'}}><b style={{fontSize:'12px'}}>{v.n}</b><button onClick={()=>setV(null)} style={{border:'none',background:'#eee',width:'22px',height:'22px',borderRadius:'50%'}}>X</button></div><div style={{background:'#f8fafc',padding:'8px',borderRadius:'8px',marginTop:'8px',fontSize:'11px'}}><div style={{display:'flex',justifyContent:'space-between'}}><span>Job:</span><b>₦100k</b></div><div style={{display:'flex',justifyContent:'space-between',color:'#64748b'}}><span>Escrow Fee:</span><span>₦5k</span></div><div style={{display:'flex',justifyContent:'space-between',fontWeight:'bold',borderTop:'1px solid #ddd',marginTop:'5px',paddingTop:'5px'}}><span>Total:</span><span style={{color:'#4338ca'}}>₦105k</span></div></div><button onClick={()=>{alert("Escrow Pay ₦105k");setV(null);}} style={{width:'100%',marginTop:'8px',padding:'10px',background:'#22c55e',color:'#fff',border:'none',borderRadius:'8px',fontWeight:'bold',fontSize:'11px'}}>🔒 Pay ₦105k — Protected</button></div></div>}

{c&&<div style={{position:'fixed',top:0,left:0,right:0,bottom:0,background:'#fff',zIndex:60,display:'flex',flexDirection:'column'}}><div style={{background:'#4338ca',color:'#fff
