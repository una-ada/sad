/**
 * @file    Sad Level Class
 * @author  Una Ada <una@xn--z7x.dev>
 * @version 2.0.1 (2022.05.28)
 */

/*----- Imports --------------------------------------------------------------*/
import { AmbientLight, Color, FogExp2, PointLight, Scene } from 'three';

/*----- Class Definition -----------------------------------------------------*/
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
