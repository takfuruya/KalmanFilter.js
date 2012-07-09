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

};

KF.KalmanFilter.prototype = {
	
	constructor: KalmanFilter,
	
	predict: function (u) {
		
		// x = Ax + Bu
		this.x = KF.add( KF.multiply( this.A, this.x ), 
				 Bu
			       );
		
		// P = APA(T) + Q
		this.P = KF.add( KF.multiply( this.A, 
					      this.P, 
					      KF.transpose(A)),
				 Q
				);	
		
		return {
			"state": this.x,
			"covariance": this.P
		};
	
	},
	
	filter: function(z) {
		
		// compute Kalman Gain
		// k = PH(T)(HPH(T) + R)^-1
		
		this.k = KF.multiply( this.P,
				      KF.transpose(H),
				      KF.inverse( KF.add( KF.multiply(H, P, KF.transpose(H)), 
							  R 
							)
						)
				    );
		
		
		// compute a posteriori
		// x = x + k(z - Hx)
		
		this.x = KF.add( this.x, 
				 KF.multiply( this.k,
					     KF.subtract(z, KF.multiply(this.H, this.x))
					   )
			       )	
		
		// P = (I - kH)P
		
		return {
			"state": this.x,
			"covariance": this.P
		};
	}
	
};
