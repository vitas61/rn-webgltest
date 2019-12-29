import { Targets }      from "./../../models/targets"
import { Children }     from './children';
import { MeshMaterial } from './mesh-material';
import { Modifier }     from './modifier';

export interface Human {
  targets: Targets;

  modifiers: {
    children: Modifier[]
  };

  io: {
    fromUrl()
  };

  mesh: {
    material: {
      materials: MeshMaterial[]
    }
  };

  proxies: {
    children: Children[];
    toggleProxy(proxy: string, value: boolean)
  };

  loadModel();

  loadTargets(path: string);

  setPose(pose: string);

  onBeforeRender();

  onAfterRender();
}
