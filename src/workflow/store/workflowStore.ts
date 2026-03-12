import { create } from "zustand"
import type { Node, Edge } from "reactflow"
import { v4 as uuid } from "uuid"

interface WorkflowState {
  nodes: Node[]
  edges: Edge[]
  selectedNode: Node | null

  addTrigger: () => void
  addAction: () => void
  addEdge: (source: string, target: string) => void
  deleteNode: (id: string) => void
  selectNode: (node: Node) => void
}

export const useWorkflowStore = create<WorkflowState>((set, get) => ({
  nodes: [
    {
      id: uuid(),
      position: { x: 250, y: 150 },
      data: { label: "Trigger Node" },
      type: "default",
    },
  ],

  edges: [],

  selectedNode: null,

  addTrigger: () =>
    set((state) => ({
      nodes: [
        ...state.nodes,
        {
          id: uuid(),
          position: {
            x: Math.random() * 400,
            y: Math.random() * 400,
          },
          data: { label: "Trigger Node" },
          type: "default",
        },
      ],
    })),

  addAction: () =>
    set((state) => ({
      nodes: [
        ...state.nodes,
        {
          id: uuid(),
          position: {
            x: Math.random() * 400,
            y: Math.random() * 400,
          },
          data: { label: "Action Node" },
          type: "default",
        },
      ],
    })),

  addEdge: (source, target) =>
    set((state) => ({
      edges: [
        ...state.edges,
        {
          id: uuid(),
          source,
          target,
          type: "smoothstep",
        },
      ],
    })),

  deleteNode: (id) =>
    set((state) => ({
      nodes: state.nodes.filter((n) => n.id !== id),
      edges: state.edges.filter(
        (e) => e.source !== id && e.target !== id
      ),
    })),

  selectNode: (node) =>
    set({
      selectedNode: node,
    }),
}))