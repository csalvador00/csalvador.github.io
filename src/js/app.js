// THREE CORE IMPORTS
import * as THREE from 'three';
import THREEx3 from "three-x3"
import * as fs from 'fs-web';
import { VertexNormalsHelper } from 'three/addons/helpers/VertexNormalsHelper.js';
import { VertexTangentsHelper } from 'three/addons/helpers/VertexTangentsHelper.js';

import { OrbitControls, DragControls } from 'three/examples/jsm/Addons.js';
// COMPONETS E CONFIGS IMPORTS
import CustomGeometry from './components/geometries.js';
//CUSTOM UTILS IMPORTS
import timeStampID from './utils/timestamp_id.js';
import { sun, planets, moons } from './components/Geometries/planets.list.js';

import { STORAGEKEY } from '../js/utils/enums.config.js';
import SCENE3D from './initScene.js';
import { texture } from 'three/tsl';

const clock = new THREE.Clock();

let count = 0;
let moonsList = new Array();

class App {
    
    constructor(){
        this.items = new Array();
        this.orbitLines = new Array();
        this.canvas = this.getCanvasObj();
        const _ = new SCENE3D( this.canvas );

        this.camera     = _.camera();
        this.light      = _.light();
        this.scene      = _.scene();
        this.renderer   = _.renderer();

        _.orbitControls(this.camera, this.renderer.domElement);

        const axesHelper = new THREE.AxesHelper( 10 );
        axesHelper.layers.enable = true;
        this.scene.add(axesHelper);

        this.scene.add( this.light )

        //INIT GRID HELPER - DRAGGABEL AREA
        this.initGridHelper();

        this.newObject("sun", false, sun.params);

        this.renderer.setAnimationLoop( this.render.bind(this) );

        // return;
        
        planets.forEach( planet => {
            let radiansAxis = planet.params.config.rotationAxis,
            radianX = radiansAxis.radianX,
            radianY = radiansAxis.radianY,
            radianZ = radiansAxis.radianZ;

            let velocity = planet.params.config.velocity;
            
            this.newObject("planet", true, planet.params);
            this.setPlanetOrbitLine( planets.indexOf( planet ), radianX, radianY, radianZ, velocity);
            
            if( planet.params.theIsASatelite ) {
                this.setPlanetCustomSatelites(
                    planets.indexOf( planet ),
                    radianX,
                    radianY,
                    radianZ,
                    velocity,
                    planet.params.sateliteName
                );
            }

        });

        const vertices = [];
        const star = new THREE.TextureLoader().load("../../assets/images/textures/astros/star_v1.png");
        // star.colorSpace = new THREE.SRGBColorSpace;
        const r = 30;

        for ( let i = 0; i < 600000; i ++ ) {
            const v = ( i / 600000 ) * ( Math.PI * 2 );

            const x = ( Math.sin( v ) + THREE.MathUtils.randFloatSpread( 2000 ) ) * r ;
            const y = ( Math.cos( v ) + THREE.MathUtils.randFloatSpread( 2000 ) ) * r;
            const z = ( Math.cos( v ) + THREE.MathUtils.randFloatSpread( 2000 ) ) * r;

            vertices.push( x, y, z );
        }

        const geometry = new THREE.BufferGeometry();
        geometry.setAttribute( 'position', new THREE.Float32BufferAttribute( vertices, 3 ) );
        const material = new THREE.PointsMaterial( {
            color: 0xFFFFFF,
            size: 30,
            sizeAttenuation: true,
            map: star,
            alphaTest: .9,
            transparent: true,
            blending: THREE.AdditiveBlending
        } );
        const points = new THREE.Points( geometry, material );
        this.scene.add( points );

        this.asteroidBelt();
        this.pouderBelt();
        
    }

