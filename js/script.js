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
}

var ridder;
var cursors;

function create() {
    var bounds = new Phaser.Geom.Rectangle(100, 100, 400, 400);
    // creates bounds
    this.add.image(350,350,'ground');
    let center = this.add.sprite(350,350,'castle');
    ridder = this.matter.add.sprite(200,200,'ridder');
    
    /*
    for (var i = 0; i < 20; i++){
        var peasant =  this.add.sprite(100+i*Math.floor((Math.random() * 10) + 1),100+i*Math.floor((Math.random() * 10) + 1),'peasant')
    }
    */
    //  If you don't set the body as active it won't collide with the world bounds
    this.matter.add.image(300, 300, 'peasant').setActive().setVelocity(300, 200).setBounce(1);
    cursors = this.input.keyboard.createCursorKeys();
}


function update() {
    if (cursors.left.isDown)
    {
        ridder.setVelocityX(-10);
    }
    else if (cursors.right.isDown)
    {
        ridder.setVelocityX(10);
    }
    else
    {
        ridder.setVelocityX(0);
    }

    if (cursors.up.isDown)
    {
        ridder.setVelocityY(-10);
    }
    else if (cursors.down.isDown)
    {
        ridder.setVelocityY(10);
    }
    else
    {
        ridder.setVelocityY(0);
    }
}