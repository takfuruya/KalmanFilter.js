KalmanFilter.js
===============

#### JavaScript Kalman Filter Library ####

The aim of this project is to create a Kalman Filter library with a very low level of complexity (that is, easy to use for beginners).
The library is planned to support Extended Kalman Filter and Unscented Kalman Filter.

[Examples](http://www.google.com) - [General Kalman Filter Usage Tutorial]() - [Demo]()

### Usage ###

Download the [minified library](http://takfuruya.github.com/KalmanFilter.js/build/KalmanFilter.js) and include it in your html.

```html
<script src="js/KalmanFilter.js"></script>
```

This code outputs a posteriori (filtered/updated) state estimate and its covariance matrix (its error).

```html
<script>

	var A, B, H, Q, R;
	var x, P;
	var kalmanFilter;
	
	init();
	loop();

	function init() {
		
		// define model
		A = [[3, 0], [3, 4]];	// state transition matrix
		B = [[0, 0], [0, 0]];	// input matrix
		H = [[1, 0], [0, 1]];	// observation matrix
		Q = [[1, 0], [0, 1]];	// process noise covariance matrix
		R = [[1, 0], [0, 1]];	// measurement noise covariance matrix
		
		// initialize state and its error
		x = [0, 0];		// state vector
		P = [[0, 0], [0, 0]];	// covariance matrix
		
		kalmanFilter = new KF.KalmanFilter(A, B, H, Q, R, x, P);
		
		// predict/update (compute a priori estimate)
		kalmanFilter.predict();
	}

	function loop() {
		
		var z = measure();
		var u = getInput();
		
		// filter/update (compute a posteriori estimate)
		var o = kalmanFilter.filter();
		
		// use x here
		console.log(o);
		
		// predict (compute a priori estimate)
		kalmanFilter.predict();
	}

</script>
```

### Usage 2 (Extended Kalman Filter) ###

This code is the same as the one above except it uses extended Kalman filter.

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

### Usage 3 (Unscented Kalman Filter) ###

Under construction