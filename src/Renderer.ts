/**
 * @file    Sad Renderer Class
 * @author  Una Ada <una@xn--z7x.dev>
 * @version 2.0.1 (2022.05.29)
 */

/*----- Imports --------------------------------------------------------------*/
import { PCFShadowMap, WebGLRenderer } from 'three';
import { Level } from './Level';
import { Player } from './Player';

/*----- Class Definition -----------------------------------------------------*/
export class Renderer extends WebGLRenderer {
  paused: boolean;
  level: Level;
  player: Player;
  constructor(level: Level, player: Player) {
    /*----- Super ------------------------------------------------------------*/
    super();
    this.setSize(window.innerWidth, window.innerHeight);
    this.shadowMap.enabled = true;
    this.shadowMap.type = PCFShadowMap;

    /*----- Game Relevant ----------------------------------------------------*/
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
