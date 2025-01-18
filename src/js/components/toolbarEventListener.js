// import {CreateEvent, EventC} from '../utils/custom_event';
import { EVENTTYPE } from '../utils/enums.config';
import { store, startDragging, setObjtType, clearObjectType } from "../utils/state.js";

var controller, signal, currentX = 0, objType = null;

function newController() {
  controller = new AbortController();
  signal = controller.signal;
}

const toolItem = document.querySelectorAll(".toolbar_list--item");
let squares = document.querySelectorAll(".square");

setMouseMoveListeners( toolItem );

function setMouseMoveListeners($elements) {
  newController();
  let $control, numOfItems = 0, instance = "";

  $elements.forEach( $el => {
    instance = `instance_${numOfItems}`;
    window[instance] = new MouseControl( $el );

    $el.addEventListener("mousedown", ( $e ) => {
      objType = $el.dataset.type;
      window[instance].start( clone( $e ) );
    }, { signal });

    $el.addEventListener("mouseup", () => {
      window[instance].stop();
    }, { signal });

    numOfItems++;
  });
}

function MouseControl() {

  function mouseMove($e) {
    store.dispatch(startDragging())
    
      let x = $e.clientX;
      let y = $e.clientY;

      let $element = $e.currentTarget;

      let elementMarginLeft = $element.offsetLeft,
          elementMarginTop  = $element.offsetLeft,
          elementHeight = $element.offsetHeight,
          elementWidth = $element.offsetWidth;

      // let allSpan = document.querySelectorAll("#mouseposition span");
      // allSpan[0].textContent = "X => " + x;
      // allSpan[1].textContent = "Y => " + y;

      $element.style.left = `${(x - elementWidth) - x*(Math.PI/100)}px`;
      $element.style.top = `${(y - elementHeight) - y*(Math.PI/100)}px`;
  }

  return {
    start: ( $target ) => {
      store.dispatch(setObjtType(objType));

      $target.addEventListener("mousemove", $e => mouseMove($e), { signal });
      window.dispatchEvent( window.$eventBus(EVENTTYPE.DRAGGINGSTART, {data: ""}) );

    },
    stop: () => {
      controller.abort();
      objType = null;
      let $newElementTarget = toolItem;
      setMouseMoveListeners( $newElementTarget );
    }
  }
};

function clone( $e ){
  let element = $e.currentTarget,
      elementWidth = element.offsetWidth,
      elementHight = element.offsetHeight,
      elementTop   = element.offsetTop,
      elementLeft  = element.offsetLeft;

  let newElement = document.createElement("div");
      newElement.width = elementWidth;
      newElement.classList.add("rotate");

  let newElementImg = document.createElement("img");
      newElementImg.src = element.dataset.src;
      newElementImg.width = elementWidth;

  let newElementDIV = document.createElement("div");
      newElementDIV.width = elementWidth;
      newElementDIV.classList.add("btn_front");

  setInitialPosition( newElement, elementLeft, elementTop );

  newElement.appendChild(newElementImg);
  newElement.appendChild(newElementDIV);
  element.appendChild(newElement);

  newElement.addEventListener("mouseup", () => {
    moveToInitialPosition( newElement, elementLeft, elementTop )
  });

  newElement.addEventListener("mouseleave", () => {
    moveToInitialPosition( newElement, elementLeft, elementTop )
  });

  return newElement;
}

function setInitialPosition( $element, $initialX, $initialY ) {
  $element.style.top = `${$initialY}px`;
  $element.style.left = `${$initialX}px`;
}

function moveToInitialPosition( $element, $initialX, $initialY ) {
  $element.style.transition = `1s`;
  $element.style.top = `${$initialY}px`;
  $element.style.left = `${$initialX}px`;

  setTimeout( () => {
    destroy($element)
  }, 1000)
}

function destroy( $element ) {
  $element.remove();
}
