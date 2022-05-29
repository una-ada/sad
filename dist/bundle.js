/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/Player.ts":
/*!***********************!*\
  !*** ./src/Player.ts ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Player\": () => (/* binding */ Player)\n/* harmony export */ });\n/* harmony import */ var three__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! three */ \"./node_modules/three/build/three.module.js\");\n\n/**\n * The Player class creates a player in the level as an extension of a camera\n * as this is a first person experience.\n */\nclass Player extends three__WEBPACK_IMPORTED_MODULE_0__.PerspectiveCamera {\n    constructor() {\n        let aspect = window.innerWidth / window.innerHeight;\n        super(75, aspect, 0.1, 1e3);\n        this.handleResize = () => {\n            this.aspect = window.innerWidth / window.innerHeight;\n            this.updateProjectionMatrix();\n        };\n        this.data = {\n            height: 1.52,\n            jump: 0.12,\n            radius: 0.1,\n            step: 0.5,\n            walking: 0.07,\n        };\n        this.position.set(2, this.data.height, 4);\n        this.rotation.set(0, 0, 0);\n        this.velocity = new three__WEBPACK_IMPORTED_MODULE_0__.Vector3();\n        this.canJump = true;\n    }\n}\n\n\n//# sourceURL=webpack://sad/./src/Player.ts?");

/***/ }),

/***/ "./src/Renderer.ts":
/*!*************************!*\
  !*** ./src/Renderer.ts ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Renderer\": () => (/* binding */ Renderer)\n/* harmony export */ });\n/* harmony import */ var three__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! three */ \"./node_modules/three/build/three.module.js\");\n\n/**\n * This renderer acts as a wrapper for the THREE.js WebGLRenderer by extending\n * it into a new class. By extending the base class, the scene (level) and\n * camera (player) can be passed into the constructor.\n */\nclass Renderer extends three__WEBPACK_IMPORTED_MODULE_0__.WebGLRenderer {\n    constructor(level, player) {\n        super();\n        /** Run the renderer on every animation frame. */\n        this.loop = () => {\n            this.render(this.level, this.player);\n            requestAnimationFrame(this.loop);\n        };\n        this.handleResize = () => this.setSize(window.innerWidth, window.innerHeight);\n        this.setSize(window.innerWidth, window.innerHeight);\n        this.shadowMap.enabled = true;\n        this.shadowMap.type = three__WEBPACK_IMPORTED_MODULE_0__.PCFShadowMap;\n        this.paused = true;\n        this.level = level;\n        this.player = player;\n    }\n}\n\n\n//# sourceURL=webpack://sad/./src/Renderer.ts?");

/***/ }),

/***/ "./src/controls/Controller.ts":
/*!************************************!*\
  !*** ./src/controls/Controller.ts ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Controller\": () => (/* binding */ Controller)\n/* harmony export */ });\n/* harmony import */ var three__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! three */ \"./node_modules/three/build/three.module.js\");\n\nclass Controller {\n    constructor(player, handlers) {\n        this.update = () => {\n            let movement = this.handlers.reduce((sum, handler) => sum.add(handler.movement), new three__WEBPACK_IMPORTED_MODULE_0__.Vector3()), forward = new three__WEBPACK_IMPORTED_MODULE_0__.Vector3(0, 0, -1).applyQuaternion(this.player.quaternion), right = forward.clone().cross(this.player.up);\n            forward\n                .multiplyScalar(movement.z)\n                .add(right.multiplyScalar(movement.x))\n                .normalize()\n                .multiplyScalar(this.player.data.walking);\n            forward.y = 0;\n            this.player.position.add(forward);\n        };\n        this.loop = () => {\n            this.update();\n            requestAnimationFrame(this.loop);\n        };\n        this.player = player;\n        this.handlers = handlers;\n    }\n}\n\n\n//# sourceURL=webpack://sad/./src/controls/Controller.ts?");

/***/ }),

