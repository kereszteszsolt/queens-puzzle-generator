export const GameStatuses = {
    PLAYING: 'playing',
    WON: 'won',
    WELCOME: 'welcome',
    GENERATING_ERROR: 'generatingError',
    GENERATING: 'generating',
    BOARD_GENERATED: 'boardGenerated',
} as const;

export type GameStatus = typeof GameStatuses[keyof typeof GameStatuses];