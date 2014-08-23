# Modernizr UI

## To do

Any active issues go through GitHub Issues. We're not adding everything upfront; instead, focusing by priority.

Any archived issues, or unassigned issues remain in the [Trello board](https://trello.com/b/JNSnhIuf/modernizr-com).

## Getting started

1. Ensure you have all the prerequisites installed
	+ `npm install -g webpack`
	+ `npm install -g bower`
	+ `npm install -g grunt-cli`

2. Load the dependencies into your project
	+ `npm install && bower install`

3. Start the task runner
	+ `grunt` for webpack-dev-server
	+ `grunt watch` for sass
	+ `docpad run` for html

4. Go to: `http://localhost:8080/webpack-dev-server/`


## Deploy

1. Use the following Grunt task to clear the build folder and generate the files with Docpad
	+ `grunt dist`

2. (Temporary step) Remove the leading `/./` for the style and script tags, generated in `dist/index.html`

3. Deploy to Github Pages with
	+ `grunt gh-pages`

## Terminology

*Work in process. Please contribute.*

This is the terminology we're using for the new interface:

- 'Builder UI' - this appears when you click 'Start' from the homepage, and is used to create a custom download.
- 'Builder Process' - the script that needs to run in order to create a custom download
- 'Selection' - whatever the user has selected for their custom download
- 'Detects' - the main set of core and contributed browser tests
- 'Meta data' - a dictionary of detects, parsed from the original Modernizr repo. Essentially a list of detects, with attached tags and types.
- 'Tags' - organised categories, e.g. 'svg', powered by docblocks
- 'Results' - the items that appear in the main list of the builder