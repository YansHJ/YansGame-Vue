import Phaser from 'phaser'
import BootScene from '@/game/scenes/BootScene'
import PlayScene from '@/game/scenes/PlayScene'
import HallScene from "@/game/scenes/HallScene";
import Rooms from "@/game/scenes/Rooms"

import RexUIPlugin from 'phaser3-rex-plugins/templates/ui/ui-plugin.js';

function launch(containerId) {
  return new Phaser.Game({
    type: Phaser.AUTO,
    width: 1366,
    height: 768,
    parent: containerId,
    physics: {
      default: 'arcade',
      arcade: {
        // gravity: { y: 300 },
        debug: false
      }
    },
    //渲染
    render: {
      powerPreference: 'high-performance'
    },
    //帧数优化
    fps: {
      min: 60,
      target: 240,
      forceSetTimeOut: false,
      deltaHistory: 10
    },
    //插件
    plugins:{
      scene: [{
        key: 'rexUI',
        plugin: RexUIPlugin,
        mapping: 'rexUI'
      },
      ]
    },
    //场景
    scene: [BootScene, PlayScene,HallScene,Rooms]
  })
}

export default launch
export { launch }
