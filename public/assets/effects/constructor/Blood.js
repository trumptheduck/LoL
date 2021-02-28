class Blood {
    constructor () {
        this.frame = 0;
        this.assets = {
            blood: new Image(),
            blood1: new Image(),
            blood2: new Image(),
        }
        this.state = {
            isLeft: true,
        }
        this.isAffectedByPhysics = false;
        this.scaleX = 1;
        this.canvas = null;
        this.size = 200;
        this.loadAssets = () => {
            this.assets.blood.src = '../assets/effects/anim/blood.png'
            this.assets.blood1.src = '../assets/effects/anim/blood2.png'
            this.assets.blood2.src = '../assets/effects/anim/blood3.png'
        }
        this.loadAssets()
        this.animations = {
            blood: {
                offset: {x:-10,y:-20}, 
                scale: 0.8,
                maxFrames : 16,
                loop: false,
                sprites: this.assets.blood,
            },
            blood1: {
                offset: {x:20,y:-20}, 
                scale: 0.8,
                maxFrames : 15,
                loop: false,
                sprites: this.assets.blood1,
            },
            blood2: {
                offset: {x:20,y:-20}, 
                scale: 0.8,
                maxFrames : 13,
                loop: false,
                sprites: this.assets.blood2,
            },
            none: {
                offset: {x:0,y:0}, 
                scale: 1,
                maxFrames: 10,
                loop: true,
                sprites: null,
            }
        }
        this.animation = this.animations.none
        this.drawBlood = () => {
            var prob = Math.round(Math.random()*100)
            if (prob <33) {
                this.frame = 0;
                this.animation = this.animations.blood
            } else if (prob > 66) {
                this.frame = 0;
                this.animation = this.animations.blood1
            } else {
                this.frame = 0;
                this.animation = this.animations.blood2
            }

        }
        this.render = (offset,pos) => {
            if (this.state.isLeft) {
                this.scaleX = 1
            } else {
                this.scaleX = -1
            }
                if (this.frame >= this.animation.maxFrames) {
                    if (this.animation.loop) {
                        this.frame = 0;
                    } else {
                        this.animation = this.animations.none
                    }
                } else {
                    this.frame++
                }
            if (this.animation.sprites !== null) {
                this.canvas.context.save();
                this.canvas.context.translate(pos.x+offset.x+this.animation.offset.x, pos.y+offset.y+this.animation.offset.y);
                this.canvas.context.scale(this.scaleX,1)
                this.canvas.context.drawImage(this.animation.sprites, this.animation.sprites.height*this.frame, 0,this.animation.sprites.height,this.animation.sprites.height,-this.size/2*this.animation.scale, -this.size/2*this.animation.scale,this.size*this.animation.scale, this.size*this.animation.scale);
                this.canvas.context.restore();
            }
        }
    }
}