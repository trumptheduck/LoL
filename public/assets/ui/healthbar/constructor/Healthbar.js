export default class Healthbar {
    constructor (data ={
        maxHealth : 100,
        currHealth : 100,
        color : 'green'
    }) {
        this.canvas = null;
        this.data = data;
        this.dim = {
            x: 200,
            y: 30
        }
        this.render = (pos,offset,dim) => {
            this.canvas.context.save()
            this.canvas.context.fillStyle = 'grey'
            this.canvas.context.fillRect(pos.x+offset.x-this.dim.x/2,pos.y+offset.y-dim,this.dim.x,this.dim.y)
            this.canvas.context.fillStyle = 'green'
            this.canvas.context.fillRect(pos.x+offset.x-this.dim.x/2,pos.y+offset.y-dim,this.dim.x*(this.data.currHealth/this.data.maxHealth),this.dim.y)
            this.canvas.context.strokeStyle = 'wheat'
            this.canvas.context.lineWidth = 2;
            this.canvas.context.strokeRect(pos.x+offset.x-this.dim.x/2,pos.y+offset.y-dim,this.dim.x,this.dim.y)
            this.canvas.context.restore()
        }
    }
}