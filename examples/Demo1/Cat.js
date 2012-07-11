(function(window) {

var Cat = function() {
	this.initialize();
}
var p = Cat.prototype = new Container();

// constant properties:
	Cat.WIDTH = 35;
	Cat.HEIGHT = 20;

// variable properties:	
	// none
	
// constructor:
	p.Container_initialize = p.initialize;	// unique to avoid overiding base class
	
	p.initialize = function() {
		this.Container_initialize();
		this.catSS = new SpriteSheet({
			images: ["NyanCatSprite.png"],
			frames: {width: 35, height: 20},
			animations: {run: [0, 5]}
		});
		this.catAnim = new BitmapAnimation(this.catSS);
		this.catAnim.gotoAndPlay("run");
		this.bg = new Shape();
		this.drawBg();
		this.addChild(this.bg);
		this.addChild(this.catAnim);
		
		// bg is created with onPress function defined here because
		// if onPress is defined for Cat, it returns tainted canvas
		// security error (meaning it can only be tested on server)
		this.bg.onPress = function(pressEvent) {
			var cat = pressEvent.target.parent;
		
			pressEvent.onMouseMove = function(moveEvent) {
				cat.y = moveEvent.stageY - Cat.HEIGHT/2;
			}
		}
	}
	
// public methods:
	p.drawBg = function() {
		this.bg.graphics
			.setStrokeStyle(1)
			.beginFill("red")
			.drawRect(0, 0, Cat.WIDTH, Cat.HEIGHT);
	}
	
window.Cat = Cat;
}(window));