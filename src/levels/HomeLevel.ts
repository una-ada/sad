import { Level } from './Level';
import { Mesh, BoxGeometry, MeshLambertMaterial } from 'three';
import { Player } from '../Player';

export class HomeLevel extends Level {
  constructor(player: Player) {
    super(player);

    //  Add Cube
    var cube = new Mesh(
      new BoxGeometry(1, 1, 1),
      new MeshLambertMaterial({ color: 0xffc0c0 })
    );
    cube.position.y = 0.5;
    cube.castShadow = true;
    this.add(cube);

    //  Add Pillar
    var pillar = new Mesh(
      new BoxGeometry(1, 3, 1),
      new MeshLambertMaterial({ color: 0xffc0c0 })
    );
    pillar.position.y = 1.5;
    pillar.position.x = 2;
    pillar.castShadow = true;
    this.add(pillar);
  }
}
