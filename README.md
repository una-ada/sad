# ):

"Sad" is a project dating back to 2017 used for experimentation with THREE.js to
create small, aesthetically pleasing experiences. The original version, "Alone,"
presents the user with a single cube in a pink landscape and implements the
`OrbitControls` from the THREE.js examples. This was later expanded into a new
version, "Aimless," which added a second, taller shape as well as a custom
implementation of the `PointerLockControls` and some naive physics and input
mechanics to approximate FPS-style interaction.

The current version, "Empty," is a complete overhaul of the previous
experiences, now written in TypeScript with significantly more modular code and
using Webpack to transpile and pack the source code into a single JavaScript
file.

## Building

To build the source code yourself, either download the code from this repository
or clone the repository using

```
git clone https://github.com/una-ada/sad.git
```

The install the project's dependencies using `npm install` or its abbreviation
`npm i`. This should install the NPM version of THREE.js (former versions used a
CDN), its typing package, and necessary TypeScript language packages (ts-loader
and typescript).

Finally, WebPack can either be installed on your local system using
`npm i -g webpack-cli webpack` then ran using the command `webpack` in the
project folder, or simply ran using the `npx` CLI command `npx webpack`.

Additional parameters are not necessary for the WebPack CLI commands to work on
this project as it includes a [WebPack configuration file](/webpack.config.js).
