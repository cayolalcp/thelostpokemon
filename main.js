/*global requirejs*/
'use strict';
requirejs.config({
     baseUrl:"",
     shim : {
         'Phaser': {
            exports: 'Phaser'
         }
     },
     paths: {
         'Phaser': 'phaser.min'
     }
});
require(['loader'],
 function (loader) {
    loader.start();
 });
