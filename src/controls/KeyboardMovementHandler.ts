import { Vector3 } from 'three';
import { Binding } from './Binding';

type KeyStates = {
  [index: string]: number;
};

/**
 * This class acts as a handler for keyboard inputs to create a movement vector
 * for the player.
 */
export class KeyboardMovementHandler {
  binding: Binding;
  keyStates: KeyStates;

  /*----- Constructor --------------------------------------------------------*/
  constructor(binding: Binding) {
    this.binding = binding;
    this.keyStates = {};
    Object.keys(binding).reduce(
      (keyStates, control) =>
        binding[control].reduce((keyStates, keyBind) => {
          keyStates[keyBind.key] = 0;
          return keyStates;
        }, keyStates),
      this.keyStates
    );
  }

  get movement(): Vector3 {
    return new Vector3(
      this.binding.right.reduce(
        (total, keyBind) =>
          (total += this.keyStates[keyBind.key] * (keyBind.inverted ? -1 : 1)),
        0
      ),
      this.binding.jump.reduce(
        (total, keyBind) =>
          (total += this.keyStates[keyBind.key] * (keyBind.inverted ? -1 : 1)),
        0
      ),
      this.binding.forward.reduce(
        (total, keyBind) =>
          (total += this.keyStates[keyBind.key] * (keyBind.inverted ? -1 : 1)),
        0
      )
    ).normalize();
  }

  /*----- Handlers -----------------------------------------------------------*/
  /** Registers a key down event with the keyboard movement handler. */
  handleKeyDown = (event: KeyboardEvent): void => {
    this.keyStates[event.key] = 1;
  };
  /** Registers a key up event with the keyboard movement handler. */
  handleKeyUp = (event: KeyboardEvent): void => {
    this.keyStates[event.key] = 0;
  };
}
