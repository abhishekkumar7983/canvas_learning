var canvas = document.querySelector("canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var c = canvas.getContext("2d");

var mouse={
    x:undefined,
    y:undefined,
}

var maxradius=40;
// var minradius=2;

var colorArray = [
    'blue',
    'red',
    'pink',
    'brown',
    'black',
    
];

window.addEventListener('mousemove',
function(event){
    mouse.x=event.x;
    mouse.y=event.y;
    
}
)

window.addEventListener('resize',
    function() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight; 

        init();
    }
    );

function Circle(i, j, r,color,dx,dy) {
    this.i = i;
    this.j = j;
    this.r = r;
    this.dx=dx;
    this.dy=dy;
    this.color = colorArray[Math.floor(Math.random()*colorArray.length)];
    this.minradius=r;
    this.drawCircle = function () {
      c.beginPath();
      c.arc(this.i,this.j, this.r, 0, Math.PI * 2, false);
      c.fillStyle = this.color;
      c.fill();
    };

    this.updateCircle = function(){
         if(this.i>innerWidth+this.r || this.i<this.r)
            this.dx=-this.dx;
         if(this.j>innerHeight+this.r || this.j<this.r)
            this.dy=-this.dy;
         this.i+=this.dx;
         this.j+=this.dy;
          
         //interactivity
         if(
            (mouse.x-this.i)<50  && (mouse.x-this.i) >-50
            && 
            (mouse.y-this.j)<50  && (mouse.y-this.j) >-50     
         ){
            if(this.r < maxradius)
             this.r+=1;
         }
         else if(this.r>this.minradius) {
            this.r-=1;
         }
    this.drawCircle();
    };
  }
  
  var circleArray=[];
  
  function init() {
    for(var i=0;i<700;i++){
        var rad=(Math.random())*3+1;
        var x=Math.random()*(innerWidth-rad*2)+rad;
        var y=Math.random()*(innerHeight-rad*2)+rad;
        var dx=(Math.random()-0.5);
        var dy=(Math.random()-0.5);
        var color="blue"
        circleArray.push(new Circle(x,y,rad,color,dx,dy));
      }
      console.log(circleArray)
  }

  function animate() {
    requestAnimationFrame(animate);
    c.clearRect(0, 0, innerWidth, innerHeight);
    for(var i=0;i<circleArray.length;i++){
        circleArray[i].updateCircle();
    } 
  }

  init();
  animate();