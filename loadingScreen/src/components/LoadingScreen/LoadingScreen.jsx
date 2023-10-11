import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import './LoadingScreen.css'

const LoadingScreen = () => {
  const [count, setCount] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      if (count < 200) {
        setCount((prevCount) => prevCount + 4)
      }
    }, 80)

    return () => {
      clearInterval(interval)
    }
  }, [count])

  return (
    <div className='outer-container'>
      <motion.div
        className='inner-container'
        initial={{ width: 0, originX: 0 }}
        animate={{ width: `${count / 2}%` }}
      >
        <AnimatePresence mode='sync'>
          <motion.div
            key={count}
            className='load-percent'
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.08 }}
          >
            {count / 2}
          </motion.div>
        </AnimatePresence>
      </motion.div>
    </div>
  )
}

export default LoadingScreen
