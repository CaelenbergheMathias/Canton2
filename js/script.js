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
        default: 'impact',
        impact: {
            setBounds:{
                x:0,
                y:0,
                width:700,
                height:700,
                thickness:32
            }
        }
    }
};

let game = new Phaser.Game(config);
let knight;

function preload() {
    this.load.image('ground','assets/Background.jpg');
    this.load.spritesheet('castle','assets/Kasteel.png', {frameWidth: 128, frameHeight: 95});
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
var glory;

function create() {
    var bounds = new Phaser.Geom.Circle(100, 100, 400);
    this.add.image(350,350,'ground');
    castle = this.impact.add.sprite(350,350,'castle').setFixed();
    ridder = this.impact.add.sprite(200,200,'ridder').setActive();
    //peasant = this.impact.add.sprite(300, 300, 'peasant').setActive().setBounce(1);
    //squirrel = this.impact.add.sprite(250,200,'squirrel').setActive().setBounce(1);
    
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    var config = {
        key: 'randomMovement',
        frames: game.anims.generateFrameNumbers('squirrel', { start: 0, end: 1 }),
        frameRate: 10,
        repeat: -1
    };

    game.anims.create(config);

    for (var i = 0; i < 10; i++)
    {
        var x = Phaser.Math.Between(100, 3100);
        var y = Phaser.Math.Between(100, 300);
        squirrel = this.impact.add.sprite(x,y,'squirrel').play('randomMovement');
        squirrel.setLite().setBounce(1);
        squirrel.setVelocity(Phaser.Math.Between(20, 60), Phaser.Math.Between(20, 60));

        if (Math.random() > 0.5)
        {
            squirrel.vel.x *= -1;
        }
        else
        {
            squirrel.vel.y *= -1;
        }
    }
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    var configAttack = {
        key: 'attack',
        frames: game.anims.generateFrameNumbers('ridder', { start: 2, end: 7 }),
        frameRate: 10,
        repeat: 0
    };
    game.anims.create(configAttack);
    var configWalk = {
        key: 'walk',
        frames: game.anims.generateFrameNumbers('ridder', { start: 0, end: 1 }),
        frameRate: 7,
        repeat: -1
    };
    game.anims.create(configWalk);

    cursors = this.input.keyboard.createCursorKeys();
}


function update() {

    if(!ridder.anims.isPlaying)
    {
        ridderWalk();
    }

    console.log('test');
    if (cursors.left.isDown)
    {

        ridder.setVelocityX(-800);
        ridder.flipX = true;
    }
    else if (cursors.right.isDown)
    {
        ridder.setVelocityX(800);
        ridder.flipX = false;
    }
    else
    {
        ridder.setVelocityX(0);
    }

    if (cursors.up.isDown)
    {
        ridder.setVelocityY(-800);
    }
    else if (cursors.down.isDown)
    {
        ridder.setVelocityY(800);
    }
    else
    {
        ridder.setVelocityY(0);
    }
    if (cursors.space.isDown )
    {
        ridderAttack();
    }
    else{}
}


//custom made functions ///////////////////////////////////
function ridderAttack(){

    ridder.anims.play('attack');
}

function ridderWalk(){

    ridder.anims.play('walk');
}
 /*
function createSquirrels()
{

    var config = {
        key: 'randomMovement',
        frames: game.anims.generateFrameNumbers('squirrel', { start: 0, end: 1 }),
        frameRate: 10,
        repeat: -1
    };

    game.anims.create(config);

    for (var i = 0; i < 10; i++)
    {
        var x = Phaser.Math.Between(100, 3100);
        var y = Phaser.Math.Between(100, 300);
        squirrel = game.impact.add.sprite(x,y,'squirrel').play('randomMovement');
        squirrel.setLite().setBounce(1);
        squirrel.setVelocity(Phaser.Math.Between(20, 60), Phaser.Math.Between(20, 60));

        if (Math.random() > 0.5)
        {
            squirrel.vel.x *= -1;
        }
        else
        {
            squirrel.vel.y *= -1;
        }
    }
}
*/