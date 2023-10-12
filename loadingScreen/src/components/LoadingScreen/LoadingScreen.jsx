import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import './LoadingScreen.css'

const LoadingScreen = () => {
  const [width, setWidth] = useState(0)
  const [count, setCount] = useState(8)

  useEffect(() => {
    const interval = setInterval(() => {
      if (width < 50) {
        setWidth((prevWidth) => prevWidth + 10)
      }
      if (width < 100) {
        setWidth((prevWidth) => prevWidth + 4)
      }
      if (width > 50 && count < 96) {
        setCount((prevCount) => prevCount + 8)
      }
      if (count === 96) {
        setCount((prevCount) => prevCount + 4)
      }
    }, 150)

    return () => {
      clearInterval(interval)
    }
  }, [width, count])

  return (
    <div className='outer-container'>
      <motion.div
        className='inner-container'
        initial={{ width: 0, originX: 0 }}
        animate={{ width: `${width}%` }}
      >
        {count === 100 && (
          <div className='logo-container'>
            <AnimatePresence mode='sync'>
              <motion.div
                className='logo'
                key='logo'
                initial={{ y: 20 }}
                animate={{ y: 0 }}
                exit={{ y: -20 }}
              >
                N
              </motion.div>
              <motion.div
                className='logo-text'
                key='firstLine'
                initial={{ y: 20 }}
                animate={{ y: 0 }}
                exit={{ y: -20 }}
              >
                Get comfortable
              </motion.div>
              <motion.div
                className='logo-text'
                key='secondLine'
                initial={{ y: 20 }}
                animate={{ y: 0 }}
                exit={{ y: -20 }}
              >
                here we come
              </motion.div>
            </AnimatePresence>
          </div>
        )}
        {width > 50 && (
          <AnimatePresence mode='sync'>
            <motion.div
              key={width}
              className='load-percent'
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.15 }}
            >
              {count}
            </motion.div>
          </AnimatePresence>
        )}
      </motion.div>
    </div>
  )
}

export default LoadingScreen
