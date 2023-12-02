import React from 'react'
import styles from './LoadingScreen.module.css'
import { motion } from 'framer-motion'
import Images from '../Images/Images'

const variantOne = {
  initial: {
    y: '100svh',
  },
  animate: {
    y: '-133svh',
    transition: {
      duration: 3,
    },
  },
}
const variantTwo = {
  initial: {
    y: '-133svh',
  },
  animate: {
    y: '100svh',
    transition: {
      duration: 3,
    },
  },
}

const LoadingScreen = () => {
  const arr = [1, 2, 3, 4]
  return (
    <>
      <div className={styles.container}>
        <motion.div
          variants={variantOne}
          initial='initial'
          animate='animate'
          className={`${styles.child} ${styles.one}`}
        >
          {arr.map((item, index) => (
            <Images
              key={index}
              index={index}
              direction={'down'}
              style={{ order: index }}
            />
          ))}
        </motion.div>
        <motion.div
          variants={variantTwo}
          initial='initial'
          animate='animate'
          className={`${styles.child} ${styles.two}`}
        >
          {arr.map((item, index) => (
            <Images
              key={index}
              index={index}
              direction={'up'}
              style={{ order: arr.length - index }}
            />
          ))}
        </motion.div>
        <motion.div
          variants={variantOne}
          initial='initial'
          animate='animate'
          className={`${styles.child} ${styles.three}`}
        >
          {arr.map((item, index) => (
            <Images
              key={index}
              index={index}
              direction={'down'}
              style={{ order: index }}
            />
          ))}
        </motion.div>
      </div>
    </>
  )
}

export default LoadingScreen
