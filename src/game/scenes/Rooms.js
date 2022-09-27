import {Scene} from "phaser";


//周围的墙，静态实体组
var walls;
//圈，静态实体组
var quans;
//你自己的精灵
var yourPlayer;
//游标
var cursors;


export default class HallScene extends Scene {
    constructor() {
        super({key: 'Rooms'});
    }

    create(){
        this.add.image(1366/2,768/2,'HallBack');
        // this.add.image(1366/2,768-30,'player').setScale(0.3);
        walls = this.physics.add.staticGroup();
        walls.create(0,768/2,'yWall');
        walls.create(1366,768/2,'yWall');
        walls.create(1366/2,0,'xWall');
        walls.create(1366/2,768,'xWall');

        this.add.text(1366/2 - 70, 40, '选 择 房 间', { fontFamily: 'Arial', fontSize: 32, color: '#F25F5C' });

        quans = this.physics.add.staticGroup();
        quans.create(200,768/2 - 40,'quan').setScale(0.4);
        this.add.text(170, 768/2 - 75, ' 球 场', { fontFamily: 'Arial', fontSize: 18, color: '#F38D72' });
        this.add.text(130, 768/2 - 35, ' 当前在线:没做呢', { fontFamily: 'Arial', fontSize: 18, color: '#F38D72' });

        quans.create(522,768/2 - 40,'quan').setScale(0.4);
        this.add.text(492, 768/2 - 75, '未开放', { fontFamily: 'Arial', fontSize: 18, color: '#F38D72' });

        quans.create(842,768/2 - 40,'quan').setScale(0.4);
        this.add.text(812, 768/2 - 75, '未开放', { fontFamily: 'Arial', fontSize: 18, color: '#F38D72' });

        quans.create(1160,768/2 - 40,'quan').setScale(0.4);
        this.add.text(1130, 768/2 - 75, '未开放', { fontFamily: 'Arial', fontSize: 18, color: '#F38D72' });

        //加载自己的精灵
        yourPlayer = this.physics.add.sprite(1366/2,768 - 32,'player').setScale(0.5);
        yourPlayer.setBounce(0.2);
        yourPlayer.setCollideWorldBounds(true);



        //动画
        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('player',{ start: 6,end: 9 }),
            frameRate: 10,
            repeat: 0
        })
        this.anims.create({
            key: 'left',
            frames: [{key: 'player', frame: 4}],
            frameRate: 20
        })

        //创建游标
        cursors = this.input.keyboard.createCursorKeys();
    }

    update(){
        //本地移动
        if (cursors.left.isDown){
            // yourPlayer.setVelocityX(-150)
            yourPlayer.setX(yourPlayer.x - 5)
            yourPlayer.anims.play('left',true);
        }else if (cursors.right.isDown){
            // yourPlayer.setVelocityX(150)
            yourPlayer.setX(yourPlayer.x + 5)
            yourPlayer.anims.play('right',true);
        }else if (cursors.up.isDown){
            // yourPlayer.setVelocityY(-150)
            yourPlayer.setY(yourPlayer.y - 5)
            yourPlayer.anims.play('right',true);
        }else if (cursors.down.isDown){
            // yourPlayer.setVelocityY(150)
            yourPlayer.anims.play('right',true);
            yourPlayer.setY(yourPlayer.y + 5)
        }
    }
}