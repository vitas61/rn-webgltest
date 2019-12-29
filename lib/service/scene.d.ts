import * as makehuman from 'makehuman-js';
export declare class Scene {
    private readonly human;
    private scene;
    private camera;
    private renderer;
    private SCREEN_WIDTH;
    private SCREEN_HEIGHT;
    private container;
    constructor(container: object, human: makehuman.Human);
    addHuman(): void;
    setScene(): void;
    setCameraPosition(horizon: number, vertical: number, zoom: number): void;
    onResize(): void;
    animate: () => void;
    private render;
}
