import { AmbientLight, Color, FogExp2, PointLight, Scene } from 'three';

export class Level extends Scene {
  constructor() {
    super();
    this.background = new Color(0xffcccc);
    this.fog = new FogExp2(0xffcccc, 0.16);

    var sun = new PointLight(0xffffff, 0.15),
      scatter = new AmbientLight(0xffffff, 0.95);
    sun.castShadow = true;
    sun.position.set(-2.2, 5, 1.8);
    this.add(sun);
    this.add(scatter);
  }
}
