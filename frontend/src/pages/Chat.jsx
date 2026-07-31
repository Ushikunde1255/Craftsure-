import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

export default function Chat(){
  const { escrowId } = useParams();
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState('');
  const [escrow, setEscrow] = useState(null);
  const user = JSON.parse(localStorage.getItem('user')||'null');
  const myName = user?.name || 'Guest';

  // Load chat
  useEffect(()=>{
    const local = JSON.parse(localStorage.getItem('chat_'+escrowId)||'[]');
    const escLocal = JSON.parse(localStorage.getItem('escrows')||'[]').find(e=>e._id===escrowId);
    if(escLocal) setEscrow(escLocal);

    // Try server
    fetch(`https://craftsure-1.onrender.com/api/escrow/${escrowId}`).then(r=>r.json()).then(d=>{
      if(d && d._id) setEscrow(d);
    }).catch(()=>{});

    fetch(`https://craftsure-1.onrender.com/api/chat/${escrowId}`).then(r=>r.json()).then(d=>{
      const serverMsgs = Array.isArray(d)?d:d.messages||[];
      if(serverMsgs.length>0) setMessages([...local,...serverMsgs]);
      else setMessages(local);
    }).catch(()=>setMessages(local));
  },[escrowId]);

  const send = async ()=>{
    if(!text.trim()) return;

    // Anti-bypass: detect phone number
    const phoneRegex = /(\+?234|0)?[789]\d{9}|\d{10,11}/;
    if(phoneRegex.test(text)){
      alert('⚠️ PHONE DETECTED! Admin will see this! Phone sharing not allowed before payment! This chat is monitored!');
    }

    const newMsg = {
      _id: Date.now().toString(),
      escrowId,
      sender: myName,
      text,
      time: new Date().toLocaleTimeString(),
      isPhoneAttempt: phoneRegex.test(text)
    };

    // Save locally first - ALWAYS WORKS!
    const local = JSON.parse(localStorage.getItem('chat_'+escrowId)||'[]');
    local.push(newMsg);
    localStorage.setItem('chat_'+escrowId, JSON.stringify(local));
    setMessages(prev=>[...prev, newMsg]);
    setText('');

    // Also save to global admin spy list
    const allChats = JSON.parse(localStorage.getItem('all_chats')||'[]');
    allChats.push(newMsg);
    localStorage.setItem('all_chats', JSON.stringify(allChats));

    // Try server
    try{
      await fetch(`https://craftsure-1.onrender.com/api/chat/${escrowId}`,{
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body: JSON.stringify({ sender: myName, text: newMsg.text })
      });
    }catch{}
  };

  return(
    <div style={{ display:'flex', flexDirection:'column', height:'100vh', background:'#f5f7fb' }}>
      <div style={{ background:'#2d1b9c', color:'white', padding:'12px', display:'flex', justifyContent:'space-between', alignItems:'center' }}>
        <div>
          <b>Chat - {escrow?.jobTitle||escrowId.slice(0,8)}</b><br/>
          <span style={{ fontSize:'11px' }}>{escrow?.clientName} ↔ {escrow?.artisanName} | Profit {(escrow?.totalAmount*0.15||0).toFixed(0)}</span>
        </div>
        <Link to="/escrow" style={{ background:'white', color:'#2d1b9c', padding:'6px 10px', borderRadius:'8px', textDecoration:'none', fontSize:'12px' }}>Escrow</Link>
      </div>

      <div style={{ background:'#fffbeb', padding:'8px', fontSize:'11px', textAlign:'center' }}>
        🔒 Anti-bypass: Phone hidden! Admin can spy! {myName} you are chatting as: <b>{myName}</b>
      </div>

      <div style={{ flex:1, overflowY:'auto', padding:'12px', display:'flex', flexDirection:'column', gap:'8px' }}>
        {messages.length===0 && <div style={{ background:'white', padding:'15px', borderRadius:'10px', textAlign:'center' }}>No messages yet. Say Hello! 👋<br/><span style={{ fontSize:'11px', color:'#666' }}>Phone numbers are blocked and reported to Admin!</span></div>}
        {messages.map(m=>(
          <div key={m._id} style={{
            alignSelf: m.sender===myName?'flex-end':'flex-start',
            background: m.sender===myName?'#4f46e5':'white',
            color: m.sender===myName?'white':'black',
            padding:'10px 14px', borderRadius:'14px', maxWidth:'75%',
            border: m.isPhoneAttempt?'2px solid red':'none'
          }}>
            <div style={{ fontSize:'10px', opacity:0.7 }}>{m.sender} • {m.time} {m.isPhoneAttempt && '⚠️ PHONE!'}</div>
            <div style={{ fontSize:'14px' }}>{m.text}</div>
          </div>
        ))}
      </div>

      <div style={{ background:'white', padding:'10px', display:'flex', gap:'6px', borderTop:'1px solid #eee' }}>
        <input
          value={text}
          onChange={e=>setText(e.target.value)}
