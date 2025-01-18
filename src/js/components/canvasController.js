import * as THREE from 'three';
import { OrbitControls, DragControls } from 'three/examples/jsm/Addons.js';

import MOUSECONTROLCONFIG from './configs/orbitControls.Mouse.js';
import KEYSCONFIG from './configs/viewPort.Keys.Config.js';

let _ = {};
let gridItems = [], inter, draggableObject;

const raycaster = new THREE.Raycaster();
const mouseClick = new THREE.Vector2(),
    mouseMove = new THREE.Vector2();

const highlightMesh = new THREE.Mesh(
  new THREE.PlaneGeometry(1, 1),
  new THREE.MeshBasicMaterial({
      transparent: true,
  })
);

highlightMesh.rotateX( -Math.PI / 2 );
highlightMesh.position.set( .5, .01, .5 );

const ground = new THREE.Mesh(
  new THREE.PlaneGeometry(20, 20),
  new THREE.MeshBasicMaterial({
    color: 0x4287f5,
    transparent: false,
  })
);
ground.rotateX( -Math.PI / 2);
ground.position.set( 0, 0, 0 );
ground.name = 'ground';

const geometry = new THREE.BoxGeometry( 1, 1, 1 );
const material = new THREE.MeshBasicMaterial( { color: 0x00ff00, transparent: true } );
const cube = new THREE.Mesh( geometry, material );
cube.name = 'cube';
cube.position.set( 1.5, .5, 1.5 );
cube.userData.draggable = true;


function getCanvasObj() {
  let canvas = document.getElementById("drawArea"),
      rect = canvas.getBoundingClientRect();

  return {
          $element: canvas,
          dimensions: {
          width: canvas.offsetWidth,
          height: canvas.offsetHeight,
          top: rect.top.toFixed(),
          left: rect.left.toFixed(),
      }
  }

}

function initEnums() {
 _.CANVAS   = getCanvasObj();
 _.SCENE    = scene();
 _.CAMERA   = camera();
 _.LIGHT    = light();
 _.RENDERER = renderer();
}

async function initApp() {
  await initEnums();

  (() => {

    // SETTING MOUSE BUTTONS CONTROLLERS
    const sceneControl = new OrbitControls( _.CAMERA, _.RENDERER.domElement );
    sceneControl.minDistance        = 1;
    sceneControl.maxDistance        = 10;
    // sceneControl.minAzimuthAngle    = 0;
    // sceneControl.maxAzimuthAngle    = 0;
    sceneControl.minPolarAngle      = 0;
    sceneControl.maxPolarAngle      = (Math.PI / 4);
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

    _.SCENE.add( _.LIGHT );
    _.CANVAS.$element.appendChild( _.RENDERER.domElement );
    initGridHelper();

    _.SCENE.add(highlightMesh);
    _.SCENE.add(ground);

    _.SCENE.add( cube );
    gridItems.push( cube );

    setDragControl();

    _.CANVAS.$element.addEventListener( 'mousemove', (event) => {

      mouseMove.x = ( event.clientX / window.innerWidth ) * 2 - 1;
      mouseMove.y =  - ( event.clientY / window.innerHeight ) * 2 + 1;

      onMouseMove();
    })

    _.CANVAS.$element.addEventListener( 'mousedown', (event) => {

      mouseClick.x = ( event.clientX / window.innerWidth ) * 2 - 1;
      mouseClick.y =  - ( event.clientY / window.innerHeight ) * 2 + 1;

      raycaster.setFromCamera( mouseClick, _.CAMERA);
      inter = raycaster.intersectObjects( _.SCENE.children );
      if( inter.length > 0 )
        draggableObject = inter[0].object;

      console.log(`CLICKED OBJECT ${ draggableObject.name }`);

    })

    window.addEventListener( 'resize', () => {
      resize();
    });

  })();
}

