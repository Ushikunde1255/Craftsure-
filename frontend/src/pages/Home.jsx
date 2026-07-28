export default function Home() {
  const user = JSON.parse(localStorage.getItem('user') || 'null');
  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', fontFamily: 'sans-serif' }}>
      <div style={{ background: 'linear-gradient(135deg,#5a31f5,#8a5cf5)', color: 'white', padding: '60px 20px', borderRadius: '0 0 30px 30px', textAlign: 'center' }}>
        <h1 style={{ fontSize: '32px', margin: '0 0 10px' }}>Find Trusted Artisans in 2 Minutes 🇳🇬</h1>
        <p style={{ fontSize: '18px', opacity: 0.9 }}>No more fake artisans. Real people, real photos, real WhatsApp.</p>
        <div style={{ marginTop: '25px', display: 'flex', gap: '12px', justifyContent: 'center' }}>
          <a href="/jobs" style={{ background: 'white', color: '#5a31f5', padding: '14px 28px', borderRadius: '12px', fontWeight: 'bold', textDecoration: 'none' }}>Find Artisan</a>
          <a href="/register" style={{ background: '#25D366', color: 'white', padding: '14px 28px', borderRadius: '12px', fontWeight: 'bold', textDecoration: 'none' }}>Post Job Free</a>
        </div>
        {user && <p style={{ marginTop: '20px', fontSize: '13px' }}>Welcome back, {user.name}! You have posted jobs.</p>}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px', padding: '20px', textAlign: 'center' }}>
        <div style={{ background: 'white', padding: '15px', borderRadius: '12px' }}><h3>9+</h3><p style={{ fontSize: '12px' }}>Jobs Posted</p></div>
        <div style={{ background: 'white', padding: '15px', borderRadius: '12px' }}><h3>50+</h3><p style={{ fontSize: '12px' }}>Artisans</p></div>
        <div style={{ background: 'white', padding: '15px', borderRadius: '12px' }}><h3>100%</h3><p style={{ fontSize: '12px' }}>Verified via WhatsApp</p></div>
      </div>

      <div style={{ padding: '20px' }}>
        <h3>How It Works</h3>
        <div style={{ display: 'flex', gap: '15px', marginTop: '10px' }}>
          <div style={{ flex: 1, background: 'white', padding: '15px', borderRadius: '12px' }}><b>1. Post</b><p style={{ fontSize: '13px' }}>Take photo of work, add budget</p></div>
          <div style={{ flex: 1, background: 'white', padding: '15px', borderRadius: '12px' }}><b>2. Get WhatsApp</b><p style={{ fontSize: '13px' }}>Artisans message you directly</p></div>
          <div style={{ flex: 1, background: 'white', padding: '15px', borderRadius: '12px' }}><b>3. Done</b><p style={{ fontSize: '13px' }}>Pay after work completed</p></div>
        </div>
        <a href="/jobs" style={{ display: 'block', marginTop: '20px', background: '#5a31f5', color: 'white', textAlign: 'center', padding: '16px', borderRadius: '12px', textDecoration: 'none', fontWeight: 'bold' }}>See All 9 Jobs →</a>
      </div>
    </div>
  );
}
