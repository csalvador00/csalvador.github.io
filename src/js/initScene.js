import { OrbitControls } from 'three/examples/jsm/Addons.js';
import * as THREE from 'three';
import MOUSECONTROLCONFIG from './components/configs/orbitControls.Mouse.js';
import KEYSCONFIG from './components/configs/viewPort.Keys.Config.js';
function SCENE3D( canvas ) {
    // SETTING CAMERA
    this.camera = () => {
        let camera = new THREE.PerspectiveCamera( 100, canvas.dimensions.width/canvas.dimensions.height, .1, 5000);
        camera.position.set(0, 5, 20);

        return camera;
    }

    //  SETTING SCENE
    this.scene = () => {
        let scene = new THREE.Scene();
        // load a texture, set wrap mode to repeat
        const texture = new THREE.TextureLoader().load( "../../../assets/images/textures/bg_v4.jpg" );
        texture.wrapS = THREE.RepeatWrapping;
        texture.wrapT = THREE.RepeatWrapping;
        texture.repeat.set( 1, 1 );
        scene.background = new THREE.Color().setRGB( 0, 0, 0);

        return scene;
    }

    // SETTING LIGHT
    this.light = () => {
        let light = new THREE.HemisphereLight( 0xe8dfdf, 0x204c5e, .1 );
        // let light = new THREE.DirectionalLight( 0xe8dfdf );
        light.position.set( -2, .5, 0.5 );
        light.castShadow = true;

        return light;
    }

    this.renderer = () => {
        let renderer = new THREE.WebGLRenderer( { antialias: true } );

        renderer.setPixelRatio( window.devicePixelRatio );
        renderer.setSize( canvas.dimensions.width, canvas.dimensions.height );
        renderer.shadowMap.enabled = true;

        canvas.$element.appendChild( renderer.domElement );

        return renderer;
    }

    const orbitControls = ( camera, domElement ) => {
        // SETTING MOUSE BUTTONS CONTROLLERS
        let sceneControl = new OrbitControls( camera, domElement );
        // sceneControl.minDistance        = 1;
        // sceneControl.maxDistance        = 20;
        sceneControl.minAzimuthAngle    = 0;
        // sceneControl.maxAzimuthAngle    = 0;
        sceneControl.minPolarAngle      = 0;
        // sceneControl.maxPolarAngle      = (Math.PI / 4);
        sceneControl.enableRotate       = true;
        // SETTING MOUSE BUTTONS CONTROLLERS
        sceneControl.mouseButtons.RIGHT     = MOUSECONTROLCONFIG.BUTTON.RIGHT;
        sceneControl.mouseButtons.LEFT      = MOUSECONTROLCONFIG.BUTTON.LEFT;
        sceneControl.mouseButtons.MIDDLE    = MOUSECONTROLCONFIG.BUTTON.MIDDLE;
        // SETTING MOUSE KEYS CONTROLLERS
        sceneControl.keys = KEYSCONFIG;
        sceneControl.listenToKeyEvents(window);

        sceneControl.target.set( 0, .5, 0 );
        sceneControl.update();
    }

    return {
        camera: this.camera,
        scene: this.scene,
        light: this.light,
        renderer: this.renderer,
        orbitControls: orbitControls
    }
}

export default SCENE3D;