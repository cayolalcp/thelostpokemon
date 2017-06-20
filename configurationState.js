define(['Phaser','game'], function (Phaser,Game){
    
    function configurationState() {
        Phaser.State.call(this);
    }
    
    //Inheritance
    configurationState.prototype = Object.create(Phaser.State.prototype);
    configurationState.prototype.constructor = configurationState;
    
    //cargamos imagenes, audios y ponemos textos
    configurationState.prototype.preload = function () {
        Game.load.image('startBackground', 'assets/startBackground2.jpg');   
        Game.load.image('pokePattern', 'assets/pokePattern.jpg');
        Game.load.image('title', 'assets/title.png');
        
        Game.load.image('bulbasaurMenu', 'assets/bulbasaurMenu.png');
        Game.load.image('charmanderMenu', 'assets/charmanderMenu.png');
        Game.load.image('squirtleMenu', 'assets/squirtleMenu.png');
        
        this.vol = Game.add.text(60, 195, 'Volumen: ',{ font: 'bold 36px Geo', fill: '#000000' });
        this.volOn = Game.add.text(250, 195, 'ON',{ font: 'bold 36px Geo', fill: '#000000' });
        this.volOff = Game.add.text(350, 195, 'OFF',{ font: 'bold 36px Geo', fill: '#000000' });
        this.controles = Game.add.text(250, 245, 'Controles',{ font: 'bold 36px Geo', fill: '#000000' });
        this.volver = Game.add.text(250, 295, 'Volver',{ font: 'bold 36px Geo', fill: '#000000' });
        
        Game.load.image('pokeIco', 'assets/pokeIco.png');  
        Game.load.audio('optionMenu', ['assets/optionMenu.mp3', 'assets/optionMenu.ogg']);
        Game.load.audio('selectMenu', ['assets/selectMenu.mp3', 'assets/selectMenu.ogg']); 
    }
    
    
    configurationState.prototype.create = function() {        
        pokePattern=Game.add.tileSprite(0,0,800,600,'pokeParticle'); 
        title=Game.add.image(120, -120, 'title'); 
        title.scale.setTo(0.65,0.65);
        this.posMenu=0;
        //elegimos el tema
        switch(Game.colorTheme) {
            case 0:
                bulbasaurMenu=Game.add.image(1000, 110, 'bulbasaurMenu'); 
                bulbasaurMenu.scale.setTo(0.65,0.65);
                Game.add.tween(bulbasaurMenu).to({x: 390}, 1000).easing(Phaser.Easing.Bounce.Out).start();
                break;
            case 1:
                charmanderMenu=Game.add.image(1000, 100, 'charmanderMenu'); 
                charmanderMenu.scale.setTo(0.65,0.65);
                Game.add.tween(charmanderMenu).to({x: 390}, 1000).easing(Phaser.Easing.Bounce.Out).start();
                break;
            case 2:
                squirtleMenu=Game.add.image(1000, 100, 'squirtleMenu'); 
                squirtleMenu.scale.setTo(0.65,0.65);
                Game.add.tween(squirtleMenu).to({x: 400}, 1000).easing(Phaser.Easing.Bounce.Out).start();
                break;
        }
        
        TheLostPokemon=Game.add.image(350, 120, 'TheLostPokemon');
        TheLostPokemon.anchor.setTo(0.5, 0.5);
        TheLostPokemon.scale.setTo(0.65,0.65);
        
        this.pokeIco=Game.add.image(220, 195, 'pokeIco');
        this.pokeIco.scale.setTo(0.1,0.1);  
        this.optionMenuSound = Game.add.audio('optionMenu');
        this.selectMenuSound = Game.add.audio('selectMenu');

        //anadimos las teclas para el menu
        var rightKey = Game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
        rightKey.onDown.add(this.rightMenu, this);        
        var leftKey = Game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
        leftKey.onDown.add(this.leftMenu, this);
        var upKey = Game.input.keyboard.addKey(Phaser.Keyboard.UP);
        upKey.onDown.add(this.upMenu, this);
        var downKey = Game.input.keyboard.addKey(Phaser.Keyboard.DOWN);
        downKey.onDown.add(this.downMenu, this);
        var enterKey = Game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
        enterKey.onDown.add(this.enterMenu, this);
       
    }
    //comprobamos el estado cuando pulsamos enter y actuamos en consecuencia
    configurationState.prototype.enterMenu = function() {
        this.selectMenuSound.play();      
        switch(this.posMenu) {
            case 0:
                Game.sound.mute = false;
                break;
            case 1:
                Game.sound.mute = true;
                break;
            case 2:
                Game.state.start('controlesState');
                break;
            case 3:
                Game.state.start('menuState');
                break;
        }           
    }
    //comprobamos el estado cuando pulsamos la tecla derecha y actuamos en consecuencia
    configurationState.prototype.rightMenu = function() {
        this.optionMenuSound.play();
        switch(this.posMenu) {
            case 0:
                this.pokeIco.position.x=320;
                this.posMenu=1;
                break;
            case 1:
                this.pokeIco.position.x=220;
                this.posMenu=0;
                break;
            case 2:
                break;
            case 3:
                break;
        }
    }
    //comprobamos el estado cuando pulsamos la tecla izquierda y actuamos en consecuencia
    configurationState.prototype.leftMenu = function() {
        this.optionMenuSound.play();
        switch(this.posMenu) {
            case 0:
                this.pokeIco.position.x=320;
                this.posMenu=1;
                break;
            case 1:
                this.pokeIco.position.x=220;
                this.posMenu=0;
                break;
            case 2:
                break;
            case 3:
                break;
        }
    }
    //comprobamos el estado cuando pulsamos la tecla arriba y actuamos en consecuencia
    configurationState.prototype.upMenu = function() {
        this.optionMenuSound.play();
        switch(this.posMenu) {
            case 0:
                this.pokeIco.position.x=220;
                this.pokeIco.position.y = 295;
                this.posMenu=3;
                break;
            case 1:
                this.pokeIco.position.x=220;
                this.pokeIco.position.y = 295;
                this.posMenu=3;
                break;
            case 2:
                this.pokeIco.position.x=220;
                this.pokeIco.position.y = 195;
                this.posMenu=0;
                break;
            case 3:
                this.pokeIco.position.x=220;
                this.pokeIco.position.y = 245;
                this.posMenu=2;
                break;
        }
        
    }
    //comprobamos el estado cuando pulsamos la tecla abajo y actuamos en consecuencia
    configurationState.prototype.downMenu = function() {
        this.optionMenuSound.play();
        switch(this.posMenu) {
            case 0:
                this.pokeIco.position.x=220;
                this.pokeIco.position.y = 245;
                this.posMenu=2;
                break;
            case 1:
                this.pokeIco.position.x=220;
                this.pokeIco.position.y = 245;
                this.posMenu=2;
                break;
            case 2:
                this.pokeIco.position.x=220;
                this.pokeIco.position.y = 295;
                this.posMenu=3;
                break;
            case 3:
                this.pokeIco.position.x=220;
                this.pokeIco.position.y = 195;
                this.posMenu=0;
                break;
        }
    }
    
    configurationState.prototype.update = function() {
        pokePattern.tilePosition.y += 0.08;
        pokePattern.tilePosition.x += 0.08;
    }

    return configurationState;
});