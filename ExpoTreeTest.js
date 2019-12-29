import * as React from 'react';
import {View, StyleSheet, Text, Alert} from 'react-native';

import {GLView} from 'expo-gl';
//import {THREE} from 'expo-three';
//import ExpoTHREE from 'expo-three';
import * as THREE from 'three';

export default class ExpoTreeTest extends React.Component {
  /*renderer: any;
    scene: any;
    camera: any;
    geometry : any;
    material : any;
    obj : any;
    line : any;
    edges : any;*/

  componentDidMount() {
   // THREE.suppressExpoWarnings(true);
  }

  constructor(props) {
    super(props);

    //this._onGLContextCreate = this._onGLContextCreate.bind(this);
    //this.animate = this.animate.bind(this);
  }





  _onGLContextCreateSec = async gl => {


    //console.log("_onGLContextCreateSec");


    const {drawingBufferWidth: width, drawingBufferHeight: height} = gl;
    let scene = new THREE.Scene();
    // 2. Camera
    const camera = new THREE.PerspectiveCamera(
      75,
      gl.drawingBufferWidth / gl.drawingBufferHeight,
      0.3,
      1000,
    );
    // 3. Renderer
    //const renderer = ExpoTHREE.Renderer({gl});
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

    renderer.setSize(gl.drawingBufferWidth, gl.drawingBufferHeight);

    // Define our shape (Below is a tetrahedron, but can be whatever)
    const geometry = new THREE.TetrahedronBufferGeometry(2, 0);
    // Define the material, Below is material with hex color #00ff00
    const material = new THREE.MeshBasicMaterial({color: 0x00ff00});
    // For custom material of any image, simply download any image into your project and use:
    // Define the full 3-D object
    const objectToRender = new THREE.Mesh(geometry, material);
    // Specifying the cameras Z position will allow the object to appear in front of the camera rather that in line (which the camera which is the default)
    camera.position.z = 3;

    const geometry2 = new THREE.BoxGeometry(2, 2, 2);
    const material2 = new THREE.MeshBasicMaterial({color: 0x0000ff});
    const cube = new THREE.Mesh(geometry2, material2);

    scene.add(objectToRender);
    scene.add(cube);

    const animate = () => {
      requestAnimationFrame(animate);
      objectToRender.rotation.x += 0.01;
      objectToRender.rotation.y += 0.01;
      cube.rotation.x += 0.03;
      cube.rotation.y += 0.02;
      renderer.render(scene, camera);
      gl.endFrameEXP();
    };
    animate();
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
