import {Scene} from "phaser";
import socket from "@/main";


var walls;
var cursors;
var players;
var yourPlayer;
var a = 1;
var playList = [];
var newConnectId;
socket.on('getClientId',msg =>{
    console.log("客户端已连接，客户端id：" + msg)
    sessionStorage.setItem('clientId',msg)
})

export default class HallScene extends Scene {
    constructor() {
        super({key: 'HallScene'});
    }

    create (){
        this.add.image(1366/2,768/2,'HallBack');
        // this.add.image(1366/2,768-30,'player').setScale(0.3);
        walls = this.physics.add.staticGroup();
        walls.create(0,768/2,'yWall');
        walls.create(1366,768/2,'yWall');
        walls.create(1366/2,0,'xWall');
        walls.create(1366/2,768,'xWall');


        yourPlayer = this.physics.add.sprite(1366/2,0,'player').setScale(0.3);
        yourPlayer.setBounce(0.4);
        yourPlayer.setCollideWorldBounds(true);

        cursors = this.input.keyboard.createCursorKeys();

        this.physics.add.collider(yourPlayer,walls);

    }

    update (){

        if (cursors.left.isDown){
            // yourPlayer.setVelocityX(-150)
            yourPlayer.setX(yourPlayer.x - 5)
        }
        if (cursors.right.isDown){
            // yourPlayer.setVelocityX(150)
            yourPlayer.setX(yourPlayer.x + 5)
        }
        if (cursors.up.isDown){
            // yourPlayer.setVelocityY(-150)
            yourPlayer.setY(yourPlayer.y - 5)
        }
        if (cursors.down.isDown){
            // yourPlayer.setVelocityY(150)
            yourPlayer.setY(yourPlayer.y + 5)
        }

        //新加入的玩家渲染
        socket.on('newConnect',id =>{
            if (sessionStorage.getItem('clientId') !== id){
                if (newConnectId !== id){
                    var player = 'player_' + id;
                    player = this.physics.add.sprite(1366/a,768/2,'player').setScale(0.3);
                    console.log("有人进入房间" + id)
                    player.setBounce(0.4);
                    player.setCollideWorldBounds(true);
                    this.physics.add.collider(yourPlayer,player);
                    a = a + 0.1
                    playList.push(id)
                    newConnectId = id;
                }
            }
        })
    }
}
