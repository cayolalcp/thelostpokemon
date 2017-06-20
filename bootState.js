define(['Phaser','game'], function (Phaser,Game){
    
    function bootState() {
        Phaser.State.call(this);
    }
    
    //Inheritance
    bootState.prototype = Object.create(Phaser.State.prototype);
    bootState.prototype.constructor = bootState;

    bootState.prototype.preload = function () {
        // Load the image
        Game.load.image('progressBar', 'assets/progressBar.png');
    }
    
    bootState.prototype.create =  function() {
        // Set some game settings
        var colorFondo = ['#58FA58','#FE2E2E','#81F7F3'];
        Game.colorTheme=Game.rnd.integerInRange(0, colorFondo.length-1)
        Game.stage.backgroundColor = colorFondo[Game.colorTheme];
        
        Game.physics.startSystem(Phaser.Physics.ARCADE);
        // Start the load state
        Game.state.start('loadState');
    }

    return bootState;
});