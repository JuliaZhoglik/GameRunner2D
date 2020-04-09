// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        tile: {
            default: null,
            type: cc.Prefab,
        },
    },

    init(tilesCount, x, y)  // Число тайлов для генерации, координаты x и y
    {
        let tileSize = 0;
        this.node.setPosition(cc.v2(x, y)); // поместить ноду в нужную позицию
        // создать нужное число тайлов
        for (let i = 0; i < tilesCount; i++) 
        {
            // инициализировать ноду из префаба
            const tile = cc.instantiate(this.tile);
            tileSize = tile.width;
            //  сделать созданную ноду дочерней для ноды данного комопнента
            this.node.addChild(tile);
            // установить в правильную позицию
            tile.setPosition(i * tileSize, 0);
               
        }

         // обновить размер ноды
        this.node.width = tileSize * tilesCount;
        this.node.height = tileSize;

        // обновить размер коллайдера
        let collider = this.node.getComponent(cc.PhysicsBoxCollider);
        collider.size.width = this.node.width;
        collider.size.height = this.node.height;

        collider.offset.x = this.node.width / 2;
        collider.apply();  

     },


    // onLoad () {},

    start () {

    },

    update (dt) {
        this.node.x -= 150 * dt;
    },
});
