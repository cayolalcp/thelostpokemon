define(['Phaser','Enemy'], function (Phaser,Enemy){

    //simplemente define el objeto gastly y lo crea como enemigo
    function Gastly(game,x,y) {
        Phaser.Sprite.call(this,game,x,y,'gastly');
        this.animations.add('move',[0,1],3,true,true);
        this.animations.add('ataque',[1,2,3,4],6,true,true);
        this.animations.play('move');
        game.physics.arcade.enable(this);
        this.enableBody = true;
        this.anchor.setTo(0.5, 0.5);
        this.body.velocity.x = 70;
        this.body.bounce.x = 1;
        this.body.gravity.y = 500;
        this.body.collideWorldBounds=true;
        this.checkWorldBounds = true;
        this.scale.setTo(0.75,0.75);
        this.flagMoveDirection=1;
        this.initialScale=this.scale.x;
        this.flagFollowing=0;
        this.loopMove=game.time.events.loop(Phaser.Timer.SECOND * 1, this.normalMove, this);
        game.add.existing(this);
    };

    Gastly.prototype = Object.create(Enemy.prototype);
    Gastly.prototype.constructor = Gastly;

    return Gastly;
});