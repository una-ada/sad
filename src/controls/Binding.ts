import { KeyBind } from "./KeyBind";

/** List of game control bindings. */
export interface Binding {
  forward: KeyBind[],
  right: KeyBind[],
  jump: KeyBind[],
  lookUp?: KeyBind[],
  lookRight?: KeyBind[],
}