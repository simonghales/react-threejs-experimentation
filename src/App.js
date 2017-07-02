import React, { Component } from 'react';
import React3 from 'react-three-renderer';
import * as THREE from 'three';
import './App.css';
var OrbitControls = require('three-orbit-controls')(THREE);

class App extends Component {

  controls;

  constructor(props, context) {
    super(props, context);

    // construct the position vector here, because if we use 'new' within render,
    // React will think that things have changed when they have not.
    this.cameraPosition = new THREE.Vector3(0, 0, 5);
    this.fog = new THREE.Fog(0x7fa2e8, 10, 40);


    const d = 20;

    this.meshPosition = new THREE.Vector3(2, 2, 0);

    this.lightPosition = new THREE.Vector3(d, d, d);
    this.lightTarget = new THREE.Vector3(0, 0, 0);

    this.state = {
      cubeRotation: new THREE.Euler(),
    };

    this._onAnimate = () => {
      // we will get this callback every frame

      // pretend cubeRotation is immutable.
      // this helps with updates and pure rendering.
      // React will be sure that the rotation has now updated.
      this.setState({
        cubeRotation: new THREE.Euler(
          this.state.cubeRotation.x,
          this.state.cubeRotation.y + 0.003,
          0
        ),
      });
    };
  }

  componentDidMount() {
    const controls = new OrbitControls(this.refs.camera);
    controls.minDistance = 3;
    controls.maxDistance = 5;
    this.controls = controls;
  }

  componentWillUnmount() {
    this.controls.dispose();
    delete this.controls;
  }

  render() {
    const width = window.innerWidth; // canvas width
    const height = window.innerHeight; // canvas height

    const d = 20;

    return (<React3
      antialias={true}
      mainCamera="camera" // this points to the perspectiveCamera which has the name set to "camera" below
      width={width}
      height={height}
      clearColor={this.fog.color}
      onAnimate={this._onAnimate}
    >
      <scene
        fog={this.fog}>
        <perspectiveCamera
          ref="camera"
          name="camera"
          fov={75}
          aspect={width / height}
          near={0.1}
          far={1000}

          position={this.cameraPosition}
        />
        <ambientLight
          color={0x9bb6f2}
        />
        <directionalLight
          color={0xf28c1f}
          intensity={1}

          castShadow

          shadowMapWidth={568}
          shadowMapHeight={568}

          shadowCameraLeft={-d}
          shadowCameraRight={d}
          shadowCameraTop={d}
          shadowCameraBottom={-d}

          shadowCameraFar={3 * d}
          shadowCameraNear={d}

          position={this.lightPosition}
          lookAt={this.lightTarget}
        />
        <mesh
          rotation={this.state.cubeRotation}
        >
          <sphereGeometry
            radius={2}
            widthSegments={12}
            heightSegments={12}
          />
          <meshLambertMaterial
            color={0x2f84d8}
          />
        </mesh>
        <mesh
          position={this.meshPosition}
        >
          <sphereGeometry
            radius={0.2}
            widthSegments={12}
            heightSegments={12}
          />
          <meshLambertMaterial
            color={0xa0a0a0}
          />
        </mesh>
      </scene>
    </React3>);
  }
}

export default App;
