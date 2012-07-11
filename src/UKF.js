/**
 * @ author takfuruya
 */



/*
KF.UnscentedKalmanFilter()
*/

(function(ns) {

var UnscentedKalmanFilter = function () {
	// needs to be implemented
};

UnscentedKalmanFilter.prototype = {
	
	constructor: UnscentedKalmanFilter,
	
	predict: function (u) {
		// needs to be implemented
	},
	
	filter: function(z) {
		// needs to be implemented
	}
	
};

ns.UnscentedKalmanFilter = UnscentedKalmanFilter;

}(KF||(KF={})));
var KF;
