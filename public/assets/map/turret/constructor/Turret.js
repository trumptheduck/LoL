class Turret {
    constructor (pos ={x:0,y:0},isLeft = true) {
        this.uuid = `object-${Math.random()}`;
        this.canvas = null;
        this.pos = pos;
        this.isAffectedByPhysics = false;
        this.healthbar = new Healthbar()
        this.assets = {
            platform : new Image()
        }
        this.assets.platform.src = '../assets/map/turret/anim/turret.png'
        this.render = (offset={x:0,y:0}) => {
            this.canvas.context.save()
            this.canvas.context.translate(this.pos.x+offset.x, this.pos.y+offset.y);
            if (isLeft) {
                this.canvas.context.scale(0.8,0.8)
            } else {
                this.canvas.context.scale(-0.8,0.8)
            }
            this.canvas.context.drawImage(this.assets.platform,-this.assets.platform.width/2,-this.assets.platform.height/2)
            this.canvas.context.restore()
            this.healthbar.canvas = this.canvas
            this.healthbar.render(this.pos,offset,0)
        }
    }
}