/***/ "./src/controls/KeyboardMovementHandler.ts":
/*!*************************************************!*\
  !*** ./src/controls/KeyboardMovementHandler.ts ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"KeyboardMovementHandler\": () => (/* binding */ KeyboardMovementHandler)\n/* harmony export */ });\n/* harmony import */ var three__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! three */ \"./node_modules/three/build/three.module.js\");\n\n/**\n * This class acts as a handler for keyboard inputs to create a movement vector\n * for the player.\n */\nclass KeyboardMovementHandler {\n    /*----- Constructor --------------------------------------------------------*/\n    constructor(binding) {\n        /*----- Handlers -----------------------------------------------------------*/\n        /** Registers a key down event with the keyboard movement handler. */\n        this.handleKeyDown = (event) => {\n            this.keyStates[event.key] = 1;\n        };\n        /** Registers a key up event with the keyboard movement handler. */\n        this.handleKeyUp = (event) => {\n            this.keyStates[event.key] = 0;\n        };\n        this.binding = binding;\n        this.keyStates = {};\n        Object.keys(binding).reduce((keyStates, control) => binding[control].reduce((keyStates, keyBind) => {\n            keyStates[keyBind.key] = 0;\n            return keyStates;\n        }, keyStates), this.keyStates);\n    }\n    get movement() {\n        return new three__WEBPACK_IMPORTED_MODULE_0__.Vector3(this.binding.right.reduce((total, keyBind) => (total += this.keyStates[keyBind.key] * (keyBind.inverted ? -1 : 1)), 0), 0, this.binding.forward.reduce((total, keyBind) => (total += this.keyStates[keyBind.key] * (keyBind.inverted ? -1 : 1)), 0)).normalize();\n    }\n}\n\n\n//# sourceURL=webpack://sad/./src/controls/KeyboardMovementHandler.ts?");

/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _levels_home__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./levels/home */ \"./src/levels/home.ts\");\n/* harmony import */ var _Renderer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Renderer */ \"./src/Renderer.ts\");\n/* harmony import */ var _Player__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Player */ \"./src/Player.ts\");\n/* harmony import */ var three_examples_jsm_controls_PointerLockControls__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! three/examples/jsm/controls/PointerLockControls */ \"./node_modules/three/examples/jsm/controls/PointerLockControls.js\");\n/* harmony import */ var _controls_KeyboardMovementHandler__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./controls/KeyboardMovementHandler */ \"./src/controls/KeyboardMovementHandler.ts\");\n/* harmony import */ var _controls_Controller__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./controls/Controller */ \"./src/controls/Controller.ts\");\n\n\n\n\n\n\n/*----- Initialize -----------------------------------------------------------*/\nconst player = new _Player__WEBPACK_IMPORTED_MODULE_2__.Player(), renderer = new _Renderer__WEBPACK_IMPORTED_MODULE_1__.Renderer(_levels_home__WEBPACK_IMPORTED_MODULE_0__[\"default\"], player), caption = document.getElementById('caption'), cameraControls = new three_examples_jsm_controls_PointerLockControls__WEBPACK_IMPORTED_MODULE_3__.PointerLockControls(player, renderer.domElement), movementControls = new _controls_KeyboardMovementHandler__WEBPACK_IMPORTED_MODULE_4__.KeyboardMovementHandler({\n    forward: [\n        { key: 'w', inverted: false },\n        { key: 's', inverted: true },\n        { key: 'ArrowUp', inverted: false },\n        { key: 'ArrowDown', inverted: true },\n    ],\n    right: [\n        { key: 'd', inverted: false },\n        { key: 'a', inverted: true },\n        { key: 'ArrowRight', inverted: false },\n        { key: 'ArrowLeft', inverted: true },\n    ],\n    jump: [{ key: ' ', inverted: false }],\n}), controller = new _controls_Controller__WEBPACK_IMPORTED_MODULE_5__.Controller(player, [movementControls]);\n_levels_home__WEBPACK_IMPORTED_MODULE_0__[\"default\"].add(player);\ndocument.body.appendChild(renderer.domElement);\n/*----- Event Listeners ------------------------------------------------------*/\nwindow.addEventListener('resize', _ => {\n    renderer.handleResize();\n    player.handleResize();\n});\ndocument.addEventListener('mousedown', _ => renderer.domElement.requestPointerLock());\ndocument.addEventListener('keydown', movementControls.handleKeyDown);\ndocument.addEventListener('keyup', movementControls.handleKeyUp);\ncameraControls.addEventListener('lock', e => {\n    renderer.paused = false;\n    caption.style.display = 'none';\n});\ncameraControls.addEventListener('unlock', e => {\n    renderer.paused = true;\n    caption.style.display = 'block';\n});\n/*----- Start Game -----------------------------------------------------------*/\nrenderer.loop();\ncontroller.loop();\n\n\n//# sourceURL=webpack://sad/./src/index.ts?");

/***/ }),

