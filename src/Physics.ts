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
import {
  BoxGeometry,
  BufferGeometry,
  Clock,
  CylinderGeometry,
  Event,
  Object3D,
  PlaneGeometry,
  Quaternion as THREEQuat,
  SphereGeometry,
  Vector3,
} from 'three';
import { mergeVertices } from 'three/examples/jsm/utils/BufferGeometryUtils';
import {
  Body,
  Box,
  ContactMaterial,
  ConvexPolyhedron,
  Cylinder,
  GSSolver,
  Material,
  NaiveBroadphase,
  Plane,
  Quaternion as CannonQuat,
  Sphere,
  Trimesh,
  Vec3,
  World,
} from 'cannon-es';

export class Physics extends World {
  /*----- Class Variables ----------------------------------------------------*/
  public static material: Material = new Material('physicsMaterial');
  private attachments: {
    mesh: Object3D<Event>;
    body: Body;
  }[];
  private clock: Clock;
  public player: Player;

  /*----- Constructor --------------------------------------------------------*/
  constructor(player: Player, iterations: number) {
    super({
      gravity: new Vec3(0, -9.81, 0),
      allowSleep: true,
      broadphase: new NaiveBroadphase(),
    });
    (this.solver as GSSolver).iterations = iterations;
    this.attachments = [];
    this.clock = new Clock();
    this.addContactMaterial(
      new ContactMaterial(Physics.material, Physics.material, {
        friction: 0.1,
        restitution: 0.7,
      })
    );
    this.player = player;
  }
  update = (): void => {
    for (let { mesh, body } of this.attachments) {
      mesh.position.copy(Physics.createVector3(body.position));
      if (mesh !== this.player)
        mesh.quaternion.copy(Physics.createTHREEQuat(body.quaternion));
    }
    this.step(Math.min(this.clock.getDelta(), 0.1));
    console.log(this.player.body.velocity);
  };
  loop = (): void => {
    requestAnimationFrame(this.loop);
    this.update();
  };

  attachBody = (mesh: Object3D<Event>, body: Body): void => {
    body.position.copy(Physics.createVec3(mesh.position));
    body.quaternion.copy(Physics.createCannonQuat(mesh.quaternion));
    this.attachments.push({ mesh, body });
  };

  /*----- Vector Conversions -------------------------------------------------*/
  public static createVec3 = (source: Vector3): Vec3 =>
    new Vec3(source.x, source.y, source.z);
  public static createVector3 = (source: Vec3): Vector3 =>
    new Vector3(source.x, source.y, source.z);
  public static createCannonQuat = (source: THREEQuat): CannonQuat =>
    new CannonQuat(source.x, source.y, source.z, source.w);
  public static createTHREEQuat = (source: CannonQuat): THREEQuat =>
    new THREEQuat(source.x, source.y, source.z, source.w);

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
  /**
   * Create a Cannon primitive shape (box, cylinder, etc.) given a THREE.js
   * primitive geometry of the same variety.
   *
   * Documentation on the Cannon Shape base class can be found
   * {@link https://pmndrs.github.io/cannon-es/docs/classes/Shape.html here}.
   * Primitives are implemented entirely as their own subclasses in Cannon,
   * likely for the sake of efficiency as different shapes allow for different
   * collision algorithms and such; however, THREE.js primitives are all merely
   * simplified constructors of the BufferGeometry base class as rendering and
   * physics have different requirements. Documentation for each of the mesh
   * classes used in this method are at the following links:
   *
   *  - {@link https://threejs.org/docs/#api/en/geometries/BoxGeometry}
   *  - {@link https://threejs.org/docs/#api/en/geometries/CylinderGeometry}
   *  - {@link https://threejs.org/docs/#api/en/geometries/PlaneGeometry}
   *  - {@link https://threejs.org/docs/#api/en/geometries/SphereGeometry}
   */
  public static createPrimitive(
    geometry: BoxGeometry | CylinderGeometry | PlaneGeometry | SphereGeometry
  ): Box | Cylinder | Plane | Sphere {
    switch (geometry.constructor) {
      case CylinderGeometry:
        var { radiusTop, radiusBottom, height } = (geometry as CylinderGeometry)
          .parameters;
        return new Cylinder(radiusTop, radiusBottom, height);
      case BoxGeometry:
        var { width, height, depth } = (geometry as BoxGeometry).parameters;
        return new Box(new Vec3(width / 2, height / 2, depth / 2));
      case PlaneGeometry:
        var { width, height } = (geometry as PlaneGeometry).parameters;
        /** @todo Find a better solution for setting box depth. */
        return new Box(new Vec3(width / 2, height / 2, 0.01));
      case SphereGeometry:
        var { radius } = (geometry as SphereGeometry).parameters;
        return new Sphere(radius);
      /** @todo Find a better solution for the default return. (Throw error?) */
      default:
        return new Box(new Vec3());
    }
  }
}
