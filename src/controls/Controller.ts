import { Vector3 } from 'three';
import { Player } from '../Player';
import { KeyboardMovementHandler } from './KeyboardMovementHandler';

export class Controller {
  player: Player;
  handlers: KeyboardMovementHandler[];
  constructor(player: Player, handlers: KeyboardMovementHandler[]) {
    this.player = player;
    this.handlers = handlers;
  }

  update = (): void => {
    let movement: Vector3 = this.handlers.reduce(
        (sum, handler) => sum.add(handler.movement),
        new Vector3()
      ),
      forward: Vector3 = new Vector3(0, 0, -1).applyQuaternion(
        this.player.quaternion
      ),
      right: Vector3 = forward.clone().cross(this.player.up);
    forward
      .multiplyScalar(movement.z)
      .add(right.multiplyScalar(movement.x))
      .normalize()
      .multiplyScalar(this.player.data.walking);
    forward.y = 0;
    if (this.player.floor && movement.y > 0)
      this.player.velocity.y += this.player.data.jump;
    this.player.position.add(forward);
  };
  loop = (): void => {
    this.update();
    requestAnimationFrame(this.loop);
  };
}
