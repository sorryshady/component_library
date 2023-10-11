import './App.css'
import CursorComponent from './components/CursorComponent/CursorComponent'
import { useCursor } from './hooks/useCursor'

function App() {
  const { mousePosition, hovering, handleMouseEnter, handleMouseLeave } =
    useCursor()
  return (
    <>
      <div
        className='title'
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <h1>This is cursor sample project</h1>
      </div>
      <CursorComponent mousePosition={mousePosition} hovering={hovering} />
    </>
  )
}

export default App
