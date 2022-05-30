import { Level } from "./levels/Level";
import { Player } from "./Player";

export class Physics {
  player: Player;
  level: Level;
  constructor(player: Player, level: Level) {
    this.player = player;
    this.level = level;
    
  }
}
