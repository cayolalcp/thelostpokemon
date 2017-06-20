define(['Phaser','game'], function (Phaser,Game){
    
    function selectLevelState() {
        Phaser.State.call(this);
    }
    
    //Inheritance
    selectLevelState.prototype = Object.create(Phaser.State.prototype);
    selectLevelState.prototype.constructor = selectLevelState;
    
    //cargamos imagenes, audios y textos
    selectLevelState.prototype.preload = function () {
        Game.load.image('startBackground', 'assets/startBackground2.jpg');   
        Game.load.image('pokePattern', 'assets/pokePattern.jpg');
        Game.load.image('title', 'assets/title.png');        
        Game.load.image('bulbasaurMenu', 'assets/bulbasaurMenu.png');
        Game.load.image('charmanderMenu', 'assets/charmanderMenu.png');
        Game.load.image('squirtleMenu', 'assets/squirtleMenu.png');        
        Game.load.image('tutorialStage', 'assets/tutorialStage.png');
        Game.load.image('dungeonStage', 'assets/dungeonStage.png');
        Game.load.image('grassStage', 'assets/grassStage.png');        
        Game.load.image('bossStage', 'assets/bossStage.png');  
        Game.load.image('caveStage', 'assets/caveStage.png');  
        Game.load.image('marcoSelect', 'assets/marcoSelect.png');          
        
        this.volOff = Game.add.text(600, 360, 'Volver',{ font: '36px Geo   ', fill: '#000000' });
        
        Game.load.image('pokeIco', 'assets/pokeIco.png');          
        Game.load.audio('optionMenu', ['assets/optionMenu.mp3', 'assets/optionMenu.ogg']);
        Game.load.audio('selectMenu', ['assets/selectMenu.mp3', 'assets/selectMenu.ogg']); 
    }
    
    //cargamos el resto de imagenes y textos
    selectLevelState.prototype.create = function() {

        pokePattern=Game.add.tileSprite(0,0,800,600,'pokeParticle'); 

        this.tutorialStageIma=Game.add.image(30, 150, 'tutorialStage'); 
        this.tutorialStageIma.scale.setTo(0.15,0.15);

        this.dungeonStageIma=Game.add.image(260, 150, 'dungeonStage'); 
        this.dungeonStageIma.scale.setTo(0.15,0.15);

        this.grassStageIma=Game.add.image(490, 150, 'grassStage'); 
        this.grassStageIma.scale.setTo(0.15,0.15);     

        this.caveStageIma=Game.add.image(150, 280, 'caveStage'); 
        this.caveStageIma.scale.setTo(0.15,0.15); 

        this.bossStageIma=Game.add.image(380, 280, 'bossStage'); 
        this.bossStageIma.scale.setTo(0.15,0.15);

        this.marcoSelectIma=Game.add.image(18, 127, 'marcoSelect'); 
        this.marcoSelectIma.scale.setTo(0.15,0.15);  

        title=Game.add.image(120, -120, 'title'); 
        title.scale.setTo(0.65,0.65);

        this.posMenu=0;
        TheLostPokemon=Game.add.image(350, 120, 'TheLostPokemon');
        TheLostPokemon.anchor.setTo(0.5, 0.5);
        TheLostPokemon.scale.setTo(0.65,0.65);

        this.pokeIco=Game.add.image(578, 370, 'pokeIco');
        this.pokeIco.scale.setTo(0.06,0.06);  
        this.pokeIco.visible=false;

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
    selectLevelState.prototype.enterMenu = function() {
        this.selectMenuSound.play();      
        switch(this.posMenu) {
            case 0:
                Game.ostMenuSound.stop();
                Game.state.start('tutorialStage');
                break;
            case 1:
                Game.ostMenuSound.stop();
                Game.state.start('dungeonStage');
                break;
            case 2:
                Game.ostMenuSound.stop();
                Game.state.start('grassStage');
                break;
            case 3:
                Game.ostMenuSound.stop();
                Game.state.start('caveStage');
                break;
            case 4:
                Game.ostMenuSound.stop();
                Game.state.start('bossStage');
                break; 
            case 5:                            
                Game.state.start('menuState');
                break;
        }             
    }
    
    //comprobamos el estado cuando pulsamos la tecla derecha y actuamos en consecuencia
    selectLevelState.prototype.rightMenu = function() {        
        this.optionMenuSound.play();        
        switch(this.posMenu) {
            case 0:
                this.marcoSelectIma.position.x=248;
                this.marcoSelectIma.position.y=127;
                this.pokeIco.visible=false;
                this.posMenu=1;                                
                break;                
            case 1:
                this.marcoSelectIma.position.x=478;
                this.marcoSelectIma.position.y=127;
                this.pokeIco.visible=false;               
                this.posMenu=2;
                break;                
            case 2:
                this.marcoSelectIma.position.x=138;
                this.marcoSelectIma.position.y=257;
                this.pokeIco.visible=false;
                this.posMenu=3;
                break;                
            case 3:
                this.marcoSelectIma.position.x=368;
                this.marcoSelectIma.position.y=257;
                this.pokeIco.visible=false;
                this.posMenu=4;
                break;                   
            case 4:
                this.marcoSelectIma.position.x=968;
                this.marcoSelectIma.position.y=257;
                this.pokeIco.visible=true;
                this.posMenu=5;
                break;                
            case 5:
                this.marcoSelectIma.position.x=18;
                this.marcoSelectIma.position.y=127;
                this.pokeIco.visible=false;
                this.posMenu=0;
                break;   
            }        
    }
    
    //comprobamos el estado cuando pulsamos la tecla izquierda y actuamos en consecuencia
    selectLevelState.prototype.leftMenu = function() {        
        this.optionMenuSound.play();        
        switch(this.posMenu) {
            case 0:/*volver*/
                this.marcoSelectIma.position.x=968;
                this.marcoSelectIma.position.y=257;
                this.pokeIco.visible=true;
                this.posMenu=5;
                break;
            case 1:/*tutorial*/
                this.marcoSelectIma.position.x=18;
                this.marcoSelectIma.position.y=127;
                this.pokeIco.visible=false;
                this.posMenu=0;
                break;                  
            case 2:/*dungeon*/
                this.marcoSelectIma.position.x=248;
                this.marcoSelectIma.position.y=127;
                this.pokeIco.visible=false;
                this.posMenu=1;                                
                break;                
            case 3:/*grass*/
                this.marcoSelectIma.position.x=478;
                this.marcoSelectIma.position.y=127;
                this.pokeIco.visible=false;               
                this.posMenu=2;
                break;                
            case 4:/*cave*/
                this.marcoSelectIma.position.x=138;
                this.marcoSelectIma.position.y=257;
                this.pokeIco.visible=false;
                this.posMenu=3;
                break;                
            case 5: /*boss*/                
                this.marcoSelectIma.position.x=368;
                this.marcoSelectIma.position.y=257;
                this.pokeIco.visible=false;
                this.posMenu=4;
                break;  
        }        
    }
    
    selectLevelState.prototype.update = function() {        
        pokePattern.tilePosition.y += 0.08;
        pokePattern.tilePosition.x += 0.08;        
    }

    return selectLevelState;
});