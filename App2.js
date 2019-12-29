import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
//import { WebGLView } from "react-native-webgl";
import {GLView} from 'expo-gl';
import THREE from './three';

type Props = {};
export default class App2 extends Component<Props> {
  onContextCreate = (gl: WebGLRenderingContext) => {
    //const rngl = gl.getExtension('RN');

    const {drawingBufferWidth: width, drawingBufferHeight: height} = gl;
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
    renderer.setSize(width, height);
    renderer.setClearColor(0xffffff, 1);

    let camera, scene;
    let cube;

    function init() {
      camera = new THREE.PerspectiveCamera(75, width / height, 1, 1100);
      camera.position.y = 150;
      camera.position.z = 500;
      scene = new THREE.Scene();

      let geometry = new THREE.BoxGeometry(200, 200, 200);
      for (let i = 0; i < geometry.faces.length; i += 2) {
        let hex = Math.random() * 0xffffff;
        geometry.faces[i].color.setHex(hex);
        geometry.faces[i + 1].color.setHex(hex);
      }
      let material = new THREE.MeshBasicMaterial({
        vertexColors: THREE.FaceColors,
        overdraw: 0.5,
      });
      cube = new THREE.Mesh(geometry, material);
      cube.position.y = 150;
      scene.add(cube);
    }

    const animate = () => {
      this.requestId = requestAnimationFrame(animate);
      renderer.render(scene, camera);

      cube.rotation.y += 0.05;
      cube.rotation.x += 0.02;
      cube.rotation.z += 0.03;

      gl.flush();
      //rngl.endFrame();
    };

    init();
    animate();
  };

  render() {
    return (
      <View style={styles.container}>
        <GLView
          style={{width: 400, height: 500}}
          onContextCreate={this.onContextCreate}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
});
