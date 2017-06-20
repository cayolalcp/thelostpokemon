define(['Phaser','game'], function (Phaser,Game){
    
    function loadState() {
        Phaser.State.call(this);
    }
    
    //Inheritance
    loadState.prototype = Object.create(Phaser.State.prototype);
    loadState.prototype.constructor = loadState;
    
    loadState.prototype.preload = function () {

        // Add a 'loading...' label on the screen
        var loadingLabel = Game.add.text(Game.world.centerX, 150, 'loading...',{ font: '30px Arial', fill: '#ffffff' });
        loadingLabel.anchor.setTo(0.5, 0.5);

        // Display the progress bar
        var progressBar = Game.add.sprite(Game.world.centerX, 200, 'progressBar');
        progressBar.anchor.setTo(0.5, 0.5);
        Game.load.setPreloadSprite(progressBar);
        
        //imagenes hub
        Game.load.image('mainBulbasaur', 'assets/hub/activeBulbasaur.png');
        Game.load.image('mainCharmander', 'assets/hub/activeCharmander.png');
        Game.load.image('mainSquirtle', 'assets/hub/activeSquirtle.png'); 
        Game.load.image('arbolito', 'assets/arbolito.png');
        Game.load.image('goal', 'assets/hub/goal.png'); 
        
        //PARTÍCULAS
        Game.load.image('fire1', 'assets/fire1.png');
        Game.load.image('fire2', 'assets/fire2.png');
        Game.load.image('fire3', 'assets/fire3.png');
        Game.load.image('smoke', 'assets/smoke-puff.png');
        Game.load.image('pausa', 'assets/black.jpg');
        Game.load.image('pausaText', 'assets/pausaText.png');
        Game.load.image('continuarText', 'assets/continuarMenuPausa.png');
        Game.load.image('volverText', 'assets/volverMenuPausa.png'); 
        
        //personajes
        Game.load.spritesheet('player1', 'assets/sprites/bulbasaur.png', 36, 30);
        Game.load.spritesheet('player2', 'assets/sprites/charmander.png', 39.6, 38);
        Game.load.spritesheet('player3', 'assets/sprites/squirtle.png', 42, 35);
        Game.load.spritesheet('cepa','assets/sprites/cepa2.png',50,63);
        Game.load.spritesheet('fire','assets/sprites/fire.png',64,59);
        Game.load.spritesheet('agua', 'assets/sprites/agua.png', 366, 85);          
        Game.load.spritesheet('life','assets/sprites/life.png',152,49);
        
        //enemigos
        Game.load.spritesheet('steelix','assets/enemies/steelix.png',82,79); 
        Game.load.spritesheet('onix','assets/enemies/onix.png',77,74);        
        Game.load.spritesheet('gastly', 'assets/enemies/gastly.png', 72, 62);
        Game.load.spritesheet('machop', 'assets/enemies/machop.png', 39.6, 52);
        
        ///////////////////////
        // TILESETS Y TILEMAPS
        //Prototipo
        Game.load.image('tileset', 'assets/tutorialStage/tile1.png');
        Game.load.image('nubes', 'assets/tutorialStage/nubes.png');      
        Game.load.image('cielo', 'assets/tutorialStage/clearSky.jpg');
        Game.load.image('arboles', 'assets/tutorialStage/arboles.png');  
        Game.load.tilemap('prototipo', 'assets/tutorialStage/prototipo.json', null,Phaser.Tilemap.TILED_JSON);

        //Nivel Cueva
        Game.load.image('cave', 'assets/caveStage/cave.png');
        Game.load.image('piedrasDecoracion', 'assets/caveStage/piedrasFondo.png');      
        Game.load.image('greyCave', 'assets/caveStage/greyCave.jpg');   
        Game.load.audio('caveSound', ['assets/caveStage/cave.ogg', 'assets/caveStage/cave.mp3']); 
        Game.load.tilemap('caveStageTilemap', 'assets/caveStage/caveStage.json', null,Phaser.Tilemap.TILED_JSON);        

        //Nivel mazmorra
        Game.load.image('mazmorra', 'assets/dungeonStage/mazmorra.png');   
        Game.load.image('fondoMazmorra', 'assets/dungeonStage/fondoMazmorra.jpg'); 
        Game.load.tilemap('dungeonStageTilemap', 'assets/dungeonStage/dungeonStage.json', null,Phaser.Tilemap.TILED_JSON);

        //Nivel Hierba
        Game.load.image('tileBasic', 'assets/grassStage/tileBasic.png');   
        Game.load.image('skyGrass', 'assets/grassStage/skyGrass.jpg');
        Game.load.spritesheet('wall', 'assets/grassStage/wall.png', 38, 161); 
        Game.load.image('panel', 'assets/grassStage/panel.png');
        Game.load.audio('wallSound', ['assets/grassStage/wallSound.ogg', 'assets/grassStage/wallSound.mp3']);  
        Game.load.image('espina', 'assets/grassStage/espina.png');        
        Game.load.tilemap('grassStageTilemap', 'assets/grassStage/grassStage.json', null,Phaser.Tilemap.TILED_JSON); 


        //Nivel Boss
        Game.load.image('factory', 'assets/bossStage/factory.png');
        Game.load.image('factoryBackground', 'assets/bossStage/factoryBackground.jpg');
        Game.load.tilemap('bossStageTilemap', 'assets/bossStage/bossStage.json', null,Phaser.Tilemap.TILED_JSON);        
        Game.load.image('panelSide', 'assets/bossStage/panelSide.png');      
        Game.load.spritesheet('wallBoss', 'assets/bossStage/wallBoss.png', 587,40);
        Game.load.spritesheet('wallBoss2', 'assets/bossStage/wallBoss2.png', 587,40);  
        Game.load.spritesheet('aggron', 'assets/bossStage/aggron.png', 86,86); 
        Game.load.image('plataforma', 'assets/bossStage/plataformaBoss.png');        
        Game.load.spritesheet('magnemite', 'assets/bossStage/magnemite.png', 35,27); 

        //PARTÍCULAS
        Game.load.image('pixel', 'assets/pixel.png');

        // Load a new asset that we will use in the menu state 
        Game.load.image('pokeParticle', 'assets/pokeParticle.png'); 
        Game.load.image('startBCS', 'assets/startBCS.png'); 
        Game.load.image('TheLostPokemon', 'assets/TheLostPokemon.png'); 
        Game.load.image('nivelCompletado', 'assets/nivelCompletado.png'); 

        //SONIDOS
        Game.load.audio('jump', ['assets/sounds/jump.ogg', 'assets/sounds/jump.mp3']);
        Game.load.audio('dead', ['assets/sounds/pium.ogg', 'assets/sounds/pium.mp3']);
        Game.load.audio('ice', ['assets/sounds/ice.ogg', 'assets/sounds/ice.mp3']);       
        Game.load.audio('golpe', ['assets/sounds/golpe.ogg', 'assets/sounds/golpe.mp3']);
        
        Game.load.audio('aggronSound', ['assets/bossStage/aggron.ogg', 'assets/bossStage/aggron.mp3']);
        
        Game.load.audio('bossBSO', ['assets/bso/bossBSO.ogg', 'assets/bso/bossBSO.mp3']);
        Game.load.audio('caveBSO', ['assets/bso/caveBSO.ogg', 'assets/bso/caveBSO.mp3']);
        Game.load.audio('dungeonBSO', ['assets/bso/dungeonBSO.ogg', 'assets/bso/dungeonBSO.mp3']);
        Game.load.audio('grassBSO', ['assets/bso/grassBSO.ogg', 'assets/bso/grassBSO.mp3']);
        Game.load.audio('tutorialBSO', ['assets/bso/tutorialBSO.ogg', 'assets/bso/tutorialBSO.mp3']);

        //RUIDOS POKEMON
        Game.load.audio('noiseBulbasaur', ['assets/sounds/Bulbasaur.mp3', 'assets/sounds/Bulbasaur.ogg']);
        Game.load.audio('noiseCharmander', ['assets/sounds/Charmander.mp3', 'assets/sounds/Charmander.ogg']);
        Game.load.audio('noiseSquirtle', ['assets/sounds/Squirtle.mp3', 'assets/sounds/Squirtle.ogg']);
        Game.load.audio('endStage', ['assets/sounds/endStage.mp3', 'assets/sounds/endStage.ogg']);  
        
        //Videos
        Game.load.video('intro', 'assets/videos/IntroJuego.mp4');
        Game.load.video('final', 'assets/videos/FinalJuego.mp4')
        
        ///////////////
        ////incluimos un spritesheet para el control del volumen (MUTE)
        Game.load.spritesheet('mute', 'assets/muteButton.png', 28, 22);
    }
    
     loadState.prototype.create = function() {
        // Go to the menu state
        Game.state.start('initialState');
    }
     
     return loadState;
});