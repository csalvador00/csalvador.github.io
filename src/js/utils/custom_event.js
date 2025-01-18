export function CreateEvent(type) {
    let event = new Event(type);
    return event
}

export function EventCustom(type, data) {
    let event = new CustomEvent(type, {
        detail: {
            name: type,
            data: data
        }
    });
    return event
}