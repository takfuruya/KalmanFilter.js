(function(window) {

var Rainbow = function() {
	this.initialize();
}
var p = Rainbow.prototype = new MoveLeftContainer();

// constant properties:
	// none

// variable properties:	
	// none
	
// constructor:
	p.MoveLeftContainer_initialize = p.initialize;	// unique to avoid overiding base class
	
	p.initialize = function() {
		this.MoveLeftContainer_initialize();
		this.alpha = 0.25;
		this.bg = new Shape();
		this.drawBg();
		this.addChild(this.bg);
	}
	
// public methods:
	p.drawBg = function() {
		this.bg.graphics
			.setStrokeStyle(4)
			.beginStroke("#8B17FF")
			.moveTo(0, 10)
			.lineTo(MoveLeftContainer.SPEED,  10)
			
			.beginStroke("#0080FF")
			.moveTo(0, 6)
			.lineTo(MoveLeftContainer.SPEED,  6)
			
			.beginStroke("#00FF00")
			.moveTo(0, 2)
			.lineTo(MoveLeftContainer.SPEED,  2)
			
			.beginStroke("#FFFF00")
			.moveTo(0, -2)
			.lineTo(MoveLeftContainer.SPEED,  - 2)
			
			.beginStroke("#FF8000")
			.moveTo(0, -6)
			.lineTo(MoveLeftContainer.SPEED, - 6)
			
			.beginStroke("#FF0000")
			.moveTo(0, -10)
			.lineTo(MoveLeftContainer.SPEED,  - 10);
	}
	
window.Rainbow = Rainbow;
}(window));