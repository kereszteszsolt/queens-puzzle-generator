export function getRandomCellIndex(size: number): number {
    // 0..size*size-1
    return ((Math.random() * (size * size)) | 0);
}
