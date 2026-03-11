import ReactFlow, {
  Background,
  Controls,
} from "reactflow"
import "reactflow/dist/style.css"
import { useWorkflowStore } from "./store/workflowStore"

export default function WorkflowCanvas() {

  const nodes = useWorkflowStore((state) => state.nodes)
  const edges = useWorkflowStore((state) => state.edges)
  const addEdge = useWorkflowStore((state) => state.addEdge)

  const onConnect = (connection: any) => {
    if (connection.source && connection.target) {
      addEdge(connection.source, connection.target)
    }
  }

  return (
    <div style={{ width: "100%", height: "100%" }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onConnect={onConnect}
        fitView
      >
        <Background />
        <Controls />
      </ReactFlow>
    </div>
  )
}