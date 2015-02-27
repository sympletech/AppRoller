# Sympletech AppRoller #

This project is a starter application to be used for building Web based applications.

## Setup Instructions: ##

- Browse to the  ./grunt dir and run
- npm install
 
## Development Instructions ##

- Browse to the  ./grunt dir and run
- grunt
- A live reload server will be running at **http://localhost:8080**
- Edit Files found in ./www folder

## Adding new JS files to ./www/js/app.js & app-min.js ##

- Open the ./grunt/Gruntfile.js
- Add JS file to the var jsFiles = ["",...] variable at top of the file.
- JS files will be combined in the order listed in array

## CSS is compiled from SCSS

- edit the scss files found in ./www/css/source
- compass will compile them and copy them to the ./www/css

## Include File ##

- Javascript includes are managed in the **./www_src/js/include.js**
- This controls when the .min versions are used
- All js and css files to be used by the app should be set here
- include.js determines current environment (dev / prd)
- _global is created based on environment switch


## Questions, Comments, Credit ##

- Daniel Lewis (dlewis@sympletech.com)