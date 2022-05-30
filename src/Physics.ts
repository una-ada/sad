import { Intersection, Raycaster, Vector3 } from 'three';
import { Level } from './levels/Level';
import { Player } from './Player';

export class Physics {
  player: Player;
  level: Level;
  rate: number;
  constructor(player: Player, level: Level, rate: number) {
    this.player = player;
    this.level = level;
    this.rate = rate;
  }
  getPlayerGrounds(): Intersection[] {
    let caster = new Raycaster(
      this.player.position.clone(),
      new Vector3(0, -1, 0),
      0,
      this.player.data.step + 0.01
    );
    caster.ray.origin.y -= this.player.data.height - this.player.data.step;
    return caster.intersectObjects(this.level.children);
  }
  update = (): void => {
    console.log(this.player.velocity, this.player.canJump)
    this.player.velocity.y -= 0.98 / this.rate;
    var grounds = this.getPlayerGrounds();
    if (grounds.length > 0) {
      this.player.position.y = grounds[0].point.y + this.player.data.height;
      this.player.velocity.y = Math.max(this.player.velocity.y, 0);
      this.player.canJump = true;
    } else {
      this.player.canJump = false;
    }
    this.player.position.add(
      this.player.velocity.clone().multiplyScalar(1 / this.rate)
    );
  };
  loop = (): void => {
    this.update();
    window.setTimeout(this.loop, 1000 / this.rate);
  };
}
