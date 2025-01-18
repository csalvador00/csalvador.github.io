let controller, signal;

function EventController() {
    controller = new AbortController();
    signal = controller.signal;

    return {
        $controller: controller,
        $signal: signal
    }
}

export default EventController;