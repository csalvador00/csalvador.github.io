import { Clock } from 'three';

const clock = new Clock();
const elapsed = clock.getElapsedTime();

export const sun = {
    name: "Sun",
    params: { 
        label: "sun",
        texture: "../../../assets/images/textures/sun_texture_01.jpg",
        config: {
            planetSize: 1.5,
            position: {x: 2, y: 1, z: 2},
            velocity: .0001,
            rotationAxis: {
                radianX: 8,
                radianY: 0,
                radianZ: 3,
            }
        }
    }
}
const rand = Math.floor(Math.random() * 2 + 1);

const randomSinal = Math.floor(Math.random() * (-1 - 1) + 1) == 0 ? 1 : -1; 

export const planets = [
    {name: "Mercurio",
        params: {   
            label: "mercury",
            texture: "../../../assets/images/textures/planets/mercury_texture_01.jpg",
            planetNumber: 1,
            theIsASatelite: false,
            config: {
                planetSize: 1,
                addictionalTextures: null,
                atmosphereColor: 0x3f4759,
                position: {x: 3, y: 1, z: 3},
                velocity: .0005,
                rotationAxis: {
                    radianX: 7,
                    radianY: 4,
                    radianZ: 7,
                }
            }
        }
    },
    {name: "Venus",
        params: {
            label: "venus",
            texture: "../../../assets/images/textures/planets/venus_texture_01.jpg",
            planetNumber: 2,
            theIsASatelite: false,
            config: {
                planetSize: 1.1,
                addictionalTextures: null,
                atmosphereColor: 0xdb7814,
                position: {x: 5, y: 1, z: 5},
                velocity: .00009,
                rotationAxis: {
                    radianX: 9,
                    radianY: -4,
                    radianZ: 9,
                }
            }
        }
    },
    {name: "Earth",
        params: { 
            label: "earth",
            texture: "../../../assets/images/textures/planets/earth_texture_01.jpg",
            planetNumber: 3,
            theIsASatelite: true,
            sateliteName: "earthMoon",
            config: {
                planetSize: 2,
                addictionalTextures: "../../../assets/images/textures/planets/earth_hlights.jpg",
                atmosphereColor: 0x1488db,
                position: {x: 7, y: 1, z: 7},
                velocity: .00008,
                rotationAxis: {
                    radianX: 15,
                    radianY: 4,
                    radianZ: 13,
                }
            }
        }
    },
    {name: "Mars",
        params: {
            label: "mars",
            texture: "../../../assets/images/textures/planets/mars_texture_01.jpg",
            planetNumber: 4,
            theIsASatelite: false,
            config: {
                planetSize: 2.2,
                addictionalTextures: null,
                atmosphereColor: 0xdb5614,
                position: {x: 9, y: 1, z: 9},
                velocity: .00007,
                rotationAxis: {
                    radianX: 22,
                    radianY: -6,
                    radianZ: 22,
                }
            }
        }
    },
    {name: "Jupiter",
        params: {
            label: "jupiter",
            texture: "../../../assets/images/textures/planets/jupiter_texture_01.jpg",
            planetNumber: 1.5,
            theIsASatelite: true,
            atmosphereColor: 0xa17f32,
            sateliteName: "jupiterMoons",
            config: {
                planetSize: 4,
                addictionalTextures: null,
                position: {x: 11, y: 1, z: 11},
                velocity: .000035,
                rotationAxis: {
                    radianX: 52,
                    radianY: 8,
                    radianZ: 52,
                }
            }
        }
    },
    {name: "Saturn",
        params: {
            label: "saturn",
            texture: "../../../assets/images/textures/planets/saturn_texture_01.jpg",
            planetNumber: 6,
            theIsASatelite: true,
            sateliteName: "saturnRings",
            config: {
                planetSize: 2,
                addictionalTextures: null,
                atmosphereColor: 0x28385e,
                position: {x: 15, y: 1, z: 15},
                velocity: .00002,
                rotationAxis: {
                    radianX: 64,
                    radianY: 7,
                    radianZ: 64,
                }
            }
        }
    },
    {name: "Uran",
        params: {
            label: "uran",
            texture: "../../../assets/images/textures/planets/uran_texture_01.jpg",
            planetNumber: 7,
            atmosphereColor: 0x27499c,
            theIsASatelite: false,
            config: {
                planetSize: 1.4,
                addictionalTextures: null,
                position: {x: 17, y: 1, z: 17},
                velocity: .0000015,
                rotationAxis: {
                    radianX: 80,
                    radianY: 14,
                    radianZ: 80,
                }
            }
        }
    },
    {name: "Neptune",
        params: {
            label: "neptune",
            texture: "../../../assets/images/textures/planets/neptune_texture_01.jpg",
            planetNumber: 8,
            atmosphereColor: 0x274182,
            theIsASatelite: false,
            config: {
                planetSize: 1.2,
                addictionalTextures: null,
                position: {x: 20, y: 1, z: 20},
                velocity: .000012,
                rotationAxis: {
                    radianX: 100,
                    radianY: 0,
                    radianZ: 100,
                }
            }
        }
    }
]