/***/ "./src/levels/Level.ts":
/*!*****************************!*\
  !*** ./src/levels/Level.ts ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Level\": () => (/* binding */ Level)\n/* harmony export */ });\n/* harmony import */ var three__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! three */ \"./node_modules/three/build/three.module.js\");\n\nclass Level extends three__WEBPACK_IMPORTED_MODULE_0__.Scene {\n    constructor() {\n        super();\n        this.background = new three__WEBPACK_IMPORTED_MODULE_0__.Color(0xffcccc);\n        this.fog = new three__WEBPACK_IMPORTED_MODULE_0__.FogExp2(0xffcccc, 0.16);\n        var sun = new three__WEBPACK_IMPORTED_MODULE_0__.PointLight(0xffffff, 0.15), scatter = new three__WEBPACK_IMPORTED_MODULE_0__.AmbientLight(0xffffff, 0.95);\n        sun.castShadow = true;\n        sun.position.set(-2.2, 5, 1.8);\n        this.add(sun);\n        this.add(scatter);\n    }\n}\n\n\n//# sourceURL=webpack://sad/./src/levels/Level.ts?");

/***/ }),

/***/ "./src/levels/home.ts":
/*!****************************!*\
  !*** ./src/levels/home.ts ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _Level__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Level */ \"./src/levels/Level.ts\");\n/* harmony import */ var three__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! three */ \"./node_modules/three/build/three.module.js\");\n\n\nconst levelHome = new _Level__WEBPACK_IMPORTED_MODULE_0__.Level();\n//  Add Ground\nvar gnd_geo = new three__WEBPACK_IMPORTED_MODULE_1__.PlaneGeometry(600, 600), gnd_mat = new three__WEBPACK_IMPORTED_MODULE_1__.MeshStandardMaterial({\n    color: 0xffc8c8,\n    roughness: 1,\n    metalness: 0,\n    emissive: 0,\n}), plane = new three__WEBPACK_IMPORTED_MODULE_1__.Mesh(gnd_geo, gnd_mat);\nplane.position.y = 0;\nplane.rotation.x = -Math.PI / 2;\nplane.receiveShadow = true;\nlevelHome.add(plane);\n//  Add Cube\nvar geometry = new three__WEBPACK_IMPORTED_MODULE_1__.BoxGeometry(1, 1, 1), material = new three__WEBPACK_IMPORTED_MODULE_1__.MeshLambertMaterial({ color: 0xffc0c0 }), cube = new three__WEBPACK_IMPORTED_MODULE_1__.Mesh(geometry, material);\ncube.position.y = 0.5;\ncube.castShadow = true;\nlevelHome.add(cube);\n//  Add Pillar\ngeometry = new three__WEBPACK_IMPORTED_MODULE_1__.BoxGeometry(1, 3, 1);\nmaterial = new three__WEBPACK_IMPORTED_MODULE_1__.MeshLambertMaterial({ color: 0xffc0c0 });\nvar pill = new three__WEBPACK_IMPORTED_MODULE_1__.Mesh(geometry, material);\npill.position.y = 1.5;\npill.position.x = 2;\npill.castShadow = true;\nlevelHome.add(pill);\n/*----- Exports --------------------------------------------------------------*/\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (levelHome);\n\n\n//# sourceURL=webpack://sad/./src/levels/home.ts?");

/***/ }),

/***/ "./node_modules/three/build/three.module.js":
/*!**************************************************!*\
  !*** ./node_modules/three/build/three.module.js ***!
  \**************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {


/***/ }),

