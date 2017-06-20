define(['Phaser'], function (Phaser){
    
    function lifeManager() {}
    
    //comprobamos las vidas del personaje y ajustamos el numero de sprites que se muestran
    lifeManager.prototype.checkLife= function(game){
        if(game.activePlayer==game.player1){
            switch(game.player1lives) {
                case 3:
                    game.currentLife.frame = 0;
                    break;
                case 2:
                    game.currentLife.frame = 1;
                    break;
                case 1:
                    game.currentLife.frame = 2;
                    break;
            }
        }else if(game.activePlayer==game.player2){
            switch(game.player2lives) {
                case 3:
                    game.currentLife.frame = 0;
                    break;
                case 2:
                    game.currentLife.frame = 1;
                    break;
                case 1:
                    game.currentLife.frame = 2;
                    break;
            }
        }else if(game.activePlayer==game.player3){
            switch(game.player3lives) {
                case 3:
                    game.currentLife.frame = 0;
                    break;
                case 2:
                    game.currentLife.frame = 1;
                    break;
                case 1:
                    game.currentLife.frame = 2;
                    break;
            }
        }
    }
    
    return lifeManager;
});