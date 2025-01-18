export const existInCurrentPosition = ( inter, draggable ) => {

    return inter.find( obj => {
        const $obj3D = obj.object;

        if( $obj3D.userData.draggable && ( draggable.userData.id != $obj3D.userData.id ) ) {
            return ( (draggable.position.x === $obj3D.position.x) &&
                    (draggable.position.z === $obj3D.position.z) )
        }

    });
}

export const isGround = ( $obj3D ) => {

    return ( $obj3D.object.name == "floor" )

}