import * as _ from 'lodash'
import * as makehuman  from 'makehuman-js/src/js/human'
import * as THREE from 'three'

export class Targets extends makehuman.Targets {
    private readonly human:             THREE.human;
    private lastBake:                   number;
    private readonly children:          {};
    private loading:                    boolean;
    private readonly manager:           THREE.LoadingManager;
    private bufferLoader:               THREE.XHRLoader;
    private referenceVertices:          any;
    private targetIndex:                makehuman.Target;
    private lastmorphTargetInfluences:  any;
    private targetData:                 Int16Array | undefined;


    constructor(human) {
        super();
        this.human      = human;
        this.lastBake   = new Date().getTime();
        // targets are stored here
        this.children   = {};
        this.loading    = false;

        // for loading
        this.manager        = new THREE.LoadingManager();
        this.bufferLoader   = new THREE.XHRLoader(this.manager);

        this.bufferLoader.setResponseType('arraybuffer');
    }

    public load(dataUrl) {
        const targets           = [];
        this.loading            = true;
        this.referenceVertices  = this.human.mesh.geometry.vertices.map(v => v.clone());
        const paths             = this.targetIndex.map(t => t.path);

        paths.sort()
        this.human.morphTargetDictionary = paths.reduce((a, p, i) => { a[p] = i; return a }, {});

        this.targetIndex.map(t => t.path).map((path) => {
            // @ts-ignore
            const config = this.pathToGroupAndCategories(path);
            const target = new makehuman.Target(config);
            // @ts-ignore
            targets.push(target);
            target.parent = this;
            this.children[target.name] = target;
            return target
        });

        this.human.morphTargetInfluences = new Float32Array(paths.length);

        this.targetData = new Int16Array(new ArrayBuffer(144604584));

        const targetsJson = require("./../../map/targets.json");

        if (this.targetData !== undefined) {
            targetsJson.forEach(item => {
                // @ts-ignore
                this.targetData[item.k] = item.v
            })
        }

        const menJson = require("./../../map/men.json");

        if (this.targetData !== undefined) {
            menJson.forEach(item => {
                // @ts-ignore
                this.targetData[item.k] = item.v
            })
        }

        return new Promise((resolve, reject) => {
            return resolve(this.targetData)
        }).catch((err) => {
            this.loading = false
            throw (err)
        })
    }

    /**
     * Updated vertices from applied targets. Should be called on render since it
     * will only run if it's needed and more than a second has passed
     */
    public applyTargets() {
        // skip if it hasn't been rendered
        if (!this.human ||
            !this.human.mesh ||
            !this.human.mesh.geometry ||
            !this.human.mesh.geometry._bufferGeometry ||
            !this.targetData
        ) { return false }


        // skip if less than a second since last
        if ((new Date().getTime() - this.lastBake) < this.human.minUpdateInterval) { return false }

        // check if it'schanged
        if (_.isEqual(this.lastmorphTargetInfluences, this.human.morphTargetInfluences)) { return false }

        // let [m,n] =  this.targetData.size
        const m     = this.human.geometry.vertices.length * 3;
        const n     = this.human.morphTargetInfluences.length;
        const dVert = new Float32Array(m);

        // What is targetData? It's all the makehuman targets, (ordered alphebetically by target path)
        // put in an nb_targets X nb_vertices*3 array as Int16 then flattened written as bytes to a file.
        //  We then load it as a binary buffer and load it into a javascript Int16 array.
        // Now we can calculate new vertices by doing a dotproduct of
        //     $morphTargetInfluences \cdot targetData *1e-3 $
        // with shapes
        //     $(nb_targets) \cdot (nb_target,nb_vertices*3) *1e-3 $
        // where 1e-3 is the scaling factor to convert from Int16
        // The upside is that the amount of data doesn't crash the browser like
        // json, msgpack etc do. It's also relativly fast and bypasses threejs
        // limit on the number of morphtargets you can have.

        // do the dot product over a flat targetData
        for (let j = 0; j < n; j += 1) {
            for (let i = 0; i < m; i += 1) {
                if (this.human.morphTargetInfluences[j] !== 0 && this.targetData[i + j * m] !== 0) {
                    dVert[i] += this.targetData[i + j * m] * this.human.morphTargetInfluences[j]
                }
            }
        }

        // update the vertices
        const vertices = this.referenceVertices.map(v => v.clone());
        for (let i = 0; i < vertices.length; i += 1) {
            vertices[i].add({ x: dVert[i * 3] * 1e-3, y: dVert[i * 3 + 1] * 1e-3, z: dVert[i * 3 + 2] * 1e-3 })
        }
        this.human.geometry.vertices = vertices;

        // this.human.mesh.geometry.verticesNeedUpdate = true;
        this.human.mesh.geometry.elementsNeedUpdate = true;
        this.lastmorphTargetInfluences = this.human.morphTargetInfluences.slice(0);
        this.lastBake = new Date().getTime();

        return true
    }
}