    pouderBelt() {
        const vertices = [];
        const star = new THREE.TextureLoader().load("../../assets/images/textures/astros/asteroid_v2.png");
        const divisor = 20000;
        const r = 100;

        for(var i = 0; i <= divisor; i++) {
            const v = ( i / divisor ) * ( Math.PI * 2 );

            // const x = Math.sin(v) * (Math.PI * 2) + Math.random();
            // const y = 25 * Math.random() - 20;
            // const z = Math.cos(v) * (Math.PI * 2) + Math.random();

            const x = Math.sin(v) * r + Math.floor(Math.random() * 30 ) - r/7.3;
            const y = 25 * Math.random() - 20;
            const z = Math.cos(v) * r + Math.floor(Math.random() * 30 ) - r/7.3;


            vertices.push( x, y, z );
        }

        const geometry = new THREE.BufferGeometry();
              geometry.setAttribute( "position", new THREE.Float32BufferAttribute( vertices, 3 ) );

        const material = new THREE.PointsMaterial({
            color: 0xFFFFFF,
            size: .05,
            sizeAttenuation: true,
            alphaTest: .7,
            transparent: true,
            opacity: 1
        })

        const asteroids = new THREE.Points( geometry, material );

        this.scene.add(asteroids)
        this.$pouderBelt = asteroids;

    }

    asteroidBelt() {
        const vertices = [];
        const star = new THREE.TextureLoader().load("../../assets/images/textures/astros/asteroid_v2.png");
        const divisor = 900;
        const r = 100;

        for(var i = 0; i <= divisor; i++) {
            const v = ( i / divisor ) * ( Math.PI * 2 );

            const x = Math.sin(v) * r + Math.floor(Math.random() * 30 ) - r/7.3;
            const y = 25 * Math.random() - 20;
            const z = Math.cos(v) * r + Math.floor(Math.random() * 30 ) - r/7.3;


            vertices.push( x, y, z );
        }

        const geometry = new THREE.BufferGeometry();
              geometry.setAttribute( "position", new THREE.Float32BufferAttribute( vertices, 3 ) );

        const material = new THREE.PointsMaterial({
            color: 0xFFFFFF,
            size: 2.5,
            sizeAttenuation: true,
            map: star,
            alphaTest: .7,
            transparent: true,
            
        })

        const asteroids = new THREE.Points( geometry, material );

        this.scene.add(asteroids)
        this.$asteroidBelt = asteroids;

    }

    radianPosition( index, radianX, radianY, radianZ, velocity ) {

            let finalRadianX = Math.sin( time ) * radianX * 3,
            finalRadianZ = Math.cos( time ) * radianZ * 3;

            $i.position.set( finalRadianX, 1, finalRadianZ );
    }

    setPlanetCustomSatelites( index, radianX, radianY, radianZ, velocity, sateliteName ){
        let satelite = `${sateliteName}`;
        let $mesh;
        
        if( moons[satelite].hasAList ) {
            
            moons[satelite].moons.forEach( moon => {
                // console.log(JSON.stringify(moon))
                $mesh = this.newObject("moon", false, moon.params);
                this.items[index].add($mesh);
                moonsList.push( $mesh );

            });
            
            return;
            
        }

        if( moons[satelite].params.type != "moon" ) {
            this.setOrbitLine( index, radianX, radianY, radianZ, 50);
            return;
        }

        $mesh = this.newObject("moon", false,  moons[satelite].params);

        this.items[index].add($mesh);
        moonsList.push( $mesh );
    }

    setOrbitLine( index, radianX, radianY, radianZ, numOfLines = 10) {

        const vertices = [];
        const divisions = 150;
        let radianConst = 3;

        for( var i = 0; i <= numOfLines; i++ ) {

            for ( let i = 0; i <= divisions; i ++ ) {

                const v = ( i / divisions ) * ( Math.PI * 2 );

                const x = ( Math.sin( v ) * radianConst ) ;
                const z = ( Math.cos( v ) * radianConst);

                vertices.push( x, 0, z );

            }

            const geometry = new THREE.BufferGeometry();
            geometry.setAttribute( 'position', new THREE.Float32BufferAttribute( vertices, 3 ) );

            const material = new THREE.LineBasicMaterial( {
                color: 0xffffff,
                linewidth: 300,
                transparent: true,
                opacity: .1
            } );

            const line = new THREE.Line( geometry, material );
            // // line.scale.setScalar( i / 3 );
            // line.userData.velocity = velocity;
            this.items[index].add( line );

            radianConst += .02;
        }

    }

