/**
 * @file    Sad Player Data Interface
 * @author  Una Ada <una@xn--z7x.dev>
 * @version 2.0.1 (2022.05.28)
 */

import { Vector3 } from 'three';

/*----- Interface ------------------------------------------------------------*/
export interface PlayerData {
  height: number;
  jump: number;
  radius: number;
  step: number;
  walking: number;
}
