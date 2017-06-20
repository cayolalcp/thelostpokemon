define(['Phaser','game'], function (Phaser,Game){
    
    function controlesState() {
        Phaser.State.call(this);
    }
    
    //Inheritance
    controlesState.prototype = Object.create(Phaser.State.prototype);
    controlesState.prototype.constructor = controlesState;
    
    //anadimos algunas imagenes y textos
    controlesState.prototype.preload = function () {
        Game.load.image('startBackground', 'assets/startBackground2.jpg');   
        Game.load.image('pokePattern', 'assets/pokePattern.jpg');
        Game.load.image('bulbasaurMenu', 'assets/bulbasaurMenu.png');
        Game.load.image('charmanderMenu', 'assets/charmanderMenu.png');
        Game.load.image('squirtleMenu', 'assets/squirtleMenu.png');
        Game.load.image('teclaq', 'assets/q.png');
        Game.load.image('b1', 'assets/controles/b1.png');
        Game.load.image('b2', 'assets/controles/b2.png');
        Game.load.image('b3', 'assets/controles/b3.png');
        
        this.volver = Game.add.text(250, 350, 'Volver',{ font: 'bold 36px Geo', fill: '#000000' });
 
        Game.load.image('pokeIco', 'assets/pokeIco.png');  
        Game.load.audio('optionMenu', ['assets/optionMenu.mp3', 'assets/optionMenu.ogg']);
        Game.load.audio('selectMenu', ['assets/selectMenu.mp3', 'assets/selectMenu.ogg']); 
    }
    
    //anadimos resto de textos e imagenes
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
        
        Game.add.text(25, 40, 'Este juego ha sido desarrollado por KamonoSoft.',{ font: 'bold 20px Arial', fill: '#000000'});
        Game.add.text(25, 70, 'Sus integrantes son:',{ font: 'bold 20px Arial', fill: '#000000'});
        Game.add.text(25, 105, '·Luis Cayola Pérez',{ font: 'bold 20px Arial', fill: '#000000'});
        Game.add.text(25, 145, '·Roberto García Teodoro',{ font: 'bold 20px Arial', fill: '#000000'});
        Game.add.text(25, 200, 'Ambos son estudiantes de ',{ font: 'bold 20px Arial', fill: '#000000'});
        
        Game.add.text(25, 230, 'Grado en Ingeniería Informática',{ font: 'bold 20px Arial', fill: '#000000'});
        Game.add.text(25, 260, 'en la Escuela Politécnica Superior de la UAM.',{ font: 'bold 20px Arial', fill: '#000000'});  
        Game.add.text(25, 290, 'Esperamos que disfruten jugándolo.',{ font: 'bold 20px Arial', fill: '#000000'});  
        
        Game.add.text(25, 325, 'Enero, 2016',{ font: 'bold 20px Arial', fill: '#000000'});
        
        this.optionMenuSound = Game.add.audio('optionMenu');
        this.selectMenuSound = Game.add.audio('selectMenu');


        var enterKey = Game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
        enterKey.onDown.add(this.enterMenu, this);
       
    }
    
    //comprobamos el estado cuando pulsamos la tecla enter y actuamos en consecuencia
    controlesState.prototype.enterMenu = function() {
        this.selectMenuSound.play();      
        Game.state.start('menuState');             
    }

    
    controlesState.prototype.update = function() {
        pokePattern.tilePosition.y += 0.08;
        pokePattern.tilePosition.x += 0.08;
    }

    return controlesState;
});