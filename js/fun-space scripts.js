  // Create a three.js scene
var scene = new THREE.Scene();
var aspect_ratio = window.innerWidth / window.innerHeight;
var dir = 1;

// Add a camera so that we can see our 3D objects.
// By moving our camera's z positioning, we can increase or decrease zoom.
var camera = new THREE.PerspectiveCamera(75, aspect_ratio, 1, 10000);
camera.position.z = 350;
scene.add(camera);

// A canvas renderer will draw what the camera sees onto the screen:
var renderer = new THREE.CanvasRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);

// This places our CanvasRenderer onto the body element in our HTML.
document.body.appendChild(renderer.domElement);

// ******** Objects ********
var center = new THREE.Object3D();
scene.add(center);
center.position.set(-250,250,-250);

// Nucleus
//                                  radius
//                                    | width segments
//                                    |    | height segments
//                                    |    |   |
//                                    v    v   v
var shape = new THREE.SphereGeometry(100, 20, 20);
var cover = new THREE.MeshNormalMaterial(); //-- This determines the type of material. I believe we could alternatively wrap it in a .jpg image or a hex code, but we'd need a light source to be able to see the colors.
var nucleus = new THREE.Mesh(shape, cover);

// This adds our nucleus geometry to the center object that we created.
center.add(nucleus);

// Make the nucleus static in the middle of the screen
nucleus.add(camera);

// Electron 1
var shape = new THREE.SphereGeometry(20, 20, 20);
var cover = new THREE.MeshNormalMaterial();
var electron1 = new THREE.Mesh(shape, cover);
center.add(electron1);
// When we add our electron geometry to the center object, we can use position to staticly position objects. 
// In our case, the electron will be dynamicly moving, but I wanted to include this for reference.
//                        x,y,z
electron1.position.set(-150,150,0);

// Electron 2
var shape = new THREE.SphereGeometry(20, 20, 20);
var cover = new THREE.MeshNormalMaterial();
var electron2 = new THREE.Mesh(shape, cover);
center.add(electron2);
electron2.position.set(150,150,0);

// Electron 3
var shape = new THREE.SphereGeometry(20, 20, 20);
var cover = new THREE.MeshNormalMaterial();
var electron3 = new THREE.Mesh(shape, cover);
center.add(electron3);
electron3.position.set(0,0,150);

// Animate motion using a clock timer.
var clock = new THREE.Clock();

// This function will handle animation of our atom
function animate() {
  requestAnimationFrame(animate);

  // This gives us a running timer that we can use for our orbiting electrons.
  var t = clock.getElapsedTime();

  // We'll offset from our timer so that our electrons don't smash into each other.
  var t_offset = 1.5 + clock.getElapsedTime();

  // orbit from bottom right to top left
  //
  //                            movement speed
  //                               |
  //                               |  orbit distance
  //                               |      |
  //                               v      v
  electron1.position.x = Math.sin(5*t) * -150;
  electron1.position.y = Math.sin(5*t) * 150;
  electron1.position.z = Math.cos(5*t) * 150;

  // orbit from top right to bottom left
  electron2.position.x = Math.cos(5*t) * 150;
  electron2.position.y = Math.cos(5*t) * 150;
  electron2.position.z = Math.sin(5*t) * 150;


  // orbit from the bottom to the top
  electron3.position.x = Math.sin(5*t_offset) * 0;
  electron3.position.y = Math.sin(5*t_offset) * 150;
  electron3.position.z = Math.cos(5*t_offset) * 150;


  // Render the results of our animation onto the scene
  renderer.render(scene, camera);

}

// Run the animation.
animate();

// Display what the camera sees onto the browser screen.
renderer.render(scene, camera);
