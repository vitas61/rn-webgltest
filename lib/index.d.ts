import * as THREE from 'three';
export declare class Human {
    private store;
    private scene;
    private readonly urlResources;
    private readonly urlModelingSliders;
    private readonly baseUrl;
    constructor(resources: string, modelingSliders: string, baseUrl: string);
    createHuman(): Promise<boolean>;
    createScene(container: any): void;
    addHumanToScene(): void;
    setPose(pose: string): void;
    setProxy(name: string, value: boolean | true): void;
    setColor(): void;
    setCameraPosition(horizon: any, vertical: any, zoom: any): void;
    onResize(): void;
    setModifierValue(name: any, value: any): void;
    setMod(json: any): void;
    protected loadResources(loader: THREE.XHRLoader): Promise<{}>;
    protected loadModelingSliders(loader: THREE.XHRLoader): Promise<{}>;
}
