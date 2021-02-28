class Effects {
    constructor () {
        this.frame = 0;
        this.assets = {
            blood: new Image(),
            dash: new Image(),
            slam: new Image(),
            slash: new Image(),
            spin: new Image(),
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
            this.assets.dash.src = '../assets/effects/anim/dash.png'
            this.assets.slam.src = '../assets/effects/anim/slam.png'
            this.assets.slash.src = '../assets/effects/anim/slash.png'
            this.assets.spin.src = '../assets/effects/anim/spin.png'
        }
        this.loadAssets()
        this.animations = {
            blood: {
                offset: {x:0,y:0}, 
                scale: 1,
                maxFrames : 10,
                loop: false,
                sprites: this.assets.blood,
            },
            dash: {
                offset: {x:0,y:20}, 
                scale: 1,
                maxFrames : 12,
                loop: false,
                sprites: this.assets.dash,
            },
            spin: {
                offset: {x:0,y:-90}, 
                scale: 3,
                maxFrames : 9,
                loop: false,
                sprites: this.assets.spin,
            },
            slam: {
                offset: {x:0,y:-350}, 
                scale: 5,
                maxFrames : 11,
                loop: false,
                sprites: this.assets.slam,
            },
            slash: {
                offset: {x:0,y:-270}, 
                scale: 4,
                maxFrames : 9,
                loop: false,
                sprites: this.assets.slash,
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
        this.changeAnimation = (animation) => {
            this.frame = 0;
            switch (animation) {
                case 'dash':
                    this.animation = this.animations.dash
                    break;
                case 'blood':
                    this.animation = this.animations.blood
                    break;                
                case 'spin':
                    this.animation = this.animations.spin
                    break;
                case 'slam':
                    this.animation = this.animations.slam
                    break;     
                case 'slash':
                    this.animation = this.animations.slash
                    break;  
                default: 
                this.animation = this.animations.none
                    break;
                }
        }
        this.render = (offset,pos) => {
            if (this.state.isLeft) {
                this.scaleX = 1
            } else {
                this.scaleX = -1
            }
                if (this.frame >= this.animation.maxFrames*2) {
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
                this.canvas.context.drawImage(this.animation.sprites, this.animation.sprites.height*Math.floor(this.frame/2), 0,this.animation.sprites.height,this.animation.sprites.height,-this.size/2*this.animation.scale, -this.size/2*this.animation.scale,this.size*this.animation.scale, this.size*this.animation.scale);
                this.canvas.context.restore();
            }
        }
    }
}