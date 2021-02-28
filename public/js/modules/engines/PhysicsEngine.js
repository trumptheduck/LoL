class PhysicsEngine {
    constructor (canvas) {
        this.canvas = canvas;
        this.groundLevel = 800;
        this.g = 8;
        this.doPhysics = () => {
            this.canvas.scene.forEach(object => {
                if (object?.dim?.y !== undefined) {
                    var relGroundLevel = 800 - object.dim.y/2;
                    if (object.speedY <= 0) {
                        if (object.pos.y < relGroundLevel) {
                            object.state.isGrounded = false;
                            if (object.pos.y - object.speedY >= relGroundLevel) {
                                object.pos.y = relGroundLevel;
                            } else {
                                object.speedY -= this.g
                                object.pos.y -= object.speedY
                            }
                        } else if (object.pos.y === relGroundLevel) {
                            object.speedY = 0;
                            object.state.isGrounded = true;
                        } else {
                            object.pos.y = relGroundLevel;
                        }
                    } else if (object.speedY > 0) {
                        object.speedY -= this.g
                        object.pos.y -= object.speedY
                    }
                } 
            })
        }
    }
}