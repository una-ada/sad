import { Level } from '../Level';
import {
  PlaneGeometry,
  MeshStandardMaterial,
  Mesh,
  BoxGeometry,
  MeshLambertMaterial,
} from 'three';

/*----- Initialize -----------------------------------------------------------*/
const levelHome = new Level();

//  Add Ground
var gnd_geo = new PlaneGeometry(600, 600),
  gnd_mat = new MeshStandardMaterial({
    color: 0xffc8c8,
    roughness: 1,
    metalness: 0,
    emissive: 0,
  }),
  plane = new Mesh(gnd_geo, gnd_mat);
plane.position.y = 0;
plane.rotation.x = -Math.PI / 2;
plane.receiveShadow = true;
levelHome.add(plane);

//  Add Cube
var geometry = new BoxGeometry(1, 1, 1),
  material = new MeshLambertMaterial({ color: 0xffc0c0 }),
  cube = new Mesh(geometry, material);
cube.position.y = 0.5;
cube.castShadow = true;
levelHome.add(cube);

//  Add Pillar
geometry = new BoxGeometry(1, 3, 1);
material = new MeshLambertMaterial({ color: 0xffc0c0 });
var pill = new Mesh(geometry, material);
pill.position.y = 1.5;
pill.position.x = 2;
pill.castShadow = true;
levelHome.add(pill);

/*----- Exports --------------------------------------------------------------*/
export default levelHome;
