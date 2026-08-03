import { useState, useEffect, useRef } from "react";
import { createClient } from "@supabase/supabase-js";

const supa = createClient(
  "https://unzohyrabvouclsjcpfu.supabase.co",
  "sb_publishable_zB3k0KebVFw4-xf_TtdaUw_UlHsXk_q"
);
const ADMIN = "nicholasu9@gmail.com";
const PAYSTACK_PK = "pk_test_aaa1ae824c287d9865dd27a044670676c0df836d";

// YOUR PRECIOUS LOGO - EXACT AS SCREENSHOT 1 - White outer + Yellow ring + Navy + Yellow tools
// This is the logo I designed just now - Big yellow & white circle, navy inside, yellow hammer & spanner
const LOGO_SVG = `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><circle cx='50' cy='50' r='48' fill='white'/><circle cx='50' cy='50' r='40' fill='none' stroke='#FFD700' stroke-width='12'/><circle cx='50' cy='50' r='28' fill='#0A1931'/><g fill='#FFD700' transform='translate(50 50)'><g transform='rotate(-45)'><rect x='-3' y='-25' width='6' height='50' rx='2'/><path d='M-11 -25 L11 -25 L7 -34 L-7 -34 Z'/></g><g transform='rotate(45)'><rect x='-3' y='-20' width='6' height='30' rx='2'/><path d='M-8 -28 C-12 -34 -8 -42 0 -42 C4 -42 8 -38 8 -30 L4 -26 L0 -30 L-4 -26 Z'/></g></g></svg>`;
const LOGO = `data:image/svg+xml,${encodeURIComponent(LOGO_SVG)}`;

