import type { KeyboardEvent } from 'react';
export interface ArrowKeysReactConfig {
    left?: () => void;
    right?: () => void;
    up?: () => void;
    down?: () => void;
}
export declare class ArrowKeysReact {
    config: ArrowKeysReactConfig;
    constructor(config: ArrowKeysReactConfig);
    getEvents(): {
        onKeyDown: (e: KeyboardEvent) => void;
    };
}
