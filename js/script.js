const config = {
    type: Phaser.AUTO,
    width: 700,
    height: 700,
    scene: {
        preload: preload,
        create: create,
        update: update
    },
    physics: {
        default: 'P2',
        arcade: {
            debug: false
        }
    }
};

let game = new Phaser.Game(config);


function preload() {
    this.load.image('ground','assets/Background.jpg');
    this.load.spritesheet('castle','assets/Kasteel.png', {frameWidth: 64, frameHeight: 64});
}

function create() {
    this.add.image(350,350,'ground');
    let center = this.physics.add.sprite(350,350,'castle');
    center.scale.setTo(2,2);
}

function update() {

}