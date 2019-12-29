import * as React from 'react';
import {View, StyleSheet, Text, Alert} from 'react-native';

import {GLView} from 'expo-gl';
//import {THREE} from 'expo-three';
//import ExpoTHREE from 'expo-three';
import * as THREE from 'three';
import {Human} from './src/index'
import man from './men.json';

export default class ThreeHuman extends React.Component {
  componentDidMount() {
    //THREE.suppressExpoWarnings(true);
  }

  constructor(props) {
    super(props);
    //this._onGLContextCreate = this._onGLContextCreate.bind(this);
    //this.animate = this.animate.bind(this);
  }

  _onGLContextCreateSec = gl => {
    //const human = new Human(
    //   '../assets/public/data/resources.json',
    //   './assets/src/json/sliders/measurement_sliders.json',
    //   './assets/public/data/'
    //);

    //http://localhost:8080/assets/makehuman-data/public/data/proxies/hair/Braid01/textures/braid01_diffuse.png



    Alert.alert("1","1");

    /*const human2 = new Human(
        'http://localhost:8080/assets/makehuman-data/public/data/resources.json',
        'http://localhost:8080/assets/makehuman-data/src/json/sliders/modeling_sliders.json',
        'http://localhost:8080/assets/makehuman-data/public/data/'
    );
    human2.createHuman(Alert).then(() => {
      Alert.alert("2","2")
      //const container = document.getElementById('container2');
      human2.setPose('standing05');
      human2.setProxy('Harvey_Sweater2');
      human2.setProxy('JeansSkirt');
      human2.setProxy('Low-Poly');
      human2.setProxy('Braid01');

      human2.setColor();
      human2.createScene(gl);
      human2.addHumanToScene();
      human2.setCameraPosition(0, 8, 40);
      human2.onResize();
      human2.setMod(man);
    });*/

    const human3 = new Human(
        'http://localhost:8080/assets/makehuman-data/public/data/resources.json',
        'http://localhost:8080/assets/makehuman-data/src/json/sliders/modeling_sliders.json',
        'http://localhost:8080/assets/makehuman-data/public/data/'
    );
    human3.createHuman().then(() => {
      //const container = document.getElementById('container3');
      human3.setPose('standing03');
      human3.setProxy('Low-Poly');
      human3.setProxy('Braid01');
      human3.setProxy('Cocktaildress');

      human3.setColor();
      human3.createScene(gl);
      human3.addHumanToScene();
      human3.setCameraPosition(0,14,20);
      human3.onResize();
    })

    /*const animate = () => {
      requestAnimationFrame(animate);
      objectToRender.rotation.x += 0.01;
      objectToRender.rotation.y += 0.01;
      cube.rotation.x += 0.03;
      cube.rotation.y += 0.02;
      renderer.render(scene, camera);
      gl.endFrameEXP();
      };
      animate();*/
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
