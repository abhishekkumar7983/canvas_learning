var canvas = document.querySelector("canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var c = canvas.getContext("2d");

var mouse = {
  x: 10,
  y: 10,
};

const colors = [
    'green',
    'brown',
    'skyblue'
]


addEventListener("resize", function () {
  canvas.width = innerWidth;
  canvas.width = innerHeight;
  init();
});
addEventListener("mousemove", function (e) {
  mouse.x = e.clientX;
  mouse.y = e.clientY;
});

// Function to resolve collision between two circles
function resolveCollision(circle, othercircle) {
    // Calculate differences in velocity components and distances
    const xvelocitydiff = circle.velocity.x - othercircle.velocity.x;
    const yvelocitydiff = circle.velocity.y - othercircle.velocity.y;
    const xdist = othercircle.x - circle.x;
    const ydist = othercircle.y - circle.y;
  
    // Check if circles are moving towards each other
    if (xvelocitydiff * xdist + yvelocitydiff * ydist >= 0) {
      // Calculate angle of collision
      const angle = -Math.atan2(othercircle.y - circle.y, othercircle.x - circle.x);
  
      // Get masses of the circles
      const m1 = circle.mass;
      const m2 = othercircle.mass;
  
      // Rotate velocity vectors of both circles by the collision angle
      const u1 = rotate(circle.velocity, angle);
      const u2 = rotate(othercircle.velocity, angle);
  
      // Calculate final velocities after collision using elastic collision equations
      const v1 = {
        x: (u1.x * (m1 - m2)) / (m1 + m2) + (u2.x * 2 * m2) / (m1 + m2),
        y: u1.y,
      };
      const v2 = {
        x: (u2.x * (m1 - m2)) / (m1 + m2) + (u1.x * 2 * m2) / (m1 + m2),
        y: u2.y,
      };
  
      // Rotate final velocity vectors back to the original coordinate system
      const vFinal1 = rotate(v1, -angle);
      const vFinal2 = rotate(v2, -angle);
  
      // Update velocities of the circles with the final calculated values
      circle.velocity.x = vFinal1.x;
      circle.velocity.y = vFinal1.y;
      othercircle.velocity.x = vFinal2.x;
      othercircle.velocity.y = vFinal2.y;
    }
  }
  
  // Helper function to rotate a 2D vector by a given angle
  function rotate(vector, angle) {
    const x = vector.x * Math.cos(angle) - vector.y * Math.sin(angle);
    const y = vector.x * Math.sin(angle) + vector.y * Math.cos(angle);
    return { x, y };
  }
  

function getDistance(x1, y1, x2, y2) {
  let xdistance = x2 - x1;
  let ydistance = y2 - y1;
  return Math.sqrt(Math.pow(xdistance, 2) + Math.pow(ydistance, 2));
}

function randomIntFromRange(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function randomColor(colors){
    return colors[Math.floor(Math.random() * colors.length)];
}

function Circle(x, y, radius, color) {
  this.x = x;
  this.y = y;
  this.velocity = {
    x: Math.random() - 0.5,
    y: Math.random() - 0.5,
  };
  this.radius = radius;
  this.color = color;
  this.mass = 1;
  this.opacity=0;
  this.update = (circles) => {
    this.draw();

    for (let i = 0; i < circles.length; i++) {
      if (this === circles[i]) continue;
      if (
        getDistance(this.x, this.y, circles[i].x, circles[i].y) -
          this.radius * 2 <=
        0
      ) {
        resolveCollision(this, circles[i]);
        // console.log(getDistance(this.x,this.y,circles[i].x,circles[i].y));
      }
    }

    if (this.x - this.radius <= 0 || this.x + this.radius >= innerWidth) {
      this.velocity.x = -this.velocity.x;
    }

    if (this.y - this.radius <= 0 || this.y + this.radius >= innerHeight) {
      this.velocity.y = -this.velocity.y;
    }
//mouse collision detection
   if(getDistance(mouse.x, mouse.y, this.x, this.y) <40 && this.opacity <0.2){
       this.opacity +=0.02;
   }
   else if(this.opacity >0){
    this.opacity -=0.02;
    this.opacity=Math.max(0,this.opacity);
   }
        

    this.x += this.velocity.x;
    this.y += this.velocity.y;
  };

  this.draw = () => {
    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    c.save();
    c.globalAlpha=this.opacity;
    c.fillStyle=this.color;
    c.fill();
    c.restore();
    c.strokeStyle = this.color;
    c.stroke();
    c.closePath();
  };
}

//
let circles;

function init() {
  circles = [];
  for (let i = 0; i < 100; i++) {
    const radius = 15;
    let x = randomIntFromRange(radius, canvas.width - radius);
    let y = randomIntFromRange(radius, canvas.height - radius);
    const color = randomColor(colors);
    if (i !== 0) {
      for (let j = 0; j < circles.length; j++) {
        if (getDistance(x, y, circles[j].x, circles[j].y) - radius * 2 < 0) {
          x = randomIntFromRange(radius, canvas.width - radius);
          y = randomIntFromRange(radius, canvas.height - radius);
          j = -1;
        }
      }
    }

    circles.push(new Circle(x, y, radius, color));
  }
  // circle1=new Circle(300,300,100,'red');
  // circle2=new Circle(10,10,30,'blue');
  // console.log(circles);
}

function animate() {
  requestAnimationFrame(animate);
  c.clearRect(0, 0, canvas.width, canvas.height);
  circles.forEach((circle) => {
    circle.update(circles);
  });
}
init();
animate();
