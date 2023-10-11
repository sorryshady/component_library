import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import './App.css'

function App() {
  const [mousePosition, setMousePosition] = useState({
    x: 0,
    y: 0,
  })

  useEffect(() => {
    const mouseMove = (e) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY,
      })
    }

    window.addEventListener('mousemove', mouseMove)
    return () => {
      window.removeEventListener('mousemove', mouseMove)
    }
  })
  const [hovering, setHovering] = useState(false)
  const handleMouseEnter = () => {
    setHovering(true)
  }
  const handleMouseLeave = () => {
    setHovering(false)
  }
  const variants = {
    default: {
      x: mousePosition.x,
      y: mousePosition.y,
    },
  }
  return (
    <>
      <div
        className='title'
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <h1>This is cursor sample project</h1>
      </div>
      <motion.div
        className={`cursor ${hovering ? 'enter' : ''}`}
        variants={variants}
        animate='default'
      />
    </>
  )
}

export default App
