@REM The terminal should run as admin before trying to build, in order to avoid different issue with right management
powershell -Command "npm install"
powershell -Command "Start-Process .\mvnw"
powershell -Command "Start-Sleep 10"
powershell -Command "Start-Process npm start"