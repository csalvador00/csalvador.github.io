import App from "./app.js";
import "./utils/eventbus.js";
import { store, startLoading } from "./utils/state.js";
import { STORAGEKEY } from "./utils/enums.config.js";

if ( window.localStorage.getItem( STORAGEKEY.GRIDITEMS ) == null ||
     window.localStorage.getItem( STORAGEKEY.GRIDITEMS ) == undefined ) {
    window.localStorage.setItem( STORAGEKEY.GRIDITEMS, "[]");
}

store.dispatch(startLoading())

document.addEventListener("DOMContentLoaded", () => {
    const app = new App();
    window.app = app;
})