/***/ "./node_modules/three/examples/jsm/controls/PointerLockControls.js":
/*!*************************************************************************!*\
  !*** ./node_modules/three/examples/jsm/controls/PointerLockControls.js ***!
  \*************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"PointerLockControls\": () => (/* binding */ PointerLockControls)\n/* harmony export */ });\n/* harmony import */ var three__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! three */ \"./node_modules/three/build/three.module.js\");\n\n\nconst _euler = new three__WEBPACK_IMPORTED_MODULE_0__.Euler( 0, 0, 0, 'YXZ' );\nconst _vector = new three__WEBPACK_IMPORTED_MODULE_0__.Vector3();\n\nconst _changeEvent = { type: 'change' };\nconst _lockEvent = { type: 'lock' };\nconst _unlockEvent = { type: 'unlock' };\n\nconst _PI_2 = Math.PI / 2;\n\nclass PointerLockControls extends three__WEBPACK_IMPORTED_MODULE_0__.EventDispatcher {\n\n\tconstructor( camera, domElement ) {\n\n\t\tsuper();\n\n\t\tif ( domElement === undefined ) {\n\n\t\t\tconsole.warn( 'THREE.PointerLockControls: The second parameter \"domElement\" is now mandatory.' );\n\t\t\tdomElement = document.body;\n\n\t\t}\n\n\t\tthis.domElement = domElement;\n\t\tthis.isLocked = false;\n\n\t\t// Set to constrain the pitch of the camera\n\t\t// Range is 0 to Math.PI radians\n\t\tthis.minPolarAngle = 0; // radians\n\t\tthis.maxPolarAngle = Math.PI; // radians\n\n\t\tthis.pointerSpeed = 1.0;\n\n\t\tconst scope = this;\n\n\t\tfunction onMouseMove( event ) {\n\n\t\t\tif ( scope.isLocked === false ) return;\n\n\t\t\tconst movementX = event.movementX || event.mozMovementX || event.webkitMovementX || 0;\n\t\t\tconst movementY = event.movementY || event.mozMovementY || event.webkitMovementY || 0;\n\n\t\t\t_euler.setFromQuaternion( camera.quaternion );\n\n\t\t\t_euler.y -= movementX * 0.002 * scope.pointerSpeed;\n\t\t\t_euler.x -= movementY * 0.002 * scope.pointerSpeed;\n\n\t\t\t_euler.x = Math.max( _PI_2 - scope.maxPolarAngle, Math.min( _PI_2 - scope.minPolarAngle, _euler.x ) );\n\n\t\t\tcamera.quaternion.setFromEuler( _euler );\n\n\t\t\tscope.dispatchEvent( _changeEvent );\n\n\t\t}\n\n\t\tfunction onPointerlockChange() {\n\n\t\t\tif ( scope.domElement.ownerDocument.pointerLockElement === scope.domElement ) {\n\n\t\t\t\tscope.dispatchEvent( _lockEvent );\n\n\t\t\t\tscope.isLocked = true;\n\n\t\t\t} else {\n\n\t\t\t\tscope.dispatchEvent( _unlockEvent );\n\n\t\t\t\tscope.isLocked = false;\n\n\t\t\t}\n\n\t\t}\n\n\t\tfunction onPointerlockError() {\n\n\t\t\tconsole.error( 'THREE.PointerLockControls: Unable to use Pointer Lock API' );\n\n\t\t}\n\n\t\tthis.connect = function () {\n\n\t\t\tscope.domElement.ownerDocument.addEventListener( 'mousemove', onMouseMove );\n\t\t\tscope.domElement.ownerDocument.addEventListener( 'pointerlockchange', onPointerlockChange );\n\t\t\tscope.domElement.ownerDocument.addEventListener( 'pointerlockerror', onPointerlockError );\n\n\t\t};\n\n\t\tthis.disconnect = function () {\n\n\t\t\tscope.domElement.ownerDocument.removeEventListener( 'mousemove', onMouseMove );\n\t\t\tscope.domElement.ownerDocument.removeEventListener( 'pointerlockchange', onPointerlockChange );\n\t\t\tscope.domElement.ownerDocument.removeEventListener( 'pointerlockerror', onPointerlockError );\n\n\t\t};\n\n\t\tthis.dispose = function () {\n\n\t\t\tthis.disconnect();\n\n\t\t};\n\n\t\tthis.getObject = function () { // retaining this method for backward compatibility\n\n\t\t\treturn camera;\n\n\t\t};\n\n\t\tthis.getDirection = function () {\n\n\t\t\tconst direction = new three__WEBPACK_IMPORTED_MODULE_0__.Vector3( 0, 0, - 1 );\n\n\t\t\treturn function ( v ) {\n\n\t\t\t\treturn v.copy( direction ).applyQuaternion( camera.quaternion );\n\n\t\t\t};\n\n\t\t}();\n\n\t\tthis.moveForward = function ( distance ) {\n\n\t\t\t// move forward parallel to the xz-plane\n\t\t\t// assumes camera.up is y-up\n\n\t\t\t_vector.setFromMatrixColumn( camera.matrix, 0 );\n\n\t\t\t_vector.crossVectors( camera.up, _vector );\n\n\t\t\tcamera.position.addScaledVector( _vector, distance );\n\n\t\t};\n\n\t\tthis.moveRight = function ( distance ) {\n\n\t\t\t_vector.setFromMatrixColumn( camera.matrix, 0 );\n\n\t\t\tcamera.position.addScaledVector( _vector, distance );\n\n\t\t};\n\n\t\tthis.lock = function () {\n\n\t\t\tthis.domElement.requestPointerLock();\n\n\t\t};\n\n\t\tthis.unlock = function () {\n\n\t\t\tscope.domElement.ownerDocument.exitPointerLock();\n\n\t\t};\n\n\t\tthis.connect();\n\n\t}\n\n}\n\n\n\n\n//# sourceURL=webpack://sad/./node_modules/three/examples/jsm/controls/PointerLockControls.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.ts");
/******/ 	
/******/ })()
;