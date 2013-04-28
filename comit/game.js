var ENTS = {},text_score;
var score=0;

$(document).ready(function() {
	Crafty.init(480,320);
	Crafty.background("#000000");
	Crafty.audio.add('laser', 'sound/laser.wav');
	Crafty.audio.add('enemy', 'sound/enemy.wav');
	Crafty.audio.add('hit', 'sound/hit.wav');
	Crafty.audio.add('hit2', 'sound/hit2.wav');
	
	
	Crafty.scene("game"); 
});