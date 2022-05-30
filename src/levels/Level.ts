import {
  AmbientLight,
  Color,
  FogExp2,
  Mesh,
  MeshStandardMaterial,
  PlaneGeometry,
  PointLight,
  Scene,
} from 'three';

export class Level extends Scene {
  constructor() {
    super();
    this.background = new Color(0xffcccc);
    this.fog = new FogExp2(0xffcccc, 0.16);

    /*----- Lighting ---------------------------------------------------------*/
    var sun = new PointLight(0xffffff, 0.15),
      scatter = new AmbientLight(0xffffff, 0.95);
    sun.castShadow = true;
    sun.position.set(-2.2, 5, 1.8);
    this.add(sun);
    this.add(scatter);

    /*----- Ground -----------------------------------------------------------*/
    var ground = new Mesh(
      new PlaneGeometry(600, 600),
      new MeshStandardMaterial({
        color: 0xffc8c8,
        roughness: 1,
        metalness: 0,
        emissive: 0,
      })
    );
    ground.position.y = 0;
    ground.rotation.x = -Math.PI / 2;
    ground.receiveShadow = true;
    this.add(ground);
  }

}
