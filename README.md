KalmanFilter.js
===============

#### JavaScript Kalman Filter Library ####

The aim of this project is to create a Kalman Filter library with a very low level of complexity (that is, easy to use for learners).
The library is planned to support Extended Kalman Filter and Unscented Kalman Filter.

[Examples](http://www.google.com) - [General Kalman Filter Usage Tutorial]() - [Demo]()

### Usage ###

Download the [minified library](http://takfuruya.github.com/KalmanFilter.js/build/KalmanFilter.js) and include it in your html.
Also include [sylvester](http://sylvester.jcoglan.com/), a JavaScript matrix library, **before** KalmanFilter.js (required).

```html
<script src="js/sylvester.js"></script>
<script src="js/KalmanFilter.js"></script>
```

The code below computes Kalman filter for constant velocity trajectory model (in one dimension) with a random walk velocity of standard deviation 0.2.
Every 0.5 sec, position is measured with error of standard deviation 0.3.
It outputs a posteriori (filtered/updated) state estimate and its covariance matrix (its error).

```html
<script>

	var A, B, H, Q, R;
	var x, P;
	var kalmanFilter;
	var t = 0.5;	// time step (sec)
	
	init();
	setInterval(loop, t*1000);
	
	function init() {
		
		/* --- define model ---
		
			x = Ax + w
			z = Hz + v
		*/
		
		// state transition matrix
		A = $M([
			[1, t], 
			[0, 1]
		]);
		
		// observation matrix
		H = $M([
			[1, 0]
		]);
		
		// process noise covariance matrix
		Q = $M([
			[0.4, 0],
			[0,   0]
		]);
		
		// measurement noise covariance matrix
		R = $M([
			[0.9, 0],
			[0,   0]
		]);
		
		
		/* --- initialize state and its error ---
		*/
		
		// state vector (position & velocity)
		x = $M([
			[0],
			[0]
		);
		
		// covariance matrix
		P = $M([
			[0, 0],
			[0, 0]
		]);
		
		
		kalmanFilter = new KF.KalmanFilter(A, H, Q, R, x, P);
		
		// predict (compute a priori estimate)
		kalmanFilter.predict();
	}

	function loop() {
		
		var z = measure();
		
		// filter/update (compute a posteriori estimate)
		var o = kalmanFilter.filter();
		
		/* --- use state vector here ---
			ex:	o.state		state vector
				o.covariance	its covariance matrix
		*/
		console.log(o);
		
		// predict (compute a priori estimate)
		kalmanFilter.predict(z);
	}

</script>
```

### Usage 2 (with input matrix) ###

```html
<script>

	var A, B, H, Q, R;
	var x, P;
	var kalmanFilter;
	
	init();
	loop();

	function init() {
		
		/* --- define model ---
		
			x = Ax + Bu + w
			z = Hz + v
		*/
		
		// state transition matrix
		A = $M([
			[3, 0], 
			[3, 4]
		]);
		
		// input matrix
		B = $M([
			[0, 0],
			[0, 0]
		]);
		
		// observation matrix
		H = $M([
			[1, 0],
			[0, 1]
		]);
		
		// process noise covariance matrix
		Q = $M([
			[1, 0],
			[0, 1]
		]);
		
		// measurement noise covariance matrix
		R = $M([
			[1, 0],
			[0, 1]
		]);
		
		
		/* --- initialize state and its error ---
		*/
		
		// state vector
		x = $M([0, 0]);
		
		// covariance matrix
		P = $M([
			[0, 0],
			[0, 0]
		]);
		
		
		kalmanFilter = new KF.KalmanFilter(A, B, H, Q, R, x, P);
		
		// predict (compute a priori estimate)
		kalmanFilter.predict();
	}

	function loop() {
		
		var z = measure();
		var u = getInput();
		
		// compute a posteriori estimate (update)
		var o = kalmanFilter.filter(u);
		
		console.log(o);
		
		// compute a priori estimate
		kalmanFilter.predict(z);
	}

</script>
```


### Usage 3 (Extended Kalman Filter) ###

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

### Usage 4 (Unscented Kalman Filter) ###

Under construction

### MIT License ###

Copyright (C) 2012 Takashi Furuya

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.