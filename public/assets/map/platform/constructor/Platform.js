export default class Platform {
    constructor (pos ={x:0,y:0}) {
        this.uuid = `object-${Math.random()}`;
        this.canvas = null;
        this.pos = pos;
        this.assets = {
            platform : new Image()
        }
        this.assets.platform.src = '/assets/map/platform/anim/rift-platform.png'
        this.render = () => {
            this.canvas.context.drawImage()
        }
    }
}