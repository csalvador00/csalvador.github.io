import {CreateEvent, EventCustom} from '../utils/custom_event';
function EventBus(eventType, data) {
    return new EventCustom("watch", {name: eventType, data: data})
}

window.$eventBus = EventBus;