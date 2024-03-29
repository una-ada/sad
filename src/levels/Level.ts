import { Body } from 'cannon-es';
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
import { Physics } from '../Physics';
import { Player } from '../Player';

export class Level extends Scene {
  physics: Physics;
  player: Player;
  constructor(player: Player) {
    super();
    this.background = new Color(0xffcccc);
    this.fog = new FogExp2(0xffcccc, 0.16);
    this.player = player;
    this.physics = new Physics(player, 10);

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
      ),
      groundBody = new Body({
        mass: 0,
        material: Physics.material,
        shape: Physics.createPrimitive(ground.geometry),
        type: Body.STATIC,
      });
    ground.position.y = 0;
    ground.rotation.x = -Math.PI / 2;
    ground.receiveShadow = true;
    this.add(ground);
    this.physics.addBody(groundBody);
    this.physics.attachBody(ground, groundBody);

    /*----- Player -----------------------------------------------------------*/
    this.physics.addBody(this.player.body);
    this.physics.attachBody(this.player, this.player.body);
  }
}
