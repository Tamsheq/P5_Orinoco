// initialisation de l'objet Camera
class Camera {
    constructor(jsonCamera) {
        jsonCamera && Object.assign(this, jsonCamera);
    }
}