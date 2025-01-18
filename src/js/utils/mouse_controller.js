function MouseControl( canvas, controller, signal ) {
    let $target = canvas.$element;
    let $controller = controller;
    let $signal = signal;

    const mouseRegistration = (e) => {
      let mouseX = e.clientX;
      let mouseY = e.clientY;
  
      // let allSpan = document.querySelectorAll("#mouseposition span");
  
      // allSpan[0].textContent = (mouseX - canvas.dimensions.left);
      // allSpan[1].textContent = (mouseY - canvas.dimensions.top);
  
    };
  
    return {
      start: () => {
        $target.addEventListener("mousemove", $e => mouseRegistration($e), { $signal });
      },
      stop: () => {
        $controller.abort();
      }
    }
  };

  export default MouseControl;