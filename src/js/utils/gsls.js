
export const _VS = `
    varying vec3 v_Normal;
    varying vec2 vUv;
    uniform vec3 shaderModification;
    uniform float u_time;

    void main() {
        float displacement = u_time * 0.1 ;
        float waves = sin(position.x) * cos(position.y) * sin(position.z) + sin(position.x) * cos(position.y) * sin(position.z);
        vec4 result = vec4( ( sin(u_time) * (sin(position.z)) ) * position.x,  position.y, position.z, 1.0 );

        gl_Position = projectionMatrix * modelViewMatrix * result;
        v_Normal = normal;
    }
`;

export const _FS = `
    varying vec3 v_Normal;
    varying vec2 vUv;
    uniform vec3 sphereColor;

    void main() {

        // float intensity = pow(0.8 - dot(v_normal, vec3(0, 0, 1.0)), 2.0)

        // gl_FragColor = vec4(v_Normal, 1.0);
        gl_FragColor = vec4(sphereColor, 1.0);
    }
`;