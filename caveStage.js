define(['Phaser','game','endStageManager','Enemy','Gastly','Machop','lifeManager'], function (Phaser,Game,endStageManager,Enemy,Gastly,Machop,lifeManager){ 
    
    function CaveStage() {
        Phaser.State.call(this);
        this.enemies = [];  
    }

        //Inheritance
    CaveStage.prototype = Object.create(Phaser.State.prototype);
    CaveStage.prototype.constructor = CaveStage;
    
    
    CaveStage.prototype.create = function() {
        //temporizador para ganar
        this.waitWin = 0;
        //emitter para el fuego
        this.emitter = Game.add.emitter(0, 0, 15);
        this.emitter.makeParticles( [ 'fire1', 'fire2', 'fire3', 'smoke' ] );
        this.emitter.gravity = 0;
        this.emitter.setScale(0.5, 0, 0.5, 0, 1000);
        
        //anadimos el titulo del nivel
        this.stage3 = Game.add.text(50, 225, 'Nivel 3: Cueva',{ font: 'bold 36px Geo', fill: '#FFFFFF' });
        this.stage3.alpha = 1;
        Game.add.tween(this.stage3).to({alpha:0},4000).start();
        
        /////////////////
        //ANADIR PERSONAJES
        this.player1 = Game.add.sprite(155, Game.world.centerY,'player1');
        this.player2 = Game.add.sprite(130, Game.world.centerY,'player2');
        this.player3 = Game.add.sprite(110, Game.world.centerY,'player3');
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
        //flags para saltos
        this.bOnSquirtle = false;
        this.cOnSquirtle = false;
        
        //anadimos el agua
        this.agua1 = Game.add.sprite(235, 450,'agua');
        Game.physics.arcade.enable(this.agua1);
        this.agua1.body.allowGravity = false;
        this.agua1.body.immovable = true;
        this.agua1.scale.setTo(0.76,0.52);
        this.agua1.animations.add('move', [0,1], 2, true);
        this.agua1.animations.play('move');
        
        this.agua2 = Game.add.sprite(595, 450,'agua');
        Game.physics.arcade.enable(this.agua2);
        this.agua2.body.allowGravity = false;
        this.agua2.body.immovable = true;
        this.agua2.scale.setTo(0.185,0.52);   
        this.agua2.animations.add('move', [0,1], 5, true);  
        this.agua2.animations.play('move');
        
        this.agua3 = Game.add.sprite(756, 470,'agua');
        Game.physics.arcade.enable(this.agua3);
        this.agua3.body.allowGravity = false;
        this.agua3.body.immovable = true;
        this.agua3.scale.setTo(0.242,0.3); 
        this.agua3.animations.add('move', [0,1], 5, true);
        this.agua3.animations.play('move'); 
        
        this.agua= Game.add.group();
        this.agua.add(this.agua1);
        this.agua.add(this.agua2);
        this.agua.add(this.agua3);
        
        //anadimos a steelix y onix de enemigos
        this.steelix = Game.add.sprite(510, 365,'steelix');
        Game.physics.arcade.enable(this.steelix);
        this.steelix.body.allowGravity = false;
        this.steelix.body.immovable = true; 
        this.steelix.animations.add('move', [0,1], 4, true);
        this.steelix.animations.play('move');
                
        this.onix = Game.add.sprite(864, 200,'onix');
        Game.physics.arcade.enable(this.onix);
        this.onix.body.allowGravity = false;
        this.onix.body.immovable = true;
        this.onix.animations.add('move', [0,1], 4, true);
        this.onix.animations.play('move');
        
        this.obstacles= Game.add.group();
        this.obstacles.add(this.steelix);
        this.obstacles.add(this.onix);        
        
        //añadimos la imagen del goal, lugar donde se deberan colocar los personajes para ganar el nivel
        this.goal = Game.add.sprite(1730, 220,'goal');
       
        this.goal.scale.setTo(0.2,0.2);    
        Game.physics.arcade.enable(this.goal);    
        
        //contador para el fuego de charmander
        this.nextFire = 0;
        //manejadores de las vidas y el fin del juego
        this.endStageManagerGame=new endStageManager();
        this.lifeManagerGame=new lifeManager();     
        
        /////////////
        /// CONTROL DE LA ENTRADA/SALIDA
        this.cursor = Game.input.keyboard.createCursorKeys();     
        
        //impedimos que el navegador pueda desplazarse (scroll) al pulsar estas teclas
        Game.input.keyboard.addKeyCapture([Phaser.Keyboard.UP,Phaser.Keyboard.DOWN, Phaser.Keyboard.LEFT, Phaser.Keyboard.RIGHT, Phaser.Keyboard.SPACEBAR]);
        
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
        
        //habilidades
        this.spacebar = Game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        
        //SONIDOS
        this.deadSound = Game.add.audio('dead');
        this.noiseBulbasaur=Game.add.audio('noiseBulbasaur');
        this.noiseCharmander=Game.add.audio('noiseCharmander');
        this.noiseSquirtle=Game.add.audio('noiseSquirtle');
        this.endStageSound=Game.add.audio('endStage');
        this.golpeSound = Game.add.audio('golpe');
        this.caveBSO=Game.add.audio('caveBSO');
        this.caveBSO.loopFull(); 
        

        this.createWorld();
        
    }
    
    //funcion de control de la pausa
    CaveStage.prototype.togglePause= function() {
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
    //comprobamos el estado cuando pulsamos enter y actuamos en consecuencia
    CaveStage.prototype.enterMenu = function() {
        if(this.posPause==0){
            this.togglePause();
        }else{
            for (i=0; i< this.enemies.length; i++){
                this.enemies[i].removeTimer(this);
            }
            this.enemies = [];    
            this.togglePause();
            this.caveBSO.stop();
            Game.ostMenuSound.play();
            Game.state.start('menuState');
        }

    }
    
    //comprobamos el estado cuando pulsamos la tecla 1 y actuamos en consecuencia
    CaveStage.prototype.onePauseMenu = function() {
        this.pokeIco.position.x=Game.camera.x+220;
        this.pokeIco.position.y=Game.camera.y+220;
        this.posPause=0;

    }
    //comprobamos el estado cuando pulsamos la tecla 2 y actuamos en consecuencia
    CaveStage.prototype.twoPauseMenu = function() {
        this.pokeIco.position.x=Game.camera.x+220;
        this.pokeIco.position.y=Game.camera.y+265;
        this.posPause=1;
    }
    
    CaveStage.prototype.update= function() {
        Game.world.bringToTop(this.stage3);
        Game.camera.follow(this.activePlayer,Phaser.Camera.FOLLOW_LOCKON);
        
        //se crean las colisiones
        Game.physics.arcade.collide(this.player1, this.layer2);
        Game.physics.arcade.collide(this.player2, this.layer2);
        Game.physics.arcade.collide(this.player3, this.layer2);
        Game.physics.arcade.collide(this.player1, this.obstacles);
        Game.physics.arcade.collide(this.player2, this.obstacles);
        Game.physics.arcade.collide(this.player3, this.obstacles);
        
        for (i=0; i< this.enemies.length; i++){
            Game.physics.arcade.collide(this.enemies[i], this.layer2);
        }
         
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
        this.lifeManagerGame.checkLife(this);
        
        Game.world.bringToTop(this.currentLife);

        //funcion que impide lanzar fuego continuamente
        if (this.nextFire-250 < Game.time.now) {
            if(this.isFire){
                this.fire.destroy();
                this.isFire = false;
            }
        }
        //funcion que comprueba la victoria
        if (this.waitWin < Game.time.now && this.isOver) {
            for (i=0; i< this.enemies.length; i++){
                this.enemies[i].removeTimer(this);
            }
            this.enemies = [];    
            Game.state.start('bossStage');
        }
        //funcion que activa los enemigos
        for (i=0; i< this.enemies.length; i++){
            this.enemies[i].follow(this);
        }
        
        this.playerDie();
        this.movePlayer();
        this.skillPlayer();
        


        //overlap para quemar el obstacles y enemies
        Game.physics.arcade.overlap(this.fire, this.onix, this.quemaOnix, null, this);
        Game.physics.arcade.overlap(this.fire, this.steelix, this.quemaSteelix, null, this);
        
        //funcion para provocar el emitter al colisionar el fuego con un enemigo
        for (i=0; i< this.enemies.length; i++){
            if(Game.physics.arcade.overlap(this.fire, this.enemies[i])){
                Game.world.bringToTop(this.emitter);
                this.emitter.x = this.enemies[i].x + this.enemies[i].width / 2;
                this.emitter.y = this.enemies[i].y + this.enemies[i].height / 2;
                this.emitter.start(true, 600, null, 15);
                this.enemies[i].removeTimer(this);
                this.enemies[i].kill();              
            }
        }
        
        //funcion para comprobar si esta completo el nivel
        if(this.isOver==false){
            this.endStageManagerGame.checkEndStage(this,1500,this.world.centerY-30,this.caveBSO);       
        }
        
    }
        
    CaveStage.prototype.selectPlayer= function() {
        
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
    CaveStage.prototype.movePlayer= function() {
    
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
            if(Game.physics.arcade.collide(this.player3, this.agua)){
                this.player3.anchor.setTo(0.5,1);
                this.player3.body.height=5;
                this.inWater=true;
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
            this.inWater=false;            
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
            if(Game.physics.arcade.collide(this.player3, this.agua)){
                this.player3.anchor.setTo(0.5,1);
                this.player3.body.height=5;
                this.inWater=true;
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
                    //this.player3.body.height=7;             
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
            this.inWater=false;
            this.activePlayer.scale.x=-0.8;            
            this.dirPlayer=1;           
        }
        // If nothing is pressed
        else {
            this.player3.body.velocity.x = 0;
            this.player1.body.velocity.x = 0;
            this.player2.body.velocity.x = 0;
            
            //si squirtle esta en el agua
            if(Game.physics.arcade.collide(this.player3, this.agua)){
                this.inWater=true;
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
                this.player3.animations.play('nadando');
                this.player1.animations.play('quieto');
                this.player2.animations.play('quieto');
            }else{
                this.player3.body.height=this.tam;
                this.inWater=false;
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
                this.activePlayer.body.velocity.y = -150;//poner a 170
            }
        }else{
            //comprobamos si se hace overlap con la cepa y si es asi, se permite 'escalar' (salto grande)
            if((this.cursor.up.isDown || this.wasd.up.isDown) && Game.physics.arcade.overlap(this.activePlayer, this.cepa))  {
                this.activePlayer.body.velocity.y = -240;
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
    
    CaveStage.prototype.skillPlayer= function() {
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
    CaveStage.prototype.createWorld= function() {
        // Create the tilemap
        this.map = Game.add.tilemap('caveStageTilemap');
        // Add the tileset to the map
        this.map.addTilesetImage('cave');
        this.map.addTilesetImage('piedrasDecoracion');        
        this.map.addTilesetImage('greyCave');     
        
        // Create the layer, by specifying the name of the Tiled layer
        this.layer1 = this.map.createLayer('fondo');
        this.layer2 = this.map.createLayer('mundo');
        this.layer3 = this.map.createLayer('decoracion');
        
        // Set the world size to match the size of the layer
        this.layer1.resizeWorld();
        
        Game.physics.arcade.enable(this.layer2);
        this.map.setCollisionBetween(0, 1738);
        
        this.scenery= Game.add.group();
        this.scenery.add(this.layer1);
        this.scenery.add(this.layer2);
        this.scenery.add(this.layer3);
        
        this.players = Game.add.group();
        this.players.add(this.player1);
        this.players.add(this.player2);
        this.players.add(this.player3);

        this.activePlayer=this.player1;
        
        Game.world.bringToTop(this.agua); 
        Game.world.bringToTop(this.obstacles); 
        Game.world.bringToTop(this.goal); 
        Game.world.swap(this.goal,this.players);
          
        this.activo='Bulbasaur';
        
        this.enemies.push(new Gastly(Game,1430, 220));        
    }
    
    //Reiniciamos el nivel cuando muere un personaje
    CaveStage.prototype.playerDie= function() {
        if(Game.physics.arcade.collide(this.agua, this.player1) || Game.physics.arcade.collide(this.agua, this.player2)){
            this.caveBSO.stop();
            this.deadSound.play();
            for (i=0; i< this.enemies.length; i++){
                this.enemies[i].removeTimer(this);
            }
            this.enemies = []; 
            Game.time.events.add(0, this.restartGame, this);      
        }
        //comprobamos las vidas del personaje
        for (i=0; i< this.enemies.length; i++){
            if(Game.physics.arcade.overlap(this.player1, this.enemies[i])){
                if (this.player1inm < Game.time.now) {
                    this.player1inm = Game.time.now + 1000;
                    if(this.player1lives == 1){
                        this.caveBSO.stop();
                        this.deadSound.play();
                        this.enemies = [];
                        Game.time.events.add(0, this.restartGame, this);
                    }else{
                        this.golpeSound.play();
                        this.player1lives--;
                        this.player1.alpha = 0.5;
                    }
                }
            }else if(Game.physics.arcade.overlap(this.player2, this.enemies[i])){
                if (this.player2inm < Game.time.now) {
                    this.player2inm = Game.time.now + 1000;
                    if(this.player2lives == 1){
                        this.caveBSO.stop();
                        this.deadSound.play();
                        this.enemies = [];
                        Game.time.events.add(0, this.restartGame, this);
                    }else{
                        this.golpeSound.play();
                        this.player2lives--;
                        this.player2.alpha = 0.5;
                    }
                }
            }else if(Game.physics.arcade.overlap(this.player3, this.enemies[i]) && this.isShield==false){
                if (this.player3inm < Game.time.now) {
                    this.player3inm = Game.time.now + 1000;
                    if(this.player3lives == 1){
                        this.caveBSO.stop();
                        this.deadSound.play();
                        this.enemies = [];
                        Game.time.events.add(0, this.restartGame, this);
                    }else{
                        this.golpeSound.play();
                        this.player3lives--;
                        this.player3.alpha = 0.5;
                    }
                }
            }
        }
        //ajustamos la transparencia al ser inmortal
        if(this.player3inm < Game.time.now && this.player2inm < Game.time.now && this.player1inm < Game.time.now){
            this.player1.alpha = 1;
            this.player2.alpha = 1;
            this.player3.alpha = 1;
        }        
    }
    //funcion para quemar a onix
    CaveStage.prototype.quemaOnix= function(fire, onix) {
        Game.world.bringToTop(this.emitter);
        this.emitter.x = this.onix.x + onix.width / 2;
        this.emitter.y = this.onix.y + onix.height / 2;
        this.emitter.start(true, 600, null, 15);
        onix.destroy();
    }
    //funcion para quemar a steelix
    CaveStage.prototype.quemaSteelix= function(fire, steelix) {
        Game.world.bringToTop(this.emitter);
        this.emitter.x = this.steelix.x + steelix.width / 2;
        this.emitter.y = this.steelix.y + steelix.height / 2;
        this.emitter.start(true, 600, null, 15);
        steelix.destroy();
    }
    
  //Función para crear un delay en nuestro emisor de partículas
    CaveStage.prototype.startMenu= function() {
        Game.state.start('menuState');
    }
    
   CaveStage.prototype.restartGame= function() {
        Game.state.start('caveStage');
    }
     
   return CaveStage;
});
