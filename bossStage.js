define(['Phaser','game','endStageManager','Enemy','Gastly','Machop','lifeManager','Magnemite'], function (Phaser,Game,endStageManager,Enemy,Gastly,Machop,lifeManager,Magnemite){ 
    
    function BossStage() {
        Phaser.State.call(this);
        this.enemies = [];  
    }

        //Inheritance
    BossStage.prototype = Object.create(Phaser.State.prototype);
    BossStage.prototype.constructor = BossStage;
    
    BossStage.prototype.create = function() {
        //contador para dar victoria valida
        this.waitWin = 0;
        //siguiente oleada de enemigos
        this.nextWave = Game.time.now+15000;
        
        //anadimos el titulo del nivel
        this.stage4 = Game.add.text(50, 360, 'Nivel 4: Final Boss',{ font: 'bold 36px Geo', fill: '#FFFFFF' });
        this.stage4.alpha = 1;
        Game.add.tween(this.stage4).to({alpha:0},4000).start();
        
        //emitter para el fuego
        this.emitter = Game.add.emitter(0, 0, 15);
        this.emitter.makeParticles( [ 'fire1', 'fire2', 'fire3', 'smoke' ] );
        this.emitter.gravity = 0;
        this.emitter.setScale(0.5, 0, 0.5, 0, 1000);
        
        /////////////////
        //ANADIR PERSONAJES
        this.player1 = Game.add.sprite(155, Game.world.centerY,'player1');
        this.player2 = Game.add.sprite(130, Game.world.centerY,'player2');
        this.player3 = Game.add.sprite(110, Game.world.centerY,'player3');        
        //anadimos las vidas iniciales de los personajes
        this.player1lives = 3;
        this.player2lives = 3;
        this.player3lives = 3;
        //para comprobar si un jugador es inmortal tras un golpe
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
        this.wall1Active=false;
        this.wall2Active=false;
        //flags para saltos
        this.bOnSquirtle = false;
        this.cOnSquirtle = false;

        //anadimos los muros
        this.wall1= Game.add.sprite(526, 281,'wallBoss');
        Game.physics.arcade.enable(this.wall1);
        this.wall1.body.allowGravity = false;
        this.wall1.body.immovable = true;
        this.wall1.animations.add('left', [0,1,2,3,4], 10, true); 
        this.wall1.scale.setTo(0.6,0.55); 
        this.wall1.visible=false;
        
        this.wall2= Game.add.sprite(782, 167,'wallBoss2');
        Game.physics.arcade.enable(this.wall2);
        this.wall2.body.allowGravity = false;
        this.wall2.body.immovable = true;
        this.wall2.animations.add('left', [4,3,2,1,0], 10, true); 
        this.wall2.scale.setTo(0.6,0.55); 
        this.wall2.visible=false;
        
        this.walls= Game.add.group();
        this.walls.add(this.wall1);
        this.walls.add(this.wall2);   
        
        //anadimos las plataformas que aparecen tras presiionar los botones
        this.panel1=Game.add.sprite(705, 388,'panelSide');
        Game.physics.arcade.enable(this.panel1);
        this.panel1.scale.setTo(0.35,0.35); 
        this.panel1.body.allowGravity = false;
        this.panel1.body.checkCollision.up = true;
        this.panel1.body.checkCollision.left = false;
        this.panel1.body.checkCollision.right = false;
        this.panel1.body.immovable = true; 

        this.panel2=Game.add.sprite(600, 198,'panelSide');
        Game.physics.arcade.enable(this.panel2);
        this.panel2.scale.setTo(0.35,0.35); 
        this.panel2.body.allowGravity = false;
        this.panel2.body.checkCollision.up = true;
        this.panel2.body.checkCollision.left = false;
        this.panel2.body.checkCollision.right = false;
        this.panel2.body.immovable = true; 
        
        this.panels= Game.add.group();
        this.panels.add(this.panel1);
        this.panels.add(this.panel2);
        
        //anadimos un onix de obstaculo
        this.onix = Game.add.sprite(630, 155,'onix');
        Game.physics.arcade.enable(this.onix);
        this.onix.body.allowGravity = false;
        this.onix.body.immovable = true;
        this.onix.animations.add('move', [0,1], 4, true);
        this.onix.animations.play('move');
        
        this.obstacles= Game.add.group();
        this.obstacles.add(this.onix);   
        
        //anadimos a aggron, el final boss
        this.aggron = Game.add.sprite(1000, 150,'aggron');
        Game.physics.arcade.enable(this.aggron);
        this.aggron.body.allowGravity = true;
        this.aggron.animations.add('move', [4,5,6,7,8,9,10,11,12], 10, true);
        this.aggron.animations.play('move');
        this.aggron.scale.setTo(1,1);
        this.aggron.body.gravity.y = 500;
        
        //anadimos la plataforma sobre la que estara el f.b. y que desaparecera tras completar el nivel
        this.plataforma = Game.add.sprite(1010, 360,'plataforma');
        Game.physics.arcade.enable(this.plataforma);
        this.plataforma.body.allowGravity = false;
        this.plataforma.body.immovable = true;
        
        //añadimos la imagen del goal, lugar donde se deberan colocar los personajes para ganar el nivel
        this.goal = Game.add.sprite(1050, 45,'goal');
        this.goal.scale.setTo(0.2,0.2);    
        Game.physics.arcade.enable(this.goal);    
        
        //contador para el fuego de charmander
        this.nextFire = 0;
        
        //manejadores de vidas y final de juego
        this.endStageManagerGame=new endStageManager();
        this.lifeManagerGame=new lifeManager();
        
        /////////////
        /// CONTROL DE LA ENTRADA/SALIDA
        this.cursor = Game.input.keyboard.createCursorKeys();     
        
        //impedimos que el navegador pueda desplazarse (scroll) al pulsar estas teclas
        Game.input.keyboard.addKeyCapture([Phaser.Keyboard.UP,Phaser.Keyboard.DOWN, Phaser.Keyboard.LEFT, Phaser.Keyboard.RIGHT]);
        
        //Permitimos utilizar las teclas WASD para moverse
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
        this.golpeSound = Game.add.audio('golpe');
        this.noiseBulbasaur=Game.add.audio('noiseBulbasaur');
        this.noiseCharmander=Game.add.audio('noiseCharmander');
        this.noiseSquirtle=Game.add.audio('noiseSquirtle');
        this.bossBSO=Game.add.audio('bossBSO');
        this.endStageSound=Game.add.audio('endStage');
        this.wallSound= Game.add.audio('wallSound');
        this.aggronSound= Game.add.audio('aggronSound');
        this.bossBSO.loopFull(); 

        this.createWorld();
    }
  
    BossStage.prototype.update= function() {
        //se crean las colisiones
        Game.physics.arcade.collide(this.players, this.layer2);
        Game.physics.arcade.collide(this.players, this.obstacles);
        Game.physics.arcade.collide(this.aggron, this.plataforma);
        Game.world.bringToTop(this.stage4);
        //manejadores de los botones
        if(this.wall1Active==true){
            if(Game.physics.arcade.collide(this.activePlayer, this.wall1)){
                this.activePlayer.touchingWall1=true;
            }else{
                this.activePlayer.touchingWall1=false;
            }
            Game.physics.arcade.collide(this.players, this.wall1);
        }
        
        if(this.wall2Active==true){
            if(Game.physics.arcade.collide(this.activePlayer, this.wall2)){
                this.activePlayer.touchingWall2=true;
            }else{
                this.activePlayer.touchingWall2=false;
            }
            Game.physics.arcade.collide(this.players, this.wall2);
        }
        //se crean las colisones de los enemigos con las capas
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
        Game.world.bringToTop(this.plataforma); 
        
        //funcion que impide lanzar fuego continuamente
        if (this.nextFire-250 < Game.time.now) {
            if(this.isFire){
                this.fire.destroy();
                this.isFire = false;
            }
        }
        //funcion que controla el final del juego
        if (this.waitWin < Game.time.now && this.isOver) {
            this.bossBSO.stop();
            this.mainBulbasaur.destroy();
            this.mainCharmander.destroy();
            this.mainSquirtle.destroy();
            this.currentLife.destroy();
            videof = Game.add.video('final');
            videof.play(false);
            spritef = videof.addToWorld(Game.camera.x, Game.camera.y, 0, 0, 0.37, 0.38);
            videof.onComplete.add(this.vidComplete, this);
            Game.world.bringToTop(spritef);
            this.enemies = [];
            this.nextWave = Game.time.now +150000;
            this.waitWin = Game.time.now +150000;
            //Game.state.start('menuState');
        }
        //controlador de las oleadas de enemigos en funcion de la altura en el mundo del personaje
        //ademas controla el focus de la camara en el jefe
        if (this.nextWave < Game.time.now) {
            this.aggronSound.play();
            Game.camera.follow(this.aggron,Phaser.Camera.FOLLOW_LOCKON);
            if(this.activePlayer.y > 400){
                this.enemies.push(new Magnemite(Game,975, 350));
            }else if(this.activePlayer.y >300){
                this.enemies.push(new Magnemite(Game,975, 350));
                this.enemies.push(new Magnemite(Game,1025, 350));
            }else if(this.activePlayer.y >200){
                this.enemies.push(new Magnemite(Game,975, 350));
                this.enemies.push(new Magnemite(Game,1025, 350));
                this.enemies.push(new Magnemite(Game,1025, 250));
            }else if(this.activePlayer.y >100){
                this.enemies.push(new Magnemite(Game,975, 350));
                this.enemies.push(new Magnemite(Game,1025, 350));
                this.enemies.push(new Magnemite(Game,1025, 250));
                this.enemies.push(new Magnemite(Game,975, 250));
            }
            this.nextWave = Game.time.now + 15000;//siguiente oleada
        }else if(this.nextWave-14500 < Game.time.now){
            Game.camera.follow(this.activePlayer,Phaser.Camera.FOLLOW_LOCKON);
        }
        
        //habilita el tipo de movimiento furioso para los enemigos
        for (i=0; i< this.enemies.length; i++){
            this.enemies[i].furyMove(this);
        }
        
        this.playerDie();
        this.movePlayer();
        this.skillPlayer();
        
        //overlap para quemar obstacles y enemies
        Game.physics.arcade.overlap(this.fire, this.onix, this.quemaOnix, null, this);

        //comprueba si hay colision del fuego con un enemigo, y si es asi, produce el emitter
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
        //habilita la plataforma 1
        if( Game.physics.arcade.collide(this.activePlayer, this.panel1)){
            Game.camera.follow(this.wall1,Phaser.Camera.FOLLOW_LOCKON);
            if(this.wall1Active==false){
                this.wall1.visible=true;
                this.wallSound.play();
                this.wall1.animations.play('left');
                this.wall1Active=true;
            }
            Game.time.events.add(400, this.stopWall, this, this.wall1,4);    
        }else{
            this.wall1.animations.stop('left');
            this.wall1.frame=4;
        }

        //habilita la plataforma 2
        if( Game.physics.arcade.collide(this.activePlayer, this.panel2)){
            Game.camera.follow(this.wall2,Phaser.Camera.FOLLOW_LOCKON);
            if(this.wall2Active==false){
                this.wall2.visible=true;
                this.wallSound.play();
                this.wall2.animations.play('left');
                this.wall2Active=true;
            }
            Game.time.events.add(400, this.stopWall, this, this.wall2,0);    
        }else{
            this.wall2.animations.stop('left');
            this.wall2.frame=0;
        }      
        //comprueba el estado del final del juego
        if(this.isOver==false){
            if(Game.physics.arcade.overlap(this.player1, this.goal) && Game.physics.arcade.overlap(this.player2, this.goal) && Game.physics.arcade.overlap(this.player3, this.goal)){
                     this.aggronSound.play();
            }
            this.endStageManagerGame.checkEndStage(this,800,this.world.centerY+180,this.bossBSO);       
        }else{
            for (i=0; i< this.enemies.length; i++){
                this.enemies[i].removeTimer(this);
            }
            this.enemies = [];  
           
            this.plataforma.destroy();

            Game.camera.follow(this.aggron,Phaser.Camera.FOLLOW_LOCKON);
        }
    }
        
    BossStage.prototype.selectPlayer= function() {
        
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
    BossStage.prototype.movePlayer= function() {
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
            if (this.activePlayer == this.player3){
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
            if (this.activePlayer == this.player3){
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
            this.player3.body.height=this.tam;
            this.inWater=false;
            this.player3.animations.play('quieto');
            this.player1.animations.play('quieto');
            this.player2.animations.play('quieto');
            //mantenemos la animacion del caparazon
            if(this.isShield){
                this.player3.animations.play('shield');
            }
        }
        
        //////////////////////
        /// AHORA COMPRUEBO EL SALTO
         if(this.cursor.up.isDown && this.inWater==true && this.activePlayer==this.player3){
            this.activePlayer.body.velocity.y = -150;//poner a 170
         
         }else{
            //comprobamos si se hace overlap con la cepa y si es asi, se permite 'escalar' (salto grande)
            if((this.cursor.up.isDown || this.wasd.up.isDown) && Game.physics.arcade.overlap(this.activePlayer, this.cepa))  {
                this.activePlayer.body.velocity.y = -240;
                this.activePlayer.body.velocity.x = 60*this.dirPlayer;
            }else if ((this.cursor.up.isDown || this.wasd.up.isDown) && 
                      (this.activePlayer.body.onFloor()|| this.activePlayer.touchingWall1==true || this.activePlayer.touchingWall2==true)){//salto normal
                this.activePlayer.body.velocity.y = -180;
            } else if((this.cursor.up.isDown || this.wasd.up.isDown) && this.bOnSquirtle && this.activePlayer == this.player1){//permitimos salto de bulbasaur sobre squirtle
                this.activePlayer.body.velocity.y = -180;
            } else if((this.cursor.up.isDown || this.wasd.up.isDown) && this.cOnSquirtle && this.activePlayer == this.player2){//permitimos salto de charmander sobre squirtle
                this.activePlayer.body.velocity.y = -180;
            }
         }
    }
    
    BossStage.prototype.skillPlayer= function() {
        //si se hace la cepa
        if(this.spacebar.isDown && !this.isCepa && 
           (this.activePlayer.body.onFloor()|| this.activePlayer.touchingWall1==true || this.activePlayer.touchingWall2==true) && this.activePlayer==this.player1){
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
            
        }else if(this.spacebar.isDown && this.activePlayer==this.player2){//si se hace la llama
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
            
        }else if(this.spacebar.isDown && this.activePlayer==this.player3){//si se hace el caparazon
            this.player3.animations.play('shield'); 
            this.isShield=true;
        }
    }

    
    /// creando el mundo desde un tilemap
    BossStage.prototype.createWorld= function() {
        // Create the tilemap
        this.map = Game.add.tilemap('bossStageTilemap');
        // Add the tileset to the map
        this.map.addTilesetImage('factory');
        this.map.addTilesetImage('factoryBackground');    

        // Create the layer, by specifying the name of the Tiled layer
        this.layer1 = this.map.createLayer('fondo');
        this.layer2 = this.map.createLayer('mundo');

        // Set the world size to match the size of the layer
        this.layer2.resizeWorld();

        Game.physics.arcade.enable(this.layer2);
        this.map.setCollisionBetween(0, 1456);

        this.scenery= Game.add.group();
        this.scenery.add(this.layer1);
        this.scenery.add(this.layer2);

        this.players = Game.add.group();
        this.players.add(this.player1);
        this.players.add(this.player2);
        this.players.add(this.player3);
        this.activePlayer=this.player1;

        Game.world.bringToTop(this.walls); 
        Game.world.bringToTop(this.panels); 
        Game.world.bringToTop(this.obstacles); 
        Game.world.bringToTop(this.goal); 
        Game.world.bringToTop(this.aggron);
        Game.world.swap(this.goal,this.players);

        this.activo='Bulbasaur';
    }
    
    //Reiniciamos el nivel cuando muere un personaje
    BossStage.prototype.playerDie= function() {
        //mueren si tocan al jefe
        if(Game.physics.arcade.overlap(this.player1, this.aggron) || Game.physics.arcade.overlap(this.player2, this.aggron) ||
           Game.physics.arcade.overlap(this.player3, this.aggron)){
            this.bossBSO.stop();
            this.deadSound.play();
            for (i=0; i< this.enemies.length; i++){
                this.enemies[i].removeTimer(this);
            }
            this.enemies = [];    
            Game.time.events.add(0, this.restartGame, this);
        }
        //comprobamos las vidas y actuamos en caso de que no queden
        for (i=0; i< this.enemies.length; i++){
            if(Game.physics.arcade.overlap(this.player1, this.enemies[i])){
                if (this.player1inm < Game.time.now) {
                    this.player1inm = Game.time.now + 1000;
                    if(this.player1lives == 1){
                        this.bossBSO.stop();
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
                        this.bossBSO.stop();
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
                        this.bossBSO.stop();
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
        //habilitamos inmortalidad durante 1 segundo tras ser impactado
        if(this.player3inm < Game.time.now && this.player2inm < Game.time.now && this.player1inm < Game.time.now){
            this.player1.alpha = 1;
            this.player2.alpha = 1;
            this.player3.alpha = 1;
        }
        
    }
    //eliminamos a onix con un emitter
    BossStage.prototype.quemaOnix= function(fire, onix) {
        Game.world.bringToTop(this.emitter);
        this.emitter.x = this.onix.x + onix.width / 2;
        this.emitter.y = this.onix.y + onix.height / 2;
        this.emitter.start(true, 600, null, 15);
        onix.destroy();
    }    
    //paramos la plataforma cuando llega a la extension adecuada
    BossStage.prototype.stopWall= function(wall,frameNum) {
            wall.animations.stop('left');
            wall.frame=frameNum;
    }
    
    //funcion que controla la pausa
    BossStage.prototype.togglePause= function() {
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
    //permite el enter en el menu de pausa
    BossStage.prototype.enterMenu = function() {
        if(this.posPause==0){
            this.togglePause();
        }else{
            for (i=0; i< this.enemies.length; i++){
                this.enemies[i].removeTimer(this);
            }
            this.enemies = [];    
            this.togglePause();
            this.bossBSO.stop();
            Game.ostMenuSound.play();
            Game.state.start('menuState');
        }
    }
    //vuelve a la partida
    BossStage.prototype.onePauseMenu = function() {
        this.pokeIco.position.x=Game.camera.x+220;
        this.pokeIco.position.y=Game.camera.y+220;
        this.posPause=0;
    }
    //sale al menu
    BossStage.prototype.twoPauseMenu = function() {
        this.pokeIco.position.x=Game.camera.x+220;
        this.pokeIco.position.y=Game.camera.y+265;
        this.posPause=1;
    } 
    
    BossStage.prototype.vidComplete = function() { 
        videof.stop();   
        sprite.destroy(); 
        Game.state.start('menuState');      
    }
    
    //Función para crear un delay en nuestro emisor de partículas
    BossStage.prototype.startMenu= function() {
        Game.state.start('bootState');
    }
    //reinicia el juego
    BossStage.prototype.restartGame= function() {
        Game.state.start('bossStage');
    }
     
    return BossStage;
});
