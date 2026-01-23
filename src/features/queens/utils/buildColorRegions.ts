export function buildColorRegions(colorBoard: Int8Array, size: number): number[][] {
    // colorBoard: size*size, cell values: 1...size
    const regionMap = new Map<number, number[]>();

    const total = size * size;
    for (let idx = 0; idx < total; idx++) {
        const color = colorBoard[idx]!;
        let arr = regionMap.get(color);
        if (!arr) {
            arr = [];
            regionMap.set(color, arr);
        }
        arr.push(idx);
    }

    // Return array of regions
    return Array.from(regionMap.values());
}
