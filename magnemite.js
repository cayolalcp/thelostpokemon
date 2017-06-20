define(['Phaser','Enemy'], function (Phaser,Enemy){
    //creamos el objet magnemite, que es un enemigo
    function Magnemite(game,x,y) {

        Phaser.Sprite.call(this,game,x,y,'magnemite');
        this.animations.add('move', [0,1,2,3,4,5,6,7], 10, true);
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
        game.add.existing(this);
    };
    
    Magnemite.prototype = Object.create(Enemy.prototype);
    Magnemite.prototype.constructor = Magnemite;

    return Magnemite;
});