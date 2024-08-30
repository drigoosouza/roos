import VanillaTilt from '../node_modules/vanilla-tilt/src/vanilla-tilt.js';

VanillaTilt.init(document.querySelector(".your-element"), {
  max: 10,
  speed: 900,
  glare : true,
  "max-glare" : 0.1,
  gyroscope : true
});
console.log("oi")