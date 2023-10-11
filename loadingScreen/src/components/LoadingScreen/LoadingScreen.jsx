import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import './LoadingScreen.css'

const LoadingScreen = () => {
  const [count, setCount] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      if (count < 100) {
        setCount((prevCount) => prevCount + 5)
      }
    }, 100)

    return () => {
      clearInterval(interval)
    }
  }, [count])

  return (
    <div className='outer-container'>
      <div className='inner-container'>
        <AnimatePresence mode='sync'>
          <motion.div
            key={count}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.1 }}
            className='load-percent'
          >
            {count}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}

export default LoadingScreen
