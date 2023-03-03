import { useMoleStore } from "../App";

function Controls() {
  const toggleRun = useMoleStore((state: any) => state.toggleRun)
  const gridSize = useMoleStore((state: any) => state.size)
  const setSize = useMoleStore((state: any) => state.setSize)


  return (
    <>
      <div className="controls">
        <button onClick={toggleRun}>Run/Pause</button>
        <div className="control-group">
          <label>Grid size:</label>
          <input id="grid-size" type="number" value={gridSize} onChange={(e) => setSize(e.target.value != "" ? e.target.value : 3)} />
        </div>
      </div>

    </>
  );
}

export default Controls;