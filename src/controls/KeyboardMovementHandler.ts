import { Binding } from "./Binding";

/**
 * This class acts as a handler for keyboard inputs to create a movement vector 
 * for the player.
 */
export class KeyBoardMovementHandler {
  binding: Binding;
  constructor(binding: Binding) {
    this.binding = binding;

  }
}