export default function App() {
  const [tab, setTab] = useState("home");
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("cs_user") || "null")
  );
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [jobs, setJobs] = useState([]);
  const [arts, setArts] = useState([]);
  const [msgs, setMsgs] = useState([]);
  const [pays, setPays] = useState([]);
  const [hires, setHires] = useState([]);
  const [ads, setAds] = useState([]);

  const [jt, setJt] = useState("");
  const [jl, setJl] = useState("");
  const [jb, setJb] = useState("");
  const [jd, setJd] = useState("");
  const [ji, setJi] = useState("");
  const [pv, setPv] = useState(null);

  const [an, setAn] = useState("");
  const [askill, setAskill] = useState("");
  const [aloc, setAloc] = useState("");
  const [awhat, setAwhat] = useState("");
  const [aport, setAport] = useState("");
  const [abio, setAbio] = useState("");
  const [aworks, setAworks] = useState([]);

  const [chatJob, setChatJob] = useState(null);
  const [chatTxt, setChatTxt] = useState("");
  const [payModal, setPayModal] = useState(null);

  const [searchSkill, setSearchSkill] = useState("");
  const [searchLoc, setSearchLoc] = useState("");
  const [selectedArt, setSelectedArt] = useState(null);

  const [adCompany, setAdCompany] = useState("");
  const [adTitle, setAdTitle] = useState("");
  const [adImg, setAdImg] = useState("");
  const [adLink, setAdLink] = useState("");
  const [adPackage, setAdPackage] = useState("Basic");

  const [otpSent, setOtpSent] = useState("");
  const [otpInput, setOtpInput] = useState("");
  const [phoneVerified, setPhoneVerified] = useState(false);
  const [emailVerified, setEmailVerified] = useState(false);
  const [verMethod, setVerMethod] = useState("phone");
  const [verEmail, setVerEmail] = useState("");

  // Proof for 35%,75%,100% escrow - MAINTAINED
  const [proofs, setProofs] = useState(
    JSON.parse(localStorage.getItem("cs_proofs") || "{}")
  );

  const chatEndRef = useRef(null);

  const load = async () => {
    const { data: j } = await supa.from("jobs").select("*").order("id", {ascending: false}).limit(20);
    if (j) setJobs(j);
    const { data: a } = await supa.from("artisans").select("*").order("id", {ascending: false}).limit(30);
    if (a) setArts(a);
    const { data: m } = await supa.from("messages").select("*").order("id", {ascending: true}).limit(100);
    if (m) setMsgs(m);
    const { data: p } = await supa.from("payments").select("*").order("id", {ascending: false}).limit(30);
    if (p) setPays(p);
    const { data: h } = await supa.from("hires").select("*").order("id", {ascending: false}).limit(30);
    if (h) setHires(h);
    const { data: ad } = await supa.from("ads").select("*").order("id", {ascending: false}).limit(8);
    if (ad) setAds(ad);
  };

  useEffect(() => { load(); }, []);
  useEffect(() => {
    if (chatEndRef.current) chatEndRef.current.scrollIntoView({ behavior: "smooth" });
  }, [msgs, chatJob]);
  useEffect(() => {
    const s = document.createElement("script");
    s.src = "https://js.paystack.co/v1/inline.js";
    s.async = true;
    document.body.appendChild(s);
    return () => { try { document.body.removeChild(s); } catch {} };
  }, []);
    const signup = async () => {
    const { error } = await supa.auth.signUp({ email, password: pass });
    if (error) return alert(error.message);
    const u = { email, role: email === ADMIN? "admin" : "user" };
    localStorage.setItem("cs_user", JSON.stringify(u));
    setUser(u); setTab("home");
  };
  const login = async () => {
    const { error } = await supa.auth.signInWithPassword({ email, password: pass });
    if (error) return alert(error.message);
    const u = { email, role: email === ADMIN? "admin" : "user" };
    localStorage.setItem("cs_user", JSON.stringify(u));
    setUser(u); setTab("home");
  };
  const compress = (b64, maxW, q) => {
    return new Promise(r => {
      const i = new Image();
      i.onload = () => {
        const c = document.createElement("canvas");
        let w = i.width, h = i.height;
        if (w > maxW) { h = h * maxW / w; w = maxW; }
        c.width = w; c.height = h;
        c.getContext("2d").drawImage(i, 0, 0, w, h);
        r(c.toDataURL("image/jpeg", q));
      }; i.src = b64;
    });
  };
  const up = e => {
    const f = e.target.files[0]; if (!f) return;
    const r = new FileReader();
    r.onload = ev => { compress(ev.target.result, 600, 0.4).then(c => setJi(c)); };
    r.readAsDataURL(f);
  };
  const upArt = e => {
    const f = e.target.files[0]; if (!f) return;
    const r = new FileReader();
    r.onload = ev => { compress(ev.target.result, 300, 0.4).then(c => setAport(c)); };
    r.readAsDataURL(f);
  };
  const upWorks = e => {
    const files = Array.from(e.target.files).slice(0, 5);
    files.forEach(f => {
      const r = new FileReader();
      r.onload = ev => { compress(ev.target.result, 500, 0.4).then(c => setAworks(p => [...p, c].slice(0, 5))); };
      r.readAsDataURL(f);
    });
  };
  const upAd = e => {
    const f = e.target.files[0]; if (!f) return;
    const r = new FileReader();
    r.onload = ev => { compress(ev.target.result, 500, 0.5).then(c => setAdImg(c)); };
    r.readAsDataURL(f);
  };
  const upProof = (e, jobId, stage) => {
    const f = e.target.files[0]; if (!f) return;
    const r = new FileReader();
    r.onload = ev => {
      const img = new Image();
      img.onload = () => {
        const c = document.createElement("canvas");
        let w = img.width, h = img.height;
        if (w > 600) { h = h * 600 / w; w = 600; }
        c.width = w; c.height = h;
        c.getContext("2d").drawImage(img, 0, 0, w, h);
        const cc = c.toDataURL("image/jpeg", 0.5);
        const np = {...proofs, [jobId + "_" + stage]: cc };
        setProofs(np);
        localStorage.setItem("cs_proofs", JSON.stringify(np));
        alert("✅ " + stage + "% Proof Uploaded! Client can now pay next stage!");
      };
      img.src = ev.target.result;
    };
    r.readAsDataURL(f);
  };
  const hasProof = (jobId, stage) =>!!proofs[jobId + "_" + stage];

  const sendPhoneOtp = () => {
    if (awhat.length < 10) return alert("Enter valid phone");
    const c = Math.floor(100000 + Math.random() * 900000).toString();
    setOtpSent(c); alert("Phone Code: " + c + " (Demo)");
  };
  const verifyPhoneOtp = () => {
    if (otpInput === otpSent) { setPhoneVerified(true); setVerMethod("phone"); alert("Phone Verified ✅"); }
    else alert("Wrong code");
  };
  const sendEmailOtp = () => {
    if (!verEmail.includes("@")) return alert("Enter email");
    const c = Math.floor(100000 + Math.random() * 900000).toString();
    setOtpSent(c); alert("Email Code to " + verEmail + ": " + c + " (Demo)");
  };
  const verifyEmailOtp = () => {
    if (otpInput === otpSent) { setEmailVerified(true); setVerMethod("email"); alert("Email Verified ✅"); }
    else alert("Wrong code");
  };

  const postJob = async () => {
    if (!user) return alert("Login first");
    if (!jt ||!jl) return alert("Fill title & location");
    await supa.from("jobs").insert([{ title: jt, location: jl, budget: jb, description: jd, image_url: ji, created_by: user.email }]);
    setJt(""); setJl(""); setJb(""); setJd(""); setJi(""); load(); setTab("home");
  };
  const postArt = async () => {
    if (!an ||!askill ||!aloc) return alert("Fill Name, Skill, Location");
    if (!aport) return alert("Profile Photo needed");
    if (aworks.length === 0) return alert("Upload 1 Jobs Done photo");
    if (!phoneVerified &&!emailVerified) return alert("Verify Phone OR Email!");
    const worksJson = JSON.stringify(aworks);
    const payload = {
      name: an, skill: askill, location: aloc,
      whatsapp: awhat || verEmail, portfolio: aport,
      bio: abio || "Verified - " + verMethod, works: worksJson,
      rating: 4.9, jobs_done: aworks.length, verified: true,
      created_by: verEmail || awhat || user?.email || "guest",
      phone_verified: phoneVerified, email_verified: emailVerified,
      verification_method: verMethod
    };
    const { error } = await supa.from("artisans").insert([payload]);
    if (error) return alert(error.message);
    alert("✅ " + an + " Created - " + verMethod + " verified - " + aworks.length + " photos!");
    setAworks([]); setAn(""); setAskill(""); setAloc(""); setAwhat(""); setAport(""); setAbio("");
    setPhoneVerified(false); setEmailVerified(false); setOtpSent(""); load(); setTab("artisans");
  };
  const postAd = async () => {
    const amt = adPackage === "Basic"? 20000 : adPackage === "Premium"? 50000 : 100000;
    await supa.from("ads").insert([{ company_name: adCompany, title: adTitle, image_url: adImg, link: adLink, package: adPackage, amount: amt, created_by: user?.email, status: "active" }]);
    setAdCompany(""); setAdTitle(""); setAdImg(""); setAdLink(""); load(); setTab("home");
  };
  const delJob = async (id) => { if (!confirm("Delete?")) return; await supa.from("jobs").delete().eq("id", id); load(); };
  const delAd = async (id) => { if (!confirm("Delete ad?")) return; await supa.from("ads").delete().eq("id", id); load(); };
  const hireArtisan = async (em, name, jid) => {
    const id = jid || (chatJob && chatJob.id) || (jobs[0] && jobs[0].id);
    if (!id) return alert("Select job");
    await supa.from("hires").insert([{ job_id: id, client_email: user.email, artisan_email: em, artisan_name: name, status: "hired" }]);
    alert("Hired " + name); load(); setSelectedArt(null);
  };
  const sendMsg = async () => {
    if (!chatTxt.trim() ||!chatJob) return;
    await supa.from("messages").insert([{ job_id: chatJob.id, sender: user.email, receiver: "all", message: chatTxt }]);
    setChatTxt(""); load();
  };

  const getBudget = (b) => {
    let n = parseInt((b || "").replace(/[^0-9]/g, "")) || 0;
    if ((b || "").toLowerCase().includes("k")) n = n * 1000;
    return n;
  };
  const hasPaid = (id, t) => pays.some(p => p.job_id === id && p.percent_type === t + "%");
  const isHired = (id) => hires.find(h => h.job_id === id);

  const openPay = (job, stage) => {
    const b = getBudget(job.budget);
    const clientFee = Math.floor(b * 0.05);
    const artisanFee = Math.floor(b * 0.10);
    const clientTotal = b + clientFee;
    const artisanTotal = b - artisanFee;
    let stageAmount = 0;
    let artisanGets = 0;
    let stageLabel = "";
    if (stage === 35) {
      stageAmount = Math.floor(clientTotal * 0.35);
      artisanGets = Math.floor(artisanTotal * 0.35);
      stageLabel = "35% Start Work";
    } else if (stage === 75) {
      stageAmount = Math.floor(clientTotal * 0.40);
      artisanGets = Math.floor(artisanTotal * 0.40);
      stageLabel = "40% to reach 75% Mid";
    } else if (stage === 100) {
      stageAmount = Math.floor(clientTotal * 0.25);
      artisanGets = Math.floor(artisanTotal * 0.25);
      stageLabel = "25% Final to 100%";
    }
    setPayModal({ job, stage, budget: b, clientFee, artisanFee, clientTotal, artisanTotal, stageAmount, artisanGets, stageLabel });
  };
  const payWithPaystack = () => {
    if (!payModal ||!window.PaystackPop) return;
    const h = window.PaystackPop.setup({
      key: PAYSTACK_PK,
      email: user.email,
      amount: payModal.stageAmount * 100,
      currency: "NGN",
      ref: "CS" + Math.floor(Math.random() * 1e9),
      callback: async (r) => {
        await supa.from("payments").insert([{
          job_id: payModal.job.id,
          payer_email: user.email,
          payer_type: "client",
          amount: payModal.stageAmount,
          artisan_amount: payModal.artisanGets,
          percent_type: payModal.stage + "%",
          status: "paid",
          paystack_ref: r.reference
        }]);
        if (payModal.stage === 35) {
          await supa.from("hires").insert([{
            job_id: payModal.job.id,
            client_email: user.email,
            artisan_email: payModal.job.created_by,
            artisan_name: "Artisan",
            status: "hired_" + payModal.stage + "%"
          }]);
        }
          const getBudget = (b) => {
    let n = parseInt((b || "").replace(/[^0-9]/g, "")) || 0;
    if ((b || "").toLowerCase().includes("k")) n = n * 1000;
    return n;
  };
  const hasPaid = (id, t) => pays.some(p => p.job_id === id && p.percent_type === t + "%");
  const isHired = (id) => hires.find(h => h.job_id === id);
  const openPay = (job, stage) => {
    const b = getBudget(job.budget);
    const cf = Math.floor(b * 0.05);
    const af = Math.floor(b * 0.10);
    const ct = b + cf;
    const at = b - af;
    let sa = 0, ag = 0, sl = "";
    if (stage === 35) { sa = Math.floor(ct * 0.35); ag = Math.floor(at * 0.35); sl = "35% Start"; }
    else if (stage === 75) { sa = Math.floor(ct * 0.40); ag = Math.floor(at * 0.40); sl = "75% Mid"; }
    else { sa = Math.floor(ct * 0.25); ag = Math.floor(at * 0.25); sl = "100% Final"; }
    setPayModal({ job, stage, budget: b, clientFee: cf, artisanFee: af, clientTotal: ct, artisanTotal: at, stageAmount: sa, artisanGets: ag, stageLabel: sl });
  };
  const payWithPaystack = () => {
    if (!payModal ||!window.PaystackPop) return;
    const h = window.PaystackPop.setup({
      key: PAYSTACK_PK, email: user.email, amount: payModal.stageAmount * 100, currency: "NGN",
      ref: "CS" + Math.floor(Math.random() * 1e9),
      callback: async (r) => {
        await supa.from("payments").insert([{ job_id: payModal.job.id, payer_email: user.email, payer_type: "client", amount: payModal.stageAmount, artisan_amount: payModal.artisanGets, percent_type: payModal.stage + "%", status: "paid", paystack_ref: r.reference }]);
        if (payModal.stage === 35) await supa.from("hires").insert([{ job_id: payModal.job.id, client_email: user.email, artisan_email: payModal.job.created_by, artisan_name: "Artisan", status: "hired_35%" }]);
        setPayModal(null); alert("Paid " + payModal.stageLabel); load();
      }, onClose: () => {}
    }); h.openIframe();
  };
  const filteredArts = arts.filter(a => {
    const sOk =!searchSkill || a.skill.toLowerCase().includes(searchSkill.toLowerCase()) || a.name.toLowerCase().includes(searchSkill.toLowerCase());
    const lOk =!searchLoc || a.location.toLowerCase().includes(searchLoc.toLowerCase());
    return sOk && lOk;
  });
  const parseWorks = (w) => { try { const a = JSON.parse(w || "[]"); return Array.isArray(a)? a : []; } catch { return []; } };
  const client5Total = pays.filter(p => p.payer_type === "client").reduce((s, p) => s + Math.floor((p.amount || 0) * 0.05 / 1.05), 0);
  const artisan10Total = pays.reduce((s, p) => s + ((p.amount || 0) - (p.artisan_amount || 0)), 0);
  const grand = client5Total + artisan10Total;
  const isAdmin = user && user.email === ADMIN;

  return (
    <div style={{ background: "#f5f7fb", minHeight: "100vh", fontFamily: "sans-serif" }}>
      <div style={{ background: "#0A1931", color: "#fff", padding: "10px 14px", display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "3px solid #FFD700" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <img src={LOGO} style={{ width: 40, height: 40, borderRadius: "50%", background: "#fff", border: "2px solid #FFD700" }} alt="logo" />
          <b>CraftSure NG 🇳🇬🇬🇭</b>
        </div>
        <div style={{ display: "flex", gap: "4px" }}>
          <button onClick={() => setTab("home")} style={{ padding: "6px 10px", borderRadius: 8, border: "none", background: tab === "home"? "#fff" : "#112240", color: tab === "home"? "#0A1931" : "#fff", fontSize: 10 }}>Home</button>
          <button onClick={() => setTab("artisans")} style={{ padding: "6px 10px", borderRadius: 8, border: "none", background: tab === "artisans"? "#fff" : "#112240", color: tab === "artisans"? "#0A1931" : "#fff", fontSize: 10 }}>Artisans</button>
          <button onClick={() => setTab("join")} style={{ padding: "6px 10px", borderRadius: 8, border: "none", background: "#22c55e", color: "#fff", fontSize: 10 }}>+Join</button>
        </div>
      </div>

      {tab === "home" && <div>
        <div style={{ padding: "10px", background: "#fff" }}><b>Jobs ({jobs.length}) - 35% 75% 100% Proof</b></div>
        {jobs.map(j => {
          const b = getBudget(j.budget);
          return (
            <div key={j.id} style={{ background: "#fff", margin: "10px", borderRadius: 12, border: "1px solid #ddd", overflow: "hidden" }}>
              {j.image_url && <img src={j.image_url} style={{ width: "100%", height: 140, objectFit: "cover" }} alt="job" onClick={() => setPv(j.image_url)} />}
              <div style={{ padding: "10px" }}>
                <b>{j.title}</b><br />
                <small>📍 {j.location} - Budget ₦{b.toLocaleString()} +5% = ₦{Math.floor(b * 1.05).toLocaleString()}</small><br />
                <small>{j.description}</small>
                <div style={{ marginTop: 8, display: "flex", flexDirection: "column", gap: 6 }}>
                  <div style={{ display: "flex", gap: 6 }}>
                    <button onClick={() => setChatJob(j)} style={{ padding: "8px 10px", background: "#0A1931", color: "#FFD700", border: "none", borderRadius: 8, fontSize: 10 }}>Chat</button>
                    {!hasPaid(j.id, 35) && <button onClick={() => openPay(j, 35)} style={{ flex: 1, padding: "8px", background: "#0A1931", color: "#FFD700", border: "none", borderRadius: 8, fontSize: 10, fontWeight: "bold" }}>Pay 35% ₦{Math.floor(b * 1.05 * 0.35).toLocaleString()}</button>}
                    {hasPaid(j.id, 35) &&!hasPaid(j.id, 75) &&!hasProof(j.id, 35) && <span style={{ flex: 1, padding: "8px", background: "#fff3cd", fontSize: 9, borderRadius: 8, textAlign: "center" }}>⏳ Wait 35% Proof</span>}
                    {hasPaid(j.id, 35) &&!hasPaid(j.id, 75) && hasProof(j.id, 35) && <button onClick={() => openPay(j, 75)} style={{ flex: 1, padding: "8px", background: "#FFD700", color: "#0A1931", border: "none", borderRadius: 8, fontSize: 10, fontWeight: "bold" }}>Pay 75% ₦{Math.floor(b * 1.05 * 0.4).toLocaleString()}</button>}
                    {hasPaid(j.id, 75) &&!hasPaid(j.id, 100) &&!hasProof(j.id, 75) && <span style={{ flex: 1, padding: "8px", background: "#fff3cd", fontSize: 9, borderRadius: 8, textAlign: "center" }}>⏳ Wait 75% Proof</span>}
                    {hasPaid(j.id, 75) &&!hasPaid(j.id, 100) && hasProof(j.id, 75) && <button onClick={() => openPay(j, 100)} style={{ flex: 1, padding: "8px", background: "#22c55e", color: "#fff", border: "none", borderRadius: 8, fontSize: 10, fontWeight: "bold" }}>Pay 100% ₦{Math.floor(b * 1.05 * 0.25).toLocaleString()}</button>}
                    {hasPaid(j.id, 100) && <span style={{ flex: 1, padding: "8px", background: "#e6f4ea", fontSize: 9, borderRadius: 8, textAlign: "center" }}>✅ Paid 100%</span>}
                  </div>
                  <div style={{ background: "#fffbe6", padding: "8px", borderRadius: 10, border: "2px dashed #FFD700" }}>
                    <small style={{ fontSize: 9, fontWeight: "bold", color: "#0A1931" }}>🔨 ARTISAN UPLOAD PROOF (35% 75% 100%) - To Unlock Next Pay:</small>
                    <div style={{ display: "flex", gap: 6, marginTop: 6 }}>
                      {hasPaid(j.id, 35) && <div style={{ flex: 1, background: "#fff", padding: "5px", borderRadius: 6, border: "1px solid #0A1931" }}>
                        <small style={{ fontSize: 8 }}>35% Photo</small><br />
                        {hasProof(j.id, 35)? <img src={proofs[j.id + "_35"]} style={{ width: "100%", height: 50, objectFit: "cover", borderRadius: 4, border: "2px solid green" }} alt="p35" /> : <input type="file" accept="image/*" onChange={e => upProof(e, j.id, 35)} style={{ width: "100%", fontSize: 8 }} />}
                      </div>}
                      {hasPaid(j.id, 75) && <div style={{ flex: 1, background: "#fff", padding: "5px", borderRadius: 6, border: "1px solid #0A1931" }}>
                        <small style={{ fontSize: 8 }}>75% Photo</small><br />
                        {hasProof(j.id, 75)? <img src={proofs[j.id + "_75"]} style={{ width: "100%", height: 50, objectFit: "cover", borderRadius: 4, border: "2px solid green" }} alt="p75" /> : <input type="file" accept="image/*" onChange={e => upProof(e, j.id, 75)} style={{ width: "100%", fontSize: 8 }} />}
                      </div>}
                      {hasPaid(j.id, 100) && <div style={{ flex: 1, background: "#fff", padding: "5px", borderRadius: 6, border: "1px solid #0A1931" }}>
                        <small style={{ fontSize: 8 }}>100% Done</small><br />
                        {hasProof(j.id, 100)? <img src={proofs[j.id + "_100"]} style={{ width: "100%", height: 50, objectFit: "cover", borderRadius: 4 }} alt="p100" /> : <input type="file" accept="image/*" onChange={e => upProof(e, j.id, 100)} style={{ width: "100%", fontSize: 8 }} />}
                      </div>}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>}

      {tab === "artisans" && <div style={{ padding: 10 }}>
        <b>Artisans - Past Work IN VIEW</b>
        {filteredArts.map(a => {
          const works = parseWorks(a.works);
          return (
            <div key={a.id} style={{ background: "#fff", borderRadius: 12, marginTop: 10, border: "1px solid #ddd", overflow: "hidden" }}>
              <div style={{ padding: 10, display: "flex", gap: 10 }}>
                {a.portfolio? <img src={a.portfolio} style={{ width: 50, height: 50, borderRadius: "50%", border: "2px solid #FFD700" }} alt="p" /> : <div style={{ width: 50, height: 50, borderRadius: "50%", background: "#0A1931", color: "#FFD700", display: "flex", alignItems: "center", justifyContent: "center" }}>{a.name[0]}</div>}
                <div><b>{a.name}</b><br /><small>{a.skill} - {a.location} - {works.length} jobs</small></div>
              </div>
              {works.length > 0 && <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 2, background: "#eee" }}>
                {works.slice(0, 6).map((w, i) => <img key={i} src={w} style={{ width: "100%", height: 80, objectFit: "cover" }} alt="work" onClick={() => setPv(w)} />)}
              </div>}
            </div>
          );
        })}
      </div>}

      {payModal && <div style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, background: "rgba(0,0,0,0.6)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 50 }}><div style={{ background: "#fff", padding: 16, borderRadius: 12, width: "90%", maxWidth: 340 }}><b>Pay {payModal.stageLabel}</b><br /><small>Budget ₦{payModal.budget.toLocaleString()} +5% = ₦{payModal.clientTotal.toLocaleString()}</small><br /><h3>Pay Now ₦{payModal.stageAmount.toLocaleString()}</h3><small>Artisan gets ₦{payModal.artisanGets.toLocaleString()}</small><br /><button onClick={payWithPaystack} style={{ width: "100%", padding: 12, background: "#0A1931", color: "#FFD700", border: "none", borderRadius: 10, marginTop: 10, fontWeight: "bold" }}>Pay with Paystack</button><button onClick={() => setPayModal(null)} style={{ width: "100%", padding: 10, marginTop: 8, background: "#fff", border: "1px solid #ddd", borderRadius: 10 }}>Cancel</button></div></div>}
      {pv && <div style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, background: "rgba(0,0,0,0.9)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 100 }} onClick={() => setPv(null)}><img src={pv} style={{ maxWidth: "95%", maxHeight: "90%", borderRadius: 10, border: "3px solid #FFD700" }} alt="view" /></div>}
    </div>
  );
      }
