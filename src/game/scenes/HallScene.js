import {Scene} from "phaser";


var walls;
var cursors;
var player;

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

        player = this.physics.add.sprite(1366/2,0,'player').setScale(0.3);
        player.setBounce(0.4);
        player.setCollideWorldBounds(true);

        cursors = this.input.keyboard.createCursorKeys();

        this.physics.add.collider(player,walls);

    }

    update (){
        if (cursors.left.isDown){
            player.setVelocityX(-150)

        }
        if (cursors.right.isDown){
            player.setVelocityX(150)
        }
        if (cursors.up.isDown){
            player.setVelocityY(-150)
        }
        if (cursors.down.isDown){
            player.setVelocityY(150)
        }

    }
}
