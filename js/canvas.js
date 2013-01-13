/**
 * @author Sergio Morcuende
 */

function draw() {
	
	// Get the canvas element.
  var elem = document.getElementById('canvas');
  if (!elem || !elem.getContext) {
    return;
  }

  // Get the canvas 2d context.
  var context = elem.getContext('2d');
  if (!context) {
    return;
  }

  // Let's draw "Hello world!" in blue.
  context.fillStyle    = '#00f';

  // The font property is like the CSS font property.
  context.font         = 'italic 30px sans-serif';
  context.textBaseline = 'top';

  if (context.fillText) {
    context.fillText('Hello world!', 0, 0);
  }

  // It looks like WebKit doesn't support the strokeText method.
  // Tested on Ubuntu 8.10 Linux in WebKitGTK revision 38095 (2008-11-04, svn 
  // trunk build).
  context.font = 'bold 30px sans-serif';
  if (context.strokeText) {
    context.strokeText('Hello world!', 0, 50);
  }
  
  
 //Other figure - rect whit gradients
   
 // The hue spectrum used by HSV color picker charts.
  var color, hue = [
    [255,   0,   0 ], // 0, Red,       0°
    [255, 255,   0 ], // 1, Yellow,   60°
    [  0, 255,   0 ], // 2, Green,   120°
    [  0, 255, 255 ], // 3, Cyan,    180°
    [  0,   0, 255 ], // 4, Blue,    240°
    [255,   0, 255 ], // 5, Magenta, 300°
    [255,   0,   0]], // 6, Red,     360°

    // Create the linear gradient: sx, sy, dx, dy.
    // That's the start (x,y) coordinates, followed by the destination (x,y).
    gradient = context.createLinearGradient(60, 0, 400, 180);

  // Add the color stops.
  for (var i = 0; i <= 6; i++) {
    color = 'rgb(' + hue[i][0] + ', ' + hue[i][1] + ', ' + hue[i][2] + ')';
    gradient.addColorStop(i * 1/6, color);
  }

  // Use the gradient for the fillStyle.
  context.fillStyle = gradient;

  // Now let's draw a rectangle with a black shadow.
  // Shadows only render in Konqueror 4.1 and Firefox 3.1 nightlies.
  context.shadowOffsetX = 5;
  context.shadowOffsetY = 5;
  context.shadowBlur    = 4;
  context.shadowColor   = 'rgba(0, 0, 0, 0.5)';
  context.fillRect(220, 5, 200, 80);

  // For effect, let's also draw some text: "Hello world!".
  context.font = 'bold 36px sans-serif';
  context.textBaseline = 'top';

  // Drawing text is only supported by Firefox 3.1 nightlies and recent WebKit builds.
  // Due to some bug, text+gradients don't render fine in Webkit.

  if (context.fillText) {
    context.fillText('Hello world!', 225, 90, 200);
  }

  // strokeText is unsupported by Webkit.
  context.strokeStyle = '#666';
  if (context.strokeText) {
    context.strokeText('Hello world!', 225, 90, 200);
  }
  
   //Other figure - rect whit gravity
   
   var myRectangle = {
        x: 80,
        y: 0,
        vx: 0,
        vy: 0,
        width: 100,
        height: 50,
        borderWidth: 5
    };
 
    drawRectangle(myRectangle);
 
    // wait one second before dropping rectangle
    setTimeout(function(){
        var date = new Date();
        var time = date.getTime();
        animate(time, myRectangle);
    }, 1000);
  
}// end of draw



   window.requestAnimFrame = (function(callback){
    return window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.oRequestAnimationFrame ||
    window.msRequestAnimationFrame ||
    function(callback){
        window.setTimeout(callback, 1000 / 60);
    };
})();
 
function drawRectangle(myRectangle){
    var canvas = document.getElementById("canvas2");
    var context = canvas.getContext("2d");
 
    context.beginPath();
    context.rect(myRectangle.x, myRectangle.y, myRectangle.width, myRectangle.height);
 
    context.fillStyle = "#8ED6FF";
    context.fill();
    context.lineWidth = myRectangle.borderWidth;
    context.strokeStyle = "black";
    context.stroke();
}
 
function animate(lastTime, myRectangle){
    var canvas = document.getElementById("canvas2");
    var context = canvas.getContext("2d");
 
    // update
    var date = new Date();
    var time = date.getTime();
    var timeDiff = time - lastTime;
    var gravity = 2; // pixels / second^2
    var speedIncrementEachFrame = gravity * timeDiff / 1000; // pixels / second
    myRectangle.vy += speedIncrementEachFrame;
    myRectangle.y += (myRectangle.vy * timeDiff);
 
    if (myRectangle.y > canvas.height - myRectangle.height - myRectangle.borderWidth / 2) {
        myRectangle.y = canvas.height - myRectangle.height - myRectangle.borderWidth / 2;
    }
 
    lastTime = time;
 
    // clear
    context.clearRect(0, 0, canvas.width, canvas.height);
 
    // draw
    drawRectangle(myRectangle);
 
    // request new frame
    requestAnimFrame(function(){
        animate(lastTime, myRectangle);
    });
}
 

  
