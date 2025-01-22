import {
    BoxGeometry,
    MeshStandardMaterial,
    MeshPhongMaterial,
    Mesh,
    TextureLoader,
    SRGBColorSpace,
    SphereGeometry,
    MeshBasicMaterial,
    PointLight,
    ShaderMaterial,
    Vector2,
    Group,
    AdditiveBlending,
    Clock,
    Color
} from 'three';
// import { texture } from 'three/webgpu';
import { _VS, _FS } from '../utils/gsls.js';
import { Vector3 } from 'three/webgpu';
import { getFresnelMat } from '../utils/getFresnelMat.js';

const defaultParams = {
    texture: "",
    config: {
        position: []
    }
}

const clock = new Clock();

export default class CustomGeometry {
    constructor( type, color, params = defaultParams ){
        this.$type = type;
        this.$color = color;
        this.$position = params.config.position;
        this.$texture = params.texture;
        this.$config = params.config;

        // console.log(`TYPE : ${type}`);
        this[type]();

    }

    sun() {

        const sunGroup = new Group();

        let light = new PointLight( 0xf0f0c7, 10000, 900000, 2 );
        light.castShadow = true;
        light.scale.x = 10;
        light.scale.y = 10;
        light.scale.z = 10;
        light.shadow.bias = - 0.005; // reduces self-shadowing on double-sided objects

        const texture = new TextureLoader().load( this.$texture );
        texture.colorSpace = SRGBColorSpace;

        this.$geometry = new SphereGeometry( 13.5, 100, 100 );
        // this.$material = new ShaderMaterial( {
        //     wireframe: true,
        //     uniforms: {
        //         u_time: {
        //             value: 0.0
        //         },
        //         sphereColor: {
        //             value: new Vector3(0, 0, 1)
        //         }
        //     },

        //     vertexShader: _VS,
        //     fragmentShader: _FS
        // } );

        this.$material = new MeshBasicMaterial( { color: 0xe81717, map: texture } );
        this.$material.color.multiplyScalar( 200 );
        
        let sphere = new Mesh( this.$geometry, this.$material );
        // light.add( sphere );

        const glowMesh = new Mesh( this.$geometry, getFresnelMat() );
        glowMesh.scale.setScalar( 1.02 )
        
        sunGroup.add( light );
        sunGroup.add( sphere );
        sunGroup.add( glowMesh );

        light.position.set(0, 1, 0);

        this.$mesh = sunGroup;
        this.$mesh.userData.name = "sun";
    }
    planet() {

        const sunGroup = new Group();

        this.$geometry = new SphereGeometry(this.$config.planetSize, 50, 32);
        this.$material = new MeshStandardMaterial( {
            map: new TextureLoader().load( this.$texture )
        } );

        const atmosphereColor = this.$config.atmosphereColor;

        const glowMesh = new Mesh( this.$geometry, getFresnelMat( { atmosphereColor } ) );
        glowMesh.scale.setScalar( 1.02 );
        glowMesh.material.uniforms.color1.value = new Color(atmosphereColor);
        
        const planetmesh = new Mesh( this.$geometry, this.$material );

        sunGroup.add( planetmesh );
        sunGroup.add( glowMesh );

        if( this.$config.addictionalTextures != null ) {
            const addTexture = new MeshBasicMaterial( {
                map: new TextureLoader().load( this.$config.addictionalTextures ),
                blending: AdditiveBlending,
            } );
            const planetAddictionalMesh = new Mesh( this.$geometry, addTexture );
            sunGroup.add( planetAddictionalMesh );
        }

        this.$mesh = sunGroup;
        this.$mesh.position.set( this.$position.x, this.$position.y, this.$position.z);
        this.$mesh.castShadow = true;
        this.$mesh.userData.config = this.$config;
    }

    moon() {
        this.$geometry = new SphereGeometry(.5, 32, 16);
        this.$material = new MeshStandardMaterial( {
            map: new TextureLoader().load( this.$texture ),
            emissive: true,
            emissiveIntensity: 3
        } );
        
        this.$mesh = new Mesh( this.$geometry, this.$material );
        // this.$mesh.position.set( Math.sin( this.$position.x ), 0, Math.cos( this.$position.z ));
        this.$mesh.castShadow = true;
        this.$mesh.userData.config = this.$config;
    }

    commeet() {

        const cometGroup =  new Group();
        const textureLoader = new TextureLoader();
        const textureBase = textureLoader.load("../../../assets/images/textures/astros/rock/baseColor.jpg");
        const textureNormal = textureLoader.load("../../../assets/images/textures/astros/rock/normal.jpg");
        const textureRoughness = textureLoader.load("../../../assets/images/textures/astros/rock/roughness.jpg");
        const textureHeight = textureLoader.load("../../../assets/images/textures/astros/rock/height.png");
        const textureAmbientOcclusion = textureLoader.load("../../../assets/images/textures/astros/rock/ambientOcclusion.jpg");

        this.$geometry = new SphereGeometry(1, 32, 16);
        this.$material = new MeshStandardMaterial( {
            map: textureBase,
            normalMap: textureNormal,
            displacementMap: textureHeight,
            displacementScale: 1,
            roughnessMap: textureRoughness,
            roughness: 0,
            aoMap: textureAmbientOcclusion
        } );

        const cometMesh = new Mesh( this.$geometry, this.$material );
        cometMesh.geometry.attributes.uv2 = cometMesh.geometry.attributes.uv;
        cometMesh.scale.x = 2;
        cometMesh.rotation.y = .1;
        // cometMesh.rotation.z = .5;

        const atmosphereColor = this.$config.atmosphereColor;

        const glowMesh = new Mesh( this.$geometry, getFresnelMat() );
        // glowMesh.scale.setScalar( 3 );
        // glowMesh.material.uniforms.color1.value = new Color(atmosphereColor);
        // glowMesh.material.uniforms.color2.value = new Color(atmosphereColor);
        // glowMesh.material.uniforms.fresnelScale.value = 1.2;
        // glowMesh.material.uniforms.fresnelPower.value = 1.0;

        // cometGroup.add(glowMesh);
        
        this.$mesh = cometGroup.add(cometMesh);
        // this.$mesh.position.set( Math.sin( this.$position.x ), this.$position.y, Math.cos( this.$position.z ));
        // this.$mesh.position.set( this.$position.x, this.$position.y, this.$position.z);
        
        this.$mesh.castShadow = true;
        this.$mesh.userData.config = this.$config;
    }

    cube() {
        this.$geometry = new BoxGeometry();
        this.$material = new MeshStandardMaterial( {
            color: this.$color,
            transparent: true
        } );

        this.$mesh = new Mesh( this.$geometry, this.$material);
        this.$mesh.position.set( this.$position.x *2, this.$position.y + 2, this.$position.z * -2);
        this.$mesh.name = "cube";
        this.$mesh.userData.name = "cube";
    }

    get geometry(){
        return this.$geometry;
    }

    get material(){
        return this.$material;
    }

    get mesh(){
        return this.$mesh;
    }
}