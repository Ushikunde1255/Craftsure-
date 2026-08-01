import { useState, useEffect } from "react";

function App() {
  const [showLogin, setShowLogin] = useState(false);
  const [selectedArtisan, setSelectedArtisan] = useState(null);
  const [chatArtisan, setChatArtisan] = useState(null);
  const [chatMsg, setChatMsg] = useState("");
  const [chats, setChats] = useState(() => {
    const saved = localStorage.getItem("craftsure_chats");
    return saved? JSON.parse(saved) : {};
  });

  useEffect(() => {
    localStorage.setItem("craftsure_chats", JSON.stringify(chats));
  }, [chats]);

  const artisans = [
    { id: 1, name: "Tunde Tiler", role: "Tiler • Ojo, Lagos", rating: "5 • 47 jobs • Verified ✅", sponsored: true, portfolio: ["Kitchen Tiles - Lekki", "Bathroom Floor - Ikeja", "Compound Tiles - Ojo"], price: "₦5,000/day", bio: "10 years experience" },
    { id: 2, name: "Musa Carpenter", role: "Carpenter • Onireke, Lagos", rating: "4.9 • 32 jobs • Verified ✅", sponsored: false, portfolio: ["Wardrobe - Surulere", "Kitchen Cabinet - Yaba", "Roofing - Agege"], price: "₦7,000/day", bio: "Master carpenter" },
    { id: 3, name: "Emeka Electrician", role: "Electrician • Festac, Lagos", rating: "4.8 • 28 jobs • Verified ✅", sponsored: false, portfolio: ["House Wiring - Festac", "POP Lights - Amuwo", "Inverter Setup"], price: "₦6,000/day", bio: "Licensed electrician" },
  ];

  const sendMessage = () => {
    if (!chatMsg.trim() ||!chatArtisan) return;
    const artisanId = chatArtisan.id;
    const newMsg = { from: "me", text: chatMsg, time: new Date().toLocaleTimeString() };
    setChats(prev => ({
     ...prev,
      [artisanId]: [...(prev[artisanId] || []), newMsg]
    }));
    setChatMsg("");
    // Fake artisan reply after 1s
    setTimeout(() => {
      setChats(prev => ({
       ...prev,
        [artisanId]: [...(prev[artisanId] || []), { from: "artisan", text: "Oga thanks! I fit do the work. When you want make we start? I dey available. 🔧", time: new Date().toLocaleTimeString() }]
      }));
    }, 1000);
  };

  return (
    <div style={{background:'#f5f5f5', minHeight:'100vh', fontFamily:'sans-serif', paddingBottom:'60px'}}>
      {/* HEADER */}
      <div style={{background:'#4338ca', color:'white', padding:'12px 15px', display:'flex', justifyContent:'space-between', alignItems:'center', position:'sticky', top:0, zIndex:10}}>
        <div style={{display:'flex', gap:'6px', alignItems:'center'}}>
          <b style={{fontSize:'17px'}}>CraftSure 🇳🇬🇬🇭</b>
          <span style={{background:'#7c3aed', padding:'4px 8px', borderRadius:'10px', fontSize:'11px'}}>Jobs</span>
          {Object.keys(chats).length > 0 && <span style={{background:'red', padding:'2px 6px', borderRadius:'50%', fontSize:'10px'}}>{Object.values(chats).flat().length}</span>}
        </div>
        <button onClick={()=>setShowLogin(!showLogin)} style={{background:'white', color:'#4338ca', border:'none', padding:'6px 14px', borderRadius:'20px', fontWeight:'bold', fontSize:'12px'}}>Login</button>
      </div>

      {showLogin && (
        <div style={{margin:'15px', background:'white', padding:'20px', borderRadius:'12px'}}>
          <b>Welcome back 👋</b><br/>
          <input placeholder="Phone or Email" style={{width:'100%', padding:'10px', marginTop:'10px', borderRadius:'8px', border:'1px solid #ddd', boxSizing:'border-box'}} />
          <button style={{width:'100%', marginTop:'10px', background:'#4338ca', color:'white', border:'none', padding:'10px', borderRadius:'8px', fontWeight:'bold'}}>Login</button>
        </div>
      )}

      <h1 style={{padding:'15px 15px 0', margin:0, fontSize:'28px'}}>Craftsure NG 🔒</h1>
      <p style={{padding:'0 15px', margin:0, color:'#666', fontSize:'13px'}}>Escrow • Pay only when job is done</p>

      {/* SPONSORED AD */}
      <div style={{margin:'15px', padding:'18px', borderRadius:'16px', background:'linear-gradient(90deg, #fde047, #fb923c)', display:'flex', justifyContent:'space-between', alignItems:'center'}}>
        <div>
          <div style={{background:'black', color:'white', display:'inline-block', fontSize:'9px', padding:'3px 7px', borderRadius:'10px', fontWeight:'bold'}}>AD • SPONSORED</div>
          <div style={{fontWeight:'bold', marginTop:'6px', fontSize:'16px'}}>Need Building Materials? 🏗️</div>
          <div style={{fontSize:'11px', marginTop:'3px'}}>10% off Dangote — CRAFTSURE10</div>
        </div>
        <button style={{background:'black', color:'white', border:'none', padding:'8px 14px', borderRadius:'20px', fontWeight:'bold', fontSize:'11px'}}>Shop Now</button>
      </div>

      <h2 style={{padding:'0 15px', fontSize:'16px', fontWeight:'bold'}}>Verified Artisans near you</h2>

      {artisans.map(a=>(
        <div key={a.id} style={{margin:'10px 15px', background:'white', padding:'14px', borderRadius:'12px', border: a.sponsored? '2px solid gold' : '1px solid #eee'}}>
          <div style={{display:'flex', justifyContent:'space-between'}}>
            <div>
              <b>{a.name} {a.sponsored && <span style={{background:'gold', fontSize:'9px', padding:'2px 6px', borderRadius:'6px'}}>SPONSORED</span>}</b><br/>
              <small style={{color:'#666'}}>{a.role}</small><br/>
              <small>⭐ {a.rating}</small>
              {chats[a.id]?.length > 0 && <div style={{color:'green', fontSize:'11px', fontWeight:'bold'}}>💬 {chats[a.id].length} messages</div>}
            </div>
            <button onClick={()=>setSelectedArtisan(a)} style={{height:'32px', padding:'6px 12px', borderRadius:'8px', background:'#4338ca', color:'white', border:'none', fontSize:'11px'}}>Portfolio</button>
          </div>
          <div style={{marginTop:'8px', display:'flex', gap:'4px', flexWrap:'wrap'}}>
            {a.portfolio.slice(0,2).map((p,i)=><span key={i} style={{background:'#f3f4f6', padding:'3px 7px', borderRadius:'6px', fontSize:'10px'}}>📸 {p}</span>)}
          </div>
          <div style={{marginTop:'10px', display:'flex', gap:'6px'}}>
            <button onClick={()=>setChatArtisan(a)} style={{flex:1, padding:'9px', borderRadius:'8px', background:'#e0e7ff', border:'none', fontSize:'13px', fontWeight:'bold', color:'#4338ca'}}>💬 Chat</button>
            <button style={{flex:1, padding:'9px', borderRadius:'8px', background:'black', color:'white', border:'none', fontSize:'13px', fontWeight:'bold'}}>Hire — Escrow</button>
          </div>
        </div>
      ))}

      {/* PORTFOLIO MODAL */}
      {selectedArtisan && (
        <div style={{position:'fixed', top:0, left:0, right:0, bottom:0, background:'rgba(0,0,0,0.7)', zIndex:20, padding:'15px', overflowY:'auto'}}>
          <div style={{background:'white', borderRadius:'16px', padding:'20px', maxWidth:'400px', margin:'10px auto'}}>
            <div style={{display:'flex', justifyContent:'space-between'}}><h3 style={{margin:0}}>{selectedArtisan.name}</h3><button onClick={()=>setSelectedArtisan(null)} style={{border:'none', background:'#eee', borderRadius:'50%', width:'28px', height:'28px'}}>X</button></div>
            <p style={{color:'#666', fontSize:'12px'}}>{selectedArtisan.bio} • {selectedArtisan.price}</p>
            {selectedArtisan.portfolio.map((p,i)=><div key={i} style={{background:'#f9fafb', padding:'12px', borderRadius:'8px', marginBottom:'8px'}}><div style={{background:'#ddd', height:'70px', borderRadius:'8px', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'24px'}}>🛠️ Before/After</div><div style={{fontWeight:'bold', fontSize:'12px', marginTop:'6px'}}>{p}</div><small style={{color:'green'}}>✅ Completed ⭐⭐⭐⭐⭐</small></div>)}
            <button onClick={()=>{setChatArtisan(selectedArtisan); setSelectedArtisan(null)}} style={{width:'100%', marginTop:'10px', background:'#4338ca', color:'white', border:'none', padding:'12px', borderRadius:'10px', fontWeight:'bold'}}>💬 Chat to Hire</button>
          </div>
        </div>
      )}

      {/* CHAT MODAL — THE MAIN FEATURE */}
      {chatArtisan && (
        <div style={{position:'fixed', top:0, left:0, right:0, bottom:0, background:'white', zIndex:30, display:'flex', flexDirection:'column'}}>
          <div style={{background:'#4338ca', color:'white', padding:'12px 15px', display:'flex', justifyContent:'space-between', alignItems:'center'}}>
            <div><b>💬 {chatArtisan.name}</b><div style={{fontSize:'11px', opacity:0.8}}>{chatArtisan.role} • Online now 🟢</div></div>
            <button onClick={()=>setChatArtisan(null)} style={{border:'none', background:'rgba(255,255,255,0.2)', color:'white', borderRadius:'50%', width:'32px', height:'32px'}}>X</button>
          </div>

          <div style={{flex:1, padding:'15px', overflowY:'auto', background:'#f9fafb'}}>
            {(chats[chatArtisan.id] || []).length === 0 && <div style={{textAlign:'center', color:'#999', marginTop:'40px', fontSize:'13px'}}>Start chat with {chatArtisan.name}<br/>Ask about price, availability, past work</div>}
            {(chats[chatArtisan.id] || []).map((m,i)=>(
              <div key={i} style={{display:'flex', justifyContent: m.from==="me"? 'flex-end' : 'flex-start', marginBottom:'10px'}}>
                <div style={{background: m.from==="me"? '#4338ca' : 'white', color: m.from==="me"? 'white' : 'black', padding:'10px 14px', borderRadius:'18px', maxWidth:'75%', fontSize:'13px', boxShadow:'0 1px 2px rgba(0,0,0,0.1)'}}>
                  {m.text}<div style={{fontSize:'9px', opacity:0.7, marginTop:'3px'}}>{m.time}</div>
                </div>
              </div>
            ))}
          </div>

          <div style={{padding:'12px', background:'white', borderTop:'1px solid #eee', display:'flex', gap:'8px'}}>
            <input value={chatMsg} onChange={e=>setChatMsg(e.target.value)} onKeyDown={e=>e.key==="Enter" && sendMessage()} placeholder={`Message ${chatArtisan.name}...`} style={{flex:1, padding:'12px', borderRadius:'24px', border:'1px solid #ddd', fontSize:'13px'}} />
            <button onClick={sendMessage} style={{background:'#4338ca', color:'white', border:'none', padding:'0 18px', borderRadius:'24px', fontWeight:'bold'}}>Send</button>
          </div>
          <div style={{padding:'8px 12px', background:'#fffbeb', fontSize:'11px', textAlign:'center'}}>🔒 Don't pay outside CraftSure — Your money is safe in escrow only if you pay via Hire button</div>
        </div>
      )}
    </div>
  )
}
export default App
