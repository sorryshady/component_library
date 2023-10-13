import React, { useState } from 'react'
import './Navbar.css'
import { motion, useMotionValueEvent, useScroll } from 'framer-motion'
import ScrollProgress from '../ScrollProgress/ScrollProgress'
const Navbar = () => {
  const { scrollY } = useScroll()

  useMotionValueEvent(scrollY, 'change', (latest) => {
    const previous = scrollY.getPrevious()
    if (latest > previous && latest > 150) {
      setHidden(true)
    } else {
      setHidden(false)
    }
  })

  const [hidden, setHidden] = useState(false)
  return (
    <>
      <motion.div
        variants={{
          visible: { y: 0 },
          hidden: { y: '-95%' },
        }}
        animate={hidden ? 'hidden' : 'visible'}
        transition={{ duration: 0.35, ease: 'easeInOut' }}
        className='nav-container'
      >
        <nav className='container'>
          <div className='logo'>Company logo</div>
          <ul className='action-section'>
            <li className='nav-link'>Sign In</li>
            <li className='nav-link'>Pricing</li>
            <li className='nav-link'>About Us</li>
          </ul>
        </nav>
        <ScrollProgress />
      </motion.div>
    </>
  )
}

export default Navbar



