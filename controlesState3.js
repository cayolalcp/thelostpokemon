define(['Phaser','game'], function (Phaser,Game){
    
    function controlesState() {
        Phaser.State.call(this);
    }
    
    //Inheritance
    controlesState.prototype = Object.create(Phaser.State.prototype);
    controlesState.prototype.constructor = controlesState;
  
    //anadimos textos e imagenes
    controlesState.prototype.preload = function () {
        Game.load.image('startBackground', 'assets/startBackground2.jpg');   
        Game.load.image('pokePattern', 'assets/pokePattern.jpg');
        Game.load.image('bulbasaurMenu', 'assets/bulbasaurMenu.png');
        Game.load.image('charmanderMenu', 'assets/charmanderMenu.png');
        Game.load.image('squirtleMenu', 'assets/squirtleMenu.png');
        Game.load.image('c1', 'assets/controles/c1.png');
        Game.load.image('c2', 'assets/controles/c2.png');
        Game.load.image('s1', 'assets/controles/s1.png');
        Game.load.image('s2', 'assets/controles/s2.png');
        Game.load.image('s3', 'assets/controles/s3.png');
        
        this.volver = Game.add.text(250, 350, 'Volver',{ font: 'bold 36px Geo', fill: '#000000' });
        this.anterior = Game.add.text(100, 350, 'Ant.',{ font: 'bold 36px Geo', fill: '#000000' });
        
        Game.load.image('pokeIco', 'assets/pokeIco.png');  
        Game.load.audio('optionMenu', ['assets/optionMenu.mp3', 'assets/optionMenu.ogg']);
        Game.load.audio('selectMenu', ['assets/selectMenu.mp3', 'assets/selectMenu.ogg']); 
        }
    
    
    controlesState.prototype.create = function() {        
        pokePattern=Game.add.tileSprite(0,0,800,600,'pokeParticle');         
        this.posMenu=1;
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

        this.pokeIco=Game.add.image(220, 350, 'pokeIco');
        this.pokeIco.scale.setTo(0.1,0.1);  
        
        this.c1 = Game.add.image(25, 25, 'c1');
        this.c2 = Game.add.image(200, 25, 'c2');
        this.c2.scale.setTo(0.8,0.8);
        Game.add.text(25, 125, 'Charmander puede lanzar una llamarada,',{ font: 'bold 20px Arial', fill: '#000000'});
        Game.add.text(25, 150, 'pudiendo eliminar a los enemigos.',{ font: 'bold 20px Arial', fill: '#000000'});
        
        this.s1 = Game.add.image(25, 190, 's1');
        this.s2 = Game.add.image(150, 190, 's2');
        this.s3 = Game.add.image(275, 190, 's3');
        Game.add.text(25, 265, 'Squirtle puede hacerse un caparazon',{ font: 'bold 20px Arial', fill: '#000000'});
        Game.add.text(25, 290, 'para que los enemigos no puedan pasar.',{ font: 'bold 20px Arial', fill: '#000000'});
        Game.add.text(25, 315, 'Ademas puede nadar y llevar a sus aliados.',{ font: 'bold 20px Arial', fill: '#000000'});
        
        this.optionMenuSound = Game.add.audio('optionMenu');
        this.selectMenuSound = Game.add.audio('selectMenu');
        
        //anadimos las letras
        var rightKey = Game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
        rightKey.onDown.add(this.rightMenu, this);        
        var leftKey = Game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
        leftKey.onDown.add(this.leftMenu, this);        
        var enterKey = Game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
        enterKey.onDown.add(this.enterMenu, this);       
    }
    
    //comprobamos el estado cuando pulsamos la tecla enter y actuamos en consecuencia
    controlesState.prototype.enterMenu = function() {
        this.selectMenuSound.play();      
        switch(this.posMenu) {
            case 0:
                Game.state.start('controlesState2');
                break;
            case 1:
                Game.state.start('configurationState');
                break;
        }             
    }
    //comprobamos el estado cuando pulsamos la tecla derecha y actuamos en consecuencia
    controlesState.prototype.rightMenu = function() {
        this.optionMenuSound.play();
        switch(this.posMenu) {
            case 0:
                this.pokeIco.position.x=220;
                this.posMenu=1;
                break;
            case 1:
                this.pokeIco.position.x=65;
                this.posMenu=0;
                break;
        }
    }
    //comprobamos el estado cuando pulsamos la tecla izquierda y actuamos en consecuencia
    controlesState.prototype.leftMenu = function() {
        this.optionMenuSound.play();
        switch(this.posMenu) {
            case 0:
                this.pokeIco.position.x=220;
                this.posMenu=1;
                break;
            case 1:
                this.pokeIco.position.x=65;
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