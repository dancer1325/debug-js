# Goal
* comprehend "debug"

# How hast it been created?
* `npm init -y`
* `npm install debug`

# How to run?
* `npm run app` / `npm run worker`
  * ❌NO DEBUG displayed ❌ 
* if you want to enable it -> 
  * `DEBUG=http npm run app`
  * `DEBUG=worker:* npm run worker`
  * `DEBUG=worker:a npm run worker`
  * `DEBUG=* npm run extendDebugger`
* | browser, "http://localhost:3000/"

# Notes
* "customFormatters.js"
  * add support | rendering a Buffer -- as -- hex
