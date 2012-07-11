Example 3
=========

### Extended Kalman Filter ###

Under construction.

```html
<script>

	var f, h, df_dx, dh_dx, Q, R;
	var x, P;
	var kalmanFilter;
	
	init();
	loop();

	function init() {
		
		// define model
		f = function(x, u) {
			// some nonlinear state transition function
			// returns the next state
			return state;
		};
		h = function(x) {
			// some nonlinear observation function
			return observationVector;
		};
		df_dx = function(x, u) {
			// jacobian of the nonlinear state transition function
			// evaluated around x, u
			return jacobianMatrix;
		};
		dh_dx = function(x) {
			// jacobian of the nonlinear observation function
			// evaluated around x
			return jacobianMatrix;
		};
		Q = [[1, 0], [0, 1]];	// process noise covariance matrix
		R = [[1, 0], [0, 1]];	// measurement noise covariance matrix
		
		// initialize state and its error
		x = [0, 0];		// state vector
		P = [[0, 0], [0, 0]];	// covariance matrix
		
		kalmanFilter = new KF.ExtendedKalmanFilter(f, h, df_dx, dh_dx, Q, R, x, P);
		
		// predict (a priori estimate)
		kalmanFilter.predict();
	}

	function loop() {
		
		var z = measure();
		var u = getInput();
		
		// filter/update (compute a posteriori estimate)
		var o = kalmanFilter.filter();
		
		// use x here
		console.log(o);
		
		// predict
		kalmanFilter.predict();
	}

</script>
```