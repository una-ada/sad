import { PCFShadowMap, WebGLRenderer } from 'three';
import { Level } from './Level';
import { Player } from './Player';

/**
 * This renderer acts as a wrapper for the THREE.js WebGLRenderer by extending
 * it into a new class. By extending the base class, the scene (level) and
 * camera (player) can be passed into the constructor.
 */
export class Renderer extends WebGLRenderer {
  paused: boolean;
  level: Level;
  player: Player;
  constructor(level: Level, player: Player) {
    super();
    this.setSize(window.innerWidth, window.innerHeight);
    this.shadowMap.enabled = true;
    this.shadowMap.type = PCFShadowMap;

    this.paused = true;
    this.level = level;
    this.player = player;
  }
  loop(): void {
    this.render(this.level, this.player);
    requestAnimationFrame(this.loop.bind(this));
  }
  handleResize(): void {
    this.setSize(window.innerWidth, window.innerHeight);
  }
}
