(function(window) {

var PosterioriLine = function(destX, destY, err) {
	this.initialize(destX, destY, err);
}
var p = PosterioriLine.prototype = new MoveLeftContainer();

// constant properties:
	// none
	
// variable properties:
	// none
	
// constructor:
	p.MoveLeftContainer_initialize = p.initialize;	// unique to avoid overiding base class
	
	p.initialize = function(destX, destY, err) {
		this.MoveLeftContainer_initialize(destX, destY);
		this.bg = new Shape();
		this.drawBg(destX, destY, err);
		this.addChild(this.bg);
	}
	
// public methods:
	p.drawBg = function(destX, destY, err) {
		this.bg.graphics
			.setStrokeStyle(1)
			.beginStroke("yellow")
			.moveTo(0, 0)
			.lineTo(destX, destY)
			
			.beginStroke("rgba(255, 255, 0, 0.5)")
			.moveTo(0, -err)
			.lineTo(0, err);
	}
	
window.PosterioriLine = PosterioriLine;
}(window));