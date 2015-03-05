# Sympletech AppRoller #

This project is a starter application to be used for building Web based applications.

## Setup Instructions: ##

- Install Ruby [https://www.ruby-lang.org/en/downloads/](https://www.ruby-lang.org/en/downloads/) (Needed to compile SCSS)
- Install Compass [http://compass-style.org/install/](http://compass-style.org/install/) (Needed to compile SCSS)
- Browse to the  ./grunt dir and run
- npm install
 
## Development Instructions ##

- Browse to the  ./grunt dir and run
- grunt
- Two Pages should open in your default browser
	-  **http://localhost:8080** - Displaying the Application
	-  **http://localhost:8081** - Displaying the Test Runner
- Both pages will reload automatically each time any code in the application is changed
- Perform Application development in the /www folder
- Write unit tests in the /tests/spec folder

## Adding new JS files to ./www/js/app.js & app-min.js ##

- All js files in the application should be compiled into a single file.  To add or remove files from the build:
- Open the ./grunt/Gruntfile.js
- Add JS file to the var jsFiles = ["",...] variable at top of the file.
- JS files will be combined in the order listed in array

## CSS is compiled from SCSS

- edit the scss files found in ./www/css/source
- compass will compile them and copy them to the ./www/css

## Include File ##

- JavaScript includes are managed in the **./www_src/js/include.js**
- This controls when the .min versions are used
- All js and css files to be used by the app should be set here
- include.js determines current environment (dev / prd)
- _global is created based on environment switch

## Technology Included ##

**Front End Web**

- AngularJS v1.2.28 [http://angularjs.org](http://angularjs.org)
- angular-ie7-support [https://github.com/johngeorgewright/angular-ie7-support](https://github.com/johngeorgewright/angular-ie7-support)
- jquery-1.11.2 [http://jquery.com/](http://jquery.com/)
- jquery.cookie [https://github.com/carhartl/jquery-cookie](https://github.com/carhartl/jquery-cookie)
- lodash.2.4.1 [https://lodash.com/](https://lodash.com/)
- Semantic-UI-1.10.3 [http://semantic-ui.com/](http://semantic-ui.com/)

**Front End Testing**

- qunit-1.17.1 [http://qunitjs.com/](http://qunitjs.com/)
- sinon-1.7.3 [http://sinonjs.org/download/](http://sinonjs.org/download/)
- blanket v1.1.5 [http://blanketjs.org/](http://blanketjs.org/)

**ASP.NET API**

- elmah.1.2.2 [https://www.nuget.org/packages/elmah/](https://www.nuget.org/packages/elmah/)
- Nancy.1.1 [http://nancyfx.org/](http://nancyfx.org/)
- Json.NET [http://www.newtonsoft.com/json](http://www.newtonsoft.com/json)

**ASP.NET Test Project**


- NUnit [http://www.nunit.org/](http://www.nunit.org/)
- Approval Tests [http://approvaltests.sourceforge.net/](http://approvaltests.sourceforge.net/)

**Grunt Build**

- grunt 0.4.2 [http://gruntjs.com/](http://gruntjs.com/)
- grunt-contrib-connect 0.9.0 [https://github.com/gruntjs/grunt-contrib-connect](https://github.com/gruntjs/grunt-contrib-connect)
- grunt-contrib-compass 0.7.0 [https://github.com/gruntjs/grunt-contrib-compass](https://github.com/gruntjs/grunt-contrib-compass)
- grunt-contrib-uglify 0.6.0 [https://github.com/gruntjs/grunt-contrib-uglify](https://github.com/gruntjs/grunt-contrib-uglify)
- grunt-contrib-watch 0.5.3 [https://github.com/gruntjs/grunt-contrib-watch](https://github.com/gruntjs/grunt-contrib-watch)
- load-grunt-tasks 0.2.0 [https://github.com/sindresorhus/load-grunt-tasks](https://github.com/sindresorhus/load-grunt-tasks)
- grunt-contrib-clean 0.6.0 [https://github.com/gruntjs/grunt-contrib-clean](https://github.com/gruntjs/grunt-contrib-clean)
- grunt-contrib-copy 0.8.0 [https://github.com/gruntjs/grunt-contrib-copy](https://github.com/gruntjs/grunt-contrib-copy)

**SCSS Compiler**

- Ruby [https://www.ruby-lang.org/en/downloads/](https://www.ruby-lang.org/en/downloads/)
- Compass [http://compass-style.org/install/](http://compass-style.org/install/)


## Questions, Comments, Credit ##

- Daniel Lewis (dlewis@sympletech.com)