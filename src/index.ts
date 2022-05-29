import levelHome from './levels/home';
import { Renderer } from './Renderer';
import { Player } from './Player';
import { PointerLockControls } from 'three/examples/jsm/controls/PointerLockControls';
import { KeyboardMovementHandler } from './controls/KeyboardMovementHandler';
import { Controller } from './controls/Controller';

/*----- Initialize -----------------------------------------------------------*/
const player = new Player(),
  renderer = new Renderer(levelHome, player),
  caption = document.getElementById('caption'),
  cameraControls = new PointerLockControls(player, renderer.domElement),
  movementControls = new KeyboardMovementHandler({
    forward: [
      { key: 'w', inverted: false },
      { key: 's', inverted: true },
      { key: 'ArrowUp', inverted: false },
      { key: 'ArrowDown', inverted: true },
    ],
    right: [
      { key: 'd', inverted: false },
      { key: 'a', inverted: true },
      { key: 'ArrowRight', inverted: false },
      { key: 'ArrowLeft', inverted: true },
    ],
    jump: [{ key: ' ', inverted: false }],
  }),
  controller = new Controller(player, [movementControls])
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
document.addEventListener('keydown', movementControls.handleKeyDown);
document.addEventListener('keyup', movementControls.handleKeyUp);
cameraControls.addEventListener('lock', e => {
  renderer.paused = false;
  caption.style.display = 'none';
});
cameraControls.addEventListener('unlock', e => {
  renderer.paused = true;
  caption.style.display = 'block';
});

/*----- Start Game -----------------------------------------------------------*/
renderer.loop();
controller.loop();

