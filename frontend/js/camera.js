class Camera {
    constructor(jsonCamera) {
        jsonCamera && Object.assign(this, jsonCamera);
    }

    getFormatedDate(camera) {
        let timestamp = Date.parse(publicationDate);
        let date = new Date(timestamp);
        return date.toLocaleDateString();
    }
}