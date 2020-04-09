// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        jumpSpeed: cc.v2({x: 0, y: 300}),
        maxJumpDistance: 300,
    },

    onLoad () 
    {
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, event => {
            switch(event.keyCode) {
                case cc.macro.KEY.space: // клавиша пробел зажата
                    this.jumpKeyPressed = true;
                    break;
            }
        }, this);
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, event => {
            switch(event.keyCode) {
                case cc.macro.KEY.space:
                    this.jumpKeyPressed = false; // отпускаем пробел
                    this.isJumping = false;
                    break;
            }
        }, this);
        this.node.parent.on(cc.Node.EventType.TOUCH_START, () => {
            this.jumpKeyPressed = true; // палец косается экрана
        }, this);
        this.node.parent.on(cc.Node.EventType.TOUCH_END, () => {
            this.jumpKeyPressed = false; // отпускаем тап
            this.isJumping = false;
        }, this);
    },

    start () 
    {
        this.isJumping = false;
        this.jumpKeyPressed = true;
        this.touching = false;
        this.startJumpY = this.node.y;
        this.body = this.getComponent(cc.RigidBody);
    },

     update (dt) 
     {
         if (this.jumpKeyPressed)
         {
             this.jump();
         }
     },

    onBeginContact(contact, selfCollider, otherCollider)
    {
        this.touching = true;
    },

    onEndContsact()
    {
        this.touching = false;
    },

    jump() 
    {
        if (this.touching) {
            this.startJumpY = this.node.y;
            this.jumpFinished = false;
            this.isJumping = true;
            this.body.linearVelocity = this.jumpSpeed;
        } else if (this.isJumping && !this.jumpFinished) {
            const jumpDistance = this.node.y - this.startJumpY;
 
            if (jumpDistance < this.maxJumpDistance) {
                this.body.linearVelocity = this.jumpSpeed;
            } else {
                this.jumpFinished = true;
            }
        }
    },

    
});
