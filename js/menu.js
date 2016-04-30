var titleDie;
var rand;
var rolled = false;

var menuState = {

    create:function() {

        game.stage.backgroundColor = '#000000';
        emitter = game.add.emitter(game.world.leftX, -75, 200);
        emitter.makeParticles('zombiehead');
        emitter.start(false, 5000, 20);

        // define the title and game instructions
        var title = " - DieZomebieDie -";
        var slogan = "Roll the dice. Try to survive.";
        var howToPlay = "How to play:";
        var instructions = "-WASD to move" + "\n" + "-Click to shoot." + "\n" + "-Space to roll the dice" + "\n" + "-Click anywhere to start the game.";


        // define the title and game instructions styles
        var instructionsStyle = { font: "30px Impact", fill: "#666", align: "center" };
        var titleStyle = { font: "75px Impact", fill: "#560000", align: "center" };
        var sloganStyle = { font: "30px Impact", fill: "#560000", align: "center" };


        // render the title and game instructions to correct position on canvas
        var ttl = game.add.text(game.world.centerX-70, 0, title, titleStyle);
        var slg = game.add.text(game.world.centerX, 75, slogan, sloganStyle);
        var htp = game.add.text(game.world.centerX-50, 150, howToPlay, instructionsStyle);
        var ins = game.add.text(game.world.centerX, 185, instructions, instructionsStyle);

        titleDie = game.add.sprite(700, 391, 'dice');
        rand = game.rnd.pick([1,2,3,4,5,6]);


        globalDiceVal = rand;
        rand = globalDiceVal;

        key1 = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        key1.onDown.add(displayDieResult, this);


        game.input.onDown.addOnce(this.start);

        

        console.log(globalDiceVal);

    },


    update: function() {
        
        titleDie.frame = game.rnd.pick([0,1,2,4,5,6]);
        
    },

    start: function() {

        game.state.start('play');
    }

}


function displayDieResult() {

   var ntitleDie = game.add.sprite(700, 391, 'dice')
   ntitleDie.animations.stop(null, true);

    if (globalDiceVal == 1)
    {
        ntitleDie.frame = 1;
            
    }
    else if(globalDiceVal == 2)
    {
        ntitleDie.frame = 2;
            
    }
    else if(globalDiceVal == 3)
    {
        ntitleDie.frame = 5;  
            
    }
    else if(globalDiceVal == 4)
    {
        ntitleDie.frame = 6;
            
    }
    else if(globalDiceVal == 5)
    {
        ntitleDie.frame = 4;
            
    }
    else if(globalDiceVal == 6)
    {
        ntitleDie.frame = 0;
            
    }

    rolled = true;

};

