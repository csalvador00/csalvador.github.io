
// module.exports =  {
var controller, signal, currentX = 0;

var gocumelo = new Image();
gocumelo.src = "./assets/images/tests/gocumelo.png";

function newController() {
  controller = new AbortController();
  signal = controller.signal;
}

function moveCarLeft(x,y){
   clearCanvas();

   currentX = x - 0.1;
   const gocumelo = document.getElementById("gocumelo");
   _.CANVAS.canvas.drawImage(gocumelo, x, y, 70, 30);
  // _.CANVAS.canvas.drawImage(gocumelo, currentX, _.CANVAS.dimensions.h/4, gocumelo.width*0.4, gocumelo.height*0.13);
 }

function MouseControl( $target ) {
  this.$target = $target;
  const mouseRegistration = (e) => {
    let mouseX = e.clientX;
    let mouseY = e.clientY;

    let allSpan = document.querySelectorAll("#mouseposition span");

    allSpan[0].textContent = "X => " + (mouseX - _.CANVAS.dimensions().l);
    allSpan[1].textContent = "Y => " + (mouseY - _.CANVAS.dimensions().t);

    moveCarLeft( (mouseX - _.CANVAS.dimensions().l), (mouseY - _.CANVAS.dimensions().t));
  };

  return {
    start: () => {
      $target.addEventListener("mousemove", $e => mouseRegistration($e), { signal });
    },
    stop: () => {
      //$target.replaceWith( $target.cloneNode(true) );
      // $target.removeEventListener("mousemove", $e => mouseRegistration($e), { namespace });
      controller.abort();
      let $newElementTarget = document.getElementById("drawArea");
      setEventListeners( $newElementTarget );
    }
  }
};

function setEventListeners( $el ) {
  newController();

  let $control = new MouseControl( $el );
  $el.addEventListener("mousedown", ($e) => {
    $control.start();
  }, { signal });

  $el.addEventListener("mouseup", ($e) => {
    $control.stop();
  }, { signal });
}

setEventListeners( document.getElementById("drawArea") );

// }
