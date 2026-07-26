import { useState, useEffect } from 'react'
const API_URL = 'https://craftsure-1.onrender.com'

export default function Jobs() {
  const [jobs, setJobs] = useState([])
  const [title, setTitle] = useState('')
  const [budget, setBudget] = useState('')
  const [description, setDescription] = useState('')
  const [loading, setLoading] = useState(false)

  const fetchJobs = async () => {
    const res = await fetch(`${API_URL}/api/jobs`)
    const data = await res.json()
    setJobs(data)
  }

  useEffect(() => { fetchJobs() }, [])

  const handlePost = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const token = localStorage.getItem('token')
      const res = await fetch(`${API_URL}/api/jobs`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ title, description, budget })
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.message)
      alert('Job posted!')
      setTitle(''); setBudget(''); setDescription('')
      fetchJobs()
    } catch (err) {
      alert(err.message)
    }
    setLoading(false)
  }

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
      <h1>Jobs - Nigeria Marketplace</h1>
      <form onSubmit={handlePost} style={{ border: '1px solid #ddd', padding: '15px', borderRadius: '8px', marginBottom: '20px' }}>
        <h3>Post New Job</h3>
        <input value={title} onChange={e=>setTitle(e.target.value)} placeholder="Title e.g. Fix my sink" required style={{ width:'100%', padding:'8px', marginBottom:'8px' }}/>
        <input value={budget} onChange={e=>setBudget(e.target.value)} placeholder="Budget in Naira e.g. 5000" type="number" required style={{ width:'100%', padding:'8px', marginBottom:'8px' }}/>
        <textarea value={description} onChange={e=>setDescription(e.target.value)} placeholder="Description" required style={{ width:'100%', padding:'8px', marginBottom:'8px' }}/>
        <button type="submit" disabled={loading} style={{ width:'100%', padding:'10px', background:'#7c3aed', color:'white' }}>{loading? 'Posting...' : 'Post Job'}</button>
      </form>
      <h3>All Jobs ({jobs.length})</h3>
      {jobs.map(job=>(
        <div key={job._id} style={{ border:'1px solid #eee', padding:'10px', marginBottom:'10px' }}>
          <b>{job.title}</b> - ₦{job.budget}<br/>{job.description}
        </div>
      ))}
    </div>
  )
}
