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
        default: 'matter',
        matter: {
            gravity: {
                x:0,
                y:0
            }
        }
    }
};

let game = new Phaser.Game(config);


function preload() {
    this.load.image('ground','assets/Background.jpg');
    this.load.spritesheet('castle','assets/Kasteel.png', {frameWidth: 64, frameHeight: 64});
    this.load.spritesheet('peasant','assets/Peasant.png', {frameWidth: 64, frameHeight: 64});
    this.load.spritesheet('ridder','assets/Ridder.png', {frameWidth: 64, frameHeight: 64});
    this.load.spritesheet('squirrel','assets/Squirrel.png', {frameWidth: 64, frameHeight: 64});
}
// variable outside of create in order to use them in other functions
var ridder;
var squirrel;
var peasant;
var cursors;
var castle;

function create() {
    var bounds = new Phaser.Geom.Circle(100, 100, 400);
    bounds.matter.setStatic();
    this.add.image(350,350,'ground');
    castle = this.matter.add.sprite(350,350,'castle').setStatic(true);
    ridder = this.matter.add.sprite(200,200,'ridder').setBounce(1).setFriction(1);
    peasant = this.matter.add.sprite(300, 300, 'peasant').setActive().setBounce(1);
    squirrel = this.matter.add.sprite(250,200,'squirrel').setActive().setBounce(1);
    
    // multiple sprites
    /*
    for (var i = 0; i < 20; i++){
        var peasant =  this.add.sprite(100+i*Math.floor((Math.random() * 10) + 1),100+i*Math.floor((Math.random() * 10) + 1),'peasant')
    }
    */
    //  If you don't set the body as active it won't collide with the world bounds

    var config = {
        key: 'walk',
        frames: this.anims.generateFrameNumbers('ridder', { start: 0, end: 1 }),
        frameRate: 7,
        repeat: -1,
        repeatDelay: 0
    };
    this.anims.create(config);

    ridder.anims.play('walk');

    //get user input using cursor
    cursors = this.input.keyboard.createCursorKeys();

    this.matter.world.on('collisionstart', function (event, bodyA, bodyB) {

        bodyA.gameObject.setTint(0xff0000);
        bodyB.gameObject.setTint(0x00ff00);

    });
}


function update() {
    if (cursors.left.isDown)
    {
        ridder.setVelocityX(-5);
    }
    else if (cursors.right.isDown)
    {
        ridder.setVelocityX(5);
    }
    else
    {
        ridder.setVelocityX(0);
    }

    if (cursors.up.isDown)
    {
        ridder.setVelocityY(-5);
    }
    else if (cursors.down.isDown)
    {
        ridder.setVelocityY(5);
    }
    else
    {
        ridder.setVelocityY(0);
    }
}