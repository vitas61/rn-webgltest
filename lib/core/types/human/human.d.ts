import { Targets } from "./../../models/targets";
import { Children } from './children';
import { MeshMaterial } from './mesh-material';
import { Modifier } from './modifier';
export interface Human {
    targets: Targets;
    modifiers: {
        children: Modifier[];
    };
    io: {
        fromUrl(): any;
    };
    mesh: {
        material: {
            materials: MeshMaterial[];
        };
    };
    proxies: {
        children: Children[];
        toggleProxy(proxy: string, value: boolean): any;
    };
    loadModel(): any;
    loadTargets(path: string): any;
    setPose(pose: string): any;
    onBeforeRender(): any;
    onAfterRender(): any;
}
