import CustomGeometry from "../geometries";

class Floor extends CustomGeometry {
    constructor() {
        this.$geometry = new BoxGeometry(10, .25, 10);
        this.$material = new MeshStandardMaterial( {
            color: this.$color
        } );

        this.$mesh = new Mesh( this.$geometry, this.$material);
    }
}