import VanillaTilt from './vanilla-tilt.js';

VanillaTilt.init(document.querySelectorAll(".your-element"), {
  max: 18,
  speed: 800,
  glare : true,
  "max-glare" : 0.5,
  gyroscope : true
});
console.log("oi")