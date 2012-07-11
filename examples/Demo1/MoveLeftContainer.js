(function(window) {

var MoveLeftContainer = function() {
	this.initialize();
}
var p = MoveLeftContainer.prototype = new Container();

// static properties:
	MoveLeftContainer.SPEED = 1;
	
// constructor:
	p.Container_initialize = p.initialize;	// unique to avoid overiding base class
	
	p.initialize = function() {
		this.Container_initialize();
	}
	
// public methods:
	
	// move the left continuously
	p.onTick = function() {
		if (this.x + MoveLeftContainer.SPEED > 0) {
			this.x -= MoveLeftContainer.SPEED;
		} else {
			this.getStage().removeChild(this);
		}
	}
	
window.MoveLeftContainer = MoveLeftContainer;
}(window));