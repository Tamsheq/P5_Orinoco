const { urlToHttpOptions } = require("http");

class CameraManager {
    constructor(listCamera) {
        this.listCamera = listCamera;
    }

    sort() {
        return this.listCamera.sort((a, b) => {
            return (Date.parse(a.publicationDate) < Date.parse(b.publicationDate)) ? 1 : -1;
        });
    }
}