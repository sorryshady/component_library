import React from 'react'
import styles from './Images.module.css'
import { motion } from 'framer-motion'
import Image from '../../assets/image.jpg'
const Images = ({ index, direction, style }) => {
  const variant = {
    initial: {
      translateY: '100svh',
    },
    animate: {
      translateY: '0',
    },
  }
  const alternateVariant = {
    initial: {
      translateY: '-100svh',
    },
    animate: {
      translateY: '0',
    },
  }
  return (
    <>
      <motion.div
        variants={direction === 'down' ? variant : alternateVariant}
        initial='initial'
        animate='animate'
        style={{ ...style }}
        transition={{ duration: 0.6, delay: index * 0.3 }}
        className={styles.imgContainer}
      >
        <img src={Image} alt='random image' />
      </motion.div>
    </>
  )
}

export default Images
