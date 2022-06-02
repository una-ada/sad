import { Level } from './Level';
import { Mesh, BoxGeometry, MeshLambertMaterial } from 'three';
import { Player } from '../Player';
import { Body } from 'cannon-es';
import { Physics } from '../Physics';

export class HomeLevel extends Level {
  constructor(player: Player) {
    super(player);

    //  Add Cube
    var cube = new Mesh(
        new BoxGeometry(1, 1, 1),
        new MeshLambertMaterial({ color: 0xffc0c0 })
      ),
      cubeBody = new Body({
        mass: 0,
        material: Physics.material,
        shape: Physics.createPrimitive(cube.geometry),
        type: Body.STATIC,
      });
    cube.position.y = 0.5;
    cube.castShadow = true;
    this.add(cube);
    this.physics.addBody(cubeBody);
    this.physics.attachBody(cube, cubeBody);

    //  Add Pillar
    var pillar = new Mesh(
        new BoxGeometry(1, 3, 1),
        new MeshLambertMaterial({ color: 0xffc0c0 })
      ),
      pillarBody = new Body({
        mass: 0,
        material: Physics.material,
        shape: Physics.createPrimitive(pillar.geometry),
        type: Body.STATIC,
      });
    pillar.position.y = 1.5;
    pillar.position.x = 2;
    pillar.castShadow = true;
    this.add(pillar);
    this.physics.addBody(pillarBody);
    this.physics.attachBody(pillar, pillarBody);
  }
}
