define(['Phaser','game'], function (Phaser,Game){
    
    function menuState() {
        Phaser.State.call(this);
    }
    
    //Inheritance
    menuState.prototype = Object.create(Phaser.State.prototype);
    menuState.prototype.constructor = menuState;
  
    //cargamos imagenes y audios
    menuState.prototype.preload = function () {
        Game.load.image('title', 'assets/title.png');        
        Game.load.image('bulbasaurMenu', 'assets/bulbasaurMenu.png');
        Game.load.image('charmanderMenu', 'assets/charmanderMenu.png');
        Game.load.image('squirtleMenu', 'assets/squirtleMenu.png');        
        Game.load.image('nuevaPartida', 'assets/nuevaPartida.png');
        Game.load.image('seleccionDeNivel', 'assets/seleccionDeNivel.png');
        Game.load.image('configuracion', 'assets/configuracion.png');
        Game.load.image('sobreNosotros', 'assets/sobreNosotros.png');        
        Game.load.image('pokeIco', 'assets/pokeIco.png');          
        Game.load.audio('optionMenu', ['assets/optionMenu.mp3', 'assets/optionMenu.ogg']); 
    }
    
    //cargamos resto de iamgenes y textos
    menuState.prototype.create = function() {
        
        pokePattern=Game.add.tileSprite(0,0,800,600,'pokeParticle'); 
        
        title=Game.add.image(120, -120, 'title'); 
        title.scale.setTo(0.65,0.65);
        this.posMenu=0;
        //escogemos el tema
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

        this.pokeIco=Game.add.image(80, 190, 'pokeIco');
        this.pokeIco.scale.setTo(0.1,0.1);  

        this.nuevaPartida = Game.add.image(120, 180, 'nuevaPartida');
        this.nuevaPartida.scale.setTo(0.6,0.6);

        this.seleccionDeNivel = Game.add.image(120, 230, 'seleccionDeNivel');
        this.seleccionDeNivel.scale.setTo(0.6,0.6);

        this.configuracion = Game.add.image(120, 280, 'configuracion');
        this.configuracion.scale.setTo(0.6,0.6);

        this.sobreNosotros = Game.add.image(120, 330, 'sobreNosotros');
        this.sobreNosotros.scale.setTo(0.6,0.6);

        this.optionMenuSound = Game.add.audio('optionMenu');
        this.selectMenuSound = Game.add.audio('selectMenu');

        //anadimos letras
        var upKey = Game.input.keyboard.addKey(Phaser.Keyboard.UP);
        upKey.onDown.add(this.upMenu, this);        
        var downKey = Game.input.keyboard.addKey(Phaser.Keyboard.DOWN);
        downKey.onDown.add(this.downMenu, this);        
        var enterKey = Game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
        enterKey.onDown.add(this.enterMenu, this);       
    }
    
    //comprobamos el estado cuando pulsamos la tecla enter y actuamos en consecuencia
    menuState.prototype.enterMenu = function() {
        this.selectMenuSound.play();      
        switch(this.posMenu) {
            case 0://nueva partida
                Game.ostMenuSound.stop();
                Game.state.start('tutorialStage');
                break;
            case 1://seleccion de nivel
                Game.state.start('selectLevelState');
                break;
            case 2://configuracion
                Game.state.start('configurationState');
                break;
            case 3://sobre Nosotros
                Game.state.start('sobreNosotrosState');
                break;   
        }             
    }
    
    //comprobamos el estado cuando pulsamos la tecla arriba y actuamos en consecuencia
    menuState.prototype.upMenu = function() {
        this.optionMenuSound.play();        
        switch(this.posMenu) {
            case 0:
                this.pokeIco.position.y=335;
                this.posMenu=3;
                break;                
            case 1:
                this.pokeIco.position.y=190;
                this.posMenu=0;
                break;                
            case 2:
                this.pokeIco.position.y=240;
                this.posMenu=1;
                break;                
            case 3:
                this.pokeIco.position.y=285;
                this.posMenu=2;
                break;
        }
    }
    
    //comprobamos el estado cuando pulsamos la tecla abajo y actuamos en consecuencia
    menuState.prototype.downMenu = function() {        
        this.optionMenuSound.play();        
        switch(this.posMenu) {
            case 0:
                this.pokeIco.position.y=240;
                this.posMenu=1;
                break;
            case 1:
                this.pokeIco.position.y=285;
                this.posMenu=2;
                break;
            case 2:
                this.pokeIco.position.y=335;
                this.posMenu=3;
                break;
            case 3:
                this.pokeIco.position.y=190;
                this.posMenu=0;
                break;
        }        
    }
    
    menuState.prototype.update = function() {        
        pokePattern.tilePosition.y += 0.08;
        pokePattern.tilePosition.x += 0.08;        
    }
        
    return menuState;
});