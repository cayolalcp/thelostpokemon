define(['Phaser','Enemy'], function (Phaser,Enemy){
    //crea el objeto machop, creando el enemigo
    function Machop(game,x,y) {
        Phaser.Sprite.call(this,game,x,y,'machop');
        this.animations.add('move',[3,4,5],7,true,true);
        this.animations.add('ataque',[2,7],8,true,true);
        this.animations.play('move');
        game.physics.arcade.enable(this);
        this.enableBody = true;
        this.anchor.setTo(0.5, 0.5);
        this.body.velocity.x = 100;
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
    
    Machop.prototype = Object.create(Enemy.prototype);
    Machop.prototype.constructor = Machop;

    return Machop;
});