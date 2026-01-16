export function pickRandomNeighborIndex(
    neighbors: number[],
    predicate: (idx: number) => boolean
): number {
    let chosen = -1;
    let count = 0;

    for (let i = 0; i < neighbors.length; i++) {
        const idx = neighbors[i]!;
        if (!predicate(idx)) continue;

        count++;
        if (Math.random() < 1 / count) chosen = idx;
    }
    return chosen;
}
