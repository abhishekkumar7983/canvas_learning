var canvas = document.querySelector("canvas");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var c = canvas.getContext("2d");

window.addEventListener('resize',
    function() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight; 

        init();
    }
    );

function Arrow(i, j, color, l, p, q, dx,index) {
  this.index=index;
  this.i = i;
  this.j = j;
  this.color = color;
  this.l = l;
  this.p = p;
  this.q = q;
  this.dx = dx;
  this.isClicked = false;
  this.isMoving = false;

  this.checkClick = function (clickX, clickY) {
    if (
      clickX >= this.i &&
      clickX <= this.i + (2 + this.q) * this.l &&
      clickY >= this.j - this.l &&
      clickY <= this.j + this.p * this.l
    ) {
      this.isClicked = true;
      this.isMoving =true;
    }
  };

  this.drawArrow = function () {
    c.beginPath();
    c.moveTo(this.i, this.j);
    c.lineTo(this.i, this.j - p * this.l);
    c.lineTo(this.i + 2 * this.l, this.j - this.p * this.l);
    c.lineTo(this.i + 2 * this.l, this.j - this.l);
    c.lineTo(this.i + (2 + this.q) * this.l, this.j);
    c.lineTo(this.i + 2 * this.l, this.j + this.l);
    c.lineTo(this.i + 2 * this.l, this.j + this.p * this.l);
    c.lineTo(this.i, this.j + this.p * this.l);
    c.lineTo(this.i, this.j);
    c.strokeStyle = color;
    c.stroke();
  };
  this.updateArrow = function () {
    console.log(this.isClicked,this.isMoving)
    if (this.isClicked && this.isMoving) {
      if (this.i < 357) {
        this.i += this.dx;
        this.isMoving = true;
        console.log(i);
        if(this.i>=357){
          circleArray[index].color='red';
        console.log("Abhi");
        }
      } else {
        this.isMoving = false;
        this.isClicked = false;
      }
      this.drawArrow();
    } else {
      this.drawArrow();
    }
  };
}

// var arrow1 = new Arrow(200, 200, "red", 40, 0.35, 0.75, 4);
// var arrow2 = new Arrow(200, 300, "blue", 40, 0.35, 0.75, 4);
// var arrow3 = new Arrow(200, 400, "red", 40, 0.35, 0.75, 4);
// var arrow4 = new Arrow(200, 500, "blue", 40, 0.35, 0.75, 4);

var arrowarray=[];
var circleArray=[];
function init(){
  for (var i=0;i<4;i++){
    var x=200;
    var y=200+100*i;
    var color="blue";
    var radius=40;
    var p=0.35;
    var q=0.75;
    var dx=4;
    arrowarray.push(new Arrow(x,y,color,radius,p,q,dx,i));
    circleArray.push(new Circle(x+300,y,30,color));
    // console.log(circleArray);
}
// console.log(arrowarray);
}



canvas.addEventListener("click", function (event) {
  var clickX = event.clientX;
  var clickY = event.clientY;
  for(var i=0;i<4;i++){
  arrowarray[i].checkClick(clickX, clickY);
  }
}
);

function Circle(i, j, r, color) {
  this.i = i;
  this.j = j;
  this.r = r;
  this.color = color;
  this.drawCircle = function () {
    c.beginPath();
    c.arc(this.i,this.j, this.r, 0, Math.PI * 2, false);
    c.strokeStyle=this.color;
    c.stroke();
    // console.log("Ram........");
  };
}

// var circle1 = new Circle(100, 200, 30, "red");
// var circle2 = new Circle(100, 300, 30, "red");
// var circle3 = new Circle(100, 400, 30, "red");
// var circle4 = new Circle(100, 500, 30, "red");

// var x=200;
// var y=200;
// var rad=30;
function animate() {
  requestAnimationFrame(animate);
  c.clearRect(0, 0, innerWidth, innerHeight);
  for(var i=0;i<circleArray.length;i++){
      circleArray[i].drawCircle();
      arrowarray[i].updateArrow();
  } 
}

init();
animate();

// const drawCircle=({c,i=200,j=200,r=30,color='red'})=>{
//     const l=40;
//     const p=0.35;
//     const q=0.75;
//     c.beginPath();
//     c.arc(i+(10*l),j,r,0,Math.PI*2,false);
//     c.strokeStyle='blue';
//     c.stroke();

// }

// drawArrow(
//     {
//         c,
//         i:200,
//         j:200,
//         color:'red'
//     }
// );

// drawCircle(
//     {
//         c,
//         i:200,
//         j:200,
//         r:30,
//         color:'red'
//     }
// )
// drawArrow(
//     {
//         c,
//         i:200,
//         j:350,
//         color:'red'
//     }
// );

// drawCircle(
//     {
//         c,
//         i:200,
//         j:350,
//         r:30,
//         color:'red'
//     }
//     );

// drawArrow(
//     {
//         c,
//         i:200,
//         j:500,
//         color:'red'
//     }
// );

// Animation

// var x=300;
// var y=300;
// var dx=7;
// var dy=6
// var r=30;
// function animate(){
//     requestAnimationFrame(animate);
//    c.clearRect(0,0,innerWidth,innerHeight);
// c.beginPath()
// c.arc(x,y,r,0,Math.PI *2,false);
// c.strokeStyle='blue';
// c.stroke();
// if(x+r>innerWidth || x-r<0){
//     dx= -dx;
// }
// if(y+r>innerHeight || y-r<0)
//   dy=-dy;

// x+=dx;
// y+=dy;
// }

// animate();
