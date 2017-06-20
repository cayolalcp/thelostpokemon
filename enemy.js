define(['Phaser'], function (Phaser){
    
    //Inheritance
    Enemy.prototype = Object.create(Phaser.Sprite.prototype);
    Enemy.prototype.constructor = Enemy;
    
    function Enemy (game,x,y) {}

    Enemy.prototype.update = function (game) {}
    
    //rutina de comportamiento de los enemigos
    Enemy.prototype.follow = function(game) {   
        if((game.physics.arcade.distanceBetween(this,game.activePlayer) < 160)){
            this.flagFollowing=1;
            if(game.activePlayer.position.x<this.position.x){
                this.scale.x=this.initialScale;
            }else if(game.activePlayer.position.x>this.position.x){
                this.scale.x=this.initialScale*-1;
            }
            if(this!=null && game.activePlayer!=null){
                if(game.isShield==true && game.physics.arcade.overlap(this, game.player3)) {
                    this.body.velocity.x =0;
                    this.animations.play('ataque');
                }else{                                
                    if((game.physics.arcade.distanceBetween(this,game.activePlayer) < 30)){
                        this.animations.play('ataque');
                        this.body.velocity.x=0;                               
                    }else{
                        this.animations.play('move');
                        game.physics.arcade.moveToObject(this, game.activePlayer, 30);                               
                    }      
                }
            }
        }else{
            this.flagFollowing=0;
        }
    }
    
    //rutina de comportamiento cuando no hay personajes cerca del enemigo
    Enemy.prototype.normalMove = function(game) {  
        if(this.flagMoveDirection==1 && this.flagFollowing==0){
            this.body.velocity.x = 50;
            this.scale.x=this.initialScale*-1;
            this.flagMoveDirection=-1;
        }else if(this.flagMoveDirection==-1 && this.flagFollowing==0){
            this.body.velocity.x = -50;
            this.scale.x=this.initialScale;
            this.flagMoveDirection=1;
        }      
    }
    
    //rutina fury de comportamiento (persiguen al enemigo continuamente)
    Enemy.prototype.furyMove = function(game) {  
        game.physics.arcade.moveToObject(this, game.activePlayer, 50);      
    }

    Enemy.prototype.removeTimer = function(game) {             
        game.time.events.remove(this.loopMove);
    }  
      
    return Enemy;
});