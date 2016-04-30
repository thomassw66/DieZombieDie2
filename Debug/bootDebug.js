var bootState = {

    create: function () {

        game.diceVal = 0;
        game.physics.startSystem(Phaser.Physics.ARCADE);

        game.state.start('load');


    }
}