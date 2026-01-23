export function getShuffledArray(min: number, max: number): Int16Array {
    if (min > max) [min, max] = [max, min];

    const size = max - min;
    const array = new Int16Array(size);

    for (let i = 0; i < size; i++) {
        array[i] = min + i;
    }

    for (let i = size - 1; i > 0; i--) {
        const j = (Math.random() * (i + 1)) | 0;
        const tmp = array[i];
        array[i] = array[j]!;
        array[j] = tmp!;
    }

    return array;
}
