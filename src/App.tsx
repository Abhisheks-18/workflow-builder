import WorkflowCanvas from "./workflow/WorkflowCanvas"
import { useWorkflowStore } from "./workflow/store/workflowStore"

function App() {

  const addTriggerNode = useWorkflowStore((state) => state.addTriggerNode)

  return (
    <div style={{ display: "flex", height: "100vh" }}>

      {/* LEFT PANEL */}
      <div
        style={{
          width: "250px",
          borderRight: "1px solid gray",
          padding: 10,
        }}
      >
        <h3>Node Library</h3>

        <button onClick={addTriggerNode}>Add Trigger</button>

        <button>Add Action</button>
      </div>

      {/* CANVAS */}
      <div style={{ flex: 1, height: "100vh" }}>
        <WorkflowCanvas />
      </div>

      {/* RIGHT PANEL */}
      <div
        style={{
          width: "300px",
          borderLeft: "1px solid gray",
          padding: 10,
        }}
      >
        <h3>Configuration Panel</h3>
      </div>

    </div>
  )
}

export default App