export const moons = {
    earthMoon: {
        name: "moon",
        hasAList: false,
        params: {
            label: "moon",
            texture: "../../../assets/images/textures/moons/earth_moon.jpg",
            type: "moon",
            config: {
                planetSize: 1.5,
                position: {x: 2, y: 0, z: 2},
                velocity: .0025,
                rotationAxis: {
                    radianX: 3.5,
                    radianY: 0,
                    radianZ: 3.5,
                }
            }
        }
    },
    jupiterMoons: {
        name: "jupiterMoons",
        hasAList: true,
        moons: [
            {
                name: "Callisto",
                params: { 
                    texture: "../../../assets/images/textures/moons/callisto.jpg",
                    type: "moon",
                    config: {
                        planetSize: 1.5,
                        position: {x: 0, y: 0, z: 0},
                        velocity: .001,
                        rotationAxis: {
                            radianX: 7,
                            radianY: 0,
                            radianZ: 5,
                        }
                    }
                }
            },
            {
                name: "Moon02",
                params: { 
                    texture: "../../../assets/images/textures/moons/europa.jpg",
                    type: "moon",
                    config: {
                        planetSize: 1.5,
                        position: {x: 0, y: 0, z: 0},
                        velocity: .001,
                        rotationAxis: {
                            radianX: 7.5,
                            radianY: 0,
                            radianZ: 7.5,
                        }
                    }
                }
            },
            {
                name: "Moon03",
                params: { 
                    texture: "../../../assets/images/textures/moons/ganymede.jpg",
                    type: "moon",
                    config: {
                        planetSize: 1.5,
                        position: {x: 0, y: 0, z: 0},
                        velocity: .001,
                        rotationAxis: {
                            radianX: 5,
                            radianY: 2,
                            radianZ: 5,
                        }
                    }
                }
            },
            {
                name: "Moon02",
                params: { 
                    texture: "../../../assets/images/textures/moons/io.jpg",
                    type: "moon",
                    config: {
                        planetSize: 1.5,
                        position: {x: 0, y: 0, z: 0},
                        velocity: .001,
                        rotationAxis: {
                            radianX: 6,
                            radianY: -1.5,
                            radianZ: 5.2,
                        }
                    }
                }
            }
        ]
    },
    saturnRings: {
        name: "saturnRings",
        hasAList: false,
        params: {
            label: "moon",
            texture: "../../../assets/images/textures/moons/earth_moon.jpg",
            type: "ring",
            config: {
                planetSize: 1.5,
                position: {x: 2, y: 0, z: 2},
                velocity: .0025,
                rotationAxis: {
                    radianX: 6,
                    radianY: 0,
                    radianZ: 6,
                }
            }
        }
    },
    mars: {name: "Mars", texture: "../../../assets/images/textures/planets/mercury_texture_01.jpg"}
}