function onMouseMove() {
  raycaster.setFromCamera( mouseMove, _.CAMERA);
  let intersects = raycaster.intersectObjects( _.SCENE.children );
  inter = raycaster.intersectObjects( _.SCENE.children );
  
  intersects.forEach( $obj => {
    if( $obj.object.name == "ground" ) {
      const pos = new THREE.Vector3().copy( $obj.point ).divideScalar(1).floor().addScalar( .5 );
      highlightMesh.position.set(pos.x, .005, pos.z);
    }
  });

}

function setDragControl() {
  const dragControl = new DragControls( gridItems, _.CAMERA, _.RENDERER.domElement );
  let draggable;

  dragControl.addEventListener( 'dragstart', ($ev) => {
    draggable = $ev.object
    draggable.material.opacity = .6;
  })

  dragControl.addEventListener( 'drag', ($ev) => {
    // inter.forEach( $obj => {
      raycaster.setFromCamera( mouseMove, _.CAMERA);

      // draggable.position.divideScalar( 1 ).floor().multiplyScalar( 1 ).addScalar( .5 );
      draggable.position.y = .5;
    
      // if( $obj3D.name == "ground" ) {
      //   const pos = new THREE.Vector3().copy( $obj.point ).divideScalar(1).floor().addScalar( .5 );
      //   draggrable.position.set(pos.x, .05, pos.z);
          
      //   console.log('DRAG CONTROL FUNCTION');
      // }

    // } );
  })

  dragControl.addEventListener( 'dragend', ($ev) => {
    draggableObject = null;
  })
}

const camera = () => {
  // SETTING CAMERA
  let camera = new THREE.PerspectiveCamera( 100, _.CANVAS.dimensions.width/_.CANVAS.dimensions.height, 0.1, 500);
  camera.position.set(0, 5, 5);

  return camera;
}

const scene = () => {
  //  SETTING SCENE
  let scene = new THREE.Scene();
  // load a texture, set wrap mode to repeat
  const texture = new THREE.TextureLoader().load( "../../../assets/images/textures/scene_sky_01.jpg" );
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set( 1, 1 );
  scene.background = texture;

  return scene;
}

const light = () => {
  // SETTING LIGHT
  let light = new THREE.HemisphereLight( 0xe8dfdf, 0x204c5e, 5 );
  light.position.set( 0, 5, 0 );
  light.castShadow = true;

  return light;
}

const renderer = () => {
  let renderer = new THREE.WebGLRenderer( { antialias: true } );

  renderer.setPixelRatio( window.devicePixelRatio );
  renderer.setSize( _.CANVAS.dimensions.width, _.CANVAS.dimensions.height );

  renderer.setAnimationLoop( render.bind() );

  _.CANVAS.$element.appendChild( renderer.domElement );

  return renderer;
}

function initGridHelper() {
  const gridHelper = new THREE.GridHelper(20, 20, 0x000000, 0xffffff);
  gridHelper.position.set(0, 0, 0);
  _.SCENE.add( gridHelper );
}

function resize() {
  // _.CAMERA.aspect = window.innerWidth/window.innerHeight;
  // _.CAMERA.updateProjectionMatrix();
  // _.RENDERER.setSize( window.innerWidth/window.innerHeight );
}
function onDragAndDrop() {
  if( draggableObject != null ) {
    raycaster.setFromCamera( mouseMove, _.CAMERA);
    let intersects = raycaster.intersectObjects( _.SCENE.children );
    
    intersects.forEach( $obj => {
      if( $obj.object.name == "ground" && draggableObject.userData.draggable ) {
        const pos = new THREE.Vector3().copy( $obj.point ).divideScalar(1).floor().addScalar( .5 );
        // highlightMesh.position.set(pos.x, .005, pos.z);
        // draggable.position.divideScalar( 1 ).floor().multiplyScalar( 1 ).addScalar( .5 );
        
        draggableObject.position.x = pos.x;
        draggableObject.position.z = pos.z;

        console.log('onDragAndDrop');
      }
    });
  }
}

function render() {
  // cube.rotation.x += 0.01;
	// cube.rotation.y += 0.01;

  onDragAndDrop();
  
  _.RENDERER.render( _.SCENE, _.CAMERA );
}

window.addEventListener( 'DOMContentLoaded', () => {
  initApp();
});