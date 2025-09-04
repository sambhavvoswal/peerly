import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import homeImage from './components/home.jpg'

function App() {
  const [email, setEmail] = useState("")
  const [message, setMessage] = useState("")
  const [submitting, setSubmitting] = useState(false)
  const [hasJoined, setHasJoined] = useState(false)

  const normalizeEmail = (v) => (v || "").trim().toLowerCase()

  // On mount, check if the user has already joined previously (same browser)
  useEffect(() => {
    const storedEmail = localStorage.getItem('waitlisted_email')
    if (storedEmail) {
      setHasJoined(true)
      setEmail(storedEmail)
      setMessage("✅ You’re already on the waiting list with this email.")
    }
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setMessage("")
    setSubmitting(true)

    try {
      const endpoint = import.meta.env.VITE_GAS_URL
      if (!endpoint) {
        throw new Error("Missing VITE_GAS_URL env var. Add it to your .env.local")
      }
      const normalized = normalizeEmail(email)
      const localKey = `waitlisted:${normalized}`

      // Prevent duplicate submission from the same browser
      if (localStorage.getItem(localKey)) {
        setMessage("✅ You’re already on the waiting list with this email.")
        setHasJoined(true)
        return
      }
      const params = new URLSearchParams()
      params.append("email", normalized)

      const res = await fetch(endpoint, {
        method: "POST",
        body: params,
      })

      const data = await res.json()
      if (data.result === "success" || data.result === "exists" || data.result === "duplicate") {
        if (data.result === "success") {
          setMessage("✅ You’ve been added to the waiting list!")
        } else {
          setMessage("✅ You’re already on the waiting list with this email.")
        }
        // Mark as waitlisted locally to prevent re-submissions
        localStorage.setItem(localKey, "1")
        localStorage.setItem('waitlisted_email', normalized)
        setHasJoined(true)
        setEmail(normalized)
      } else {
        throw new Error(data.error || "Unknown error")
      }
    } catch (err) {
      setMessage(`❌ Error: ${err.message}`)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <>
    <section
      className="relative w-screen h-screen bg-cover bg-center flex flex-col"
      style={{ backgroundImage: `url(${homeImage})` }}
    >
      {/* Logo top-left */}
      <div className="absolute top-6 left-6 z-20">
        <span className="text-violet-400 font-montserrat font-semibold text-3xl tracking-tight">Peerly</span>
      </div>

      {/* Centered hero content */}
      <div className="flex flex-col items-center justify-center h-full w-full px-4 z-10">
        <h1 className="text-white font-montserrat font-bold text-4xl sm:text-6xl md:text-7xl text-center mb-6 drop-shadow-lg">
          Introducing Peerly
        </h1>
        <p className="text-white text-base sm:text-lg md:text-xl text-center max-w-2xl mb-8 opacity-90">
          Peerly connects students and professionals through peer-to-peer sessions. Share your skills, get help when you're stuck, and grow in a community that believes knowledge gets stronger when it's shared.
        </p>
        {/* Waitlist form (hidden if already joined) */}
          {!hasJoined && (
            <form
              id="waitlist-form"
              onSubmit={handleSubmit}
              className="flex flex-col sm:flex-row items-center gap-4 w-full max-w-xl"
            >
              <input
                type="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                disabled={submitting}
                className="w-full sm:w-1/2 px-6 py-2 rounded-lg bg-gradient-to-r from-[#232b3a] to-[#1a2232] border-2 border-transparent focus:border-violet-500 text-white font-semibold text-base shadow-lg focus:shadow-violet-500/50 placeholder:text-white placeholder:opacity-80 transition-all duration-300"
                style={{ boxShadow: '0 0 12px 2px #a78bfa, 0 0 24px 4px #8b5cf6' }}
              />
              <button
                type="submit"
                disabled={submitting}
                className="px-6 py-3 rounded-lg bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white font-semibold shadow-md hover:scale-105 transition-transform disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {submitting ? 'Submitting…' : 'Join the waitlist'}
              </button>
            </form>
          )}
          {/* Message */}
          {message && !hasJoined && (
            <div id="message" className={`mt-4 text-sm ${message.startsWith('✅') ? 'text-green-400' : 'text-red-400'}`}>
              {message}
            </div>
          )}
          {hasJoined && (
            <div id="message" className="mt-4 text-center text-white font-montserrat font-semibold text-2xl sm:text-3xl md:text-4xl drop-shadow-lg">
              {message || '✅ You’re already on the waiting list with this email.'}
            </div>
          )}
      </div>
    </section>
    </>
  )
}

export default App
