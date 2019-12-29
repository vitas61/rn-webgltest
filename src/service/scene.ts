import * as makehuman   from 'makehuman-js';
import * as THREE       from 'three';
import { Human }        from "./../core/types/human";

export class Scene  {

    private readonly human: Human;
    private scene:          THREE.Scene;
    private camera:         THREE.PerspectiveCamera;
    private renderer:       THREE.WebGLRenderer;

    private SCREEN_WIDTH:   number = 0;
    private SCREEN_HEIGHT:  number = 0;
    private container;

    constructor(container: object, human: makehuman.Human) {
        this.container  = container;
        this.human      = human;
    }


    public addHuman() {
        this.scene.add(this.human);
    }

    public setScene() {

        this.SCREEN_WIDTH = this.container.offsetWidth;
        this.SCREEN_HEIGHT = this.container.offsetHeight;

        this.scene = new THREE.Scene();

        const light1 = new THREE.HemisphereLight(0xffffbb, 0x080820, 1);
        this.scene.add(light1);

        const light2 = new THREE.DirectionalLight(0xffffff, 0.5);
        light2.position.set(0, 140, 500);
        light2.position.multiplyScalar(1.1);
        light2.color.setHSL(0.6, 0.075, 1);
        this.scene.add(light2);

        const light3 = new THREE.DirectionalLight(0xffffff, 0.5);
        light3.position.set(0, -1, 0); // ground
        light3.position.set(13, 5, 0); // right (right, up, front)
        this.scene.add(light3);

        this.renderer = new THREE.WebGLRenderer({antialias: true});
        this.renderer.setSize(this.SCREEN_WIDTH, this.SCREEN_WIDTH);
        this.renderer.setClearColor(0xffffff);
        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.container.appendChild(this.renderer.domElement);
    }

    public setCameraPosition(horizon: number, vertical: number, zoom: number) {
        this.camera = new THREE.PerspectiveCamera(30, this.SCREEN_WIDTH / this.SCREEN_HEIGHT, 1, 2000);
        this.camera.position.set(horizon, vertical, zoom)
    }

    public onResize() {
        this.camera.aspect = this.SCREEN_WIDTH / this.SCREEN_WIDTH;

        this.camera.updateProjectionMatrix();
        this.renderer.setSize(this.SCREEN_WIDTH, this.SCREEN_WIDTH);
    }

    public animate = () => {
        requestAnimationFrame(this.animate);
        this.render();
    };

    private render() {
        if (this.renderer && this.scene && this.camera) {
            this.human.onBeforeRender();
            this.renderer.render(this.scene, this.camera)
            this.human.onAfterRender();
        }
    }
}
