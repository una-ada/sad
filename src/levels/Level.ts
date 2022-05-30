import {
  AmbientLight,
  Color,
  Event,
  FogExp2,
  Mesh,
  MeshStandardMaterial,
  Object3D,
  PlaneGeometry,
  PointLight,
  Scene,
} from 'three';

export class Level extends Scene {
  objects: Object3D<Event>[];

  constructor() {
    super();
    this.objects = [];
    this.background = new Color(0xffcccc);
    this.fog = new FogExp2(0xffcccc, 0.16);

    /*----- Lighting ---------------------------------------------------------*/
    var sun = new PointLight(0xffffff, 0.15),
      scatter = new AmbientLight(0xffffff, 0.95);
    sun.castShadow = true;
    sun.position.set(-2.2, 5, 1.8);
    super.add(sun);
    super.add(scatter);

    /*----- Ground -----------------------------------------------------------*/
    var ground = new Mesh(
      new PlaneGeometry(600, 600),
      new MeshStandardMaterial({
        color: 0xffc8c8,
        roughness: 1,
        metalness: 1,
        emissive: 0,
      })
    );
    ground.position.y = 0;
    ground.rotation.x = -Math.PI / 2;
    ground.receiveShadow = true;
    this.add(ground);
  }

  add(...object: Object3D<Event>[]): this {
      super.add(...object);
      this.objects.push(...object);
      return this;
  }
}
