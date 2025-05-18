
import { useState } from 'react'

export default function Home() {
  const [email, setEmail] = useState('')
  const [website, setWebsite] = useState('')
  const [links, setLinks] = useState([''])

  const handleSubmit = async (e) => {
    e.preventDefault()
    const res = await fetch('/api/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, website, links })
    })
    alert('Submitted!')
  }

  return (
    <div style={{ padding: 40 }}>
      <h1>Join LinkVault AI (Free Tier)</h1>
      <form onSubmit={handleSubmit}>
        <input placeholder='Your Email' value={email} onChange={(e) => setEmail(e.target.value)} /><br /><br />
        <input placeholder='Your Website' value={website} onChange={(e) => setWebsite(e.target.value)} /><br /><br />
        {links.map((link, idx) => (
          <input key={idx} placeholder={`Affiliate Link ${idx + 1}`} value={link} onChange={(e) => {
            const newLinks = [...links]
            newLinks[idx] = e.target.value
            setLinks(newLinks)
          }} /><br />
        ))}
        <button type='button' onClick={() => setLinks([...links, ''])}>+ Add Link</button><br /><br />
        <button type='submit'>Submit</button>
      </form>
    </div>
  )
}
