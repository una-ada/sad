import { Body, Cylinder } from 'cannon-es';
import { PerspectiveCamera, Vector3 } from 'three';
import { PlayerData } from './PlayerData';

/**
 * The Player class creates a player in the level as an extension of a camera
 * as this is a first person experience.
 */
export class Player extends PerspectiveCamera {
  data: PlayerData;
  floor: boolean;
  velocity: Vector3;
  body: Body;
  constructor() {
    let aspect = window.innerWidth / window.innerHeight;
    super(75, aspect, 0.1, 1e3);
    this.data = {
      height: 1.52,
      jump: 1,
      radius: 0.1,
      step: 0.5,
      walking: 1,
    };
    this.position.set(2, this.data.height, 4);
    this.rotation.set(0, 0, 0);

    this.velocity = new Vector3();
    this.floor = true;

    this.body = new Body({
      mass: 5,
      shape: new Cylinder(0.5, 0.5, 2),
      linearDamping: 0.9,
    });
  }

  handleResize = (): void => {
    this.aspect = window.innerWidth / window.innerHeight;
    this.updateProjectionMatrix();
  };
}
