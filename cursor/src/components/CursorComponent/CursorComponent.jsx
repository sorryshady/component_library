import { motion } from 'framer-motion'
import './CursorComponent.css'

function CursorComponent({ mousePosition, hovering }) {
  const variants = {
    default: {
      x: mousePosition.x,
      y: mousePosition.y,
    },
  }

  return (
    <motion.div
      className={`cursor ${hovering ? 'enter' : ''}`}
      variants={variants}
      animate='default'
    >
      <div className='content'>Loading...</div>
    </motion.div>
  )
}

export default CursorComponent
