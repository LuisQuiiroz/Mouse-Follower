import { useEffect, useState } from 'react'
import './App.css'

function App () {
  const [enabled, setEnabled] = useState(false)
  const [position, setPosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMove = (event) => {
      const { clientX, clientY } = event
      setPosition({ x: clientX, y: clientY })
    }
    if (enabled) {
      window.addEventListener('pointermove', handleMove)
      // cleanup:
      // -> cuando el componente se desmonta
      // -> cuando cambian las dependencias, antes de ejecutar
      //    el efecto de nuevo
      return () => { // cleanup method
        console.log('cleaup')
        window.removeEventListener('pointermove', handleMove)
      }
    }
  }, [enabled])

  useEffect(() => {
    document.body.classList.toggle('no-cursor', enabled)

    return () => {
      document.body.classList.remove('no-cursor')
    }
  }, [enabled])

  const handleClick = () => {
    setEnabled(!enabled)
    setPosition({ x: -50, y: -50 })
  }
  return (
    <>
      <div style={{
        position: 'absolute',
        backgroundColor: 'transparent',
        border: '1px solid #fff',
        borderRadius: '50%',
        opacity: 0.8,
        pointerEvents: 'none',
        left: -25,
        top: -25,
        width: 50,
        height: 50,
        transform: `translate(${position.x}px, ${position.y}px)`
      }}
      />
      <button onClick={handleClick}>
        {enabled ? 'Desactivar' : 'Activar'} seguir puntero
      </button>
    </>
  )
}

export default App
