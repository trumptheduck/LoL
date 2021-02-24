export default class Touchscreen {
    constructor (container) {
        this.container = container
        this.container.innerHTML += `
        <div id="ui-joystick" style="position: absolute; bottom: 10%;left: 5%;width: 200px;height: 70px;">
            <input type="range" min="1" max="100" value="50" class="slider" id="ui-action-move">
        </div>
        <div id="ui-action-bar" style="position: absolute; bottom: 1%;right: 1%;width: 300px;height: 300px;">
            <div id="ui-action-attack" style="background-repeat: no-repeat; background-size: contain; background-image: url('/assets/attack.png'); position: absolute; bottom: 0%;right: 0%;width: 90px;height: 90px; border-radius: 90px;" ></div>
            <div id="ui-action-skill4" style="background-repeat: no-repeat; background-size: contain; background-image: url('/assets/characters/Yasuo/anim/icon-r.jpg'); position: absolute; bottom: 40%;right: 0%;width: 45px;height: 45px;border-radius: 45px;"></div>
            <div id="ui-action-skill3" style="background-repeat: no-repeat; background-size: contain; background-image: url('/assets/characters/Yasuo/anim/icon-e.jpg'); position: absolute; bottom: 40%;right: 20%;width: 45px;height: 45px;border-radius: 45px"></div>
            <div id="ui-action-skill2" style="background-repeat: no-repeat; background-size: contain; background-image: url('/assets/characters/Yasuo/anim/icon-w.jpeg');position: absolute; bottom: 20%;right: 40%;width: 45px;height: 45px;border-radius: 45px" ></div>
            <div id="ui-action-skill1" style="background-repeat: no-repeat; background-size: contain; background-image: url('/assets/characters/Yasuo/anim/icon-q1.png'); position: absolute; bottom: 0%;right: 40%;width: 45px;height: 45px;border-radius: 45px"></div>
        </div>
        `
        this.binding = {
            move: document.getElementById('ui-action-move'),
            attack: document.getElementById('ui-action-attack'),
            skill1: document.getElementById('ui-action-skill1'),
            skill2: document.getElementById('ui-action-skill2'),
            skill3: document.getElementById('ui-action-skill3'),
            skill4: document.getElementById('ui-action-skill4'),
        };
        this.state = {
            moveLeft: false,
            moveRight: false,
            jump: false,
        }
        this.action = {
            move: ()=>{},
            attack: ()=>{},
            skill1: ()=>{},
            skill2: ()=>{},
            skill3: ()=>{},
            skill4: ()=>{},

        }
        this.logParam = null;
        this.logger = () => {
            this.logParam()
        }
    };
    connect() {
        this.binding.move.addEventListener('change',()=>{
            this.binding.move.value = 50;
        })
        this.binding.move.addEventListener('touchstart',()=> {
            this.action.move()
        })
        this.binding.attack.addEventListener('touchstart',()=> {
            this.action.attack()
            this.binding.attack.style.opacity = '0.7'
        })
        this.binding.skill1.addEventListener('touchstart',()=> {
            this.action.skill1()
            this.binding.skill1.style.opacity = '0.7'
        })
        this.binding.skill2.addEventListener('touchstart',()=> {
            this.action.skill2()
            this.binding.skill2.style.opacity = '0.7'
        })
        this.binding.skill3.addEventListener('touchstart',()=> {
            this.action.skill3()
            this.binding.skill3.style.opacity = '0.7'
        })
        this.binding.skill4.addEventListener('touchstart',()=> {
            this.action.skill4()
            this.binding.skill4.style.opacity = '0.7'
        })
    };
    update() {
        if (this.binding.move.value === 50) {
            this.state.moveRight = false;
            this.state.moveLeft = false;
        } else if (this.binding.move.value > 50) {
            this.action.move()
            this.state.moveRight = true;
            this.state.moveLeft = false;
        } else if (this.binding.move.value < 50) {
            this.action.move()
            this.state.moveRight = false;
            this.state.moveLeft = true;
        } else {
            this.state.moveRight = false;
            this.state.moveLeft = false;
        }
    }
}