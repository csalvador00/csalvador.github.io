const timeStampID = function() {
    const d = new Date();
    const year = d.getFullYear();
    const id = `id_${Date.now()}`;

    return id;
}

export default timeStampID