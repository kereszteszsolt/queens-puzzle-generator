//int array to number[][]
export function int8FlatMatrixTo2D(flatMatrix: Int8Array, size: number): number[][] {
    const matrix: number[][] = [];
    for (let r = 0; r < size; r++) {
        const row: number[] = [];
        for (let c = 0; c < size; c++) {
            row.push(flatMatrix[r * size + c]!);
        }
        matrix.push(row);
    }
    return matrix;
}