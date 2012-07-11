/**
 * @ author takfuruya
 */

(function(ns) {


/*
KF.KalmanFilter(A, B, H, Q, R, x, P)
if no input, set B to null
*/
var KalmanFilter = function () {
	
	this.A = arguments[0];	// state transition matrix
	this.numState = this.A.rows();
	
	this.B = arguments[1];	// input matrix (may be null)
	if (this.B == null) {
		this.numInput = 0;
	} else {
		this.numInput = this.B.cols();
	}
	
	this.H = arguments[2];	// observation matrix
	this.numMeasured = this.H.rows();
	
	this.Q = arguments[3];	// process noise covariance matrix
	this.R = arguments[4];	// measurement noise covariance matrix
	this.x = arguments[5];	// state vector
	this.P = arguments[6];	// state covariance matrix
	
	this.k = null;			// Kalman gain
	this.I = Matrix.I(this.numState); // identity matrix
};

KalmanFilter.prototype = {
	
	constructor: KalmanFilter,
	
	predict: function (u) {
		var x = this.x;
		var P = this.P;
		var A = this.A;
		var B = this.B;
		var Q = this.Q;
		
		// x = Ax + Bu
		if (B == null) {
			x = A.x(x);
		} else {
			x = A.x(x).add(B.x(u));
		}
		this.x = x;
		
		// P = APA(T) + Q
		P = A.x(P).x(A.transpose()).add(Q);
		this.P = P;
		
		return {
			"state": x,
			"covariance": P
		};
	
	},
	
	filter: function(z) {
		var x = this.x;
		var P = this.P;
		var A = this.A;
		var B = this.B;
		var H = this.H;
		var Q = this.Q;
		var R = this.R;
		var I = this.I;
		var k = this.k;
		
		// compute Kalman Gain
		// k = PH(T)(HPH(T) + R)^-1
		var tempMat = (H.x(P).x(H.transpose())).add(R);
		if (tempMat.rows() == 1) {
			tempMat = $M([[1/tempMat.e(1,1)]]);
		} else {
			tempMat = tempMat.inv();
		}
		k = P.x(H.transpose()).x( tempMat );
		this.k = k;
		
		// compute a posteriori
		// x = x + k(z - Hx)
		
		x = x.add( k.x(z.subtract(H.x(x))) );
		this.x = x;	
		
		// P = (I - kH)P
		
		P = ( I.subtract(k.x(H)) ).x(P);
		this.P = P;
		
		return {
			"state": x,
			"covariance": P
		};
	}
	
};

ns.KalmanFilter = KalmanFilter;

}(KF||(KF={})));
var KF;
