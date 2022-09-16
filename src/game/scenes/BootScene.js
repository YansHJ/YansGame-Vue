import { Scene } from 'phaser'
import sky from '@/game/assets/sky.png'
import bomb from '@/game/assets/bomb.png'
import thudMp3 from '@/game/assets/thud.mp3'
import thudOgg from '@/game/assets/thud.ogg'
import player from '@/game/assets/people/tmp.jpg'
import xWall from '@/game/assets/font/Hall/build/xwall.png'
import yWall from '@/game/assets/font/Hall/build/ywall.png'
import HallBackGround from '@/game/assets/font/Hall/build/initBackGround.png'

export default class BootScene extends Scene {
  constructor () {
    super({ key: 'BootScene' })
  }

  //装载资源
  preload () {
    this.load.image('sky', sky)
    this.load.image('bomb', bomb)
    this.load.audio('thud', [thudMp3, thudOgg])

    this.load.spritesheet('player',player,{frameHeight: 128, frameWidth: 128})
    this.load.image('xWall',xWall)
    this.load.image('yWall',yWall)
    this.load.image('HallBack',HallBackGround)
  }

  create () {
    this.scene.start('HallScene')
  }
}