    setPlanetOrbitLine( index, radianX, radianY, radianZ, velocity) {

        const vertices = [];
        const divisions = 150;

        for ( let i = 0; i <= divisions; i ++ ) {

            const v = ( i / divisions ) * ( Math.PI * 2 );

            const x = ( Math.sin( v ) * radianX * 3 ) ;
            const z = ( Math.cos( v ) * radianZ * 3 );

            vertices.push( x, 0, z );

        }

        const geometry = new THREE.BufferGeometry();
        geometry.setAttribute( 'position', new THREE.Float32BufferAttribute( vertices, 3 ) );

        const material = new THREE.LineBasicMaterial( {
            color: Math.random() * 0xffffff,
            transparent: true,
            opacity: .8
        } );

        const time = Date.now() * radianY;

        const line = new THREE.Line( geometry, material );
        // line.scale.setScalar( i / 3 );
        line.userData.velocity = velocity;
        line.position.y = 1;
        // line.rotation.x = radianY * Math.PI * ( vertices.length / 2 );
        // line.rotation.z = radianZ;
        // this.items[index].add( line );
        this.scene.add( line );
        this.orbitLines.push( line )

    }

    initGridHelper() {
        const gridHelper = new THREE.GridHelper(20, 20, 0x000000, 0xffffff);
        gridHelper.position.set(0, 0, 0);
        gridHelper.material.opacity = 0.5;
        gridHelper.material.depthWrite = false;
        gridHelper.material.transparent = true;
        gridHelper.material.visible = false;

        const gridGeometry = new THREE.PlaneGeometry(20, 20, 20, 20);
        gridGeometry.rotateY(Math.PI);
        gridGeometry.rotateX(-Math.PI * .5);

        var gridMaterial = new THREE.MeshBasicMaterial({
            color: 0xffffff,
            wireframe: true,
            visible: false
          });

        var gridWithDiagonals = new THREE.Mesh(gridGeometry, gridMaterial);
        gridWithDiagonals.material.transparent = true;
        gridWithDiagonals.material.opacity = .1;

        var gridWithDiagonals_2 = gridWithDiagonals.clone();
        gridWithDiagonals_2.rotateY(-Math.PI * .5);
        gridWithDiagonals_2.rotateX(Math.PI);

        const polarGridHelper = new THREE.PolarGridHelper( 5, 5, 8, 64, 0x0000ff, 0x808080 );
        polarGridHelper.position.y = 1;
        polarGridHelper.position.x = 0;
        // this.scene.add( polarGridHelper );

        const plane = new THREE.Plane( new THREE.Vector3( 0, 2, 0 ), 3 );
        const helper = new THREE.PlaneHelper( plane, 1, 0xffff00 );
        helper.rotateY(Math.PI);
        helper.rotateX(-Math.PI * .5);
        // this.scene.add( helper );


        this.scene.add(gridWithDiagonals);
        // this.scene.add(gridWithDiagonals_2);

        this.scene.add( gridHelper );
    }

