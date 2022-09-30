import {Scene} from "phaser";
import socket from "@/main";


//周围的墙，静态实体组
var walls;
//回大厅
var hall;
//球场
var footballField;
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
        // this.add.ellipse(1366/2-70,100,30,30,0xff0000);

        //返回大厅
        hall = this.physics.add.sprite(1366 - 90,768 - 90,'backQuan').setScale(2);
        this.add.text(1366 - 90 -35, 768 - 100, '返回大厅', { fontFamily: 'Arial', fontSize: 18, color: '#F38D72' });
        this.backQuan()
        hall.anims.play('backQuan',true)
        //球场
        footballField = this.physics.add.sprite(200,768/2 - 40,'blueCrystal').setScale(2);
        this.add.text(170, 768/2-130, ' 球 场', { fontFamily: 'Arial', fontSize: 18, color: '#F38D72' });
        this.add.text(130, 768/2-110, ' 当前在线:没做呢', { fontFamily: 'Arial', fontSize: 18, color: '#F38D72' });
        this.blueCrystal();
        footballField.anims.play('blueCrystal',true)


        // quans.create(522,768/2 - 40,'quan').setScale(0.4);
        // this.add.text(492, 768/2 - 75, '未开放', { fontFamily: 'Arial', fontSize: 18, color: '#F38D72' });
        //
        // quans.create(842,768/2 - 40,'quan').setScale(0.4);
        // this.add.text(812, 768/2 - 75, '未开放', { fontFamily: 'Arial', fontSize: 18, color: '#F38D72' });
        //
        // quans.create(1160,768/2 - 40,'quan').setScale(0.4);
        // this.add.text(1130, 768/2 - 75, '未开放', { fontFamily: 'Arial', fontSize: 18, color: '#F38D72' });

        //加载自己的精灵
        yourPlayer = this.physics.add.sprite(1366/2,768 - 30,'player');
        yourPlayer.setBounce(0.2);
        yourPlayer.setCollideWorldBounds(true);

        //返回大厅事件
        this.physics.add.overlap(yourPlayer,hall,this.backToHall,null,this);
        //球场事件
        this.physics.add.overlap(yourPlayer,footballField,this.transferCourt(),null,this);
        //移动动画
        this.moveAnims()

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
            yourPlayer.anims.play('up',true);
        }else if (cursors.down.isDown){
            // yourPlayer.setVelocityY(150)
            yourPlayer.anims.play('down',true);
            yourPlayer.setY(yourPlayer.y + 5)
        }
    }
    //移动动画
    moveAnims(){
        this.anims.create({
            key: 'down',
            frames: this.anims.generateFrameNumbers('player',{start: 0,end: 3}),
            frameRate: 10,
            repeat: -1
        })
        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers('player',{start: 4,end: 7}),
            frameRate: 10,
            repeat: -1
        })
        this.anims.create({
            key: 'up',
            frames: this.anims.generateFrameNumbers('player',{start: 8,end: 11}),
            frameRate: 10,
            repeat: -1
        })
        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('player',{start: 12,end: 15}),
            frameRate: 10,
            repeat: -1
        })
    }
    //返回大厅动画
    backQuan(){
        this.anims.create({
            key: 'backQuan',
            frames: this.anims.generateFrameNumbers('backQuan',{start: 0,end: 11}),
            frameRate: 15,
            repeat: -1
        })
    }
    //蓝色水晶动画
    blueCrystal(){
        this.anims.create({
            key: 'blueCrystal',
            frames: this.anims.generateFrameNumbers('blueCrystal',{start: 0,end: 7}),
            frameRate: 4,
            repeat: -1
        })
    }

    //返回大厅
    backToHall(){
        this.scene.sleep('Rooms')
        this.scene.start('HallScene')
    }
    //传送球场
    transferCourt(){
        socket.emit('someoneLevelRoom',{
            clientId: sessionStorage.getItem('clientId'),
            xx:yourPlayer.x,
            yy:yourPlayer.y,
            nowScene:1,
            nextScene:2,
        })
    }
}