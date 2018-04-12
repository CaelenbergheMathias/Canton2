var game = new Phaser.Game(700, 700, Phaser.AUTO, '', { preload: preload, create: create, update: update });

function preload() {
    game.load.image('background', 'assets/Background.png',700,700);
    game.load.spritesheet('ridder', 'assets/Ridder.png', 64, 64);
    game.load.spritesheet('castle', 'assets/Kasteel.png', 128, 95);
}
var castle;
var ridder;
var squirrels;
var glory;
var castleHealth;

function create() {
    game.add.image(700,700,'background');
    castle = game.add.sprite(350, 350, 'castle');
    ridder = game.add.sprite(32, 200, 'ridder');

    game.physics.arcade.enable(ridder);

    cursors = game.input.keyboard.createCursorKeys();
}

function update() {
    ridder.body.velocity.x = 0;
    ridder.body.velocity.y = 0;

    if (cursors.left.isDown)
    {
        ridder.body.velocity.x = -200;
    }
    else if (cursors.right.isDown)
    {
        ridder.body.velocity.x = 200;
    }

    if (cursors.up.isDown)
    {
        ridder.body.velocity.y = -200;
    }
    else if (cursors.down.isDown)
    {
        ridder.body.velocity.y = 200;
    }

}