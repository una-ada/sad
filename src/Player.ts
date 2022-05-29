/**
 * @file    Sad Player Class
 * @author  Una Ada <una@xn--z7x.dev>
 * @version 2.0.1 (2022.05.28)
 */

/*----- Imports --------------------------------------------------------------*/
import { PerspectiveCamera, Vector3 } from 'three';
import { PlayerData } from './PlayerData';

/*----- Class Definition -----------------------------------------------------*/
export class Player extends PerspectiveCamera {
  public data: PlayerData;
  public canJump: boolean;
  public velocity: Vector3;
  constructor() {
    let aspect = window.innerWidth / window.innerHeight;
    super(75, aspect, 0.1, 1e3);
    this.data = {
      height: 1.52,
      jump: 0.12,
      radius: 0.1,
      step: 0.5,
      walking: 0.07,
    };
    this.position.set(2, this.data.height, 4);
    this.rotation.set(0, 0, 0);
    this.velocity = new Vector3();
    this.canJump = true;
  }
  public handleResize() {
    this.aspect = window.innerWidth / window.innerHeight;
    this.updateProjectionMatrix();
  }
}
