import './App.css'
import { create } from 'zustand'
import { useEffect, useState } from 'react'

export const useMoleStore = create((set) => ({
  running: false,
  toggleRun: () => set((state: any) => ({ running: !state.running })),
}))

function App() {
  const [position, setPosition] = useState(0)
  const [points, setPoints] = useState(0)
  const [lastMove, setLastMove] = useState('')

  const isRunning = useMoleStore((state: any) => state.running)
  const toggleRun = useMoleStore((state: any) => state.toggleRun)


  useEffect(() => {
    const timerId = setInterval(() => {
      if (isRunning) {
        setPosition(Math.floor(Math.random() * 9 + 1))
      }
      else {
        setPosition(0)
      }
    }, 200);
    return () => clearInterval(timerId);
  }, [isRunning, position]);

  useEffect(() => {
    const timerId = setInterval(() => {
      setLastMove("");
    }, 200);
    return () => clearInterval(timerId);
  }, [lastMove]);

  function wackIt(num: number) {
    if (num == position) {
      console.log("1 point to Gryffindor");
      setPoints(points + 1)
      setLastMove("1 point to Gryffindor")
    }
    else {
      console.log("Wacked and failed!")
      setLastMove("Wacked and failed!")
    }
  }


  return (
    <div className="App">
      <h1>Wack a mole <br />Points: ({points})</h1>
      <h3>Currently {isRunning ? 'running' : 'not running'}</h3>
      <button onClick={toggleRun}>Run/Pause</button>
      <div className="grid">
        <button className={position == 1 ? 'active' : ''} onClick={() => wackIt(1)}></button>
        <button className={position == 2 ? 'active' : ''} onClick={() => wackIt(2)}></button>
        <button className={position == 3 ? 'active' : ''} onClick={() => wackIt(3)}></button>
        <button className={position == 4 ? 'active' : ''} onClick={() => wackIt(4)}></button>
        <button className={position == 5 ? 'active' : ''} onClick={() => wackIt(5)}></button>
        <button className={position == 6 ? 'active' : ''} onClick={() => wackIt(6)}></button>
        <button className={position == 7 ? 'active' : ''} onClick={() => wackIt(7)}></button>
        <button className={position == 8 ? 'active' : ''} onClick={() => wackIt(8)}></button>
        <button className={position == 9 ? 'active' : ''} onClick={() => wackIt(9)}></button>
      </div>

      <h1 className={lastMove == "1 point to Gryffindor" ? 'lastMove green' : 'lastMove red'}>
        {lastMove != "" ? lastMove : ''}
      </h1>

    </div>
  )
}

export default App
