import * as THREE       from 'three';
import { HumanStore }   from "./core/store/human.store";
import { Scene }        from "./service/scene";

export class Human {

    private store: HumanStore | null = null;
    private scene: Scene | null = null;

    private readonly urlResources:          string | null = null;
    private readonly urlModelingSliders:    string | null = null;
    private readonly baseUrl:               string | null = null;

    constructor(resources: string, modelingSliders: string, baseUrl: string) {
        this.urlResources       = resources;
        this.urlModelingSliders = modelingSliders;
        this.baseUrl            = baseUrl;
    }

    private alert = null;

    public async createHuman(Alert) {
        const loader        = new THREE.XHRLoader();
        THREE.Cache.enabled = true;



        /*loader.load(
            this.urlResources,
            // tslint:disable-next-line:no-shadowed-variable
            (data) => {

            }
        )*/

        //this.alert.alert("3","4");


        const resources         = await this.loadResources(loader);

        console.log("@@@@@@@@@@createHuman:0000001", resources)

        const modelingSliders   = await this.loadModelingSliders(loader);


        console.log("@@@@@@@@@@createHuman:0000002", modelingSliders)

        // @ts-ignore
        resources.baseUrl = this.baseUrl;

        this.store = new HumanStore(resources, modelingSliders);
        await this.store.loadModel();

        return true;
    }

    public createScene(container) {
        // @ts-ignore
        this.scene = new Scene(container, this.store.human);
        this.scene.setScene();
        this.scene.animate();
    }

    public addHumanToScene() {
        // @ts-ignore
        this.scene.addHuman(this.store.human);
    }

    public setPose(pose: string) {
        // @ts-ignore
        this.store.setPose(pose)
    }

    public setProxy(name: string, value: boolean | true) {
        // @ts-ignore
        this.store.setProxy(name, value);
    }

    public setColor() {
        // @ts-ignore
        this.store.setColor();
    }

    public setCameraPosition(horizon, vertical, zoom){
        // @ts-ignore
        this.scene.setCameraPosition(horizon, vertical, zoom);
    }

    public onResize() {
        // @ts-ignore
        this.scene.onResize();
    }

    public setModifierValue(name, value) {
        // @ts-ignore
        this.store.setModifierValue(name, value);
    }

    public setMod(json) {
        // @ts-ignore
        this.store.setMod(json);
    }

    protected async loadResources(loader: THREE.XHRLoader) {
        return new Promise((resolve, reject) => loader.load(
            this.urlResources,
                // tslint:disable-next-line:no-shadowed-variable
                (data) => resolve(JSON.parse(data))
            )
        );
    }

    protected async loadModelingSliders(loader: THREE.XHRLoader) {
        return new Promise((resolve, reject) => loader.load(
            this.urlModelingSliders,
            // tslint:disable-next-line:no-shadowed-variable
            (data) => resolve(JSON.parse(data))
            )
        );
    }

}
