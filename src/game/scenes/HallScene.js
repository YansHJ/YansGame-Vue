import {Scene} from "phaser";
import socket from "@/main";


//周围的墙，静态实体组
var walls;
//游标
var cursors;
//你自己的精灵
var yourPlayer;
//接收服务器传递的在线玩家列表
var onlinePlayers = [];
//newConnectId 解决在高帧率刷新中执行过多次请求
var newConnectId;
//在线玩家精灵存储
const playerMap = new Map();
//是否成功连接服务器并获取到在线玩家信息（备用，后续优化）
var connectSuccessFlag = false;

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
socket.on('initOnlinePlayers',playerList =>{
    onlinePlayers = playerList;
    console.log(playerList)
    connectSuccessFlag = true;
})


export default class HallScene extends Scene {
    constructor() {
        super({key: 'HallScene'});
    }

    /**
     * 加载资源
     */
    create (){

        this.add.image(1366/2,768/2,'HallBack');
        // this.add.image(1366/2,768-30,'player').setScale(0.3);
        walls = this.physics.add.staticGroup();
        walls.create(0,768/2,'yWall');
        walls.create(1366,768/2,'yWall');
        walls.create(1366/2,0,'xWall');
        walls.create(1366/2,768,'xWall');

        //加载自己的精灵
        yourPlayer = this.physics.add.sprite(1366/2,768 - 30,'player').setScale(0.3);
        yourPlayer.setBounce(0.4);
        yourPlayer.setCollideWorldBounds(true);

        //渲染在线玩家的实体
        this.initOnlinePlayer();
        //创建游标
        cursors = this.input.keyboard.createCursorKeys();

        //自己与墙体的物理碰撞
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
        //监听其他玩家移动的消息
        this.someoneMoved();
        //监听其他玩家离开的消息
        this.someoneLeveled()

    }

    //向服务器告知自己移动了
    iMoved(){
        socket.emit('IMoved',{
            clientId: sessionStorage.getItem('clientId'),
            xx:yourPlayer.x,
            yy:yourPlayer.y,
        })
    }

    //监听其他用户移动的消息
    someoneMoved(){

        socket.on('someoneMoved', player =>{
            var clientId = player.clientId;
            //过滤收到自己动的消息，自己动由本地直接渲染
            if (sessionStorage.getItem('clientId') !== clientId){
                var movedPlayer = playerMap.get(player.clientId);
                movedPlayer.setX(player.xx)
                movedPlayer.setY(player.yy)
            }
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
        //newConnectId 解决在高帧率刷新中执行过多次请求
        newConnectId = sessionStorage.getItem('clientId');
        socket.on('newConnect',id =>{
            //过滤，避免重复渲染自己
            if (sessionStorage.getItem('clientId') !== id){
                if (newConnectId !== id){
                    var player = this.physics.add.sprite(1366/2,768 - 30,'player').setScale(0.3);
                    playerMap.set(id,player);
                    console.log("有人进入房间：" + id)
                    // player.setBounce(0.4);
                    // player.setCollideWorldBounds(true);
                    this.physics.add.collider(yourPlayer,player);
                    newConnectId = id;
                }
            }
        })
    }

    //初始化渲染当前在线的玩家精灵
    initOnlinePlayer(){
            console.log('准备渲染已在线玩家实体，当前在线人数：' + onlinePlayers.length )
            for (let i = 0; i < onlinePlayers.length; i++) {
                var onlinePlayer = onlinePlayers[i];
                var clientId = onlinePlayer.clientId;
                //过滤，避免重复渲染自己
                if (sessionStorage.getItem('clientId') !== clientId){
                    var player = this.physics.add.sprite(onlinePlayer.xx,onlinePlayer.yy,'player').setScale(0.3);
                    playerMap.set(clientId,player);
                    // player.setBounce(0.4);
                    // player.setCollideWorldBounds(true);
                    this.physics.add.collider(yourPlayer,player);
                    console.log("已初始化玩家：" + clientId)
                }
            }
    }


}
