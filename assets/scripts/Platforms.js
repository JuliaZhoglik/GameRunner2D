// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        platform: {
            default: null,
            type: cc.Prefab,
        },

        xOffsetMin: 60,
        xOffsetMax: 200,
        yOffsetMin: -120,
        yOffsetMax: 120,
        tilesCountMin: 2,
        tilesCountMax: 6,

    },

    start () {
        this.createPlatform({
            tilesCount: 4,
            x: -200,
            y: -200
        });
       // this.createPlatform();
    },

    createPlatform(data) {
        if (!data) {
            data = this.generateRandomData();
        }
        this.current = cc.instantiate(this.platform);
        this.node.addChild(this.current);
        const platform = this.current.getComponent('Platform');
        platform.init(data.tilesCount, data.x, data.y);
        // console.log("this.current.name = " + this.current.name);
        // console.log("this.current.x = " + this.current.x);
        // console.log("this.current.y = " + this.current.y);
        // console.log("this.current.width = " + this.current.width);
        // console.log("this.current.height = " + this.current.height);
    },

    generateRandomData() {
        let data = {
            x: 0,
            y: 0,
            tilesCount: 0
        };

        const xOffset = this.xOffsetMin + Math.random() * (this.xOffsetMax - this.xOffsetMin);
        data.x = this.current.x + this.current.width + xOffset;
       
        const yOffset = this.yOffsetMin + Math.random() * (this.yOffsetMax - this.yOffsetMin);
        let y = this.current.y + yOffset;
        const screenTop = cc.winSize.height / 2;
        const screenBottom = -cc.winSize.height / 2;
        y = Math.min(y, screenTop - this.current.height * 2); // не выше, чем верх экрана
        y = Math.max(y, screenBottom + this.current.height); // не ниже, чем низ экрана
        data.y = y;

        data.tilesCount = this.tilesCountMin + Math.floor(Math.random() * (this.tilesCountMax - this.tilesCountMin));

        return data;
    },

    update (dt) {
        const currentRight = this.current.x + this.current.width;
 
        if (currentRight < cc.winSize.width / 2) {
            this.createPlatform();
        }
    },

});
