import { describe, expect, it } from 'vitest';
import { layoutDiagram, NODE_H, NODE_W } from '../../src/lib/diagram';

const diagram = {
  nodes: [
    { id: 'a', label: 'A', role: 'ra', col: 0 },
    { id: 'b', label: 'B', role: 'rb', col: 1 },
    { id: 'c', label: 'C', role: 'rc', col: 1 },
    { id: 'd', label: 'D', role: 'rd', col: 2 },
  ],
  edges: [
    { from: 'a', to: 'b', label: 'x' },
    { from: 'b', to: 'c' },
    { from: 'c', to: 'd' },
  ],
};

const overlaps = (r1: { x: number; y: number }, r2: { x: number; y: number }) =>
  r1.x < r2.x + NODE_W && r2.x < r1.x + NODE_W && r1.y < r2.y + NODE_H && r2.y < r1.y + NODE_H;

describe('layoutDiagram', () => {
  for (const orientation of ['horizontal', 'vertical'] as const) {
    describe(orientation, () => {
      const layout = layoutDiagram(diagram, orientation);

      it('places every node and edge', () => {
        expect(layout.nodes.map((n) => n.id)).toEqual(['a', 'b', 'c', 'd']);
        expect(layout.edges.map((e) => e.id)).toEqual(['a-b', 'b-c', 'c-d']);
      });

      it('never overlaps nodes', () => {
        for (const n1 of layout.nodes)
          for (const n2 of layout.nodes) if (n1 !== n2) expect(overlaps(n1, n2), `${n1.id}/${n2.id}`).toBe(false);
      });

      it('keeps every node inside the canvas', () => {
        for (const n of layout.nodes) {
          expect(n.x).toBeGreaterThanOrEqual(0);
          expect(n.y).toBeGreaterThanOrEqual(0);
          expect(n.x + NODE_W).toBeLessThanOrEqual(layout.width);
          expect(n.y + NODE_H).toBeLessThanOrEqual(layout.height);
        }
      });

      it('starts each edge on its source box and ends on its target box', () => {
        const byId = Object.fromEntries(layout.nodes.map((n) => [n.id, n]));
        const onBorder = (p: { x: number; y: number }, n: { x: number; y: number }) =>
          (p.x === n.x || p.x === n.x + NODE_W || p.y === n.y || p.y === n.y + NODE_H) &&
          p.x >= n.x &&
          p.x <= n.x + NODE_W &&
          p.y >= n.y &&
          p.y <= n.y + NODE_H;
        for (const e of layout.edges) {
          expect(onBorder(e.start, byId[e.from]!), `${e.id} start`).toBe(true);
          expect(onBorder(e.end, byId[e.to]!), `${e.id} end`).toBe(true);
        }
      });
    });
  }

  it('flows left to right horizontally and top to bottom vertically', () => {
    const h = layoutDiagram(diagram, 'horizontal');
    const v = layoutDiagram(diagram, 'vertical');
    const hx = Object.fromEntries(h.nodes.map((n) => [n.id, n]));
    const vy = Object.fromEntries(v.nodes.map((n) => [n.id, n]));
    expect(hx.a!.x).toBeLessThan(hx.b!.x);
    expect(hx.b!.x).toBeLessThan(hx.d!.x);
    expect(vy.a!.y).toBeLessThan(vy.b!.y);
    expect(vy.b!.y).toBeLessThan(vy.d!.y);
  });

  it('is narrow enough for a phone when vertical', () => {
    // 2 nodes in the widest column must fit a 343px content width (375 - 2 x 16 gutter) at scale >= 0.9.
    expect(layoutDiagram(diagram, 'vertical').width).toBeLessThanOrEqual(343 / 0.9);
  });
});
