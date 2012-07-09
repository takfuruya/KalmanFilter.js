REM note: this file must reside in this folder

REM merge all js files together
cd ../src
copy /A "matrix.js" + "KF.js" "../build/KalmanFilter.js"

REM minify merged file using closure-compiler

java -jar ../utils/closure-compiler/compiler.jar KF.js matrix.js --js_output_file ../build/KalmanFilter-compiled.js
pause