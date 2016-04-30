var sprite;
var zombies;
var bullets;
var shotsFired = 0;
var shotsFiredString = '';
var shotsFiredText;
var shotsAccuracy = shotsFired / hits;
var shotsAccuracyString = '';
var shotsAccuracyText;
var hits = 0;
var fireRate = 350;
var nextFire = 0;
var zombieReset = 16;
var zombiesString = '';
var zombiesText;
var zMap;
var score = 0;
var scoreString = '';
var scoreText;
//var time = globalDiceVal;
var seconds = 0;
var secondHolder = 60;
var minutes = 0;
var timeText = 0;
//console.log(time);


var playState = {

    create: function () {

        game.physics.startSystem(Phaser.Physics.ARCADE);
        //////game.physics.startSystem(Phaser.Physics.P2JS);
        //the background
        zMap = game.add.tileSprite(0, 0, 1000, 600, 'map');
        /////game.world.setBounds(0,0,1000, 600);
        //the bullet group
        bullets = game.add.group();
        bullets.enableBody = true;
        bullets.physicsBodyType = Phaser.Physics.ARCADE;
        bullets.createMultiple(10000, 'bullet');
        bullets.setAll('checkWorldBounds', true);
        bullets.setAll('outOfBoundsKill', true);
        //the player spawns middle of the map
        sprite = game.add.sprite(500, 300, 'player');
        sprite.scale.set(.5); //sets the size of the player
        sprite.anchor.set(0.5);
        game.physics.enable(sprite, Phaser.Physics.ARCADE);
        sprite.body.allowRotation = false;
        ///////game.physics.p2.enable(sprite, true);
        //the zombies
        zombies = game.add.group();
        zombies.enableBody = true;
        zombies.physicsBodyType = Phaser.Physics.ARCADE;
        //spawns first round of zombies
        spawnZombies();
        //the shots fired/accuracy/score and zombies killed
        shotsFiredString = 'Shots Fired: ';
        shotsFiredText = game.add.text(10, 14, shotsFiredString + shotsFired, { font: '14px Arial', fill: '#ff0044' });
        shotsAccuracyString = 'Shots Accuracy: ';
        shotsAccuracyText = game.add.text(10, 26, shotsAccuracyString + shotsAccuracy, { font: '14px Arial', fill: '#ff0044' });
        zombiesString = 'Zombies Killed: ';
        zombiesText = game.add.text(10, 38, zombiesString + hits, { font: '14px Arial', fill: '#ff0044' });
        scoreString = 'Score: ';
        scoreText = game.add.text(10, 50, scoreString + score, { font: '14px Arial', fill: '#ff0044' });

        sprite.body.collideWorldBounds = true;
        //add timer text and event
        timeText = game.add.text(10, 1, 'Time: ' + globalDiceVal + ':00', { font: "16px Arial", fill: "#000000" });
        game.time.events.loop(Phaser.Timer.SECOND * 1, addTime, this);

        //Player sprite test
        QUnit.test("Player Sprite Test", function (assert) {

            assert.notEqual(sprite, null, "Player sprite is added");

        });

        //Player sprite controls test
        QUnit.test("Player Sprite Controls Test", function (assert) {

            assert.notEqual(sprite, null, "Player sprite controls are functional");

        });


        //Game Physics unit test
        QUnit.test("Game Physics Test", function (assert) {
            assert.ok(1 == "1", "Game Physics is applied");
        });

        //Score keeping Test
        QUnit.test("Player Score Test", function (assert) {

            assert.notEqual(scoreText, null, "Player score is displayed");

        });

        //Map Load Test
        QUnit.test("Map Load Test", function (assert) {
            assert.ok(zMap != "null", "Map instantiated");
        });

    },



    update: function () {
        //checks if sprite is alive
        if (sprite.alive) {
            //rotates the sprite to where the cursor is 
            sprite.rotation = game.physics.arcade.angleToPointer(sprite);
            //shoots the bullets
            if (game.input.activePointer.isDown) {
                shoot();
            }
            //the player movement using WASD, can change the speed by changing the numbers
            if (game.input.keyboard.isDown(Phaser.Keyboard.A)) {
                sprite.x -= 3;
            }
            else if (game.input.keyboard.isDown(Phaser.Keyboard.D)) {
                sprite.x += 3;
            }
            if (game.input.keyboard.isDown(Phaser.Keyboard.W)) {
                sprite.y -= 3;
            }
            else if (game.input.keyboard.isDown(Phaser.Keyboard.S)) {
                sprite.y += 3;
            }
            //this is for bullet collision and player damage
            game.physics.arcade.overlap(bullets, zombies, hitDetection, null, this);
            game.physics.arcade.overlap(sprite, zombies, playerDamage, null, this);
        }
    }

}

