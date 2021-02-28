class AI {
    constructor (canvas) {
        this.state = {
            moveLeft: false,
            moveRight: false,
            jump: false,
        }
        this.isBot = true;
        this.entity = null;
        this.canvas = canvas
        this.updateSkillIcons = (icons) => {
        }
        this.updateUI = () => {}
        this.action = {
            move: ()=>{},
            attack: ()=>{},
            skill1: ()=>{},
            skill2: ()=>{},
            skill3: ()=>{},
            skill4: ()=>{},

        }
        this.update = () => {
            if (this.entity !== null) {
                if (!this.entity.state.rOnCooldown) {
                    this.entity.state.rOnCooldown === true;
                    this.action.skill4()
                }
                var targets = [];
                this.canvas.scene.forEach(entity => {
                    if (entity.isAffectedByPhysics) {
                        targets.push(entity)
                    }
                })
                var target = targets.sort((a,b) => (Math.abs(a.pos.x - this.entity.pos.x) > Math.abs(b.pos.x - this.entity.pos.x)) ? 1 : ((Math.abs(b.pos.x - this.entity.pos.x) > Math.abs(a.pos.x - this.entity.pos.x)) ? -1 : 0))[1];
                if (Math.abs(target.pos.x - this.entity.pos.x) > 250) {
                    if (target.pos.x - this.entity.pos.x > 0) {
                        this.state.moveLeft = false;
                        this.state.moveRight = true;
                        this.action.move()
                        this.action.skill3()
                    } else {
                        this.state.moveLeft = true;
                        this.state.moveRight = false;
                        this.action.move()
                        this.action.skill3()
                    }
                } else if (Math.abs(target.pos.x - this.entity.pos.x) > 200&&Math.abs(target.pos.x - this.entity.pos.x) < 250) {
                    if (target.pos.x - this.entity.pos.x > 0) {
                        this.state.moveLeft = false;
                        this.state.moveRight = true;
                        this.action.move()
                    } else {
                        this.state.moveLeft = true;
                        this.state.moveRight = false;
                        this.action.move()
                    }
                    if (prob > 20) {
                        this.action.skill1()
                    } else if (prob < 20) {
                        this.action.attack()
                    } else {
                        this.action.skill3()
                    }
                } else {
                    var prob = Math.round(Math.random()*100)
                    if (target.pos.x - this.entity.pos.x > 0) {
                        this.state.moveLeft = false;
                        this.state.moveRight = true;
                    } else {
                        this.state.moveLeft = true;
                        this.state.moveRight = false;
                    }
                    if (prob > 20) {
                        this.action.skill1()
                    } else if (prob < 20) {
                        this.action.attack()
                    } else {
                        this.action.skill3()
                    }
                } 
            }
        }
    };
    selfDestruct() {
        this.container.innerHTML = '';
        for (const property in this) {
            eval(`delete this.${property}`)
          }
    }
}