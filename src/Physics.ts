/**
 * @file Sad Physics Wrapper
 * @author Una Ada <una@xn--z7x.dev>
 * @version 2.0.1
 *
 * Physics in the [original version]{@link https://xn--z7x.dev/sad/v2017} were
 * manually written using the THREE.js ray-caster. For extensibility and
 * reduction of scope in this project, I've decided to switch to using a
 * pre-built physics engine.
 *
 * Rewriting the physics by hand was also considered, referencing the THREE.js
 * [FPS example]{@link https://threejs.org/examples/#games_fps} and using the
 * octree implementation provided therein; however, this would again limit the
 * extensibility as well as generally be a pain on my part.
 *
 * The initial pick for physics engines was a JS port of the Bullet engine
 * [ammo.js]{@link https://github.com/kripken/ammo.js} due to THREE.js
 * [examples]{@link https://threejs.org/examples/#physics_ammo_instancing}
 * featuring it. This idea was shelved due to complications with my attempt to
 * implement it and the subsequent difficulty of bugfixes due to a lack of
 * available documentation.
 *
 * [OimoPhysics]{@link https://github.com/saharan/OimoPhysics} was also
 * considered for similar reasons. This one has available documentation
 * ({@link https://saharan.github.io/OimoPhysics/oimo/}), though it is clearly
 * lacking. My decision to move on from it was based on some performance tests
 * compared to ammo.js as well as its limited API.
 *
 * Ultimately, I decided on a natively written (rather than ported) engine:
 * [Cannon]{@link https://github.com/schteppe/cannon.js}. This was chosen based
 * on the [source code]{@link https://github.com/brunosimon/folio-2019} of
 * Bruno Simon's [portfolio]{@link https://bruno-simon.com/}, an impressive use
 * of THREE.js. The documentation for this is unavailable, as is its homepage,
 * as they original creator seems to have moved on; however, the developer
 * collective [Poimandres]{@link http://pmnd.rs/} actively maintains an updated
 * [fork]{@link https://github.com/pmndrs/cannon-es}, which is what I am using
 * in the wrapper here. Notably, this branch also removes the necessity for an
 * additional types dependency.
 */
import { Level } from './levels/Level';
import { Player } from './Player';
import { BufferGeometry, Clock, Vector3 } from 'three';
import { mergeVertices } from 'three/examples/jsm/utils/BufferGeometryUtils';
import {
  ConvexPolyhedron,
  GSSolver,
  NaiveBroadphase,
  Trimesh,
  Vec3,
  World,
} from 'cannon-es';

export class Physics {
  player: Player;
  level: Level;
  clock: Clock;
  world: World;
  constructor(player: Player, level: Level, iterations: number) {
    this.player = player;
    this.level = level;
    /*----- Cannon Setup -----------------------------------------------------*/
    this.world = new World();
    this.world.gravity.set(0, -9.81, 0);
    this.world.broadphase = new NaiveBroadphase();
    (this.world.solver as GSSolver).iterations = iterations;
    this.world.allowSleep = true;
  }
  update = (): void => {};
  loop = (): void => {
    requestAnimationFrame(this.loop);
    this.world.step(Math.min(this.clock.getDelta(), 0.1));
  };

  /*----- Vector Conversions -------------------------------------------------*/
  public static createVec3 = (source: Vector3): Vec3 =>
    new Vec3(source.x, source.y, source.z);
  public static createVector3 = (source: Vec3): Vector3 => 
    new Vector3(source.x, source.y, source.z);

  /*----- THREE to Cannon Geometry Conversions -------------------------------*/
  /**
   * Create a Cannon Trimesh given a THREE.js BufferGeometry, based on
   * CreateTrimesh from CannonUtils by {@link https://sbcode.net/ Sean Bradley}.
   */
  public static createTrimesh(geometry: BufferGeometry): Trimesh {
    var vertices: number[] = (
      geometry.index === null
        ? geometry.attributes.position.array
        : geometry.clone().toNonIndexed().attributes.position.array
    ) as number[];
    return new Trimesh(vertices, Object.keys(vertices).map(Number));
  }
  /**
   * Create a Cannon ConvexPolyhedron given a THREE.js BufferGeometry, based on
   * a {@link https://github.com/pmndrs/cannon-es/issues/103 proposed solution}
   * by {@link https://github.com/marcofugaro Marco Fugaro}.
   *
   * @todo Consider a further simplification of this function by adding a
   * {@link https://github.com/RedstoneWizard08/QuickHull QuickHull library}.
   */
  public static createConvexPolyhedron(
    geometry: BufferGeometry
  ): ConvexPolyhedron {
    var tempGeometry = new BufferGeometry();
    tempGeometry.setAttribute('position', geometry.getAttribute('position'));
    tempGeometry = mergeVertices(tempGeometry);
    var position: number[] = tempGeometry.attributes.position.array as number[],
      index: number[] = tempGeometry.index.array as number[],
      vertices: Vec3[] = [],
      faces: number[][] = [];
    for (let i = 0; i < position.length; i += 3)
      vertices.push(new Vec3(position[i], position[i + 1], position[i + 2]));
    for (let i = 0; i < index.length; i += 3)
      faces.push([index[i], index[i + 1], index[i + 2]]);
    return new ConvexPolyhedron({ vertices, faces });
  }
}
