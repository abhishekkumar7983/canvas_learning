var canvas = document.querySelector("canvas");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var c = canvas.getContext("2d");
var gravity=1;
var friction=0.99;
var max=canvas.width;
var min=0; 

var mouse={
    x:innerWidth/2,
    y:innerHeight/2
};

var colors =[
    'blue',
    'red',
    'pink',
    'brown' 
]

function randomColor(colors){
    return colors[Math.floor( Math.random() * colors.length )];
}

window.addEventListener("mousemove",function(e)
{
    mouse.x=e.clientX;
    mouse.y=e.clientY;
    if(ballArray.length >80){
     ballArray.shift();
    }
    ballArray.push(new Ball(e.x,e.y)); 
}
);
window.addEventListener("resize" ,function() {
    canvas.width = innerWidth;
    canvas.height=innerHeight;
    init();
} );

window.addEventListener("click", function(e){
    ballArray.push(new Ball(e.x,e.y));
    
});


function Ball(x,y){
    this.x=x;
    this.y=y;
    this.dy=2;
    this.dx=Math.floor((Math.random()*5) -2);
    this.color=randomColor(colors);
    this.radius=5;
    this.update = function() {
        if (this.y + this.radius > canvas.height) {
            // Ball hits the ground, remove it from the array
            var index = ballArray.indexOf(this);
            if (index > -1) {
                ballArray.splice(index, 1);
            }
        } else {
            // Update ball movement if it hasn't hit the ground
            if (this.x + this.radius > canvas.width || this.x - this.radius <= 0) {
                this.dx = -this.dx;
            }
            this.dy += gravity;
            this.x += this.dx;
            this.y += this.dy;
        }
        this.draw(); // Always draw the ball
    };
    
    this.draw=function(){
        c.beginPath();
        c.arc(this.x,this.y,this.radius,0,Math.PI *2,false);
        c.fillStyle=this.color;
        c.fill();
        c.stroke();
        c.closePath();
    };

}

var ball;
 var ballArray=[];

// function init(){
//     ballArray=[];
//      for(var i=0;i<100;i++)
// {
//    var radius=Math.floor(Math.random()*(15)+8)
//     var x=Math.floor(Math.random()*(max-min+1)+min);
//      var y=Math.floor(Math.random()*(max-min+1)+min -radius);
//      var dx=Math.floor((Math.random()*5) -2);
//      var mycolor=randomColor(colors);
//     ballArray.push(new Ball(x,y));
// }
// }

function animate(){
    requestAnimationFrame(animate);
    c.clearRect(0,0,canvas.width,canvas.height);
    for(var i=0;i<ballArray.length;i++){
        ballArray[i].update();
    }
}
// init();
animate();
