import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import homeImage from './components/home.jpg'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
  <section className="relative w-screen h-screen bg-cover bg-center" style={{ backgroundImage: `url('/home.jpg')` }}>
        <h1
          className="absolute top-8 left-8 text-white font-montserrat font-semibold m-0 z-20"
          style={{ fontSize: 'clamp(2rem, 5vw, 4rem)' }}
        >
          Peerly
        </h1>
      </section>
    </>
  )
}

export default App
