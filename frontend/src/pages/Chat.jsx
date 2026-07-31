import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

export default function Chat(){
  const { escrowId } = useParams();
  const [msgs, setMsgs] = useState([]);
  const [text, setText] = useState('');
  const user = JSON.parse(localStorage.getItem('user')||'{"name":"Guest"}');

  useEffect(()=>{
    const local = JSON.parse(localStorage.getItem('chat_'+escrowId)||'[]');
    setMsgs(local);
  },[escrowId]);

  const send = ()=>{
    if(!text.trim()) return;
    const isPhone = text.match(/[0-9]{10,}/);
    if(isPhone) alert('PHONE DETECTED! Admin sees this!');
    const m = { id: Date.now(), sender: user.name, text, time: new Date().toLocaleTimeString(), phone:!!isPhone };
    const all = [...msgs, m];
    setMsgs(all);
    localStorage.setItem('chat_'+escrowId, JSON.stringify(all));
    const global = JSON.parse(localStorage.getItem('all_chats')||'[]');
    global.push({ escrowId,...m });
    localStorage.setItem('all_chats', JSON.stringify(global));
    setText('');
  };

  return(
    <div style={{ display:'flex', flexDirection:'column', height:'100vh', background:'#f5f7fb' }}>
      <div style={{ background:'#2d1b9c', color:'white', padding:'12px' }}>
        <b>Chat {escrowId?.slice(0,8)}</b> - {user.name}
        <Link to="/escrow" style={{ float:'right', background:'white', color:'#2d1b9c', padding:'4px 8px', borderRadius:'6px', textDecoration:'none', fontSize:'12px' }}>Escrow</Link>
      </div>
      <div style={{ flex:1, overflowY:'auto', padding:'10px', display:'flex', flexDirection:'column', gap:'8px' }}>
        {msgs.map(x=>(
          <div key={x.id} style={{ alignSelf: x.sender===user.name?'flex-end':'flex-start', background: x.sender===user.name?'#4f46e5':'white', color: x.sender===user.name?'white':'black', padding:'8px 12px', borderRadius:'12px', maxWidth:'80%', border: x.phone?'2px solid red':'none' }}>
            <div style={{ fontSize:'10px' }}>{x.sender} {x.time} {x.phone?'PHONE!':''}</div>
            <div>{x.text}</div>
          </div>
        ))}
      </div>
      <div style={{ background:'white', padding:'10px', display:'flex', gap:'6px' }}>
        <input value={text} onChange={e=>setText(e.target.value)} placeholder="Type message..." style={{ flex:1, padding:'10px', borderRadius:'20px', border:'1px solid #ddd' }} />
        <button onClick={send} style={{ background:'#2d1b9c', color:'white', border:'none', padding:'0 16px', borderRadius:'20px' }}>Send</button>
      </div>
    </div>
  );
}
