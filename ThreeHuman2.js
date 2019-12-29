import * as React from 'react';
import {View, StyleSheet, Text, Alert} from 'react-native';

import {GLView} from 'expo-gl';
//import {THREE} from 'expo-three';
//import ExpoTHREE from 'expo-three';
import * as THREE from 'three';
import * as makehuman from 'makehuman-js';
//import {Human} from './src/index'

export default class ThreeHuman extends React.Component {
  componentDidMount() {
    //THREE.suppressExpoWarnings(true);
  }

  constructor(props) {
    super(props);
    //this._onGLContextCreate = this._onGLContextCreate.bind(this);
    //this.animate = this.animate.bind(this);
  }

  _onGLContextCreateSec = async gl => {
    //console.log(document);

    const {drawingBufferWidth: width, drawingBufferHeight: height} = gl;

    const loader = new THREE.XHRLoader();
    //const loader = new THREE.FileLoader();

    THREE.Cache.enabled = false;

    const loadResource = (loader, url) => {
      return new Promise((resolve, reject) =>
        loader.load(url, data => resolve(JSON.parse(data))),
      );
    };

    console.log('@@@@@_1');

    const resources = await loadResource(
      loader,
      'http://localhost:8080/assets/makehuman-data/public/data/resources.json',
    );

    console.log('@@@@@_2');

    const modelingSliders = await loadResource(
      loader,
      'http://localhost:8080/assets/makehuman-data/src/json/sliders/modeling_sliders.json',
    );

    console.log('@@@@@_3');

    resources.baseUrl =
      'http://localhost:8080/assets/makehuman-data/public/data/';

    let scene = new THREE.Scene();

    // LIGHTS
    // sunlight from above
    let light1 = new THREE.HemisphereLight(0xffffbb, 0x080820, 1);
    scene.add(light1);

    console.log('@@@@@_4');
    // light front up
    let light2 = new THREE.DirectionalLight(0xffffff, 0.5);
    light2.position.set(0, 140, 500);
    light2.position.multiplyScalar(1.1);
    light2.color.setHSL(0.6, 0.075, 1);
    scene.add(light2);

    // light from ground
    let light3 = new THREE.DirectionalLight(0xffffff, 0.5);
    light3.position.set(0, -1, 0); // ground
    light3.position.set(13, 5, 0); // right (right, up, front)
    scene.add(light3);

    // CAMERA
    let camera = new THREE.PerspectiveCamera(30, width / height, 1, 2000);
    camera.position.set(0, 8, 40);

    const renderer = new THREE.WebGLRenderer({
      canvas: {
        width,
        height,
        style: {},
        addEventListener: () => {},
        removeEventListener: () => {},
        clientHeight: height,
      },
      context: gl,
    });

    console.log('@@@@@_5');
    renderer.setSize(gl.drawingBufferWidth, gl.drawingBufferHeight);

    renderer.setClearColor(0xffffff);
    //renderer.setPixelRatio(window.devicePixelRatio);
    console.log('@@@@@_6');

    let human = new makehuman.Human(resources);

    console.log('@@@@@_7');

    scene.add(human);

    console.log('@@@@@_8');

    await human.loadModel();

    console.log('@@@@@_9');

    human.setPose('standing03');

    console.log('@@@@@_101');

    // add some default clothes
    human.proxies.toggleProxy('female_sportsuit01', true);
    human.proxies.toggleProxy('eyebrow010', true);
    human.proxies.toggleProxy('Braid01', true);
    human.proxies.toggleProxy('Cocktaildress', true);

    console.log('@@@@@_102');

    // lets set the color to be a mixed/average skin color
    human.mesh.material.materials[0].color = new THREE.Color(
      0.6451834425332652,
      0.541358126188251,
      0.46583313890034395,
    );

    console.log('@@@@@_103');

    await human.loadTargets(`${resources.baseUrl}targets/${resources.targets}`);

    console.log('@@@@@_104');

    //human.io.fromUrl();

    console.log('@@@@@_105');

    renderer.render(scene, camera);
    gl.endFrameEXP();
  };

  render() {
    return (
      <View style={styles.container}>
        <GLView
          style={{width: 300, height: 300}}
          onContextCreate={this._onGLContextCreateSec}
        />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    //backgroundColor: '#ecf001',
    padding: 8,
  },
});
