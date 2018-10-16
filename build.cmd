@REM The terminal should run as admin before trying to build, in order to avoid different issue with right management
powershell -Command "Start-Process .\mvnw | Start-Process npm start"