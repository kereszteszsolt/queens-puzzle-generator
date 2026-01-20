export interface GenMessage {
    "iteration": number;
    "solutionsCount": number;
    "elapsedTimeMs": number;
    "currentBoard": Int8Array;
    "timeLimitMs"?: number;
    "iterationLimit"?: number;
    "successRate": number;
    "targetMaxSolutions": number;
    "size": number;
}