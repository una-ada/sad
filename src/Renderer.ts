/**
 * @file    Sad Renderer Class
 * @author  Una Ada <una@xn--z7x.dev>
 * @version 2.0.1 (2022.05.28)
 */

/*----- Imports --------------------------------------------------------------*/
import { PCFShadowMap, WebGLRenderer } from 'three';
import { Level } from './Level';
import { Player } from './Player';

/*----- Class Definition -----------------------------------------------------*/
export class Renderer extends WebGLRenderer {
  public paused: boolean;
  private level: Level;
  private player: Player;
  constructor(level: Level, player: Player) {
    /*----- Super ------------------------------------------------------------*/
    super();
    this.setSize(window.innerWidth, window.innerHeight);
    this.shadowMap.enabled = true;
    this.shadowMap.type = PCFShadowMap;

    /*----- Game Relevant ----------------------------------------------------*/
    this.paused = true;
    this.level = level;
  }
  public loop() {
    requestAnimationFrame(this.loop);
    super.render(this.level, this.player);
  }
  public handleResize() {
    this.setSize(window.innerWidth, window.innerHeight);
  }
}
