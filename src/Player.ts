import { Body, Cylinder, Vec3 } from 'cannon-es';
import { PerspectiveCamera, Vector3 } from 'three';
import { Physics } from './Physics';
import { PlayerData } from './PlayerData';

/**
 * The Player class creates a player in the level as an extension of a camera
 * as this is a first person experience.
 */
export class Player extends PerspectiveCamera {
  data: PlayerData;
  floor: boolean;
  velocity: Vector3;
  body: Body;
  constructor() {
    let aspect = window.innerWidth / window.innerHeight;
    super(75, aspect, 0.1, 1e3);
    this.data = {
      height: 1.52,
      jump: 7.3,
      radius: 0.1,
      step: 0.5,
      walking: 0.3,
    };
    this.position.set(2, this.data.height, 4);
    this.rotation.set(0, 0, 0);

    /*----- Initialize Cannon Body -------------------------------------------*/
    this.body = new Body({
      allowSleep: false,
      fixedRotation: true,
      linearDamping: 0.9,
      mass: 5,
      material: Physics.material,
      shape: new Cylinder(0.5, 0.5, 2),
      type: Body.DYNAMIC,
    });

    /*----- Jump Handling ----------------------------------------------------*/
    this.floor = false;
    /** @todo This has type `any` which sucks and I hate it. */
    this.body.addEventListener(Body.COLLIDE_EVENT_NAME, (event: any) => {
      var { bi, ni } = event.contact,
        normal = new Vec3(),
        up = new Vec3(0, 1, 0);
      if (bi.id === this.body.id) ni.negate(normal);
      else normal.copy(ni);
      /** 
       * @todo The `0.5` here is a threshold for what constitutes being on top 
       * of something. Probably want to make this a Physics constant. */
      if (normal.dot(up) > 0.5) this.floor = true;
    });
  }

  handleResize = (): void => {
    this.aspect = window.innerWidth / window.innerHeight;
    this.updateProjectionMatrix();
  };
}
