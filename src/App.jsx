import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import homeImage from './components/home.jpg'

function App() {
  const [count, setCount] = useState(0)

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
        {/* <form className="flex flex-col sm:flex-row items-center gap-4 w-full max-w-xl">
          <input
            type="email"
            placeholder="Enter your email"
            className="bg-transparent backdrop-blur-lg bg-opacity-10 w-full sm:w-2/3 px-6 py-3 rounded-lg border border-violet-400 text-violet-400 focus:outline-none focus:ring-2 focus:ring-violet-500 uppercase placeholder:text-white"
          />
          <button
            type="submit"
            className="px-6 py-3 rounded-lg bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white font-semibold shadow-md hover:scale-105 transition-transform"
          >
            Join the waitlist
          </button>
        </form> */}
          <form className="flex flex-col sm:flex-row items-center gap-4 w-full max-w-xl">
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full sm:w-1/2 px-6 py-2 rounded-lg bg-gradient-to-r from-[#232b3a] to-[#1a2232] border-2 border-transparent focus:border-violet-500 text-white font-semibold text-base shadow-lg focus:shadow-violet-500/50 placeholder:text-white placeholder:opacity-80 transition-all duration-300"
              style={{ boxShadow: '0 0 12px 2px #a78bfa, 0 0 24px 4px #8b5cf6' }}
            />
            <button
              type="submit"
              className="px-6 py-3 rounded-lg bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white font-semibold shadow-md hover:scale-105 transition-transform"
            >
              Join the waitlist
            </button>
          </form>
      </div>
    </section>
    </>
  )
}

export default App
