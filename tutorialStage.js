define(['Phaser','game','endStageManager','Enemy','lifeManager'], function (Phaser,Game,endStageManager,Enemy,lifeManager){ 
    
    function TutorialStage() {
        Phaser.State.call(this);
    }

        //Inheritance
    TutorialStage.prototype = Object.create(Phaser.State.prototype);
    TutorialStage.prototype.constructor = TutorialStage;
    
    
    TutorialStage.prototype.create = function() {
        //contador de ganar
        this.waitWin = 0;
        //emitter del fuego
        this.emitter = Game.add.emitter(0, 0, 15);
        this.emitter.makeParticles( [ 'fire1', 'fire2', 'fire3', 'smoke' ] );
        this.emitter.gravity = 0;
        this.emitter.setScale(0.5, 0, 0.5, 0, 1000);
        //anadimos el titulo del nivel
        this.tutorial1 = Game.add.text(50, 300, 'Nivel 0: Tutorial.',{ font: 'bold 36px Geo', fill: '#000000' });
        this.tutorial1.alpha = 1;
        Game.add.tween(this.tutorial1).to({alpha:0},4000).start();
        this.tutorial2 = Game.add.text(50, 350, 'Investiga las habilidades de los personajes.',{ font: 'bold 36px Geo', fill: '#000000' });
        this.tutorial2.alpha = 1;
        Game.add.tween(this.tutorial2).to({alpha:0},4000).start();
        
        /////////////////
        //ANADIR PERSONAJES
        this.player1 = Game.add.sprite(55, Game.world.centerY,'player1');
        this.player2 = Game.add.sprite(30, Game.world.centerY,'player2');
        this.player3 = Game.add.sprite(10, Game.world.centerY,'player3');
        //vidas e inmortalidad
        this.player1lives = 3;
        this.player2lives = 3;
        this.player3lives = 3;
        this.player1inm = 0;
        this.player2inm = 0;
        this.player3inm = 0;
        
        this.PictureActivePlayer=1;//bulbasaur como primera fotografia
        
        //cargamos los sprites
        //bulbasaur
        this.mainBulbasaur= Game.add.sprite(65, 55,'mainBulbasaur');  
        this.mainBulbasaur.anchor.setTo(0.5, 0.5);
        this.mainBulbasaur.fixedToCamera = true;
        this.mainBulbasaur.scale.setTo(0.75,0.75);
        //charmander
        this.mainCharmander= Game.add.sprite(65, 55,'mainCharmander');
        this.mainCharmander.anchor.setTo(0.5, 0.5);
        this.mainCharmander.fixedToCamera = true;
        this.mainCharmander.scale.setTo(0.75,0.75);
        //squirtle
        this.mainSquirtle= Game.add.sprite(65, 55,'mainSquirtle');
        this.mainSquirtle.anchor.setTo(0.5, 0.5);
        this.mainSquirtle.fixedToCamera = true;
        this.mainSquirtle.scale.setTo(0.75,0.75);
        //vidas
        this.currentLife=Game.add.sprite(130, 40,'life');
        this.currentLife.anchor.setTo(0.5, 0.5);
        this.currentLife.fixedToCamera = true;
        this.currentLife.scale.setTo(0.3,0.3);
        
        //flags para saltos
        this.bOnSquirtle = false;
        this.cOnSquirtle = false;
        this.inWater=false;
        
        //ajustamos el anchor
        this.player1.anchor.setTo(0.5, 0.5);
        this.player2.anchor.setTo(0.5, 0.5);
        this.player3.anchor.setTo(0.5, 0.5);
        //hacemos scale
        this.player1.scale.setTo(0.75,0.75);
        this.player2.scale.setTo(0.75,0.75);
        this.player3.scale.setTo(0.75,0.75);
        //activamos fisicas de los personajes
        Game.physics.arcade.enable(this.player1);
        Game.physics.arcade.enable(this.player2);
        Game.physics.arcade.enable(this.player3);
        
        
        //añadimos rebote
        this.player1.body.bounce.y = 0.2;
        this.player2.body.bounce.y = 0.2;
        this.player3.body.bounce.y = 0.2;
        //anadimos gravedad
        this.player1.body.gravity.y = 500;
        this.player2.body.gravity.y = 500;
        this.player3.body.gravity.y = 500;
        //invertimos el scale (para que miren hacia la derecha al comenzar el juego)
        this.player1.scale.x=this.player1.scale.x*-1;
        this.player2.scale.x=this.player2.scale.x*-1;
        this.player3.scale.x=this.player3.scale.x*-1;
        
        //anadimos las animaciones
        this.player1.animations.add('move', [6,7,8,9], 10, true);
        this.player1.animations.add('quieto',[13,14,15], 3, true);
        this.player2.animations.add('move', [6,7,8,9], 10, true);
        this.player2.animations.add('quieto', [0,1,2], 3, true);
        this.player3.animations.add('move', [7,8,9,10,11], 10, true);
        this.player3.animations.add('quieto', [0,1], 3, true);
        this.player3.animations.add('nadando', [4,5], 3, true);
        this.player3.animations.add('shield', [6], 3, true);
        this.player3.frame = 0;
        
        //colisionar con los limites del mundo
        this.player1.body.collideWorldBounds=true;
        this.player2.body.collideWorldBounds=true;
        this.player3.body.collideWorldBounds=true;      
        this.tam = this.player3.body.height;
        
        //flags
        this.isCepa=false;
        this.isFire=false;
        this.isShield=false;
        this.dirPlayer=1;
        this.flagPos=1;
        this.isOver=false;
        
        //anadimos el agua y el arbol
        this.agua = Game.add.sprite(460, 540,'agua');
        Game.physics.arcade.enable(this.agua);
        this.agua.body.allowGravity = false;
        this.agua.body.immovable = true;
        this.agua.scale.setTo(0.95,1);   
        
        this.arbolito = Game.add.sprite(1000, 320,'arbolito');
        Game.physics.arcade.enable(this.arbolito);
        this.arbolito.body.allowGravity = false;
        this.arbolito.body.immovable = true;
        this.arbolito.scale.setTo(1,2);   
       
        //añadimos la imagen del goal, lugar donde se deberan colocar los personajes para ganar el nivel
        this.goal = Game.add.sprite(1300, 300,'goal');
       
        this.goal.scale.setTo(0.2,0.2);    
        Game.physics.arcade.enable(this.goal);    
        
        //contador para e guefo de charmander
        this.nextFire = 0;
        //manejadores de vidas y del final de la partida
        this.endStageManagerGame=new endStageManager();
        this.lifeManagerGame=new lifeManager();    
        
        /////////////
        /// CONTROL DE LA ENTRADA/SALIDA
        this.cursor = Game.input.keyboard.createCursorKeys();     
        
        //impedimos que el navegador pueda desplazarse (scroll) al pulsar estas teclas
        Game.input.keyboard.addKeyCapture([Phaser.Keyboard.UP,Phaser.Keyboard.DOWN, Phaser.Keyboard.LEFT, Phaser.Keyboard.RIGHT]);
        
        //Permitimos utilizar las teclas WASD
        this.wasd = {
            up: Game.input.keyboard.addKey(Phaser.Keyboard.W),
            left: Game.input.keyboard.addKey(Phaser.Keyboard.A),
            right: Game.input.keyboard.addKey(Phaser.Keyboard.D)
        };
        //cambio de personaje
        this.ZXC= {
            bulbasaur: Game.input.keyboard.addKey(Phaser.Keyboard.Z),
            charmander: Game.input.keyboard.addKey(Phaser.Keyboard.X),
            squirtle: Game.input.keyboard.addKey(Phaser.Keyboard.C)
        };
        
        //pausa
        this.Q= Game.input.keyboard.addKey(Phaser.Keyboard.Q);
        this.Q.onDown.add(this.togglePause, this);
        this.paused = false;
        
        this.spacebar = Game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        
        //SONIDOS
        this.deadSound = Game.add.audio('dead');
        this.noiseBulbasaur=Game.add.audio('noiseBulbasaur');
        this.noiseCharmander=Game.add.audio('noiseCharmander');
        this.noiseSquirtle=Game.add.audio('noiseSquirtle');
        //this.tutorialBSO=Game.add.audio('ice');
        this.endStageSound=Game.add.audio('endStage');
        this.tutorialBSO=Game.add.audio('tutorialBSO');
        this.tutorialBSO.loopFull(); 
        this.createWorld();        
    }
    //manejador de la pausa
    TutorialStage.prototype.togglePause= function() {
        this.paused = !this.paused;
        if(this.paused){
            this.pausa = Game.add.sprite(Game.camera.x, Game.camera.y, 'pausa');
            this.menupausa = Game.add.sprite(Game.camera.x+150, Game.camera.y+100, 'pausaText');
            this.pausa.alpha = 0.7;
            Game.world.bringToTop(this.menupausa);
            this.pokeIco=Game.add.image(Game.camera.x+220, Game.camera.y+220, 'pokeIco');
            this.pokeIco.scale.setTo(0.1,0.1);  
            this.continuar = Game.add.sprite(Game.camera.x+250, Game.camera.y+215, 'continuarText');
            this.continuar.scale.setTo(0.6,0.6);
            this.volver = Game.add.sprite(Game.camera.x+250, Game.camera.y+260, 'volverText');
            this.volver.scale.setTo(0.6,0.6);
            //letras
            var enterKey = Game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
            var oneKeyPause = Game.input.keyboard.addKey(Phaser.Keyboard.ONE);
            var twoKeyPause = Game.input.keyboard.addKey(Phaser.Keyboard.TWO);
            enterKey.onDown.add(this.enterMenu, this);
            oneKeyPause.onDown.add(this.onePauseMenu, this);
            twoKeyPause.onDown.add(this.twoPauseMenu, this);
            this.posPause=0;
            Game.paused = true;
        }else{
            Game.input.keyboard.removeKey(Phaser.Keyboard.ENTER);
            Game.input.keyboard.removeKey(Phaser.Keyboard.ONE);
            Game.input.keyboard.removeKey(Phaser.Keyboard.TWO);
            this.pokeIco.destroy();
            this.continuar.destroy();
            this.volver.destroy();
            this.menupausa.destroy();
            Game.paused = false;
            this.pausa.destroy();
        }

    }
    //comprobamos el estado cuando pulsamos la tecla enter y actuamos en consecuencia
    TutorialStage.prototype.enterMenu = function() {
        if(this.posPause==0){
            this.togglePause();
        }else{
            this.togglePause();
            this.tutorialBSO.stop();
            Game.ostMenuSound.play();
            Game.state.start('menuState');
        }
    }
    
    //comprobamos el estado cuando pulsamos la tecla 1 y actuamos en consecuencia
    TutorialStage.prototype.onePauseMenu = function() {
        this.pokeIco.position.x=Game.camera.x+220;
        this.pokeIco.position.y=Game.camera.y+220;
        this.posPause=0;

    }
    //comprobamos el estado cuando pulsamos la tecla 2 y actuamos en consecuencia
    TutorialStage.prototype.twoPauseMenu = function() {
        this.pokeIco.position.x=Game.camera.x+220;
        this.pokeIco.position.y=Game.camera.y+265;
        this.posPause=1;
    }
  
    TutorialStage.prototype.update= function() {
        
        Game.camera.follow(this.activePlayer,Phaser.Camera.FOLLOW_LOCKON);
        
        Game.world.bringToTop(this.tutorial1);
        Game.world.bringToTop(this.tutorial2);
        //se crean las colisiones
        Game.physics.arcade.collide(this.player1, this.layer2);
        Game.physics.arcade.collide(this.player2, this.layer2);
        Game.physics.arcade.collide(this.player3, this.layer2);
        Game.physics.arcade.collide(this.player1, this.arbolito);
        Game.physics.arcade.collide(this.player2, this.arbolito);
        Game.physics.arcade.collide(this.player3, this.arbolito);
        
        this.inWater = Game.physics.arcade.collide(this.player3, this.agua);
         
        //if's para controlar las imagenes de la esquina superior izquierda
        if( this.PictureActivePlayer==1){
            this.mainBulbasaur.visible=true;
            this.mainCharmander.visible=false;
            this.mainSquirtle.visible=false;
            Game.world.bringToTop(this.mainBulbasaur);
        }else if(this.PictureActivePlayer==2){
            this.mainBulbasaur.visible=false;
            this.mainCharmander.visible=true;
            this.mainSquirtle.visible=false;
            Game.world.bringToTop(this.mainCharmander);
        }else{
            this.mainBulbasaur.visible=false;
            this.mainCharmander.visible=false;
            this.mainSquirtle.visible=true;
            Game.world.bringToTop(this.mainSquirtle);
        }

        this.selectPlayer();
        //comprobamos vidas
        this.lifeManagerGame.checkLife(this);
        Game.world.bringToTop(this.currentLife);

        //funcion que impide lanzar fuego continuamente
        if (this.nextFire-250 < Game.time.now) {
            if(this.isFire){
                this.fire.destroy();
                this.isFire = false;
            }
        }
        //comprobamos si se ha acabado la partida
        if (this.waitWin < Game.time.now && this.isOver) {
            Game.state.start('dungeonStage');
        }
        
        this.playerDie();
        this.movePlayer();
        this.skillPlayer();
        
        //overlap para quemar el arbolito
        Game.physics.arcade.overlap(this.fire, this.arbolito, this.quemaArbol, null, this);
        if(this.isOver==false){
         this.endStageManagerGame.checkEndStage(this,1000, 300,this.tutorialBSO);       
        }
        
    }
        
    TutorialStage.prototype.selectPlayer= function() {
        
        this.activePlayer.body.velocity.x = 0;
        
        if(this.ZXC.bulbasaur.isDown || this.ZXC.charmander.isDown || this.ZXC.squirtle.isDown){
            this.activePlayer.animations.stop();
            this.activePlayer.frame = 0;
        }
        
        //if's que cambian el personaje activo
        if(this.ZXC.bulbasaur.isDown){
            this.noiseBulbasaur.play();
            this.noiseBulbasaur.volume = 0.2;   
            this.activePlayer=this.player1;
            this.PictureActivePlayer=1;
            this.activo='bulbasaur';            
        }else if(this.ZXC.charmander.isDown){
            this.noiseCharmander.play(); 
            this.noiseCharmander.volume = 0.2;          
            this.activePlayer=this.player2;
            this.PictureActivePlayer=2;
            this.activo='charmander';            
        }else if(this.ZXC.squirtle.isDown){
            this.noiseSquirtle.play();     
            this.noiseSquirtle.volume = 0.2;     
            this.activePlayer=this.player3;
            this.PictureActivePlayer=3;
            this.activo='squirtle';            
        }
    }

    //función: mover al personaje
    TutorialStage.prototype.movePlayer= function() {
    
        // If the left arrow or the A key is pressed
        if (this.cursor.left.isDown || this.wasd.left.isDown) {
            this.flagPos=0;
            //si bulbsaur se mueve, se cancela la cepa
            if(this.isCepa && this.activePlayer==this.player1){
                this.cepa.destroy();
                this.isCepa=false;   
            }
            //si squirtle se mueve se cancela el caparazon
            if(this.isShield && this.activePlayer==this.player3){
                this.isShield=false;   
            }
            this.activePlayer.scale.x=0.8;
            this.activePlayer.body.velocity.x = -200;
            //comprobamos si squirtle esta en el agua
            if(this.inWater){
                this.player3.anchor.setTo(0.5,1);
                this.player3.body.height=5;
                this.player3.body.friction = 0;
                
                //comprobamos la colision entre personajes y, dado el caso, igualamos velocidad para dar impresion
                //de que esta subido uno sobre otro
                if(Game.physics.arcade.collide(this.player2, this.player3) && this.activePlayer == this.player3){
                    this.cOnSquirtle = true;
                    this.player2.body.velocity.x = -200;
                }else if(Game.physics.arcade.collide(this.player1, this.player3) && this.activePlayer == this.player3){
                    this.bOnSquirtle = true;
                    this.player1.body.velocity.x = -200;
                }else{
                    this.bOnSquirtle = false;
                    this.cOnSquirtle = false;
                }
                //si es squirtle, pone la animacion de nado, si no, la de mover
                if(this.activePlayer==this.player3){
                    this.player3.animations.play('nadando');   
                }else{
                   this.activePlayer.animations.play('move'); 
                }
                
            }else if (this.activePlayer == this.player3){//si no esta en el agua pero es el personaje activo (se ajusta tamaño para que no levite)
                this.player1.body.velocity.x = 0;
                this.player2.body.velocity.x = 0;
                this.player3.body.height=this.tam;
                this.activePlayer.animations.play('move');
            }else{
                this.player3.body.height=this.tam;
                this.activePlayer.animations.play('move');
            }
            this.dirPlayer=-1;            
        }
        // If the right arrow or the D key is pressed
        else if (this.cursor.right.isDown || this.wasd.right.isDown) {
            
            this.flagPos=1;
            //si bulbsaur se mueve, se cancela la cepa
            if(this.isCepa && this.activePlayer==this.player1){
               this.cepa.destroy();
                this.isCepa=false;   
            }
            //si squirtle se mueve se cancela el caparazon
            if(this.isShield && this.activePlayer==this.player3){
                this.isShield=false;   
            }
            
            this.activePlayer.body.velocity.x = 200;
            //comprobamos si squirtle esta en el agua
            if(this.inWater){
                this.player3.anchor.setTo(0.5,1);
                this.player3.body.height=5;
                this.player3.body.friction = 0;
                
                //comprobamos la colision entre personajes y, dado el caso, igualamos velocidad para dar impresion
                //de que esta subido uno sobre otro
                if(Game.physics.arcade.collide(this.player2, this.player3) && this.activePlayer == this.player3){
                    this.cOnSquirtle = true;
                    this.player2.body.velocity.x = 200;
                }else if(Game.physics.arcade.collide(this.player1, this.player3) && this.activePlayer == this.player3){
                    this.bOnSquirtle = true;
                    this.player1.body.velocity.x = 200;
                }else{
                    this.bOnSquirtle = false;
                    this.cOnSquirtle = false;
                }
                //si es squirtle, pone la animacion de nado, si no, la de mover
                if(this.activePlayer==this.player3){
                    this.player3.animations.play('nadando');         
                }else{
                    this.activePlayer.animations.play('move');
                }
                
            }else if (this.activePlayer == this.player3){//si no esta en el agua pero es el personaje activo (se ajusta tamaño para que no levite)
                this.player1.body.velocity.x = 0;
                this.player2.body.velocity.x = 0;
                this.activePlayer.animations.play('move');
                this.player3.body.height=this.tam;
            }else{
                this.activePlayer.animations.play('move');
                this.player3.body.height=this.tam;
            }
            this.activePlayer.scale.x=-0.8;            
            this.dirPlayer=1;           
        }
        // If nothing is pressed
        else {
            this.player3.body.velocity.x = 0;
            this.player1.body.velocity.x = 0;
            this.player2.body.velocity.x = 0;
            
            //si squirtle esta en el agua
            if(this.inWater){
                //this.inWater=true;
                this.player3.body.friction = 0;
                //comprobamos las colisiones para el salto
                if(Game.physics.arcade.collide(this.player2, this.player3)){
                    this.cOnSquirtle = true;
                }else if(Game.physics.arcade.collide(this.player1, this.player3)){
                    this.bOnSquirtle = true;
                }else{
                    this.bOnSquirtle = false;
                    this.cOnSquirtle = false;
                }
                
                this.player3.body.height=5;
                this.player3.animations.play('nadando');
                this.player1.animations.play('quieto');
                this.player2.animations.play('quieto');
            }else{
                this.player3.body.height=this.tam;
                this.player3.animations.play('quieto');
                this.player1.animations.play('quieto');
                this.player2.animations.play('quieto');
            }
            //mantenemos la animacion del caparazon
            if(this.isShield){
                this.player3.animations.play('shield');
            }
            
        }
        
        //////////////////////
        /// AHORA COMPRUEBO EL SALTO
         if(this.cursor.up.isDown && this.inWater==true && this.activePlayer==this.player3){
            if(this.bOnSquirtle || this.cOnSquirtle){
             }else{
                this.activePlayer.body.velocity.y = -150;
             }
         }else{
             //comprobamos si se hace overlap con la cepa y si es asi, se permite 'escalar' (salto grande)
            if((this.cursor.up.isDown || this.wasd.up.isDown) && Game.physics.arcade.overlap(this.activePlayer, this.cepa))  {
                this.activePlayer.body.velocity.y = -230;
                this.activePlayer.body.velocity.x = 60*this.dirPlayer;
            }else if ((this.cursor.up.isDown || this.wasd.up.isDown) && this.activePlayer.body.onFloor()){//salto normal
                this.activePlayer.body.velocity.y = -180;
            } else if((this.cursor.up.isDown || this.wasd.up.isDown) && this.bOnSquirtle && this.activePlayer == this.player1){//permitimos salto de bulbasaur sobre squirtle
                this.activePlayer.body.velocity.y = -180;
            } else if((this.cursor.up.isDown || this.wasd.up.isDown) && this.cOnSquirtle && this.activePlayer == this.player2){//permitimos salto de charmander sobre squirtle
                this.activePlayer.body.velocity.y = -180;
            }
         }
    }
    
    TutorialStage.prototype.skillPlayer= function() {
        //si se hace la cepa
        if(this.spacebar.isDown && !this.isCepa && this.player1.body.onFloor() && this.activePlayer==this.player1){
            this.cepa=Game.add.sprite(150, 320,'cepa');
            Game.physics.arcade.enable(this.cepa);
            this.cepa.anchor.setTo(0, 0.5);
            this.cepa.position.x=this.player1.x;
            this.cepa.position.y=this.player1.y-20;
            this.cepa.scale.x=-this.player1.scale.x;
            this.cepa.animations.add('grow', [0,1,2,3], 15, false);
            Game.world.bringToTop(this.cepa); 
            this.cepa.animations.play('grow');
            this.cepa.events.onAnimationComplete.add(function(){
                /*AÑADIR EFECTO DE SONIDO*/ 
            }, this);
            this.isCepa=true;
        //si se hace la llama
        }else if(this.spacebar.isDown && this.activePlayer==this.player2){
            if (this.nextFire < Game.time.now) {
                this.fire = Game.add.sprite(this.player2.x-10, this.player2.y-30,'fire');
                this.fire.animations.add('fire', [0,1,2,3,4,5,6,7], 15, false);
                this.fire.scale.x=this.fire.scale.x*this.dirPlayer;
                this.fire.animations.play('fire');
                this.fire.events.onAnimationComplete.add(function(){
                    /*AÑADIR EFECTO DE SONIDO*/ 
                }, this);
                Game.physics.enable(this.fire, Phaser.Physics.ARCADE);
                this.fire.body.velocity.x = 30*this.dirPlayer;
                this.isFire = true;
                this.nextFire = Game.time.now + 1000;
            }
        //si se hace el caparazon
        }else if(this.spacebar.isDown && this.activePlayer==this.player3){
            this.player3.animations.play('shield'); 
            this.isShield=true;
        }

    }

    
    /// creando el mundo desde un tilemap
    TutorialStage.prototype.createWorld= function() {
        // Create the tilemap
        this.map = Game.add.tilemap('prototipo');
        // Add the tileset to the map
        this.map.addTilesetImage('tileset');
        this.map.addTilesetImage('nubes');        
        this.map.addTilesetImage('cielo');
        this.map.addTilesetImage('arboles');
        
        // Create the layer, by specifying the name of the Tiled layer
        this.layer1 = this.map.createLayer('fondo');
        this.layer2 = this.map.createLayer('mundo');
        this.layer3 = this.map.createLayer('decoracion');
        this.layer4 = this.map.createLayer('cielo');
        
        // Set the world size to match the size of the layer
        this.layer1.resizeWorld();
        
        Game.physics.arcade.enable(this.layer2);
        this.map.setCollisionBetween(0, 190);
        
        this.scenery= Game.add.group();
        this.scenery.add(this.layer4);
        this.scenery.add(this.layer1);
        this.scenery.add(this.layer2);
        this.scenery.add(this.layer3);
        
        this.players = Game.add.group();
        this.players.add(this.player1);
        this.players.add(this.player2);
        this.players.add(this.player3);
        
        this.activePlayer=this.player1;
        
        Game.world.bringToTop(this.agua); 
        Game.world.bringToTop(this.arbolito); 
        Game.world.bringToTop(this.goal); 
        Game.world.swap(this.goal,this.players);
          
        this.activo='Bulbasaur';    
    }
    
    //Reiniciamos el nivel cuando muere un personaje
    TutorialStage.prototype.playerDie= function() {
        if(Game.physics.arcade.collide(this.agua, this.player1) || Game.physics.arcade.collide(this.agua, this.player2)){
            this.tutorialBSO.stop();
            this.deadSound.play();
            Game.time.events.add(0, this.restartGame, this);      
        }
    }
    //funcion para comprobar si se quema el arbol
    TutorialStage.prototype.quemaArbol= function(fire, arbolito) {
        Game.world.bringToTop(this.emitter);
        this.emitter.x = this.arbolito.x + arbolito.width / 2;
        this.emitter.y = this.arbolito.y + arbolito.height / 2;
        this.emitter.start(true, 600, null, 15);
        this.arbolito.destroy();
    }
    
  //Función para crear un delay en nuestro emisor de partículas
    TutorialStage.prototype.startMenu= function() {
        Game.state.start('menuState');
    }
    
   TutorialStage.prototype.restartGame= function() {
        Game.state.start('tutorialStage');
    }
     
   return TutorialStage;
});
