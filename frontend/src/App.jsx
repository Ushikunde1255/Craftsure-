import { useState, useEffect } from "react";

function App() {
  const [tab, setTab] = useState("home");
  const [showLogin, setShowLogin] = useState(false);
  const [isRegister, setIsRegister] = useState(false);
  const [selectedArtisan, setSelectedArtisan] = useState(null);
  const [chatArtisan, setChatArtisan] = useState(null);
  const [chatMsg, setChatMsg] = useState("");
  const [jobs, setJobs] = useState(() => JSON.parse(localStorage.getItem("cs_jobs") || '[{"id":1,"title":"Tile my 3 bedroom flat","location":"Ojo, Lagos","budget":"₦80,000","desc":"Need urgent tiler for kitchen & bathroom"}]'));
  const [newJob, setNewJob] = useState({title:"", location:"", budget:"", desc:""});
  const [chats, setChats] = useState(() => JSON.parse(localStorage.getItem("cs_chats") || "{}"));
  const [user, setUser] = useState(() => JSON.parse(localStorage.getItem("cs_user") || "null"));

  useEffect(()=>localStorage.setItem("cs_jobs", JSON.stringify(jobs)),[jobs]);
  useEffect(()=>localStorage.setItem("cs_chats", JSON.stringify(chats)),[chats]);
  useEffect(()=>{if(user) localStorage.setItem("cs_user", JSON.stringify(user));},[user]);

  const artisans = [
    { id:1, name:"Tunde Tiler", role:"Tiler • Ojo, Lagos", rating:"5 • 47 jobs", sponsored:true, portfolio:["Kitchen - Lekki","Bathroom - Ikeja","Compound - Ojo"], price:"₦5k/day" },
    { id:2, name:"Musa Carpenter", role:"Carpenter • Onireke", rating:"4.9 • 32 jobs", sponsored:false, portfolio:["Wardrobe - Surulere","Kitchen Cabinet - Yaba"], price:"₦7k/day" },
    { id:3, name:"Emeka Electrician", role:"Electrician • Festac", rating:"4.8 • 28 jobs", sponsored:false, portfolio:["Wiring - Festac","POP Lights - Amuwo"], price:"₦6k/day" },
  ];

  const sendMessage = () => {
    if(!chatMsg.trim()) return;
    const id = chatArtisan.id;
    setChats(p=>({...p, [id]: [...(p[id]||[]), {from:"me", text:chatMsg, time:"now"}]}));
    setChatMsg("");
    setTimeout(()=>setChats(p=>({...p, [id]: [...(p[id]||[]), {from:"artisan", text:"Oga I dey! I fit do am. How much you budget? 🔧", time:"now"}]})), 800);
  };

  const handleLogin = () => {
    setUser({name:isRegister?"New User":"Nicholas", phone:"080..."});
    setShowLogin(false);
    alert(isRegister? "Registered! Welcome to CraftSure" : "Login successful!");
  };

  const postJob = () => {
    if(!newJob.title) return alert("Enter job title");
    setJobs([{id:Date.now(),...newJob},...jobs]);
    setNewJob({title:"", location:"", budget:"", desc:""});
    setTab("jobs");
    alert("Job posted! Artisans will bid");
  };

  return (
    <div style={{background:'#f5f5f5', minHeight:'100vh', fontFamily:'sans-serif', paddingBottom:'70px'}}>
      {/* HEADER */}
      <div style={{background:'#4338ca', color:'white', padding:'10px 12px', display:'flex', justifyContent:'space-between', alignItems:'center', position:'sticky', top:0, zIndex:10}}>
        <b>CraftSure 🇳🇬🇬🇭</b>
        <div style={{display:'flex', gap:'6px'}}>
          <button onClick={()=>setTab("home")} style={{background:tab==="home"?"#7c3aed":"rgba(255,255,255,0.2)", color:'white', border:'none', padding:'6px 10px', borderRadius:'10px', fontSize:'11px'}}>Home</button>
          <button onClick={()=>setTab("jobs")} style={{background:tab==="jobs"?"#7c3aed":"rgba(255,255,255,0.2)", color:'white', border:'none', padding:'6px 10px', borderRadius:'10px', fontSize:'11px'}}>Jobs</button>
          <button onClick={()=>setTab("admin")} style={{background:tab==="admin"?"#f59e0b":"rgba(255,255,255,0.2)", color:'white', border:'none', padding:'6px 10px', borderRadius:'10px', fontSize:'11px'}}>Admin</button>
          <button onClick={()=>setShowLogin(true)} style={{background:'white', color:'#4338ca', border:'none', padding:'6px 12px', borderRadius:'15px', fontSize:'11px', fontWeight:'bold'}}>{user? user.name : "Login"}</button>
        </div>
      </div>

      {/* HOME TAB */}
      {tab==="home" && <>
        <div style={{padding:'15px'}}><h2 style={{margin:'0 0 4px', fontSize:'28px'}}>Craftsure NG 🔒</h2><small style={{color:'#666'}}>Escrow for Artisans • Pay only when job is done</small></div>
        <div style={{padding:'0 15px'}}><input placeholder="Find carpenter, tiler, plumber in Lagos..." style={{width:'100%', padding:'12px', borderRadius:'20px', border:'1px solid #ddd', boxSizing:'border-box'}} /></div>
        <div style={{margin:'15px', padding:'16px', borderRadius:'14px', background:'linear-gradient(90deg,#fde047,#fb923c)', display:'flex', justifyContent:'space-between', alignItems:'center'}}>
          <div><div style={{background:'black', color:'white', display:'inline-block', fontSize:'9px', padding:'2px 6px', borderRadius:'8px'}}>AD • SPONSORED</div><div style={{fontWeight:'bold', marginTop:'4px'}}>Need Building Materials? 🏗️</div><div style={{fontSize:'11px'}}>10% off Dangote — CRAFTSURE10</div></div><button style={{background:'black', color:'white', border:'none', padding:'8px 12px', borderRadius:'15px', fontSize:'11px'}}>Shop Now</button>
        </div>
        <div style={{padding:'0 15px', display:'flex', justifyContent:'space-between', alignItems:'center'}}><h3 style={{fontSize:'16px', margin:'10px 0'}}>Verified Artisans</h3><button onClick={()=>setTab("post")} style={{background:'#22c55e', color:'white', border:'none', padding:'6px 12px', borderRadius:'8px', fontSize:'11px', fontWeight:'bold'}}>+ Post New Job</button></div>
        {artisans.map(a=>(
          <div key={a.id} style={{margin:'8px 15px', background:'white', padding:'12px', borderRadius:'10px', border: a.sponsored? '2px solid gold':'1px solid #eee'}}>
            <div style={{display:'flex', justifyContent:'space-between'}}><div><b style={{fontSize:'14px'}}>{a.name} {a.sponsored && <span style={{background:'gold', fontSize:'8px', padding:'2px 5px', borderRadius:'4px'}}>SPONSORED</span>}</b><br/><small style={{color:'#666', fontSize:'11px'}}>{a.role} • ⭐ {a.rating}</small></div><button onClick={()=>setSelectedArtisan(a)} style={{height:'28px', fontSize:'10px', background:'#4338ca', color:'white', border:'none', borderRadius:'6px', padding:'0 10px'}}>Portfolio</button></div>
            <div style={{marginTop:'6px', display:'flex', gap:'4px'}}>{a.portfolio.slice(0,2).map((p,i)=><span key={i} style={{fontSize:'9px', background:'#f3f4f6', padding:'2px 6px', borderRadius:'4px'}}>📸 {p}</span>)}</div>
            <div style={{marginTop:'8px', display:'flex', gap:'6px'}}><button onClick={()=>setChatArtisan(a)} style={{flex:1, padding:'7px', fontSize:'12px', background:'#e0e7ff', border:'none', borderRadius:'6px', color:'#4338ca', fontWeight:'bold'}}>💬 Chat {chats[a.id]?.length? `(${chats[a.id].length})`:""}</button><button style={{flex:1, padding:'7px', fontSize:'12px', background:'black', color:'white', border:'none', borderRadius:'6px', fontWeight:'bold'}}>Hire — Escrow</button></div>
          </div>
        ))}
      </>}

      {/* JOBS TAB */}
      {tab==="jobs" && <div style={{padding:'15px'}}><div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}><h3>Jobs Posted</h3><button onClick={()=>setTab("post")} style={{background:'#4338ca', color:'white', border:'none', padding:'8px 12px', borderRadius:'8px', fontSize:'12px'}}>+ Post Job</button></div>{jobs.map(j=><div key={j.id} style={{background:'white', padding:'12px', borderRadius:'10px', marginBottom:'10px'}}><b style={{fontSize:'14px'}}>{j.title}</b><br/><small>{j.location} • {j.budget}</small><br/><small style={{color:'#666'}}>{j.desc}</small><br/><button style={{marginTop:'6px', fontSize:'11px', background:'#22c55e', color:'white', border:'none', padding:'5px 10px', borderRadius:'6px'}}>Bid Now</button></div>)}</div>}

      {/* POST JOB TAB */}
      {tab==="post" && <div style={{padding:'15px'}}><h3>Post New Job 🔨</h3><div style={{background:'white', padding:'15px', borderRadius:'12px'}}><input value={newJob.title} onChange={e=>setNewJob({...newJob, title:e.target.value})} placeholder="Job Title e.g. Tile my kitchen" style={{width:'100%', padding:'10px', marginBottom:'8px', borderRadius:'8px', border:'1px solid #ddd', boxSizing:'border-box'}} /><input value={newJob.location} onChange={e=>setNewJob({...newJob, location:e.target.value})} placeholder="Location e.g. Ojo, Lagos" style={{width:'100%', padding:'10px', marginBottom:'8px', borderRadius:'8px', border:'1px solid #ddd', boxSizing:'border-box'}} /><input value={newJob.budget} onChange={e=>setNewJob({...newJob, budget:e.target.value})} placeholder="Budget e.g. ₦50,000" style={{width:'100%', padding:'10px', marginBottom:'8px', borderRadius:'8px', border:'1px solid #ddd', boxSizing:'border-box'}} /><textarea value={newJob.desc} onChange={e=>setNewJob({...newJob, desc:e.target.value})} placeholder="Describe job..." style={{width:'100%', padding:'10px', marginBottom:'10px', borderRadius:'8px', border:'1px solid #ddd', height:'80px', boxSizing:'border-box'}} /><button onClick={postJob} style={{width:'100%', background:'#4338ca', color:'white', border:'none', padding:'12px', borderRadius:'8px', fontWeight:'bold'}}>Post Job — Free</button><button onClick={()=>setTab("home")} style={{width:'100%', marginTop:'8px', background:'#eee', border:'none', padding:'10px', borderRadius:'8px'}}>Cancel</button></div></div>}

      {/* ADMIN TAB */}
      {tab==="admin" && <div style={{padding:'15px'}}><h3>Admin Dashboard 📊</h3><div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:'10px'}}><div style={{background:'white', padding:'15px', borderRadius:'10px', textAlign:'center'}}><h2 style={{margin:0, color:'#4338ca'}}>{artisans.length}</h2><small>Artisans</small></div><div style={{background:'white', padding:'15px', borderRadius:'10px', textAlign:'center'}}><h2 style={{margin:0, color:'#22c55e'}}>{jobs.length}</h2><small>Jobs</small></div><div style={{background:'white', padding:'15px', borderRadius:'10px', textAlign:'center'}}><h2 style={{margin:0, color:'gold'}}>₦{jobs.length*5000}</h2><small>Escrow Hold</small></div><div style={{background:'white', padding:'15px', borderRadius:'10px', textAlign:'center'}}><h2 style={{margin:0, color:'red'}}>{Object.keys(chats).length}</h2><small>Chats</small></div></div><div style={{background:'white', marginTop:'15px', padding:'12px', borderRadius:'10px'}}><b>Sponsored Ads Revenue</b><br/><small>Tunde Tiler: ₦2,000/month (Active) ✅</small><br/><small>Dangote Ad: ₦5,000/click model</small><br/><button style={{marginTop:'8px', background:'black', color:'white', border:'none', padding:'8px 12px', borderRadius:'6px', fontSize:'11px'}}>Manage Ads</button></div><div style={{background:'white', marginTop:'10px', padding:'12px', borderRadius:'10px'}}><b>Recent Jobs</b>{jobs.slice(0,3).map(j=><div key={j.id} style={{fontSize:'12px', padding:'6px 0', borderBottom:'1px solid #eee'}}>{j.title} — {j.location} <span style={{color:'green'}}>• Open</span></div>)}</div></div>}

      {/* LOGIN / REGISTER MODAL */}
      {showLogin && <div style={{position:'fixed', top:0, left:0, right:0, bottom:0, background:'rgba(0,0,0,0.6)', zIndex:50, padding:'20px'}}><div style={{background:'white', borderRadius:'16px', padding:'20px', maxWidth:'350px', margin:'30px auto'}}><div style={{display:'flex', justifyContent:'space-between'}}><h3 style={{margin:0}}>{isRegister? "Create Account":"Welcome Back"}</h3><button onClick={()=>setShowLogin(false)} style={{border:'none', background:'#eee', borderRadius:'50%', width:'28px', height:'28px'}}>X</button></div><p style={{fontSize:'12px', color:'#666'}}>{isRegister? "Join CraftSure as client or artisan":"Login to hire artisans safely"}</p><input placeholder="Full Name" style={{display:isRegister?'block':'none', width:'100%', padding:'10px', marginTop:'8px', borderRadius:'8px', border:'1px solid #ddd', boxSizing:'border-box'}} /><input placeholder="Phone or Email" style={{width:'100%', padding:'10px', marginTop:'8px', borderRadius:'8px', border:'1px solid #ddd', boxSizing:'border-box'}} /><input type="password" placeholder="Password" style={{width:'100%', padding:'10px', marginTop:'8px', borderRadius:'8px', border:'1px solid #ddd', boxSizing:'border-box'}} />{isRegister && <select style={{width:'100%', padding:'10px', marginTop:'8px', borderRadius:'8px', border:'1px solid #ddd'}}><option>I'm a Client (I need artisan)</option><option>I'm an Artisan (I want jobs)</option></select>}<button onClick={handleLogin} style={{width:'100%', marginTop:'12px', background:'#4338ca', color:'white', border:'none', padding:'12px', borderRadius:'8px', fontWeight:'bold'}}>{isRegister? "Create Account":"Login"}</button><div style={{textAlign:'center', marginTop:'10px', fontSize:'12px'}}>{isRegister? "Already have account?":"Don't have account?"} <span onClick={()=>setIsRegister(!isRegister)} style={{color:'#4338ca', fontWeight:'bold', cursor:'pointer'}}>{isRegister? "Login":"Register"}</span></div></div></div>}

      {/* PORTFOLIO */}
      {selectedArtisan && <div style={{position:'fixed', top:0, left:0, right:0, bottom:0, background:'rgba(0,0,0,0.7)', zIndex:40, padding:'15px', overflowY:'auto'}}><div style={{background:'white', borderRadius:'16px', padding:'20px', maxWidth:'400px', margin:'10px auto'}}><div style={{display:'flex', justifyContent:'space-between'}}><h3 style={{margin:0}}>{selectedArtisan.name} Portfolio</h3><button onClick={()=>setSelectedArtisan(null)} style={{border:'none', background:'#eee', borderRadius:'50%', width:'28px', height:'28px'}}>X</button></div>{selectedArtisan.portfolio.map((p,i)=><div key={i} style={{background:'#f9fafb', padding:'12px', borderRadius:'8px', marginTop:'10px'}}><div style={{background:'#ddd', height:'70px', borderRadius:'8px', display:'flex', alignItems:'center', justifyContent:'center'}}>🛠️ Before/After</div><div style={{fontWeight:'bold', fontSize:'12px', marginTop:'6px'}}>{p}</div><small style={{color:'green'}}>✅ Completed ⭐⭐⭐⭐⭐</small></div>)}<button onClick={()=>{setChatArtisan(selectedArtisan); setSelectedArtisan(null)}} style={{width:'100%', marginTop:'12px', background:'#4338ca', color:'white', border:'none', padding:'12px', borderRadius:'8px', fontWeight:'bold'}}>💬 Chat to Hire</button></div></div>}

      {/* CHAT */}
      {chatArtisan && <div style={{position:'fixed', top:0, left:0, right:0, bottom:0, background:'white', zIndex:60, display:'flex', flexDirection:'column'}}><div style={{background:'#4338ca', color:'white', padding:'12px', display:'flex', justifyContent:'space-between'}}><div><b>💬 {chatArtisan.name}</b><div style={{fontSize:'10px'}}>Online 🟢 • {chatArtisan.role}</div></div><button onClick={()=>setChatArtisan(null)} style={{border:'none', background:'rgba(255,255,255,0.2)', color:'white', borderRadius:'50%', width:'32px', height:'32px'}}>X
