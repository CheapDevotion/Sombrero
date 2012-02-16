//Array for holding our game resources.
var resources= [{
    name: "colors",
    type: "image",
    src: "Tiles/colors.png"
}, {
    name: "testLevel",
    type: "tmx",
    src: "Levels/testLevel.tmx"
}, {
	name: "TestPlayer",
	type: "image",
	src: "Sprites/TestPlayer.png"
}];


var sombrero	= 
{	
	/* ---
	
		Initialize the game
		
		---			*/
	onload: function()
	{
		
		
		// init the video
		if (!me.video.init('sombrero', 960, 540, false, 1.0))
		{
			alert("Sorry, but your browser does not support HTML5");
         return;
		}
		
		me.sys.fps = 30;

		// initialize the "audio"
		me.audio.init("mp3,ogg");
		
		// set all resources to be loaded
		me.loader.onload = this.loaded.bind(this);
		
		// set all resources to be loaded
		me.loader.preload(resources);

		// load everything & display a loading screen
		me.state.change(me.state.LOADING);
	},
	
	
	/* ---
	
		callback when everything is loaded
		
		---										*/
	loaded: function ()
	{
		// set the "Play/Ingame" Screen Object
		me.state.set(me.state.PLAY, new PlayScreen());
		
		me.entityPool.add("spawnpoint", TestPlayer);

		// enable the keyboard
		me.input.bindKey(me.input.KEY.A,"left");
		me.input.bindKey(me.input.KEY.D,"right");
		me.input.bindKey(me.input.KEY.W,"up");
		me.input.bindKey(me.input.KEY.S,"down");
		me.input.bindKey(me.input.KEY.SPACE,"jump", true);
		
		//me.debug.renderHitBox = true;
      
      // start the game 
		me.state.change(me.state.PLAY);
	}

}; // jsApp

/* the in game stuff*/
var PlayScreen = me.ScreenObject.extend(
{

   onResetEvent: function()
	{	
      	// stuff to reset on state change
		// load a level
		me.levelDirector.loadLevel("testLevel");
	},
	
	
	/* ---
	
		 action to perform when game is finished (state change)
		
		---	*/
	onDestroyEvent: function()
	{
	
   }

});


//bootstrap :)
window.onReady(function() 
{
	sombrero.onload();
});
