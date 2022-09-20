import {Scene} from "phaser";
import socket from "@/main";


var walls;
var cursors;
var players;
var yourPlayer;
var a = 1;
var playList = [];
var onlinePlayers = [];
var newConnectId;
const playerMap = new Map();

//连接服务器获取客户端id
socket.on('getClientId',msg =>{
    console.log("客户端已连接，客户端id：" + msg)
    sessionStorage.setItem('clientId',msg)
})
/**
 * 获取当前在线成员信息表
 * clinetId 客户端id
 * X  横坐标
 * Y  纵坐标
 * connectTime 连接时间
 */
socket.on('onlinePlayers',playerList =>{
    onlinePlayers = playerList;
    console.log(playerList)
    // console.log(onlinePlayers)
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


        yourPlayer = this.physics.add.sprite(1366/2,768 - 30,'player').setScale(0.3);
        yourPlayer.setBounce(0.4);
        yourPlayer.setCollideWorldBounds(true);

        //初始化渲染当前在线的玩家精灵
        this.initOnlinePlayer()


        cursors = this.input.keyboard.createCursorKeys();

        this.physics.add.collider(yourPlayer,walls);



    }

    update (){

        //本地移动
        if (cursors.left.isDown){
            // yourPlayer.setVelocityX(-150)
            yourPlayer.setX(yourPlayer.x - 5)
            this.iMoved()
        }
        if (cursors.right.isDown){
            // yourPlayer.setVelocityX(150)
            yourPlayer.setX(yourPlayer.x + 5)
            this.iMoved()
        }
        if (cursors.up.isDown){
            // yourPlayer.setVelocityY(-150)
            yourPlayer.setY(yourPlayer.y - 5)
            this.iMoved()
        }
        if (cursors.down.isDown){
            // yourPlayer.setVelocityY(150)
            yourPlayer.setY(yourPlayer.y + 5)
            this.iMoved()
        }



        //新加入的玩家渲染
        this.newConnect()
        //监听其他用户移动的消息
        this.someoneMoved();
        //监听其他用户离开的消息
        this.someoneLeveled()

    }

    //向服务器告知自己移动了
    iMoved(){
        socket.emit('IMoved',{
            clientId: sessionStorage.getItem('clientId'),
            xx:yourPlayer.x,
            yy:yourPlayer.y,
        })
        // console.log(yourPlayer.x)
        // console.log(yourPlayer.y)
    }

    //监听其他用户移动的消息
    someoneMoved(){

        socket.on('someoneMoved', player =>{
            var clientId = player.clientId;
            if (sessionStorage.getItem('clientId') !== clientId){
                var movedPlayer = playerMap.get(player.clientId);
                movedPlayer.setX(player.xx)
                movedPlayer.setY(player.yy)
            }
            // console.log('X:' + player.xx)
            // console.log('Y:' + player.yy)
        })
    }

    //监听其他用户离开的消息
    someoneLeveled(){
        socket.on('someoneLeveled',clientId =>{
            console.log('客户端：' + clientId + ' 离开了房间')
            var player = playerMap.get(clientId);
            player.destroy()
            playerMap.delete(clientId)
        })
    }

    //新加入的玩家渲染
    newConnect(){
        socket.on('newConnect',id =>{
            if (sessionStorage.getItem('clientId') !== id){
                if (newConnectId !== id){
                    var player = this.physics.add.sprite(1366/2,768 - 30,'player').setScale(0.3);
                    playerMap.set(id,player);
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

    //初始化渲染当前在线的玩家精灵
    initOnlinePlayer(){
        for (let i = 0; i < onlinePlayers.length; i++) {
            var onlinePlayer = onlinePlayers[i];
            var clientId = onlinePlayer.clientId;
            if (sessionStorage.getItem('clientId') !== clientId){
                var player = this.physics.add.sprite(onlinePlayer.xx,onlinePlayer.yy,'player').setScale(0.3);
                playerMap.set(clientId,player);
                player.setBounce(0.4);
                player.setCollideWorldBounds(true);
                this.physics.add.collider(yourPlayer,player);
                console.log("已初始化玩家：" + clientId)
            }
        }
    }

}
