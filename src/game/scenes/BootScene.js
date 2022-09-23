import { Scene } from 'phaser'

import player from '@/game/assets/people/0035.png'
import xWall from '@/game/assets/font/Hall/build/xwall.png'
import yWall from '@/game/assets/font/Hall/build/ywall.png'
import HallBackGround from '@/game/assets/font/Hall/build/initBackGround.png'
import bar from '@/game/assets/font/Hall/build/bar.png'
import longYuTao from '@/game/assets/font/Hall/build/longyutao.jpg'

export default class BootScene extends Scene {
  constructor () {
    super({ key: 'BootScene' })
  }

  //装载资源
  preload () {

    this.load.spritesheet('player',player,{ frameWidth: 200,frameHeight: 200})
    this.load.image('xWall',xWall)
    this.load.image('yWall',yWall)
    this.load.image('HallBack',HallBackGround)
    this.load.image('bar',bar)
    this.load.image('long',longYuTao)
  }

  create () {
    this.scene.start('HallScene')
  }
}
