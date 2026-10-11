import type { Project } from '../content/schemas';

type Diagram = NonNullable<Project['diagram']>;
export type Orientation = 'horizontal' | 'vertical';

export const NODE_W = 150;
export const NODE_H = 44;
const PAD = 8;
// Gap along the flow leaves room for edge labels; gap across it keeps lanes tight.
const FLOW_GAP = { horizontal: 72, vertical: 44 } as const;
const CROSS_GAP = { horizontal: 28, vertical: 24 } as const;

interface Point {
  x: number;
  y: number;
}

export interface PlacedNode {
  id: string;
  label: string;
  role: string;
  x: number;
  y: number;
}

export interface PlacedEdge {
  id: string;
  from: string;
  to: string;
  label?: string;
  start: Point;
  end: Point;
  path: string;
  labelAt: Point;
}

export interface DiagramLayout {
  width: number;
  height: number;
  nodes: PlacedNode[];
  edges: PlacedEdge[];
}

/**
 * Lays nodes out in lanes (the content's `col`) along the flow direction:
 * left to right when horizontal, top to bottom when vertical (for phones).
 * Nodes sharing a lane stack across the flow in content order.
 */
export function layoutDiagram(diagram: Diagram, orientation: Orientation): DiagramLayout {
  const lanes = [...new Set(diagram.nodes.map((n) => n.col))].sort((a, b) => a - b);
  const laneOf = new Map(diagram.nodes.map((n) => [n.id, lanes.indexOf(n.col)]));
  const slotOf = new Map<string, number>();
  const laneSizes = lanes.map(() => 0);
  for (const n of diagram.nodes) {
    const lane = laneOf.get(n.id)!;
    slotOf.set(n.id, laneSizes[lane]!);
    laneSizes[lane]! += 1;
  }
  const maxSlots = Math.max(...laneSizes);

  const flowStep = (orientation === 'horizontal' ? NODE_W : NODE_H) + FLOW_GAP[orientation];
  const crossStep = (orientation === 'horizontal' ? NODE_H : NODE_W) + CROSS_GAP[orientation];

  const nodes: PlacedNode[] = diagram.nodes.map((n) => {
    const lane = laneOf.get(n.id)!;
    // Vertical lanes are centred so a single node sits mid-screen; horizontal
    // lanes are top-aligned so the main path stays a straight line.
    const centring = orientation === 'vertical' ? ((maxSlots - laneSizes[lane]!) * crossStep) / 2 : 0;
    const flow = PAD + lane * flowStep;
    const cross = PAD + centring + slotOf.get(n.id)! * crossStep;
    return {
      id: n.id,
      label: n.label,
      role: n.role,
      ...(orientation === 'horizontal' ? { x: flow, y: cross } : { x: cross, y: flow }),
    };
  });

  const byId = new Map(nodes.map((n) => [n.id, n]));
  const edges = diagram.edges.map((e) => {
    const from = byId.get(e.from)!;
    const to = byId.get(e.to)!;
    const sameLane = laneOf.get(e.from) === laneOf.get(e.to);
    // Across lanes the edge follows the flow; within a lane it crosses it.
    const alongX = orientation === 'horizontal' ? !sameLane : sameLane;
    const [start, end] = alongX ? horizontalPorts(from, to) : verticalPorts(from, to);
    return {
      id: `${e.from}-${e.to}`,
      from: e.from,
      to: e.to,
      label: e.label,
      start,
      end,
      path: curve(start, end, alongX),
      labelAt: { x: (start.x + end.x) / 2, y: (start.y + end.y) / 2 },
    };
  });

  const span = (n: number, size: number, gap: number) => 2 * PAD + n * size + (n - 1) * gap;
  const width =
    orientation === 'horizontal'
      ? span(lanes.length, NODE_W, FLOW_GAP.horizontal)
      : span(maxSlots, NODE_W, CROSS_GAP.vertical);
  const height =
    orientation === 'horizontal'
      ? span(maxSlots, NODE_H, CROSS_GAP.horizontal)
      : span(lanes.length, NODE_H, FLOW_GAP.vertical);

  return { width, height, nodes, edges };
}

function horizontalPorts(from: PlacedNode, to: PlacedNode): [Point, Point] {
  const rightward = to.x >= from.x;
  return [
    { x: rightward ? from.x + NODE_W : from.x, y: from.y + NODE_H / 2 },
    { x: rightward ? to.x : to.x + NODE_W, y: to.y + NODE_H / 2 },
  ];
}

function verticalPorts(from: PlacedNode, to: PlacedNode): [Point, Point] {
  const downward = to.y >= from.y;
  return [
    { x: from.x + NODE_W / 2, y: downward ? from.y + NODE_H : from.y },
    { x: to.x + NODE_W / 2, y: downward ? to.y : to.y + NODE_H },
  ];
}

/** Cubic curve whose control points sit halfway along the main axis. */
function curve(s: Point, e: Point, alongX: boolean): string {
  if (alongX) {
    const mx = (s.x + e.x) / 2;
    return `M ${s.x} ${s.y} C ${mx} ${s.y}, ${mx} ${e.y}, ${e.x} ${e.y}`;
  }
  const my = (s.y + e.y) / 2;
  return `M ${s.x} ${s.y} C ${s.x} ${my}, ${e.x} ${my}, ${e.x} ${e.y}`;
}
