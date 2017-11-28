THREE.GamepadControls = function ( camera ) {
	var scope = this;
	camera.rotation.set( 0, 0, 0 );
	var pitchObject = new THREE.Object3D();
	pitchObject.add( camera );
	var yawObject = new THREE.Object3D();
	yawObject.position.y = 10;
	yawObject.add( pitchObject );
	var PI_2 = Math.PI / 2;
	this.update = function ( x , y ) {
		var movementX = Math.abs(x)<1/3?0:x;
		var movementY = Math.abs(y)<1/3?0:y;

		yawObject.rotation.y -= movementX * 0.002;
		pitchObject.rotation.x -= movementY * 0.002;

		pitchObject.rotation.x = Math.max( - PI_2, Math.min( PI_2, pitchObject.rotation.x ) );

	};
	this.getObject = function () {
		return yawObject;
	};
	this.getDirection = function() {
		var direction = new THREE.Vector3( 0, 0, - 1 );
		var rotation = new THREE.Euler( 0, 0, 0, "YXZ" );
		return function( v ) {
			rotation.set( pitchObject.rotation.x, yawObject.rotation.y, 0 );
			v.copy( direction ).applyEuler( rotation );
			return v;
		};
	}();
};
