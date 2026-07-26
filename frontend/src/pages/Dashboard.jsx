import { useEffect, useState } from 'react'

export default function Dashboard() {
  const [user, setUser] = useState(null)
  
  useEffect(() => {
    const storedUser = localStorage.getItem('user')
    if (storedUser) setUser(JSON.parse(storedUser))
  }, [])

  return (
    <div style={{ padding: '20px' }}>
      <h1>Dashboard</h1>
      {user ? (
        <div>
          <h2>Welcome, {user.name}! 🎉</h2>
          <p>Email: {user.email}</p>
          <p>Role: {user.role}</p>
          <p style={{ marginTop: 20, color: 'green' }}>
            ✅ CraftSure is LIVE! Backend + Frontend connected!
          </p>
        </div>
      ) : (
        <p>Loading user... If blank for long, you are not logged in — go Login again.</p>
      )}
      <div style={{ marginTop: 30 }}>
        <a href="/jobs" style={{ background: '#7c3aed', color: 'white', padding: '10px 20px', borderRadius: '8px' }}>Go to Jobs</a>
      </div>
    </div>
  )
}
