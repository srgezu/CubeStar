
Crafty.scene('game', function() 
{
	Crafty.e('player')._set(180,145);
	Crafty.e('manager');
	text_score=Crafty.e("2D, DOM, Text").attr({ x: 400, y: 10,w: 100 ,h: 20 }).text(+score).css({fontFamily: 'Arial', fontSize: '12px',weight: 'bold'}).textColor('#FFFFFF');	
});
