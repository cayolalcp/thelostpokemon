define(['Phaser','game'], function (Phaser,Game){
    
    function controlesState() {
        Phaser.State.call(this);
    }
    
    //Inheritance
    controlesState.prototype = Object.create(Phaser.State.prototype);
    controlesState.prototype.constructor = controlesState;
    
    //cargamos imagenes y sonidos y ponemos textos
    controlesState.prototype.preload = function () {
        Game.load.image('startBackground', 'assets/startBackground2.jpg');   
        Game.load.image('pokePattern', 'assets/pokePattern.jpg');
        Game.load.image('bulbasaurMenu', 'assets/bulbasaurMenu.png');
        Game.load.image('charmanderMenu', 'assets/charmanderMenu.png');
        Game.load.image('squirtleMenu', 'assets/squirtleMenu.png');
        Game.load.image('teclasMover', 'assets/mover.png');
        Game.load.image('spacebar', 'assets/spacebar.png');
        Game.load.image('mb', 'assets/Main_bulbasaur.png');
        Game.load.image('mc', 'assets/Main_charmander.png');
        Game.load.image('ms', 'assets/Main_squirtle.png');
        
        this.siguiente = Game.add.text(400, 350, 'Sig.',{ font: 'bold 36px Geo', fill: '#000000' });
        this.volver = Game.add.text(250, 350, 'Volver',{ font: 'bold 36px Geo', fill: '#000000' });
        
        Game.load.image('pokeIco', 'assets/pokeIco.png');  
        Game.load.audio('optionMenu', ['assets/optionMenu.mp3', 'assets/optionMenu.ogg']);
        Game.load.audio('selectMenu', ['assets/selectMenu.mp3', 'assets/selectMenu.ogg']); 
    }
    
    //anadimos resto de textos e imagenes
    controlesState.prototype.create = function() {        
        pokePattern=Game.add.tileSprite(0,0,800,600,'pokeParticle'); 
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

        this.pokeIco=Game.add.image(220, 350, 'pokeIco');
        this.pokeIco.scale.setTo(0.1,0.1);  
        
        this.teclasMover = Game.add.image(60, 25, 'teclasMover');
        this.teclasMover.scale.setTo(0.65,0.65);
        this.textoMover = Game.add.text(25, 85, 'Usa WASD o las flechas para mover al personaje.',{ font: 'bold 20px Arial', fill: '#000000'});
        
        this.spacebar = Game.add.image(25, 115, 'spacebar');
        this.spacebar.scale.setTo(0.65,0.65);
        this.textoSpacebar = Game.add.text(25, 170, 'La barra espaciadora ejecuta su habilidad.',{ font: 'bold 20px Arial', fill: '#000000'});
        
        this.mb = Game.add.image(25, 210, 'mb');
        this.mc = Game.add.image(125, 210, 'mc');
        this.ms = Game.add.image(225, 210, 'ms');
        Game.add.text(25, 270, 'Usa la Z para controlar a Bulbasaur,',{ font: 'bold 20px Arial', fill: '#000000'});
        Game.add.text(25, 290, 'la X para Charmander y la C para Squirtle.',{ font: 'bold 20px Arial', fill: '#000000'});
        
        this.optionMenuSound = Game.add.audio('optionMenu');
        this.selectMenuSound = Game.add.audio('selectMenu');

        //cargamos teclas
        var rightKey = Game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
        rightKey.onDown.add(this.rightMenu, this);
        var leftKey = Game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
        leftKey.onDown.add(this.leftMenu, this);
        var enterKey = Game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
        enterKey.onDown.add(this.enterMenu, this);
       
    }
    
    controlesState.prototype.enterMenu = function() {
        this.selectMenuSound.play();
        Game.state.start('configurationState');
    }
    
    //comprobamos el estado cuando pulsamos la tecla enter y actuamos en consecuencia
    controlesState.prototype.enterMenu = function() {
        this.selectMenuSound.play();      
        switch(this.posMenu) {
            case 0:
                Game.state.start('configurationState');
                break;

            case 1:
                Game.state.start('controlesState2');
                break;
        }       
    }
    //comprobamos el estado cuando pulsamos la tecla derecha y actuamos en consecuencia
    controlesState.prototype.rightMenu = function() {
        this.optionMenuSound.play();
        switch(this.posMenu) {
            case 0:
                this.pokeIco.position.x=360;
                this.posMenu=1;
                break;

            case 1:
                this.pokeIco.position.x=220;
                this.posMenu=0;
                break;
        }
    }
    //comprobamos el estado cuando pulsamos la tecla izquierda y actuamos en consecuencia
    controlesState.prototype.leftMenu = function() {
        this.optionMenuSound.play();
        switch(this.posMenu) {
            case 0:
                this.pokeIco.position.x=360;
                this.posMenu=1;
                break;

            case 1:
                this.pokeIco.position.x=220;
                this.posMenu=0;
                break;
        }
    }
    
    controlesState.prototype.update = function() {
        pokePattern.tilePosition.y += 0.08;
        pokePattern.tilePosition.x += 0.08;
    }

    return controlesState;
});