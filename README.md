# Modernizr UI

## To do

See the [Trello board](https://trello.com/b/JNSnhIuf/modernizr-com)

## Getting started

1. Ensure you have all the prerequisites installed
	+ `npm install -g webpack`
	+ `npm install -g bower`

2. Load the dependencies into your project
	+ `npm install && bower install`

3. Start the task runner
	+ `grunt` for webpack-dev-server
	+ `grunt watch` for sass
	+ `docpad run` for html

4. Go to: `http://localhost:8080/webpack-dev-server/dist`


## Deploy

1. Use the following Grunt task to clear the build folder and generate the files with Docpad
	+ `grunt dist`

2. Deploy to Github Pages with
	+ `grunt gh-pages`