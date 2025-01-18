// import eventHandlers from "./eventsHandlers.js";

const _ = {
  CANVAS: getCanvasObject()
};

function init() {
  let graphicArea = new graphicsElements(_.CANVAS.canvas);
  drawGraphicsElements(graphicArea);
  // drawNewShape();
}

function clearCanvas(){
  _.CANVAS.canvas.clearRect(0, 0, _.CANVAS.dimensions().w, _.CANVAS.dimensions().h);
}

function getCanvasObject() {
  let c = document.getElementById("drawArea");
  let ctx = c.getContext("2d");

  let dimensions = () => {
    let w = c.width, h = c.height, top = c.offsetTop, left = c.offsetLeft;

    return {w: w, h: h, t: top, l: left}
  }

  return {
    canvas: ctx,
    dimensions: dimensions
  };
}

function graphicsElements( area ){
  const dimensions = _.CANVAS.dimensions();

  const line = () => {
    area.moveTo(0, 0);
    area.lineTo(dimensions.w, dimensions.h);
    area.lineWidth = 2;
    area.stroke();
  }

  const circle = () => {
    area.beginPath();
    area.arc(200, 50, 10, 0, 2 * Math.PI);
    area.stroke();
  }

  const retangle = () => {
    area.fillStyle = "blue";
    area.fillRect(100, 50, 50, 40);
  }

  const image = () => {
    // let gocumelo = new Image();
    // gocumelo.src = "./assets/images/tests/gocumelo.png";
    // const gocumelo = document.getElementById("gocumelo");
    // area.drawImage(gocumelo, 0, 0, 70, 30);
  }

  return {
    line,
    circle,
    retangle,
    image
  }

}

function drawGraphicsElements(area){
//  area.line();
  // area.circle();
  area.retangle();
  area.image();
}

function drawNewShape(){
  let area = _.CANVAS.canvas;
  area.beginPath();
  // BASE
  // Set start-point
  area.moveTo(40,20);
  // Set sub-points
  area.lineTo(80,20);
  area.lineTo(100,80);
  area.lineTo(20,80);
  // Set end-point
  area.lineTo(40,20);
  // Stroke it (do the drawing)
  area.stroke();

  ///////////////
  area.beginPath();
  area.lineWidth = 4;
  area.arc(100, 50, 50, 0, 2* Math.PI);
  area.fillStyle = "rgb(30,144,255)";
  area.strokeStyle = "blue";
  area.stroke();
  /////////////////////
  area.beginPath();
  area.lineWidth = 4;
  area.arc(150, 50, 50, 0, Math.PI);
  area.fillStyle = "rgb(30,144,255)";
  area.strokeStyle = "blue";
  area.stroke();
}

function update( $element ){
  // NOTHING
}

init();
