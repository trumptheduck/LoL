class Keyboard {
    constructor () {
        this.binding = {
            moveLeft: "ArrowLeft",
            moveRight: "ArrowRight",
            jump: " ",
            log: "`",
            attack: "a",
            skill1: "q",
            skill2: "w",
            skill3: "e",
            skill4: "r",
            vpLeft: "z",
            vpRight: "x"
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
            vpRight: () => {},
            vpLeft: () => {}

        }
        this.logParam = null;
        this.logger = () => {
            this.logParam()
        }
        this.logParam2 = () => {}
    };
    connect() {
        document.addEventListener('keydown',(e)=> {
            switch (e.key) {
                case this.binding.moveLeft:
                    this.state.moveLeft = true;
                    this.action.move()
                break;
                case this.binding.moveRight:
                    this.state.moveRight = true;
                    this.action.move()
                break;
                case this.binding.attack:
                    this.action.attack();
                break;
                case this.binding.skill1:
                    this.action.skill1();
                break;
                case this.binding.skill2:
                    this.action.skill2();
                break;
                case this.binding.skill3:
                    this.action.skill3();
                break;
                case this.binding.skill4:
                    this.action.skill4();
                break;
                case this.binding.vpLeft:
                    this.action.vpLeft();
                break;
                case this.binding.vpRight:
                    this.action.vpRight();
                break;
                case this.binding.jump:
                    this.logParam2();
                break;
                case this.binding.log:
                    this.logger()
                break;
            }
        });
        document.addEventListener('keyup',(e)=>{
            switch (e.key) {
                case this.binding.moveLeft:
                    this.state.moveLeft = false;
                break;
                case this.binding.moveRight:
                    this.state.moveRight = false;
                break;
                case this.binding.jump:
                    this.state.jump = false;
                break;
            }
        });
    };
}
