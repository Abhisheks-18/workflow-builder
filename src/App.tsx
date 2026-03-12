import WorkflowCanvas from "./workflow/WorkflowCanvas"
import { useWorkflowStore } from "./workflow/store/workflowStore"

function App() {
  const addTrigger = useWorkflowStore((s) => s.addTrigger)
  const addAction = useWorkflowStore((s) => s.addAction)
  const selectedNode = useWorkflowStore((s) => s.selectedNode)
  const nodes = useWorkflowStore((s) => s.nodes)
  const edges = useWorkflowStore((s) => s.edges)

  const saveWorkflow = () => {
    const data = {
      nodes,
      edges,
    }

    const json = JSON.stringify(data, null, 2)

    const blob = new Blob([json], { type: "application/json" })
    const url = URL.createObjectURL(blob)

    const a = document.createElement("a")
    a.href = url
    a.download = "workflow.json"
    a.click()
  }

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      
      {/* LEFT PANEL */}
      <div
        style={{
          width: 220,
          padding: 20,
          background: "#1e1e1e",
          color: "white",
        }}
      >
        <h3>Node Library</h3>

        <button
          style={{ width: "100%", marginBottom: 10 }}
          onClick={addTrigger}
        >
          Add Trigger
        </button>

        <button
          style={{ width: "100%", marginBottom: 10 }}
          onClick={addAction}
        >
          Add Action
        </button>

        <button
          style={{ width: "100%" }}
          onClick={saveWorkflow}
        >
          Save Workflow
        </button>
      </div>

      {/* CANVAS */}
      <div style={{ flex: 1 }}>
        <WorkflowCanvas />
      </div>

      {/* RIGHT PANEL */}
      <div
        style={{
          width: 260,
          padding: 20,
          background: "#1e1e1e",
          color: "white",
        }}
      >
        <h3>Configuration Panel</h3>

        {selectedNode ? (
          <div>
            <p><b>ID:</b> {selectedNode.id}</p>
            <p><b>Label:</b> {selectedNode.data?.label}</p>
            <p><b>X:</b> {selectedNode.position.x.toFixed(0)}</p>
            <p><b>Y:</b> {selectedNode.position.y.toFixed(0)}</p>
          </div>
        ) : (
          <p>Select a node</p>
        )}
      </div>
    </div>
  )
}

export default App