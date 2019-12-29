import * as makehuman from 'makehuman-js/src/js/human';
export declare class Targets extends makehuman.Targets {
    private readonly human;
    private lastBake;
    private readonly children;
    private loading;
    private readonly manager;
    private bufferLoader;
    private referenceVertices;
    private targetIndex;
    private lastmorphTargetInfluences;
    private targetData;
    constructor(human: any);
    load(dataUrl: any): Promise<{}>;
    /**
     * Updated vertices from applied targets. Should be called on render since it
     * will only run if it's needed and more than a second has passed
     */
    applyTargets(): boolean;
}
