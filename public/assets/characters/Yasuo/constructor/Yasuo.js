class Yasuo {
    constructor (controller) {
        this.uuid = `object-${Math.random()}` 
        this.dim = {
                x: 50,
                y: 120
            }
        
        this.speedY = 0;
        this.isAffectedByPhysics = true;
        this.controller = controller;
        this.canvas = null;
        this.pos = {
            x: 100,
            y: 750,
        }
        this.scale = {
            x: -1,
            y: 1,
        }
        this.state = {
            isMoving : false,
            isLeft : false,
            isCasting: false,
            isAttacking: false,
            isDashing: false,
            windCharges: 0,
            isGrounded: false,
            isAlive : true,
            qOnCooldown: false,
            wOnCooldown: false,
            eOnCooldown: false,
            rOnCooldown: false
        }
        this.airBorne = []
        this.size = 750
        this.attrs = {
            speed : 15,
            maxHealth : 2000,
            currHealth : 2000,
            cooldown : {
                q: {
                    default: 2,
                    current: 0
                },
                w: {
                    default: 20,
                    current: 0
                },
                e: {
                    default: 7,
                    current: 0
                },
                r: {
                    default: 60,
                    current: 0
                },
            }
        }
        this.tornado = {
            frame : 0,
            anim : new Image(),
            isLeft: false,
            isAlive: false,
            speed: 70,
            pos: {x:0,y:670},
            size : 400
        }
        this.renderTornado = (offset) => {
            if (this.tornado.isAlive) {
                this.canvas.scene.forEach(object => {
                    if (object.isAffectedByPhysics) {
                            if (object.uuid !== this.uuid) {
                                if (Math.abs(object.pos.x - this.tornado.pos.x) <= this.tornado.speed/2) {
                                object.speedY = 80;
                                this.airBorne.push(object)
                                setTimeout(()=>{this.airBorne.splice(this.airBorne.indexOf(object),1)},1000)
                                object.sufferDamage(100)
                                this.sfx.hit.currentTime = 0;
                                this.sfx.hit.play();
                            }
                        }
                    }
                })
                if (this.tornado.frame >= 16) {
                    this.tornado.frame = 0;
                } else {
                    this.tornado.frame++
                }
                if (this.tornado.isLeft) {
                    this.tornado.pos.x -= this.tornado.speed
                } else {
                    this.tornado.pos.x += this.tornado.speed
                }
                this.canvas.context.drawImage(this.tornado.anim, this.tornado.anim.height*this.tornado.frame, 0,this.tornado.anim.height,this.tornado.anim.height,this.tornado.pos.x+offset.x-this.tornado.size/2,this.tornado.pos.y+offset.y-this.tornado.size/2, this.tornado.size,this.tornado.size);
            } else {
                this.tornado.frame = 0
            }
        }
        this.castTornado = () => {
            this.tornado.isLeft = this.state.isLeft
            if (this.tornado.isLeft) {
                this.tornado.pos.x = this.pos.x - this.tornado.speed/2;
            } else {
                this.tornado.pos.x = this.pos.x + this.tornado.speed/2;
            }
            this.tornado.isAlive = true;
            this.sfx.tornado.play()
            setTimeout(()=>{this.tornado.isAlive = false,console.log("Killed")},1000)
        }
        this.prevAnim = null;
        this.frame = 0;
        this.animation = null;
        this.healthbar = new Healthbar()
        this.effects = new Effects()
        this.bloodfx = new Blood()
        this.assets = {
            high: {
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
            },
            medium: {
                move : new Image(),
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
            },
            low: {
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
        }
        this.loadAssets = () => {
            this.assets.high.move.src = '../assets/characters/Yasuo/anim/high/run.png'
            this.assets.high.idle.src = '../assets/characters/Yasuo/anim/high/idle.png'
            this.assets.high.aa1.src = '../assets/characters/Yasuo/anim/high/aa1.png'
            this.assets.high.aa2.src = '../assets/characters/Yasuo/anim/high/aa2.png'
            this.assets.high.q1.src = '../assets/characters/Yasuo/anim/high/q1.png'
            this.assets.high.q2.src = '../assets/characters/Yasuo/anim/high/q2.png'
            this.assets.high.q3.src = '../assets/characters/Yasuo/anim/high/q3.png'
            this.assets.high.w.src = '../assets/characters/Yasuo/anim/high/w.png'
            this.assets.high.e.src = '../assets/characters/Yasuo/anim/high/e.png'
            this.assets.high.r.src = '../assets/characters/Yasuo/anim/high/r.png'
            this.assets.high.dead.src = '../assets/characters/Yasuo/anim/high/dead.png'
            this.assets.medium.move.src = '../assets/characters/Yasuo/anim/medium/run.png'
            this.assets.medium.idle.src = '../assets/characters/Yasuo/anim/medium/idle.png'
            this.assets.medium.aa1.src = '../assets/characters/Yasuo/anim/medium/aa1.png'
            this.assets.medium.aa2.src = '../assets/characters/Yasuo/anim/medium/aa2.png'
            this.assets.medium.q1.src = '../assets/characters/Yasuo/anim/medium/q1.png'
            this.assets.medium.q2.src = '../assets/characters/Yasuo/anim/medium/q2.png'
            this.assets.medium.q3.src = '../assets/characters/Yasuo/anim/medium/q3.png'
            this.assets.medium.w.src = '../assets/characters/Yasuo/anim/medium/w.png'
            this.assets.medium.e.src = '../assets/characters/Yasuo/anim/medium/e.png'
            this.assets.medium.r.src = '../assets/characters/Yasuo/anim/medium/r.png'
            this.assets.medium.dead.src = '../assets/characters/Yasuo/anim/medium/dead.png'
            this.assets.low.move.src = '../assets/characters/Yasuo/anim/low/run.png'
            this.assets.low.idle.src = '../assets/characters/Yasuo/anim/low/idle.png'
            this.assets.low.aa1.src = '../assets/characters/Yasuo/anim/low/aa1.png'
            this.assets.low.aa2.src = '../assets/characters/Yasuo/anim/low/aa2.png'
            this.assets.low.q1.src = '../assets/characters/Yasuo/anim/low/q1.png'
            this.assets.low.q2.src = '../assets/characters/Yasuo/anim/low/q2.png'
            this.assets.low.q3.src = '../assets/characters/Yasuo/anim/low/q3.png'
            this.assets.low.w.src = '../assets/characters/Yasuo/anim/low/w.png'
            this.assets.low.e.src = '../assets/characters/Yasuo/anim/low/e.png'
            this.assets.low.r.src = '../assets/characters/Yasuo/anim/low/r.png'
            this.assets.low.dead.src = '../assets/characters/Yasuo/anim/low/dead.png'
            this.tornado.anim.src = '../assets/characters/Yasuo/anim/tornado.png'
        }
        this.loadAssets()
        this.sfx = {
            attack : new Audio('../assets/characters/Yasuo/audio/auto.ogg'),
            hit : new Audio('../assets/characters/Yasuo/audio/hit.ogg'),
            walk : new Audio('../assets/characters/Yasuo/audio/walk.mp3'),
            dash : new Audio('../assets/characters/Yasuo/audio/e.mp3'),
            q1: new Audio('../assets/characters/Yasuo/audio/q.mp3'),
            w: new Audio('../assets/characters/Yasuo/audio/w.mp3'),
            r: new Audio('../assets/characters/Yasuo/audio/r.mp3'),
            wind: new Audio('../assets/characters/Yasuo/audio/wind.mp3'),
            tornado: new Audio('../assets/characters/Yasuo/audio/tornado.mp3'),
            dead: new Audio('../assets/characters/Yasuo/audio/dead.mp3'),
        }
        this.sfx.attack.preload = 'auto';
        this.sfx.dash.preload = 'auto';
        this.voiceline = {
            movement1 : new Audio('../assets/characters/Yasuo/audio/m1.mp3'),
            movement2 : new Audio('../assets/characters/Yasuo/audio/m2.mp3'),
            movement3 : new Audio('../assets/characters/Yasuo/audio/m3.mp3'),
            aav1 : new Audio('../assets/characters/Yasuo/audio/aav1.mp3'),
            aav2 : new Audio('../assets/characters/Yasuo/audio/aav2.mp3'),
            aav3 : new Audio('../assets/characters/Yasuo/audio/aav3.mp3'),
            aav4 : new Audio('../assets/characters/Yasuo/audio/aav4.mp3'),
            qv1 : new Audio('../assets/characters/Yasuo/audio/q1.mp3'),
            qv2 : new Audio('../assets/characters/Yasuo/audio/q2.mp3'),
            qv3 : new Audio('../assets/characters/Yasuo/audio/q3.mp3'),
            qv4 : new Audio('../assets/characters/Yasuo/audio/q4.mp3'),
            wv1 :new Audio('../assets/characters/Yasuo/audio/ftw.mp3'),
            rv1 : new Audio('../assets/characters/Yasuo/audio/r1.mp3'),
            rv2 : new Audio('../assets/characters/Yasuo/audio/r2.mp3'),
            rv3 : new Audio('../assets/characters/Yasuo/audio/r3.mp3'),
        }
        this.voiceline.movement1.volume = 0.5;
        this.voiceline.movement2.volume = 0.5;
        this.voiceline.movement3.volume = 0.5;
        this.changeGraphics = (mode) => {
            switch (mode) {
                case 1:
                    this.asset = this.assets.low
                    break;
                case 2:
                    this.asset = this.assets.medium
                    break;
                case 3:
                    this.asset = this.assets.high
                    break;
            }
        }
        this.sendDataToAI = () => {
            if (this.controller.isBot) {
                this.controller.entity = this;
            }
        }
        this.playSound = {
            move: () => {
                    var probablitily = Math.round(Math.random()*100);
                    if (probablitily < 1) {
                        this.voiceline.movement1.currentTime = 0;
                        this.voiceline.movement1.play()
                    } else if (probablitily < 50&&probablitily >51) {
                        this.voiceline.movement2.currentTime = 0;
                        this.voiceline.movement2.play()
                    } else if (probablitily > 98) {
                        this.voiceline.movement3.currentTime = 0;
                        this.voiceline.movement3.play()
                    } else {}
            },
            attack: () => {
                var prob = Math.round(Math.random()*100);
                if (prob < 15) {
                    this.voiceline.aav1.currentTime = 0;
                    this.voiceline.aav1.play()
                } else if (prob > 30&&prob < 45) {
                    this.voiceline.aav2.currentTime = 0;
                    this.voiceline.aav2.play()
                } else if (prob > 85) {
                    this.voiceline.aav3.currentTime = 0;
                    this.voiceline.aav3.play()
                }
            },
            skill11: () => {
                var prob = Math.round(Math.random()*100);
                if (prob < 33) {
                    this.voiceline.qv1.currentTime = 0;
                    this.voiceline.qv1.play()
                } else if (prob > 66) {
                    this.voiceline.qv2.currentTime = 0;
                    this.voiceline.qv2.play()
                } 
            },
            skill12: () => {
                var prob = Math.round(Math.random()*100);
                if (prob < 50) {
                    this.voiceline.qv3.currentTime = 0;
                    this.voiceline.qv3.play()
                } else {
                    this.voiceline.qv4.currentTime = 0;
                    this.voiceline.qv4.play()
                } 
            },
            skill2: () => {
                var prob = Math.round(Math.random()*100);
                if (prob < 50) {
                    this.voiceline.wv1.currentTime = 0;
                    this.voiceline.wv1.play()
                }
            },
            skill4: () => {
                var prob = Math.round(Math.random()*100);
                if (prob < 33) {
                    this.voiceline.rv1.currentTime = 0;
                    this.voiceline.rv1.play()
                } else if (prob > 66) {
                    this.voiceline.rv2.currentTime = 0;
                    this.voiceline.rv2.play()
                } else {
                    this.voiceline.rv3.currentTime = 0;
                    this.voiceline.rv3.play()
                }
            }
        }
        this.changeGraphics(2);
        this.animations = {
            idle: {
                audio: null,
                hitFrame: false,
                idleFrames: 0,
                name: 'idle',
                loop: true,
                isMultiple : false,
                sprites: [this.asset.idle],
                maxFrames: 30,
                index: 0,
                voiceline : null,
            },
            move: {
                audio: this.sfx.walk,
                hitFrame: 10,
                idleFrames: 0,
                name: 'move',
                loop: true,
                isMultiple : false,
                sprites: [this.asset.move],
                maxFrames: 19,
                index: 0,
                voiceline : this.playSound.move,
            },
            attack: {
                audio: this.sfx.attack,
                hitFrame: 6,
                idleFrames: 15,
                name: 'attack',
                loop: true,
                isMultiple : true,
                sprites: [this.asset.aa1,this.asset.aa2],
                maxFrames: 20,
                index: 0,
                voiceline : this.playSound.attack,
            },
            q1: {
                audio: this.sfx.q1,
                hitFrame: 3,
                idleFrames: 15,
                name: 'q1',
                loop: false,
                isMultiple : false,
                sprites: [this.asset.q1],
                maxFrames: 20,
                index: 0,
                voiceline : this.playSound.skill11,
            },
            q2: {
                audio: this.sfx.q1,
                hitFrame: 1,
                idleFrames: 15,
                name: 'q2',
                loop: false,
                isMultiple : false,
                sprites: [this.asset.q2],
                maxFrames: 20,
                index: 0,
                voiceline : this.playSound.skill11,
            },
            q3: {
                audio: this.sfx.attack,
                hitFrame: 5,
                idleFrames: 20,
                name: 'q3',
                loop: false,
                isMultiple : false,
                sprites: [this.asset.q3],
                maxFrames: 20,
                index: 0,
                voiceline : this.playSound.skill12,
            },
            w: {
                audio: this.sfx.w,
                hitFrame: 10,
                idleFrames: 15,
                name: 'w',
                loop: false,
                isMultiple : false,
                sprites: [this.asset.w],
                maxFrames: 17,
                index: 0,
                voiceline : this.playSound.skill2,
            },
            e: {
                audio: this.sfx.dash,
                hitFrame: 1,
                idleFrames: 20,
                name: 'e',
                loop: false,
                isMultiple : false,
                sprites: [this.asset.e],
                maxFrames: 20,
                index: 0,
                voiceline : this.playSound.attack,
            },
            r: {
                audio: null,
                hitFrame: 10,
                idleFrames: 25,
                name: 'r',
                loop: false,
                isMultiple : false,
                sprites: [this.asset.r],
                maxFrames: 26,
                index: 0,
                voiceline : null,
            },
            dead: {
                audio: null,
                hitFrame: 25,
                idleFrames: 31,
                name: 'dead',
                loop: false,
                isMultiple : false,
                sprites: [this.asset.dead],
                maxFrames: 30,
                index: 0,
                voiceline : null,
            },
        },
        this.animation = this.animations.attack;
        this.cancelAnimation = () => {
            if (this.animation.name === 'attack') {
                this.state.isCasting = false;
                this.state.isAttacking = false;
            } else {
                if (this.frame >= this.animation.idleFrames) {
                    this.state.isCasting = false;
                }
            }
        }
        this.forceCancelAnimation = () => {
            this.state.isCasting = false;
        }
        this.timer = 0;
        this.doLogics = () => {
            this.sendDataToAI()
            this.timer++ 
            if (this.timer >= 30) {
                this.timer = 0;
                if (this.attrs.cooldown.q.current > 0) {
                    this.attrs.cooldown.q.current--
                } else {
                    this.attrs.cooldown.q.current = 0
                }
                if (this.attrs.cooldown.w.current > 0) {
                    this.attrs.cooldown.w.current--
                } else {
                    this.attrs.cooldown.w.current = 0
                }
                if (this.attrs.cooldown.e.current > 0) {
                    this.attrs.cooldown.e.current--
                } else {
                    this.attrs.cooldown.e.current = 0
                }
                if (this.attrs.cooldown.r.current > 0) {
                    this.attrs.cooldown.r.current--
                } else {
                    this.attrs.cooldown.r.current = 0
                }
            }
            if (this.attrs.cooldown.q.current > 0) {
                this.state.qOnCooldown = true;
            } else {
                this.state.qOnCooldown = false;
            }
            if (this.attrs.cooldown.w.current > 0) {
                this.state.wOnCooldown = true;
            } else {
                this.state.wOnCooldown = false;
            }
            if (this.attrs.cooldown.e.current > 0) {
                this.state.eOnCooldown = true;
            } else {
                this.state.eOnCooldown = false;
            }
            if (this.attrs.cooldown.r.current > 0) {
                this.state.rOnCooldown = true;
            } else {
                this.state.rOnCooldown = false;
            }
            if (this.state.windCharges >= 2) {
                this.sfx.wind.play()
            } else {
                this.sfx.wind.pause()
                this.sfx.wind.currentTime = 0;
            }
            if (this.prevAnim !== this.animation.name) {
                this.frame = 0;
                this.prevAnim = this.animation.name;
            }
            if (this.state.isAttacking) {
                this.animation = this.animations.attack;
            } 
            if (!this.state.isCasting) {
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
        }
        this.skillIcons = {
            skill1:'../assets/characters/Yasuo/icons/icon-q1.png',
            skill2:'../assets/characters/Yasuo/icons/icon-w.jpeg',
            skill3:'../assets/characters/Yasuo/icons/icon-e.jpg',
            skill4:'../assets/characters/Yasuo/icons/icon-r.jpg',
        }
        this.controller.updateSkillIcons(this.skillIcons)
        this.controller.action.attack = () => {
            this.cancelAnimation()
            if (!this.state.isCasting&&this.state.isGrounded) {
                this.animation = this.animations.attack;
                this.state.isCasting = true;
            }
        }
        this.controller.action.move = () => {
            if (this.animation.name !== 'move'&&this.state.isGrounded) {
                this.cancelAnimation()
            }
        }
        this.controller.action.skill1 = () => {
            if (!this.state.qOnCooldown&&this.state.isGrounded) {
                if (this.animation.name === 'e') {
                    this.forceCancelAnimation()
                } else {
                    this.cancelAnimation()
                }
                if (!this.state.isCasting) {  
                        if (this.state.windCharges >= 2) {
                            if (this.state.isDashing) {
                                this.animation = this.animations.q2;
                            } else {
                                this.animation = this.animations.q3
                            }
                        } else {
                            if (this.state.isDashing) {
                                this.animation = this.animations.q2;
                            } else {
                                this.animation = this.animations.q1;
                            }
                        }
                        this.state.isCasting = true;
                        this.attrs.cooldown.q.current = this.attrs.cooldown.q.default
                    }   
                }
            }
            
        this.controller.action.skill2 = () => {
            if (!this.state.wOnCooldown&&this.state.isGrounded) {
                this.cancelAnimation()
                if (!this.state.isCasting) {
                this.animation = this.animations.w;
                this.state.isCasting = true;
                this.attrs.cooldown.w.current = this.attrs.cooldown.w.default
                this.effects.changeAnimation('slam')
                }
            }
        }
        this.controller.action.skill3 = () => {
            if (!this.state.eOnCooldown&&this.state.isGrounded) {
                this.cancelAnimation()
                if (!this.state.isCasting) {
                this.animation = this.animations.e;
                this.state.isCasting = true;
                this.attrs.cooldown.e.current = this.attrs.cooldown.e.default
                this.effects.changeAnimation('dash')
                }
            }
        }
        this.controller.action.skill4 = () => {
            if (!this.state.eOnCooldown&&this.airBorne.length > 0&&this.state.isGrounded) {
            this.cancelAnimation()
            if (!this.isCasting) {
                this.animation = this.animations.r
                this.state.isCasting = true;
                this.attrs.cooldown.r.current = this.attrs.cooldown.r.default
                }
            }
        }
        this.sufferDamage = (amount)=>{
            if (this.state.isAlive) {
                this.bloodfx.drawBlood()
                if (this.attrs.currHealth - amount > 0) {
                    this.attrs.currHealth -= amount
                } else {
                    this.attrs.currHealth = 0;
                    this.forceCancelAnimation()
                    this.animation = this.animations.dead
                    this.sfx.dead.loop = false
                    this.sfx.dead.play()
                    this.state.isCasting = true;    
                }
            }
        }
        this.doMechanics = () => {
            if (!this.state.isCasting) {
                if (this.state.isMoving&&this.state.isGrounded) {
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
                    this.animations.move.audio.pause()
                    this.animations.move.audio.currentTime = 0;
                }
            } else {
                this.animations.move.audio.pause()
                this.animations.move.audio.currentTime = 0;
            }
            if (this.animation.name === 'attack') {
                if (this.frame === this.animation.hitFrame) {
                    this.canvas.scene.forEach(object => {
                        if (object.isAffectedByPhysics) {
                                if (object.uuid !== this.uuid) {
                                    if (object.pos.x - this.pos.x >-300&&object.pos.x - this.pos.x <0&&this.state.isLeft) {
                                    object.sufferDamage(100)
                                    this.sfx.hit.currentTime = 0;
                                    this.sfx.hit.play();
                                } else if (object.pos.x - this.pos.x <300&&object.pos.x - this.pos.x >0&&!this.state.isLeft) {
                                    object.sufferDamage(100)
                                    this.sfx.hit.currentTime = 0;
                                    this.sfx.hit.play();
                                }
                            }
                        }
                    })
                } 
            }
            if (this.animation.name === 'e') {
                if (this.frame < this.animation.idleFrames) {
                    this.state.isDashing = true;
                    if (this.state.isLeft) {
                        this.pos.x -= 4*this.attrs.speed;
                    } else {
                        this.pos.x += 4*this.attrs.speed;
                    }
                } else {
                    
                }
            } else {
                this.state.isDashing = false;
            }
            if (this.animation.name === 'q1') {
                if (this.frame === this.animation.hitFrame) {
                    this.canvas.scene.forEach(object => {
                        if (object.isAffectedByPhysics) {
                                if (object.uuid !== this.uuid) {
                                    if (object.pos.x - this.pos.x >-400&&object.pos.x - this.pos.x <0&&this.state.isLeft) {
                                    object.sufferDamage(100)
                                    this.sfx.hit.currentTime = 0;
                                    this.sfx.hit.play();
                                    this.state.windCharges++
                                } else if (object.pos.x - this.pos.x <400&&object.pos.x - this.pos.x >0&&!this.state.isLeft) {
                                    object.sufferDamage(100)
                                    this.sfx.hit.currentTime = 0;
                                    this.sfx.hit.play();
                                    this.state.windCharges++
                                }
                            }
                        }
                    })
                } 
            }    
            if (this.animation.name === 'q2') {
                if (this.frame === this.animation.hitFrame) {
                    console.log(this.state.windCharges)
                    if (this.state.windCharges >= 2) {
                        this.state.windCharges = 0;
                        this.canvas.scene.forEach(object => {
                            if (object.isAffectedByPhysics) {
                                    if (object.uuid !== this.uuid) {
                                        if (Math.abs(object.pos.x - this.pos.x) < 400) {
                                        object.sufferDamage(100)
                                        this.sfx.hit.currentTime = 0;
                                        this.sfx.hit.play();
                                        object.speedY = 80;
                                        this.airBorne.push(object)
                                        setTimeout(()=>{this.airBorne.splice(this.airBorne.indexOf(object),1)},1000)
                                    }
                                }
                            }
                        })
                        this.effects.changeAnimation('slash')
                    } else {
                        this.canvas.scene.forEach(object => {
                            if (object.isAffectedByPhysics) {
                                    if (object.uuid !== this.uuid) {
                                        if (Math.abs(object.pos.x - this.pos.x) < 400) {
                                        object.sufferDamage(100)
                                        this.sfx.hit.currentTime = 0;
                                        this.sfx.hit.play();
                                        this.state.windCharges++
                                    }
                                }
                            }
                        })
                        this.effects.changeAnimation('spin')
                    }
                } 
            }
            if (this.animation.name === 'q3') {
                if (this.frame === this.animation.hitFrame) {
                    this.state.windCharges = 0
                    this.castTornado()
                } 
            }  
            if (this.animation.name === 'r') {
                var target = this.airBorne.sort((a,b) => (Math.abs(a.pos.x - this.pos.x) > Math.abs(b.pos.x - this.pos.x)) ? 1 : ((Math.abs(b.pos.x - this.pos.x) > Math.abs(a.pos.x - this.pos.x)) ? -1 : 0))[0];
                if (target?.pos?.x !== undefined) {
                    if (this.frame === 0) {
                        this.pos.x = target.pos.x
                        this.sfx.r.currentTime = 0;
                        this.sfx.r.play()
                        this.playSound.skill4()
                    }
                    if (this.frame === 6) {
                        target.pos.y = 500;
                        target.speedY = 50
                    }
                    if (this.frame === 11) {
                        target.speedY += 10
                    }
                    if (this.frame === 22) {
                        target.speedY -= 120
                    }
                    if (this.frame === 22) {
                        this.effects.changeAnimation('slam')
                    } 
                    if (this.frame === 24) {
                        target.sufferDamage(500)
                    }
                }
            }  
            if (this.animation.name === 'dead') {
                if (this.frame === this.animation.hitFrame) {
                    this.state.isAlive = false
                } 
            }  
        }
        this.render = (offset={x:0,y:0})=>{
            if (this.state.isAlive) { 
                this.controller.updateUI(this.attrs,this.state)
                this.doLogics()
                this.doMechanics()
            }
            this.renderTornado(offset)
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
                if (this.state.isAlive) {
                    this.frame++
                }
            }
            if (this.animation.audio === null) {

            } else {
                if (this.frame === 0) {
                    if (this.animation.hitFrame === false) {
                        this.animation.audio.loop = true;
                    } else {
                        this.animation.audio.loop = false;
                    }
                } else if (this.frame === this.animation.hitFrame) {
                    if (this.animation.hitFrame !== false) {
                        if (this.animation.voiceline !== null) {
                            this.animation.voiceline()
                        }
                        this.animation.audio.currentTime = 0;
                        this.animation.audio.play()
                    }
                }
            }
            this.effects.canvas = this.canvas
            this.effects.state.isLeft = this.state.isLeft
            this.effects.render(offset,this.pos)
            this.canvas.context.save();
            if (this.animation.name === 'r') {
                this.canvas.context.translate(this.pos.x+offset.x, this.pos.y+offset.y-280);
                this.canvas.context.scale(this.scale.x, this.scale.y);
                this.canvas.context.drawImage(this.animation.sprites[this.animation.index], this.animation.sprites[this.animation.index].height*this.frame, 0,this.animation.sprites[this.animation.index].height,this.animation.sprites[this.animation.index].height,-this.size/2*1.5, -this.size/2*1.5,this.size*1.5, this.size*1.5);
            } else {
                this.canvas.context.translate(this.pos.x+offset.x, this.pos.y+offset.y);
                this.canvas.context.scale(this.scale.x, this.scale.y);
                this.canvas.context.drawImage(this.animation.sprites[this.animation.index], this.animation.sprites[this.animation.index].height*this.frame, 0,this.animation.sprites[this.animation.index].height,this.animation.sprites[this.animation.index].height,-this.size/2, -this.size/2,this.size, this.size);
            }       
            this.canvas.context.restore();
            this.bloodfx.canvas = this.canvas
            this.bloodfx.state.isLeft = this.state.isLeft
            this.bloodfx.render(offset,this.pos)
            this.healthbar.canvas = this.canvas
            this.healthbar.render(this.pos,offset,185,this.attrs)
        }
        this.selfDestruct = () => {
            for (const property in this) {
                eval(`delete this.${property}`)
              }
        }
    } 
}