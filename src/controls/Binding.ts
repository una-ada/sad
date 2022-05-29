import { KeyBind } from "./KeyBind";

export interface Binding {
  [control: string]: KeyBind[],
  forward: KeyBind[],
  right: KeyBind[],
  jump: KeyBind[],
  lookUp?: KeyBind[],
  lookRight?: KeyBind[],
}