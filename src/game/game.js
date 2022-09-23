import Phaser from 'phaser'
import BootScene from '@/game/scenes/BootScene'
import PlayScene from '@/game/scenes/PlayScene'
import HallScene from "@/game/scenes/HallScene";

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
    render: {
      powerPreference: 'high-performance'
    },
    fps: {
      min: 60,
      target: 240,
      forceSetTimeOut: false,
      deltaHistory: 10
    },
    scene: [BootScene, PlayScene,HallScene]
  })
}

export default launch
export { launch }
