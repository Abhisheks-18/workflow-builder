import { create } from "zustand"
import { v4 as uuid } from "uuid"

interface NodeType {
  id: string
  position: { x: number; y: number }
  data: { label: string }
  type: string
}

interface EdgeType {
  id: string
  source: string
  target: string
}

interface WorkflowState {
  nodes: NodeType[]
  edges: EdgeType[]
  addTriggerNode: () => void
  addEdge: (source: string, target: string) => void
}

export const useWorkflowStore = create<WorkflowState>((set) => ({
  nodes: [
    {
      id: uuid(),
      position: { x: 250, y: 200 },
      data: { label: "Trigger Node" },
      type: "default",
    },
  ],

  edges: [],

  addTriggerNode: () =>
    set((state) => ({
      nodes: [
        ...state.nodes,
        {
          id: uuid(),
          position: {
            x: Math.random() * 600,
            y: Math.random() * 400,
          },
          data: { label: "Trigger Node" },
          type: "default",
        },
      ],
    })),

  addEdge: (source, target) =>
    set((state) => {
      const newEdge = {
        id: uuid(),
        source,
        target,
      }

      const newEdges = [...state.edges, newEdge]

      // ⭐ Cycle Detection Function
      const hasCycle = (nodeId: string, visited = new Set<string>()): boolean => {
        if (visited.has(nodeId)) return true

        visited.add(nodeId)

        const outgoingEdges = newEdges.filter(
          (edge) => edge.source === nodeId
        )

        for (const edge of outgoingEdges) {
          if (hasCycle(edge.target, new Set(visited))) {
            return true
          }
        }

        return false
      }

      if (hasCycle(source)) {
        alert("Cycle not allowed ❌")
        return state
      }

      return { edges: newEdges }
    }),
}))