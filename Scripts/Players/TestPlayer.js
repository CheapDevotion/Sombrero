
	var TestPlayer = me.ObjectEntity.extend(
{	
	
	init:function (x, y, settings)
	{
		// define this here, since not defined in tiled
		settings.image = "TestPlayer";
		settings.transparent_color = "#ff00ff";
		settings.spritewidth = 64;
		settings.spriteheight = 64;
		
		// call the constructor
		this.parent(x, y , settings);

		// set the walking & jumping speed
		this.setVelocity(4.5, 18);

		// add friction
		this.setFriction(0.3);

		// adjust the bounding box
		this.updateColRect(18,25, 24,40);

		// set the display to follow our position on both axis
		me.game.viewport.follow(this.pos, me.game.viewport.AXIS.BOTH);
        
		// adjust the deadzone
		//me.game.viewport.setDeadzone( me.game.viewport.width/6,  me.game.viewport.height/4);

		// set animations
		this.addAnimation ("idle",  [2,3,4,5,5,4,3,2]);
		this.addAnimation ("run",  [8,9,10,11,12,13,14]);
		this.addAnimation ("jump",  [6]);

		// set default one
		this.setCurrentAnimation("idle");


	},


	/* -----

		update the player pos
		
	------			*/
	update : function ()
	{
		var doClimb = false;
		
		if (me.input.isKeyPressed('left')) {
			this.vel.x -= this.accel.x * me.timer.tick;
			this.setCurrentAnimation("run");
			this.flipX(true);
		}
		else if (me.input.isKeyPressed('right')) {
			this.vel.x += this.accel.x * me.timer.tick;
			this.setCurrentAnimation("run");
			this.flipX(false);
		}
		
		if (me.input.isKeyPressed('up'))
		{
			doClimb = this.doClimb(true);
			if (this.onladder){
				this.vel.x = 0;
			}
		}
		else if (me.input.isKeyPressed('down'))
		{
			doClimb = this.doClimb(false);
			if (this.onladder){
				this.vel.x = 0;
			}
		}
		
		if (this.vel.y == 0){
			if (me.input.isKeyPressed('left')) {
				this.setCurrentAnimation("run");
			}
			else if (me.input.isKeyPressed('right')) {
				this.setCurrentAnimation("run");
			}
			else {
				this.setCurrentAnimation("idle");
			}
		}
		else {
			this.setCurrentAnimation("jump");
		}

		if (me.input.isKeyPressed('jump')) {
			if (this.vel.y==0) { // on the ground
				this.vel.y = -this.maxVel.y * (me.timer.tick);
				this.setCurrentAnimation("idle");
			}
		}

		// check & update player movement
		this.updateMovement();
		
		
		if (this.onladder)
		{
			this.vel.y = 0;

		/*
		if ((doClimb || this.jumping) && this.isCurrentAnimation("walk"))
			this.setCurrentAnimation("climb");
		} 
		else if (this.isCurrentAnimation("climb"))
		{
			this.setCurrentAnimation("walk");
		}
		*/
		}	
		
		
		
		// check for collision with other entities
		me.game.collide(this);

		// update animation
	//	if (this.vel.x!=0 || this.vel.y!=0 || (this.onladder && doClimb))
	//	{
			// update objet animation
			this.parent(this);
			return true;
//	}
//		return false;
	}

});

