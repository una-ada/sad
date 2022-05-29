import { KeyBind } from "./KeyBind";

export interface Binding {
  forward: KeyBind[],
  right: KeyBind[],
  jump: KeyBind[],
  lookUp?: KeyBind[],
  lookRight?: KeyBind[],
}