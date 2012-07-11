/**
 * @ author takfuruya
 */



/*
KF.ExtendedKalmanFilter()
*/

(function(ns) {

var ExtendedKalmanFilter = function () {
	// needs to be implemented
};

ExtendedKalmanFilter.prototype = {
	
	constructor: ExtendedKalmanFilter,
	
	predict: function (u) {
		// needs to be implemented
	},
	
	filter: function(z) {
		// needs to be implemented
	}
	
};

ns.ExtendedKalmanFilter = ExtendedKalmanFilter;

}(KF||(KF={})));
var KF;
