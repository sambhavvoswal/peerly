import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import homeImage from './components/home.jpg'
import Home from './components/Home'
import Hero from './components/Hero'
import CollectData from './components/CollectData'

function App() {
  const [email, setEmail] = useState("")
  const [message, setMessage] = useState("")
  const [submitting, setSubmitting] = useState(false)
  const [hasJoined, setHasJoined] = useState(false)
  const [overlayActive, setOverlayActive] = useState(false)

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

  // Activate/deactivate overlay based on scroll position
  useEffect(() => {
    const onScroll = () => {
      const isActive = window.scrollY > 40
      setOverlayActive(isActive)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
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
     {/* <Home /> */}
     {!overlayActive && (
       <Hero onActivate={() => {
         setOverlayActive(true)
         try { window.scrollTo({ top: 60, behavior: 'smooth' }) } catch {}
       }} />
     )}
     <CollectData
       active={overlayActive}
       onClose={() => {
         setOverlayActive(false)
         try { window.scrollTo({ top: 0, behavior: 'smooth' }) } catch {}
       }}
     />
    </>
  )
}

export default App
