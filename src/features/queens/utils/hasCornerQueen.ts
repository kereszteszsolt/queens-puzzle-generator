export function hasCornerQueen(
    queens: Int8Array,
    size: number,
    r: number,
    c: number
): boolean {
    const s = size;

    let rr = r - 1, cc = c - 1;
    if (rr >= 0 && cc >= 0 && queens[rr * s + cc] === -1) return true;

    rr = r - 1; cc = c + 1;
    if (rr >= 0 && cc < s && queens[rr * s + cc] === -1) return true;

    rr = r + 1; cc = c - 1;
    if (rr < s && cc >= 0 && queens[rr * s + cc] === -1) return true;

    rr = r + 1; cc = c + 1;
    if (rr < s && cc < s && queens[rr * s + cc] === -1) return true;

    return false;
}
