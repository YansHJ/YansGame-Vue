import { Scene } from 'phaser'

import player from '@/game/assets/people/CP501AB.png'
import xWall from '@/game/assets/font/Hall/build/xwall.png'
import yWall from '@/game/assets/font/Hall/build/ywall.png'
import HallBackGround from '@/game/assets/font/Hall/build/initBackGround.png'
import bar from '@/game/assets/font/Hall/build/bar.png'
import longYuTao from '@/game/assets/font/Hall/build/longyutao.jpg'
import quan from '@/game/assets/font/Rooms/build/quan.png'
import backQuan from '@/game/assets/font/Rooms/build/backQuan.png'
import blueCrystal from '@/game/assets/font/Rooms/build/blueCrystal.png'




export default class BootScene extends Scene {
  constructor () {
    super({ key: 'BootScene' })
  }

  //装载资源
  preload () {

    this.load.spritesheet('player',player,{ frameWidth: 60,frameHeight: 60})
    this.load.image('xWall',xWall)
    this.load.image('yWall',yWall)
    this.load.image('HallBack',HallBackGround)
    this.load.image('bar',bar)
    this.load.image('long',longYuTao)
    this.load.image('quan',quan)
    this.load.spritesheet('backQuan',backQuan,{ frameWidth: 32,frameHeight: 32})
    this.load.spritesheet('blueCrystal',blueCrystal,{ frameWidth: 32,frameHeight: 64})
  }

  create () {
    this.scene.start('Rooms')
    // this.scene.start('PlayScene')
  }
}