    getCanvasObj() {
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

    newObject(type = "floor", draggable = true, params = null) {
        let objGeometry = new CustomGeometry( type, 0xe8dfdf, params );
        objGeometry.$mesh.userData.draggable = draggable;
        objGeometry.$mesh.userData.id = timeStampID();

        if( draggable ) {
            this.items.push(objGeometry.$mesh);
        }

        if( type === "moon" ) {
            return objGeometry.$mesh;
        } else if ( type == "sun"){
            this.$sun = objGeometry.$mesh;
        }

        this.addObjectToScene( objGeometry.$mesh, `${type}` );
        
    }

    addObjectToScene( mesh, name ){
        // this.x3.add(mesh, {label: name});
        this.scene.add( mesh );
    }

    planetsOrbitAnimation() {
        const elapsed = clock.getElapsedTime();

        this.items.forEach( $i => {

            let radiansAxis = $i.userData.config.rotationAxis,
            radianX = radiansAxis.radianX,
            radianY = radiansAxis.radianY,
            radianZ = radiansAxis.radianZ;

            const time = Date.now() * $i.userData.config.velocity;
			const positionY = Math.cos( time ) * radianY;

            let finalRadianX = Math.sin( time ) * radianX * 3,
            finalRadianZ = Math.cos( time ) * radianZ * 3;

            $i.position.set( finalRadianX, 1, finalRadianZ );
            $i.rotation.y += .01;
            // $i.rotation.z += .01;

            // if( count % 2 == 0 && count < 10 )
            //     this.setPlanetOrbitLineDinamicly( finalRadianX, positionY, finalRadianZ, time);

            // count += 1;

        } );

        this.orbitLines.forEach( $line => {

            const time = Date.now() * $line.userData.velocity;
			//const positionY = Math.cos( time ) * 2 + 1.25;

            //$line.position.set( Math.sin( time ) * 3, 0, Math.cos( time ) * 3 );
            //$line.rotation.y += .01 ;
            // $line.rotation.z += .01;

        } );
    }

    moonsOrbitAnimation() {
        const elapsed = clock.getElapsedTime() * 4;

        moonsList.forEach( $moon => {

            let radiansAxis = $moon.userData.config.rotationAxis,
            radianX = radiansAxis.radianX,
            radianY = radiansAxis.radianY,
            radianZ = radiansAxis.radianZ;

            let velocity = $moon.userData.config.velocity;

            const time = Date.now() * velocity;

            $moon.position.set(  Math.sin(time) * radianX, radianY,  Math.cos(time) * radianZ );
            // $i.position.x = Math.sin(elapsed) * 2;
            // $i.rotation.z += .01;

            // if( count % 2 == 0 && count < 10 )
            //     this.setPlanetOrbitLineDinamicly( finalRadianX, positionY, finalRadianZ, time);

            // count += 1;

        } );

        this.orbitLines.forEach( $line => {

            const time = Date.now() * $line.userData.velocity;
			//const positionY = Math.cos( time ) * 2 + 1.25;

            //$line.position.set( Math.sin( time ) * 3, 0, Math.cos( time ) * 3 );
            //$line.rotation.y += .01 ;
            // $line.rotation.z += .01;

        } );
    }

    setPlanetOrbitLineDinamicly( radianX, radianY, radianZ, velocity) {

        let vertices = [];
        let divisions = 10;

        for ( let i = 0; i <= divisions; i ++ ) {

            const v = ( i / divisions );

            const x = ( Math.sin( v ) * radianX * 3 ) ;
            const z = ( Math.cos( v ) * radianZ * 3 );

            vertices.push( x, 0, z );

        }

        const geometry = new THREE.BufferGeometry();
        geometry.setAttribute( 'position', new THREE.Float32BufferAttribute( vertices, 3 ) );

        const material = new THREE.LineBasicMaterial( {
            color: Math.random() * 0xffffff,
            linewidth: 100,
            transparent: true,
            opacity: .5
        } );

        const line = new THREE.Line( geometry, material );
        // // line.scale.setScalar( i / 3 );
        // line.userData.velocity = velocity;
        // line.position.y = 1;
        // line.rotation.z = Math.cos( radianZ * 3 );
        // line.rotation.x = Math.sin( radianX );
        this.scene.add( line );
        // this.orbitLines.push( line )

    }

    sunColorShaderControl() {
        // let elapsed = clock.getElapsedTime();
        
        // elapsed += ( elapsed * .0001 );

        // const v = Math.sin( elapsed * 2 ) * .5 + .5;
        // const c1 = new THREE.Vector3(1, 0, 0);
        // const c2 = new THREE.Vector3(0, 1, 0);
        // const sunColor = c1.lerp(c2, v);

        // this.$sun.material.uniforms.u_time.value = elapsed;
        // this.$sun.material.uniforms.sphereColor.value = sunColor;

        this.$sun.rotation.y += .0005

    }

    render(){
        this.sunColorShaderControl();

        this.planetsOrbitAnimation();
        this.moonsOrbitAnimation()

        this.$asteroidBelt.rotation.y += .0009;
        this.$pouderBelt.rotation.y += .0003

        // this.x3.tick();
        // this.x3.fps(() => {
            this.renderer.render( this.scene, this.camera );
        // });
    }
}

export default App;