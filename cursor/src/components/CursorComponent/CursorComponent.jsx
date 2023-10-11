import { motion } from 'framer-motion'
import './CursorComponent.css'

function CursorComponent({ mousePosition, hovering, text }) {
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
      <div className='content'>{text}</div>
    </motion.div>
  )
}

export default CursorComponent
