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
        default: 'arcade',
        impact: {
            setBounds:{
                x:0,
                y:0,
                width:700,
                height:700,
                thickness:32
            }
        },
        arcade: {
            debug: false
        }
    }
};
let amountofsquirrels = 10;
let game = new Phaser.Game(config);

function preload() {
    this.load.image('ground','assets/Background.jpg');
    this.load.spritesheet('castle','assets/Kasteel.png', {frameWidth: 128, frameHeight: 95});
   // this.load.spritesheet('peasant','assets/Peasant.png', {frameWidth: 64, frameHeight: 64});
    this.load.spritesheet('ridder','assets/Ridder.png', {frameWidth: 52, frameHeight: 58});
    this.load.spritesheet('squirrel','assets/squirrel.png', {frameWidth: 64, frameHeight: 64});
}
// variable outside of create in order to use them in other functions
var ridder;
var squirrel;
var peasant;
var cursors;
var castle;
var glory;
let castlehealth = 100;
var score = 0;

function create() {
    this.add.image(350,350,'ground');
    castle = this.physics.add.staticGroup();
    castle.create(350,350,'castle');

    var configAttack = {
        key: 'attack',
        frames: game.anims.generateFrameNumbers('ridder', { start: 2, end:6 }),
        frameRate: 10,
        repeat: 0
    };
    game.anims.create(configAttack);

    var configWalk = {
        key: 'walk',
        frames: game.anims.generateFrameNumbers('ridder', { start: 0, end:1 }),
        frameRate: 10,
        repeat: -1
    };
    game.anims.create(configWalk);
    
    ridder = this.physics.add.sprite(400,400,'ridder');
    ridder.setActive();
    ridder.setCollideWorldBounds(true);

    var config = {
        key: 'randomMovement',
        frames: game.anims.generateFrameNumbers('squirrel', { start: 0, end: 1 }),
        frameRate: 10,
        repeat: -1
    };
    game.anims.create(config);

    squirrel = this.physics.add.group({
        key: 'squirrel',
        repeat: amountofsquirrels,
        setXY: { x: 50, y: 50, stepX: 50 }
    });
    squirrel.children.iterate(function (child) {
        child.setCollideWorldBounds(true);
        child.play('randomMovement');
        child.setVelocity(Phaser.Math.Between(100, 150), Phaser.Math.Between(100, 150));
        child.setBounce(1);
        var x = Phaser.Math.Between(50, 650);
        var y = Phaser.Math.Between(50, 650);
        child.setX(x);
        child.setY(y);
    })

    this.physics.add.collider(squirrel,castle, damageCastle, null,this);
    this.physics.add.collider(squirrel,squirrel);
    this.physics.add.collider(ridder, squirrel, killsquirrel, null, this);
    
    game.anims.create({
        key:'gameover',
        frames: [{key: 'castle', frame: 1}]
    })
    healthtext = this.add.text(16,16,'Health: 100', {fontsize: '32px', fill: '#FFF'});
    scoretext = this.add.text(600,16,'Glory: 0', {fontsize: '32px', fill: '#FFF'});
    cursors = this.input.keyboard.createCursorKeys();
}


function update() {
    if (!ridder.anims.isPlaying) {
        ridderWalk();
    }
    if (cursors.left.isDown)
    {

        ridder.setVelocityX(-200);
        ridder.flipX = true;
    }
    else if (cursors.right.isDown) {
        ridder.setVelocityX(200);
        ridder.flipX = false;
    }
    else {
        ridder.setVelocityX(0);
    }

    if (cursors.up.isDown) {
        ridder.setVelocityY(-200);
    }
    else if (cursors.down.isDown) {
        ridder.setVelocityY(200);
    }
    else {
        ridder.setVelocityY(0);
    }
    if (cursors.space.isDown) {

        ridderAttack();
    }
    else {
    }


}


//custom made functions ///////////////////////////////////
function killsquirrel(ridder,s) {
    score += 5;
    scoretext.setText('Glory: ' + score);
    s.disableBody(true,true);
    if(squirrel.countActive(true)===0)
    {
        amountofsquirrels +=5;
        squirrel = game.scene.scenes[0].physics.add.group({
            key: 'squirrel',
            repeat: amountofsquirrels,
            setXY: { x: 50, y: 50, stepX: 50 }
        });

        squirrel.children.iterate(function (child) {
            child.setCollideWorldBounds(true);
            child.play('randomMovement');
            child.setVelocity(Phaser.Math.Between(100, 150), Phaser.Math.Between(100, 150));
            child.setBounce(1);
            var x = Phaser.Math.Between(50, 650);
            var y = Phaser.Math.Between(50, 650);
            child.setX(x);
            child.setY(y);
        })
        this.physics.add.collider(squirrel,castle, damageCastle, null,this);
        this.physics.add.collider(squirrel,squirrel);
        this.physics.add.collider(ridder, squirrel, killsquirrel, null, this);
    }
}

function damageCastle(squirrel,castle) {
    castlehealth -= 5;
    healthtext.setText('Health: '+castlehealth)
    if(castlehealth<=0)
    {
        castle.anims.play('gameover');


    }

}

function ridderWalk() {

    ridder.anims.play('walk');
}

function ridderAttack() {

    ridder.anims.play('attack');
}
