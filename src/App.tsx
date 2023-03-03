import './App.css'
import { create } from 'zustand'
import { useEffect, useState } from 'react'
import Controls from './components/controls'

export const useMoleStore = create((set) => ({
  running: false,
  size: 3,
  toggleRun: () => set((state: any) => ({ running: !state.running })),
  setSize: (size: any) => set({ size }),
}))

function App() {
  const [position, setPosition] = useState(0)
  const [points, setPoints] = useState(0)
  const [lastMove, setLastMove] = useState('')
  const [wacks, setWacks] = useState(0)

  const isRunning = useMoleStore((state: any) => state.running)
  const isGridSize = useMoleStore((state: any) => state.size)


  useEffect(() => {
    const timerId = setInterval(() => {
      if (isRunning) {
        setPosition(Math.floor(Math.random() * (isGridSize * isGridSize) + 1))
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
    setWacks(wacks + 1)
    if (num == position) {
      setPoints(points + 1)
      setLastMove("1 point to Gryffindor")
    }
    else {
      setLastMove("Wacked and failed!")
    }
  }

  const rows: any = [];

  for (let i = 1; i <= isGridSize * isGridSize; i++) {
    rows.push(<button key={"wack-" + i} className={position == i ? 'active' : ''} onClick={() => wackIt(i)}></button>);
  }

  let frs = "";
  for (let i = 0; i < isGridSize; i++) {
    frs += "1fr ";
  }
  let gridLayoutCss = {
    gridTemplateColumns: frs,
    width: isGridSize * 50,
    height: isGridSize * 50
  }

  return (
    <div className="App">
      <h1>Wack a mole <br />Points: {points} ({wacks} wacks)</h1>
      <h3>Currently {isRunning ? 'running' : 'not running'}</h3>
      <Controls />
      <div className="grid" style={gridLayoutCss}>
        {rows}
      </div>

      <h1 className={lastMove == "1 point to Gryffindor" ? 'lastMove green' : 'lastMove red'}>
        {lastMove != "" ? lastMove : ''}
      </h1>

    </div >
  )
}

export default App
