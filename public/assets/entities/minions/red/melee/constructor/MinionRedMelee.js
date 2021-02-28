class MinionRedMelee {
    constructor (pos ={x:0,y:0},isLeft = true) {
        this.uuid = `object-${Math.random()}`;
        this.canvas = null;
        this.pos = pos;
        this.dim = {
            y: 10
        }
        this.attrs = {
            maxHealth : 1000,
            currHealth : 1000
        }
        this.sufferDamage = (amount)=>{
            if (this.attrs.currHealth - amount > 0) {
                this.attrs.currHealth -= amount
            } else {
                this.attrs.currHealth = 0
            }
        }
        this.isAffectedByPhysics = true;
        this.healthbar = new Healthbar()
        this.assets = {
            idle : new Image()
        }
        this.scaling = 0.4;
        this.assets.idle.src = '../assets/entities/minions/red/melee/anim/minion.png'
        this.render = (offset={x:0,y:0}) => {
            this.canvas.context.save()
            this.canvas.context.translate(this.pos.x+offset.x, this.pos.y+offset.y);
            if (isLeft) {
                this.canvas.context.scale(this.scaling,this.scaling)
            } else {
                    this.canvas.context.scale(-this.scaling,this.scaling)
            }
            this.canvas.context.drawImage(this.assets.idle,-this.assets.idle.width/2,-this.assets.idle.height/2)
            this.canvas.context.restore()
            this.healthbar.canvas = this.canvas
            this.healthbar.render(this.pos,offset,150,this.attrs)
        }
    }
}