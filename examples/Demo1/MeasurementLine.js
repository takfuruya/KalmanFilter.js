(function(window) {

var MeasurementLine = function(err) {
	this.initialize(err);
}
var p = MeasurementLine.prototype = new MoveLeftContainer();

// constant properties:
	MeasurementLine.SPECTRUM = 1;

// variable properties:	
	p.path = null;		// path followed by Rainbow
	p.map = null;		// reference to Map
	
// constructor:
	p.MoveLeftContainer_initialize = p.initialize;	// unique to avoid overiding base class
	
	p.initialize = function(err) {
		this.MoveLeftContainer_initialize(0, 0);
		this.bg = new Shape();
		this.drawBg(err);
		this.addChild(this.bg);
	}
	
// public methods:
	p.drawBg = function(err) {
		this.bg.graphics
			.setStrokeStyle(1)
			.beginStroke("rgba(255, 255, 255, 0.2)")
			.moveTo(0, -err)
			.lineTo(0, err)
			
			.moveTo(0, 0)
			.drawCircle(0, 0, 1);
	}
	
window.MeasurementLine = MeasurementLine;
}(window));