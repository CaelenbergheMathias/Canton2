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
        default: 'p2',
        p2: {
            debug: false
        }
    }
};

let game = new Phaser.Game(config);


function preload() {
    this.load.image('ground','assets/Background.jpg');
    this.load.spritesheet('castle','assets/Kasteel.png', {frameWidth: 128, frameHeight: 95});
    this.load.spritesheet('peasant','assets/Peasant.png', {frameWidth: 64, frameHeight: 64});
    this.load.spritesheet('squirrel','assets/squirrel.png', {frameWidth: 64, frameHeight: 64});
    this.load.spritesheet('knight','assets/Ridder.png', {frameWidth:64, frameHeight: 64});
}

function create() {;
    this.add.image(350,350,'ground');
    let center = this.add.sprite(350,350,'castle');
    let knight = this.add.sprite(400,350,'knight');
    knight.scaleX = 1.5;
    knight.scaleY = 1.5

    let peasent = this.add.sprite(200,200,'peasant');
    let squirrel = this.add.sprite(100,200, 'squirrel');
}

function update() {

}