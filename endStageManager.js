define(['Phaser'], function (Phaser){
    
    function endStageManager() {}
    
    //si los personajes estan sobre el goal, se acaba el nivel
    endStageManager.prototype.checkEndStage= function(game,x,y,ost){
        if(game.physics.arcade.overlap(game.player1, game.goal) && game.physics.arcade.overlap(game.player2, game.goal) && game.physics.arcade.overlap(game.player3, game.goal)){
            game.isOver=true;
            ost.stop();
            game.endStageSound.play();
            game.time.events.add(500, this.showEndStageText, this,game,x,y);
            game.waitWin = game.time.now +5000;        
        }
    }

    endStageManager.prototype.showEndStageText= function(game,x,y) {
        nivelCompletado=game.add.image(x,y, 'nivelCompletado');
        nivelCompletado.anchor.setTo(0.5, 0.5);
        nivelCompletado.scale.setTo(0.65,0.65);
        nivelCompletado.alpha = 0.1;
        game.add.tween(nivelCompletado).to({alpha:1},3000).start();
    }
     
     return endStageManager;
});