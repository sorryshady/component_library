import './App.css'
import CursorComponent from './components/CursorComponent/CursorComponent'
import { useCursor } from './hooks/useCursor'

function App() {
  const {
    mousePosition,
    hovering,
    handleMouseEnter,
    handleMouseLeave,
    hoveredText,
  } = useCursor()

  return (
    <>
      <div
        className='title'
        data-text='explore'
        onMouseEnter={(e) => handleMouseEnter(e)}
        onMouseLeave={handleMouseLeave}
      >
        <h2>explore</h2>
      </div>
      <div
        className='title'
        data-text='shop now'
        onMouseEnter={(e) => handleMouseEnter(e)}
        onMouseLeave={handleMouseLeave}
      >
        <h2>shop now</h2>
      </div>
      <CursorComponent
        mousePosition={mousePosition}
        hovering={hovering}
        text={hoveredText} // Use the hoveredText value from the custom hook
      />
    </>
  )
}

export default App
