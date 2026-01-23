export function getTRBLNeighborIndices(idx: number, size: number): number[] {
    const r = (idx / size) | 0;
    const c = idx - r * size;

    const out: number[] = [];

    // top
    if (r > 0) out.push((r - 1) * size + c);
    // right
    if (c < size - 1) out.push(r * size + (c + 1));
    // bottom
    if (r < size - 1) out.push((r + 1) * size + c);
    // left
    if (c > 0) out.push(r * size + (c - 1));

    return out;
}
