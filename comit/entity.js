

Crafty.c("player",{
	VelocityX	: 0,
	VelocityY	: 0,
	Acceleration	: 0.7,
	DirectionX      : 0,
	DirectionY	: 0,
	FireReady	: true,
	
 	init: function() {
		this.addComponent("2D, DOM, Color ,Keyboard ,Tween ,Collision");
		this.color("#969696");
		this.attr({w: 15 ,h:15});
		this.bind("EnterFrame", function(e) {
			
		if ( this.hit("enemy") ) { Crafty.audio.play("hit");  Crafty.e('finalscore'); this.destroy(); }
		
		if ( this.isDown(Crafty.keys.D)) { this.DirectionX=1; }
			else
		if ( this.isDown(Crafty.keys.A)) { this.DirectionX=-1; } 
			
		if ( this.isDown(Crafty.keys.W)){ this.DirectionY=-1; }
			else
		if ( this.isDown(Crafty.keys.S)) { this.DirectionY=1; }
		
		if ( this.isDown(Crafty.keys.UP_ARROW) && this.FireReady ) {
			Crafty.e('projectile')._set(this.x+7,this.y,6,2,-1);
			this.FireReady = false;
			this.timeout( function() { this.FireReady =  true }, 500);
		}
			else
		if ( this.isDown(Crafty.keys.DOWN_ARROW) && this.FireReady ) {
			Crafty.e('projectile')._set(this.x+7,this.y+9,6,2,1);
			this.FireReady = false;
			this.timeout( function() { this.FireReady =  true }, 500);			
		}
		
		if ( this.isDown(Crafty.keys.LEFT_ARROW) && this.FireReady ) {
			Crafty.e('projectile')._set(this.x,this.y+7,2,6,-2); 
			this.FireReady = false;
			this.timeout( function() { this.FireReady =  true }, 500);
		}
			else
		if ( this.isDown(Crafty.keys.RIGHT_ARROW) && this.FireReady ) {
			Crafty.e('projectile')._set(this.x+10,this.y+7,2,6,2);
			this.FireReady = false;
			this.timeout( function() { this.FireReady =  true }, 500);
		}
		
		
		
		if ( this.DirectionX==1)   { this.VelocityX+=this.Acceleration*this.Acceleration; 
			if ( this.VelocityX >3 ) this.VelocityX=3; 	
			this.x+=1*this.VelocityX; }
			
		if ( this.DirectionX==-1 ) { this.VelocityX+=this.Acceleration*this.Acceleration; 
			if ( this.VelocityX > 3 ) this.VelocityX=3; 
			this.x+=-1*this.VelocityX; } 
			
		if ( this.DirectionY==1)   { this.VelocityY+=this.Acceleration*this.Acceleration; 
			if ( this.VelocityY >3 ) this.VelocityY=3; 	
			this.y+=1*this.VelocityY; }
			
		if ( this.DirectionY==-1 ) { this.VelocityY+=this.Acceleration*this.Acceleration; 
			if ( this.VelocityY > 3 ) this.VelocityY=3; 
			this.y+=-1*this.VelocityY; }
		
		this.DirectionX=0;
		this.DirectionY=0;	
		
		if ( this.x>480) { this.x=-15; }
			else
		if ( this.x<-15) { this.x=480; }
		
		if ( this.y>320) { this.y=-15; }
			else
		if ( this.y<-15) { this.y=320; }
		
		});
	},
	_set: function(x_,y_) {
		this.x = x_;
                this.y = y_;
		
		
		return this;
	}
});


Crafty.c("projectile",{
	Direction : 0,
 	init: function() {
		this.addComponent("2D, DOM, Color ,Tween ,Collision");
		this.color("#DF0101");
		this.timeout( function() { this.destroy(); }, 800);
		Crafty.audio.play("laser");
		this.bind("EnterFrame", function(e) {
		
		if ( this.hit("enemy") ) { this.destroy(); }
		
		if (this.Direction == -1) { this.y-=6;}
			else
		if (this.Direction == 1) { this.y+=6;}
		
		if (this.Direction == -2) { this.x-=6;}
			else
		if (this.Direction == 2) { this.x+=6;}
		
		if ( this.x>480) { this.x=-5; }
			else
		if ( this.x<-5) { this.x=480; }
		
		if ( this.y>320) { this.y=-5; }
			else
		if ( this.y<-5) { this.y=320; }
		
		
		
		});
	},
	_set: function(x_,y_,_h,_w,_d) {
		this.x = x_;
                this.y = y_;
		this.h = _h;
		this.w = _w;
		this.Direction = _d;
		return this;
	}
});

Crafty.c("enemy",{
	Direction : 0,
	Hit	  : 3,
 	init: function() {
		this.addComponent("2D, DOM, Color ,Tween ,Collision");
		this.color("#CC2EFA");
		Crafty.audio.play("enemy");
		this.attr({w: 20 ,h:20});
	
		this.bind("TweenEnd", function (prop) {   
			this.tween({alpha: 1.0}, 20);
			this._move();
			this.unbind("TweenEnd"),prop;
			
		});
		
		this.bind("EnterFrame", function(e) {
		
		if ( this.hit("projectile") ) { this.Hit-=1; Crafty.audio.play("hit2"); this.Direction = 0; }
		
		if (this.Hit==0) {
			score+=10;
			text_score.text(+ score);
			this.tween({alpha: 0.0}, 5);
			Crafty.audio.play("hit");
			this.bind("TweenEnd", function (prop) {   
				this.destroy();
			});
			this.Hit=3;
			
		}
		
		if (this.Direction == -1) { this.y-=3;}
			else
		if (this.Direction == 1) { this.y+=3;}
		
		if (this.Direction == -2) { this.x-=3;}
			else
		if (this.Direction == 2) { this.x+=3;}
		
		if ( this.x>480) { this.x=-20; }
			else
		if ( this.x<-20) { this.x=480; }
		
		if ( this.y>320) { this.y=-20; }
			else
		if ( this.y<-20) { this.y=320; }
		
		});
	},
	_set: function(x_,y_,_h,_w,_d) {
		this.x = x_;
                this.y = y_;
		this.tween({alpha: 0.0}, 20);
		return this;
	},
	_move: function() {
		this.Direction=Crafty.math.randomInt(-2, 2);
		this.timeout( function() { this._move()}, 1000);
	}
});


Crafty.c("manager",{
 	init: function() {
		this.addComponent("2D");
		this._setenemy();
		
	},
	_setenemy: function(x_,y_) {
		Crafty.e('enemy')._set(Crafty.math.randomInt(0, 480),Crafty.math.randomInt(0, 320));
		this.timeout( function() { this._setenemy();}, 7000);
		return this;
	}
});

Crafty.c("finalscore",{
 	init: function() {
		this.addComponent("2D, DOM, Text");
		this.textColor('#FFFFFF');
		this.attr({ x: 200, y: 75,w: 100 ,h: 20 })
		this.bind('KeyDown', function(e) {	this.timeout(function() { score=0; clean(); Crafty.scene("game");}, 3000);	})
		this.text("Score  " +score).css("textAlign", "center").textColor('#FFFFFF');
		
	}
});

function clean(){
Crafty("2D").each(function () {
		if (!this.has("Persist")) this.destroy(); });
}

