import { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";

const supa = createClient("https://unzohyrabvouclsjcpfu.supabase.co","sb_publishable_zB3k0KebVFw4-xf_TtdaUw_UlHsXk_q");

export default function Escrow(){
  const [escrows,setEscrows]=useState([]);
  const [loading,setLoading]=useState(true);

  useEffect(()=>{
    const load=async()=>{
      const {data}=await supa.from("payments").select("*").order("id",{ascending:false}).limit(20);
      if(data)setEscrows(data);
      setLoading(false);
    };
    load();
  },[]);

  if(loading) return <div style={{padding:"20px"}}>Loading escrow...</div>;

  return(
    <div style={{padding:"12px", background:"#f5f7fb", minHeight:"100vh", fontFamily:"sans-serif"}}>
      <h3 style={{color:"#0A1931"}}>🔒 Escrow - Data Saver</h3>
      <small style={{color:"#666"}}>Client pays, Artisan gets after job done</small>

      {escrows.length===0 && <div style={{background:"#fff", padding:"20px", borderRadius:"12px", marginTop:"12px", textAlign:"center", color:"#999"}}>No escrow yet</div>}

      {escrows.map(m=>(
        <div key={m.id} style={{background:"#fff", padding:"12px", borderRadius:"12px", marginTop:"10px", border:"1px solid #e5e7eb"}}>
          <div style={{display:"flex", justifyContent:"space-between"}}>
            <b>Job #{m.job_id}</b>
            <span style={{background:"#FFD700", padding:"2px 8px", borderRadius:20, fontSize:"10px", fontWeight:"bold"}}>{m.percent_type}</span>
          </div>
          
          <div style={{marginTop:"8px", fontSize:"12px"}}>
            <div>Client paid: ₦{(m.amount||0).toLocaleString()}</div>
            {/* For m35/m75/m100 amounts: */}
            <div style={{marginTop:"4px", color:"#0A1931", fontWeight:"bold"}}>
              Artisan gets: ₦{(m.artisanAmount || Math.round((m.amount||0)*0.9) || 70000).toLocaleString()}
            </div>
            <div style={{marginTop:"4px", color:"#22c55e", fontSize:"10px"}}>
              Total received by Artisan: ₦{(m.totalReceivedByArtisan || m.artisanPrice || 70000).toLocaleString()}
            </div>
          </div>

          <small style={{color:"#999", fontSize:"9px"}}>{m.payer_email} • {new Date(m.created_at).toLocaleDateString()}</small>
        </div>
      ))}
    </div>
  );
            }
