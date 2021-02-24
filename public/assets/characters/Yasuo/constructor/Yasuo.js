export default class Yasuo {
    constructor (controller) {
        this.uuid = `object-${Math.random()}` 
        this.hitbox = {
            dim : {
                x: 50,
                y: 120
            }
        }
        this.controller = controller;
        this.canvas = null;
        this.pos = {
            x: 100,
            y: 630,
        }
        this.scale = {
            x: -1,
            y: 1,
        }
        this.state = {
            isMoving : false,
            isLeft : false,
            isCasting: false
        }
        this.size = 550
        this.attrs = {
            speed : 15,
            health : 580,
        }
        this.prevAnim = null;
        this.frame = 0;
        this.animation = null;
        this.assets = {
            move : new Image(),
            idle: new Image(),
            aa1 : new Image(),
            aa2 : new Image(),
            q1 : new Image(),
            q2 : new Image(),
            q3 : new Image(),
            w : new Image(),
            e : new Image(),
            r : new Image(),
            dead : new Image(),
        }
        this.assets.move.src = '/assets/characters/Yasuo/anim/run.png'
        this.assets.idle.src = '/assets/characters/Yasuo/anim/idle.png'
        this.assets.aa1.src = '/assets/characters/Yasuo/anim/aa1.png'
        this.assets.aa2.src = '/assets/characters/Yasuo/anim/aa2.png'
        this.assets.q1.src = '/assets/characters/Yasuo/anim/q1.png'
        this.assets.q2.src = '/assets/characters/Yasuo/anim/q2.png'
        this.assets.q3.src = '/assets/characters/Yasuo/anim/q3.png'
        this.assets.w.src = '/assets/characters/Yasuo/anim/w.png'
        this.assets.e.src = '/assets/characters/Yasuo/anim/e.png'
        this.assets.r.src = '/assets/characters/Yasuo/anim/r.png'
        this.assets.dead.src = '/assets/characters/Yasuo/anim/dead.png'
        this.animations = {
            idle: {
                idleFrames: 0,
                name: 'idle',
                loop: true,
                size: 800,
                isMultiple : false,
                sprites: [this.assets.idle],
                maxFrames: 30,
                index: 0,
            },
            move: {
                idleFrames: 0,
                name: 'move',
                loop: true,
                size: 800,
                isMultiple : false,
                sprites: [this.assets.move],
                maxFrames: 19,
                index: 0,
            },
            attack: {
                idleFrames: 12,
                name: 'attack',
                loop: false,
                size: 800,
                isMultiple : true,
                sprites: [this.assets.aa1,this.assets.aa2],
                maxFrames: 20,
                index: 0,
            },
            q1: {
                idleFrames: 15,
                name: 'q1',
                loop: false,
                size: 800,
                isMultiple : false,
                sprites: [this.assets.q1],
                maxFrames: 20,
                index: 0,
            },
            q2: {
                idleFrames: 15,
                name: 'q2',
                loop: false,
                size: 800,
                isMultiple : false,
                sprites: [this.assets.q2],
                maxFrames: 20,
                index: 0,
            },
            q3: {
                idleFrames: 15,
                name: 'q3',
                loop: false,
                size: 800,
                isMultiple : false,
                sprites: [this.assets.q3],
                maxFrames: 20,
                index: 0,
            },
            w: {
                idleFrames: 15,
                name: 'w',
                loop: false,
                size: 800,
                isMultiple : false,
                sprites: [this.assets.w],
                maxFrames: 17,
                index: 0,
            },
            e: {
                idleFrames: 15,
                name: 'e',
                loop: false,
                size: 800,
                isMultiple : false,
                sprites: [this.assets.e],
                maxFrames: 20,
                index: 0,
            },
            r: {
                idleFrames: 25,
                name: 'r',
                loop: false,
                size: 900,
                isMultiple : false,
                sprites: [this.assets.r],
                maxFrames: 24,
                index: 0,
            },
            dead: {
                idleFrames: 31,
                name: 'dead',
                loop: false,
                size: 800,
                isMultiple : false,
                sprites: [this.assets.dead],
                maxFrames: 30,
                index: 0,
            },
        },
        this.animation = this.animations.attack;
        this.cancelAnimation = () => {
            if (this.frame >= this.animation.idleFrames) {
                this.state.isCasting = false;
            }
        }
        this.action = {
            idle: () => {
                this.animation = this.animations.idle;
            },
            move: () => {
                this.animation = this.animations.move;
            },
            attack: () => {
                this.animation = this.animations.attack;
            },
        }
        this.doLogics = () => {
            if (this.prevAnim !== this.animation.name) {
                this.frame = 0;
                this.prevAnim = this.animation.name;
            }
            if (this.controller.state.moveLeft&&this.controller.state.moveRight) {
                this.state.isMoving = false;
            } else if (this.controller.state.moveLeft&&!this.controller.state.moveRight) {
                this.state.isMoving = true;
                this.state.isLeft = true;
            } else if (!this.controller.state.moveLeft&&this.controller.state.moveRight) {
                this.state.isMoving = true;
                this.state.isLeft = false;
            } else {
                this.state.isMoving = false;
            }
        }
        this.controller.action.attack = () => {
            this.cancelAnimation()
            this.animation = this.animations.attack;
            this.state.isCasting = true;
        }
        this.controller.action.move = () => {
            this.cancelAnimation()
        }
        this.doMechanics = () => {
            if (!this.state.isCasting) {
                if (this.state.isMoving) {
                    this.animation = this.animations.move;
                    if(this.state.isLeft) {
                        this.scale.x = 1;
                        this.pos.x -= this.attrs.speed;
                    } else {
                        this.scale.x = -1;
                        this.pos.x += this.attrs.speed;
                    }
                } else {
                    this.animation = this.animations.idle;
                }
            } else {
                
            }
            
        }
        this.render = (offset={x:0,y:0})=>{
            this.doLogics()
            this.doMechanics()
            if (this.frame >= this.animation.maxFrames-1) {
                this.frame = 0;
                if (this.animation.isMultiple) {
                    if (this.animation.index === 0) {
                        this.animation.index = 1
                    } else {
                        this.animation.index = 0
                    }
                }
                if (!this.animation.loop) {this.animation = this.animations.idle}
            } else {
                this.frame++
            }
            this.canvas.context.strokeRect(this.pos.x-this.hitbox.dim.x/2,this.pos.y-this.hitbox.dim.y/2,this.hitbox.dim.x,this.hitbox.dim.y)
            this.canvas.context.save();
            this.canvas.context.translate(this.pos.x+offset.x, this.pos.y+offset.y);
            this.canvas.context.scale(this.scale.x, this.scale.y);
            this.canvas.context.drawImage(this.animation.sprites[this.animation.index], this.animation.size*this.frame, 0,this.animation.size,this.animation.size,-this.size/2, -this.size/2,this.size, this.size);
            this.canvas.context.restore();
        }
    }
}