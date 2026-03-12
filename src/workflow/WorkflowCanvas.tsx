import ReactFlow, {
  Background,
  Controls,
} from "reactflow"
import type { Connection, Node } from "reactflow"
import "reactflow/dist/style.css"
import { useWorkflowStore } from "./store/workflowStore"

export default function WorkflowCanvas() {
  const nodes = useWorkflowStore((s) => s.nodes)
  const edges = useWorkflowStore((s) => s.edges)

  const addEdge = useWorkflowStore((s) => s.addEdge)
  const deleteNode = useWorkflowStore((s) => s.deleteNode)
  const selectNode = useWorkflowStore((s) => s.selectNode)

  const onConnect = (connection: Connection) => {
    if (connection.source && connection.target) {
      addEdge(connection.source, connection.target)
    }
  }

  const onNodeDoubleClick = (_: any, node: Node) => {
    deleteNode(node.id)
  }

  const onNodeClick = (_: any, node: Node) => {
    selectNode(node)
  }

  return (
    <div style={{ width: "100%", height: "100%" }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onConnect={onConnect}
        onNodeDoubleClick={onNodeDoubleClick}
        onNodeClick={onNodeClick}
        fitView
      >
        <Background />
        <Controls />
      </ReactFlow>
    </div>
  )
}