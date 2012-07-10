REM note: this file must reside in this folder

REM merge all js files together
cd ../src
copy /a "KF.js" + "EKF.js" "../build/KalmanFilter.js"

REM minify merged file using closure-compiler

java -jar ../utils/closure-compiler/compiler.jar KF.js EKF.js --js_output_file ../build/KalmanFilter-compiled.js > ../build/compile-error.txt