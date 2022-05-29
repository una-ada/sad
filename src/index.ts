/**
 * @file    Sad Game Wrapper
 * @author  Una Ada <una@xn--z7x.dev>
 * @version 2.0.1 (2022.05.28)
 */

/*----- Imports --------------------------------------------------------------*/
import levelHome from './levels/home';
import { Renderer } from './Renderer';
import { Player } from './Player';
import { PointerLockControls } from 'three/examples/jsm/controls/PointerLockControls';

/*----- Initialize -----------------------------------------------------------*/
const player = new Player();
const renderer = new Renderer(levelHome, player),
  caption = document.getElementById('caption'),
  controls = new PointerLockControls(player, renderer.domElement);
levelHome.add(player);
document.body.appendChild(renderer.domElement);

/*----- Event Listeners ------------------------------------------------------*/
window.addEventListener('resize', _ => {
  renderer.handleResize();
  player.handleResize();
});
document.addEventListener('mousedown', _ =>
  renderer.domElement.requestPointerLock()
);
document.addEventListener('keydown', e => {}, false);
document.addEventListener('keyup', e => {}, false);
controls.addEventListener('lock', e => {
  renderer.paused = false;
  caption.style.display = 'none';
});
controls.addEventListener('unlock', e => {
  renderer.paused = true;
  caption.style.display = 'block';
});

/*----- Start Game -----------------------------------------------------------*/
renderer.loop();
