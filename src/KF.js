/**
 * @ author takfuruya
 */

KF.KalmanFilter = function ( A, B, H, Q, R, x, P ) {
	
	this.A = A;	// state transition matrix
	this.B = B;	// input matrix
	this.H = H;	// observation matrix
	this.Q = Q;	// process noise covariance matrix
	this.R = R;	// measurement noise covariance matrix
	this.x = x;	// state vector
	this.P = P;	// state covariance matrix
	this.k = null;	// Kalman gain
	this.I = Matrix.I(2);	// identity matrix

};

KF.KalmanFilter.prototype = {
	
	constructor: KalmanFilter,
	
	predict: function (u) {
		var x = this.x;
		var P = this.P;
		var A = this.A;
		var B = this.B;
		var Q = this.Q;
		
		// x = Ax + Bu
		x = A.x(x).add(B.x(u));
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
		var I = this.I;
		var k = this.k;
		
		// compute Kalman Gain
		// k = PH(T)(HPH(T) + R)^-1
		
		k = P.x(H.transpose()).x( (H.x(P).x(H.transpose())).inv() );
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