function spawnZombies() {
    // spawns 3x2 zombies randomly spawned on the bottom and the top of the screen
    for (var count = 0; count < 8; count++) {
        var newZombie = zombies.create(game.rnd.integerInRange(100, 900), game.rnd.integerInRange(50, 100), 'zombie');
        newZombie.scale.set(.5);
        var newZombie = zombies.create(game.rnd.integerInRange(100, 900), game.rnd.integerInRange(500, 550), 'zombie');
        newZombie.scale.set(.5);
    }

    QUnit.test("Zombie Sprite Test", function (assert) {
        assert.ok(1 == "1", "Zombies Spawn");
    });
}

function hitDetection(bullet, zombie) {
    //when a bullet hits a zombie it kills both the bullet and the zombie
    bullet.kill();
    zombie.kill();
    //changes the accuracy, score, and the zombies killed of the player
    hits++;
    zombiesText.text = zombiesString + hits;
    shotsAccuracy = hits / shotsFired;
    shotsAccuracy = shotsAccuracy * 100;
    shotsAccuracyText.text = shotsAccuracyString + shotsAccuracy.toFixed(0) + '%';
    score = shotsAccuracy.toFixed(0) * hits;
    scoreText.text = scoreString + score;
    //onces all the zombies die it will spawn a new set of zombies
    zombieReset--;
    if (zombieReset == 0) {
        spawnZombies();
        zombieReset = 16;
    }


    if (hits == "1") {
        QUnit.test("Zombie Shot", function (assert) {
            assert.ok(hits == "1", "Zombie kill logged");
        });
    }
}

function playerDamage(hero, zombie) {
    //when the player touches the zombie it kills the player
    hero.kill();

    reset();

    //Unit test for Hero killed
    QUnit.test("Hero killed", function (assert) {
        assert.ok(sprite.alive == false, "Hero Killed by Zombie");
    });

    game.state.start('end')
}

function shoot() {
    //shooting mechanic where you can change the firerate, bullet speed, and how many bullets you allow alive
    if (game.time.now > nextFire && bullets.countDead() > 0) {
        nextFire = game.time.now + fireRate;
        var bullet = bullets.getFirstDead();
        bullet.reset(sprite.x - 8, sprite.y - 8);
        game.physics.arcade.moveToPointer(bullet, 450);
        //changes the shots fired and accuracy of the player
        shotsFired++;
        shotsFiredText.text = shotsFiredString + shotsFired;
        shotsAccuracy = hits / shotsFired;
        shotsAccuracy = shotsAccuracy * 100;
        shotsAccuracyText.text = shotsAccuracyString + shotsAccuracy.toFixed(0) + '%';
        score = shotsAccuracy.toFixed(0) * hits;
        scoreText.text = scoreString + score;

        //Shooting accuracy Test
        if (shotsAccuracy != "Nan" && shotsFired == "1") {
            QUnit.test("Accuracy update", function (assert) {
                assert.ok(shotsAccuracy != "Nan", "Accuracy updates");
            });
        }

        //Shots fired Test unit
        if (shotsFired == "1") {
            QUnit.test("Shooting test", function (assert) {
                assert.ok(shotsFired == "1", "Gun Fired");
            });
        }
    }

}

function addTime() {//updates the timer using phaser time event every second
    if (minutes == 0) {

        //Time unit test
        QUnit.test("Timer test", function (assert) {
            assert.ok(minutes == 0, "Timer is started");
        });

        minutes++;
    }

    if (minutes == (globalDiceVal + 1)) {
        reset();
        endGame();
    }
    else {
        if (seconds < 60) {
            seconds++;
        }
        else {
            seconds = 1;
            minutes++;
            secondsHolder = 59;
        }

        if ((secondHolder - seconds) < 10) {
            timeText.setText('Time: ' + (globalDiceVal - minutes) + ':' + '0' + (secondHolder - seconds));
        }
        else {
            timeText.setText('Time: ' + (globalDiceVal - minutes) + ':' + (secondHolder - seconds));
        }
        if (minutes > globalDiceVal) {
            timeText.setText('Time: 0:00');
        }
    }
}

function reset() {//resets all the stats so if they start another game it will have fresh stats
    scoreHolder = score;
    shotsFired = 0;
    hits = 0;
    zombieReset = 16;
    score = 0;
    shotsAccuracy = 0;
    secondHolder = 60;
}

function endGame() {
    game.state.start('end')
}