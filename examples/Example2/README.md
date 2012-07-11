Example 2
=========

#### Kalman Filter ####

Case when input exists.

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
