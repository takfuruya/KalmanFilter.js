(function(window) {

var Star = function() {
	this.initialize();
}
var p = Star.prototype = new MoveLeftContainer();

// constant properties:
	Star.WIDTH = 7;
	Star.HEIGHT = 7;

// variable properties:	
	// none
	
// constructor:
	p.MoveLeftContainer_initialize = p.initialize;	// unique to avoid overiding base class
	
	p.initialize = function() {
		this.MoveLeftContainer_initialize();
		this.starSS = new SpriteSheet({
			images: ["StarSprite.png"],
			frames: {width: 7, height: 7},
			animations: {run: [0, 5]}
		});
		this.starAnim = new BitmapAnimation(this.starSS);
		this.starAnim.gotoAndPlay("run");
		this.addChild(this.starAnim);
	}
	
// public methods:
	// none
	
window.Star = Star;
}(window));