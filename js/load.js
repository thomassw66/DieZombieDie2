//global var for dice val
var globalDiceVal = 5;
//global scoreholder val
var scoreHolder = 0;


var loadState = {


	preload: function() {


	//loads the images for the bullet and the player
    game.load.image('player', 'assets/sprites/player.png');
    game.load.image('bullet', 'assets/sprites/bullet.png');
    game.load.image('zombie', 'assets/sprites/zombieSprite.png');
    game.load.image('map', 'assets/sprites/zombieSoccer.png');
    game.load.image('zombiehead', 'assets/sprites/zombie-head.png');
    game.load.image('startButton', 'assets/sprites/rollthedice.png');
    game.load.image('restartButton', 'assets/sprites/start.png');


    // dice spritesheet taken from opengameart.org/content/boardgame-pack
    // credit to Kenney.nl
    game.load.spritesheet('dice', 'assets/sprites/diceRed.png', 64, 64);


	},

	create: function() {

		game.state.start('menu');
	}
}