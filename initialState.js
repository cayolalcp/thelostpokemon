define(['Phaser','game'], function (Phaser,Game){

    function initialState() {
        Phaser.State.call(this);
    }

    //Inheritance
    initialState.prototype = Object.create(Phaser.State.prototype);
    initialState.prototype.constructor = initialState;
    
    initialState.prototype.preload = function () {
        Game.load.image('startBackground', 'assets/startBackground2.jpg');   
        Game.load.image('pokePattern', 'assets/pokePattern.jpg');
        Game.load.image('title', 'assets/title.png');       
        Game.load.audio('selectMenu', ['assets/selectMenu.mp3', 'assets/selectMenu.ogg']); 
        Game.load.audio('ostMenu', ['assets/ostMenu.mp3', 'assets/ostMenu.ogg']); 
    }
    
    //carga las imagenes y los textos del estado inicial
    initialState.prototype.create = function() {
        this.complete = false;
        this.tiempo=0;
        pokePattern=Game.add.tileSprite(0,0,800,600,'pokeParticle');
        startBCS=Game.add.image(Game.world.centerX-20, Game.world.centerY-60, 'startBCS');
        startBCS.anchor.setTo(0.5, 0.5);
        startBCS.scale.setTo(0.65,0.65);

        title=Game.add.image(Game.world.centerX-230, -200, 'title');
        title.scale.setTo(0.65,0.65);
        Game.add.tween(title).to({y: -100}, 1000).easing(Phaser.Easing.Bounce.Out).start();

        TheLostPokemon=Game.add.image(Game.world.centerX, Game.world.centerY-30, 'TheLostPokemon');
        TheLostPokemon.anchor.setTo(0.5, 0.5);
        TheLostPokemon.scale.setTo(0.65,0.65);
        TheLostPokemon.alpha = 0.1;
        Game.add.tween(TheLostPokemon).to({alpha:1},3000).start();

        Game.ostMenuSound = Game.add.audio('ostMenu');
        
        this.pressUp = Game.add.text(Game.world.centerX, Game.world.centerY+165, 'START (Pulsa ↑)',{ font: '36px Geo   ', fill: '#000000' });
        this.pressUp.anchor.setTo(0.5, 0.5); 
        
        this.espere = Game.add.text(Game.world.centerX, Game.world.centerY+165, 'Cargando...',{ font: '36px Geo   ', fill: '#000000' });
        this.espere.anchor.setTo(0.5, 0.5); 
        
        var space = Game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        // When the 'upKey' is pressed, it will call the 'start' function once
        space.onDown.addOnce(this.vidComplete, this);
        
        // Create a new Phaser keyboard variable: the up arrow key
        var upKey = Game.input.keyboard.addKey(Phaser.Keyboard.UP);
        // When the 'upKey' is pressed, it will call the 'start' function once
        upKey.onDown.add(this.start, this);
        
        video = Game.add.video('intro');
        video.play(false);
        sprite = video.addToWorld(Game.world.centerX, Game.world.centerY, 0.5, 0.5, 0.37, 0.38);
        video.onComplete.add(this.vidComplete, this);
    }

    initialState.prototype.update = function() {    
        this.tiempo += Game.time.elapsed;
        if(Game.ostMenuSound.isPlaying==false){
        this.espere.visible=true;
        this.pressUp.visible=false;
        }else{
                
        this.espere.visible=false;
        if ( this.tiempo >= 800 ){
            this.tiempo = 0;
            this.pressUp.visible = !this.pressUp.visible;
        } 
            
            
        }
        pokePattern.tilePosition.y += 0.08;
        pokePattern.tilePosition.x += 0.08;        
    }
    
    initialState.prototype.vidComplete = function() { 
        video.stop();  
        this.complete = true;
        Game.ostMenuSound.play(); 
        sprite.destroy();       
    }

    initialState.prototype.start= function() {
        // Start the actual Game
        console.log(this.complete);
        if(this.complete){
            video.stop();
            if(this.espere.visible==false){
            Game.state.start('menuState');
            }
        }
    }
    
    return initialState;
});