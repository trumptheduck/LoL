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
            y: 600,
        }
        this.scale = {
            x: -1,
            y: 1,
        }
        this.state = {
            isMoving : false,
            isLeft : false,
            isCasting: false,
            isAttacking: false
        }
        this.size = 750
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
        this.sfx = {
            attack : new Audio('/assets/characters/Yasuo/audio/auto.mp3'),
            hit : new Audio('/assets/characters/Yasuo/audio/hit.mp3'),
            walk : new Audio('/assets/characters/Yasuo/audio/walk.mp3'),
        }
        this.voiceline = {
            movement1 : new Audio('/assets/characters/Yasuo/audio/m1.mp3'),
            movement2 : new Audio('/assets/characters/Yasuo/audio/m2.mp3'),
            movement3 : new Audio('/assets/characters/Yasuo/audio/m3.mp3'),
        }
        this.voiceline.movement1.volume = 0.5;
        this.voiceline.movement2.volume = 0.5;
        this.voiceline.movement3.volume = 0.5;
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
                audio: null,
                hitFrame: false,
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
                audio: this.sfx.walk,
                hitFrame: false,
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
                audio: this.sfx.attack,
                hitFrame: 6,
                idleFrames: 15,
                name: 'attack',
                loop: true,
                size: 800,
                isMultiple : true,
                sprites: [this.assets.aa1,this.assets.aa2],
                maxFrames: 20,
                index: 0,
            },
            q1: {
                audio: null,
                hitFrame: 10,
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
                audio: null,
                hitFrame: 10,
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
                audio: null,
                hitFrame: 10,
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
                audio: null,
                hitFrame: 10,
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
                audio: null,
                hitFrame: 10,
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
                audio: null,
                hitFrame: 10,
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
                audio: null,
                hitFrame: 10,
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
                this.state.isAttacking = false;
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
                if (!this.isCasting) {
                    this.isAttacking = true;
                }
            },
        }
        this.doLogics = () => {
            if (this.state.isMoving) {
                if (Math.random() < 0.006) {
                    var probablitily = Math.random();
                    if (probablitily < 0.2) {
                        this.voiceline.movement1.currentTime = 0;
                        this.voiceline.movement1.play()
                    } else if (probablitily < 0.5&&probablitily >0.3) {
                        this.voiceline.movement2.currentTime = 0;
                        this.voiceline.movement2.play()
                    } else if (probablitily < 0.8&&probablitily >0.6) {
                        this.voiceline.movement3.currentTime = 0;
                        this.voiceline.movement3.play()
                    } else {}
                }
            }
            if (this.prevAnim !== this.animation.name) {
                this.frame = 0;
                this.prevAnim = this.animation.name;
            }
            if (this.state.isAttacking) {
                this.animation = this.animations.attack;
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
                } else if (this.animation.name === 'attack') {

                } else {
                    this.animation = this.animations.idle;
                    this.animations.move.audio.pause()
                    this.animations.move.audio.currentTime = 0;
                }
            } else {
                this.animations.move.audio.pause()
                this.animations.move.audio.currentTime = 0;
            }
            
        }
        this.render = (offset={x:0,y:0})=>{
            this.doLogics()
            this.doMechanics()
            if (this.frame >= this.animation.maxFrames-1) {
                if (this.animation.audio !== null) {
                    this.animation.audio.currentTime = 0;
                }
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
            if (this.animation.audio === null) {

            } else {
                if (this.frame === 0) {
                    console.log(this.state.isMoving)
                    if (this.animation.hitFrame === false) {
                        this.animation.audio.loop = true;
                        this.animation.audio.play()
                    } else {
                        this.animation.audio.loop = false;
                    }
                } else if (this.frame === this.animation.hitFrame) {
                    if (this.animation.hitFrame !== false) {
                        this.animation.audio.play()
                    }
                }
            }
            this.canvas.context.save();
            this.canvas.context.translate(this.pos.x+offset.x, this.pos.y+offset.y);
            this.canvas.context.scale(this.scale.x, this.scale.y);
            this.canvas.context.drawImage(this.animation.sprites[this.animation.index], this.animation.size*this.frame, 0,this.animation.size,this.animation.size,-this.size/2, -this.size/2,this.size, this.size);
            this.canvas.context.restore();
        }
    }
}