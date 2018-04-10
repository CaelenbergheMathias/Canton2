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
let knight;

function preload() {
    this.load.image('ground','assets/Background.jpg');
    this.load.spritesheet('castle','assets/Kasteel.png', {frameWidth: 128, frameHeight: 95});
    this.load.spritesheet('peasant','assets/Peasant.png', {frameWidth: 64, frameHeight: 64});
    this.load.spritesheet('squirrel','assets/squirrel.png', {frameWidth: 64, frameHeight: 64});
    this.load.spritesheet('knight','assets/Ridder.png', {frameWidth:64, frameHeight: 64});
}

function create() {
    this.add.image(350,350,'ground');
    let center = this.add.sprite(350,350,'castle');
    knight = this.add.sprite(400,350,'knight');
    knight.scaleX = 1.6;
    knight.scaleY = 1.6;
    knight.setCollideWorldBounds = true;
    this.anims.create({
        key: 'right',
        frames: this.anims.generateFrameNumbers('knight', {start:0, end:1}),frameRate: 5,
        repeat: -1
    });
    let peasent = this.add.sprite(200,200,'peasant');
    let squirrel = this.add.sprite(100,200, 'squirrel');
}

function update() {
    let cursors = this.input.keyboard.createCursorKeys();
    if(knight.x<650) {
        knight.x += 1;

        knight.anims.play('right', true);
    }
    else
    {
        
    }

}