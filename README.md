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

## ASP.NET API ##

**Exploring the Framework**

You can run the application and will see there are a few example routes started to get you up and going.
To see where these routes are defined open the Routes.cs file in the root directory of the application.

**Understanding a Route**

A route is a definition of an endpoint in your api where your application can may a query and interact with your api service.  The route can respond on any on the four http verbs (GET, POST, PUT, DELETE) or and be configured to respond to a request coming in on any Verb (ENDPOINT).

The verbs are expressed in the routing table like this:

            Get["/GetExample"] = ctx =>
            {
                return new ApiResponse
                {
                    Success = true,
                    Data = "I Only Respond To a Http Get"
                };
            };

The above code creates an endpoint at http://www.example.com/myapplication/GetExample that will return a JSON serialized object following the predefined class called ApiResponse.

The Data property of the APIResponse is where you want to place your payload.  You can place any Serializabl .Net object on this property and it will be converted to JSON in the response.

The idea is that your routing table will simply act as a switching station to call classes you define in your application that respond with pieces of useful data for your API.

**Reading Params Passed in a Form Post**

In the same manner data can be passed in on a form post.  To read Form Variables passed to a post you would use do the following:

            Post["/PostExample"] = ctx =>
            {
                var name = ctx.PostData["Name"];

                return new ApiResponse
                {
                    Success = true,
                    Data = "Hello " + name
                };
            }; 

Notice the Verb changed to Post since we are now consuming data passed in by a form.  It’s important to note if you try and access http://www.example.com/myapplication/PostExample using your browser you will not receive a response as that request is coming in via GET.

**Binding Requests**

An easy way to take data in from a client is to bind it to a model in the API.  For example lets say your processing a login request.  As opposed to reading in ctx.PostData["username"] and ctx.PostData["Password"] you can create a model (or class) in your application like this:

    public class LoginRequestModel
    {
        public string Username { get; set; }
        public string Password { get; set; }
        public bool RememberMe { get; set; }
    }

And then bind the posed data to this model like this:

            Post["/Login"] = ctx =>
            {
                var request = this.Bind<LoginRequestModel>(ctx.PostData);
                var response = AccountWorker.LogInUser(request);

                return response;
            };

**Binding JSON objects in the Request**

In some cases it makes more sense to send composed JSON object to your endpoint.  To accomplish this compose your JSON object on the client and send it to your endpoint on a param named “Payload”.  Then to deserialize it use the following syntax:

    var product = this.BindJson<ProductModel>(ctx.PostData);

## Technology Included ##

**Front End Web**

- AngularJS v1.2.28 [http://angularjs.org](http://angularjs.org)
- angular-ie7-support [https://github.com/johngeorgewright/angular-ie7-support](https://github.com/johngeorgewright/angular-ie7-support)
- jquery-1.11.2 [http://jquery.com/](http://jquery.com/)
- jquery.cookie [https://github.com/carhartl/jquery-cookie](https://github.com/carhartl/jquery-cookie)
- lodash.2.4.1 [https://lodash.com/](https://lodash.com/)
- Semantic-UI-1.10.3 [http://semantic-ui.com/](http://semantic-ui.com/)
- modernizr [http://modernizr.com/](http://modernizr.com/)

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
- grunt-contrib-sass 0.9.2 [https://github.com/gruntjs/grunt-contrib-sass](https://github.com/gruntjs/grunt-contrib-sass)
- grunt-contrib-uglify 0.6.0 [https://github.com/gruntjs/grunt-contrib-uglify](https://github.com/gruntjs/grunt-contrib-uglify)
- grunt-contrib-watch 0.5.3 [https://github.com/gruntjs/grunt-contrib-watch](https://github.com/gruntjs/grunt-contrib-watch)
- load-grunt-tasks 0.2.0 [https://github.com/sindresorhus/load-grunt-tasks](https://github.com/sindresorhus/load-grunt-tasks)
- grunt-contrib-clean 0.6.0 [https://github.com/gruntjs/grunt-contrib-clean](https://github.com/gruntjs/grunt-contrib-clean)
- grunt-contrib-copy 0.8.0 [https://github.com/gruntjs/grunt-contrib-copy](https://github.com/gruntjs/grunt-contrib-copy)
- grunt-banner 0.3.1 [https://github.com/mattstyles/grunt-banner](https://github.com/mattstyles/grunt-banner)

**SCSS Compiler**

- Ruby [https://www.ruby-lang.org/en/downloads/](https://www.ruby-lang.org/en/downloads/)
- Compass [http://compass-style.org/install/](http://compass-style.org/install/)


## Questions, Comments, Credit ##

- Daniel Lewis (dlewis@sympletech.com)