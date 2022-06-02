import { Body, Cylinder } from 'cannon-es';
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
    var groundGeometry = new PlaneGeometry(600, 600),
      groundShape = Physics.createPrimitive(groundGeometry),
      groundMesh = new Mesh(
        groundGeometry,
        new MeshStandardMaterial({
          color: 0xffc8c8,
          roughness: 1,
          metalness: 0,
          emissive: 0,
        })
      ),
      groundBody = new Body({ mass: 0 });
    groundMesh.position.y = 0;
    groundMesh.rotation.x = -Math.PI / 2;
    groundMesh.receiveShadow = true;
    groundBody.addShape(groundShape);
    this.add(groundMesh);
    this.physics.addBody(groundBody);
    this.physics.attachBody(groundMesh, groundBody);

    /*----- Player -----------------------------------------------------------*/
    var playerShape = new Cylinder(0.5, 0.5, 2),
      playerBody = new Body({ mass: 5 });
    playerBody.addShape(playerShape);
    this.physics.addBody(playerBody);
    this.physics.attachBody(player, playerBody);
  }
}
