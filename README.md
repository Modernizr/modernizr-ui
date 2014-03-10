# Modernizr UI

## Getting started

1. Ensure you have all the prerequisites installed
	+ `npm install -g webpack`
	+ `npm install -g bower`

2. Load the dependencies into your project
	+ `npm install && bower install`

3. Start the task runners (NOTE: Webpack does not use Grunt task at the moment, due to speed)
	+ `grunt watch`
	+ `npm start`

4. Load an HTTP server of your choice
	+ e.g. `npm install -g http-server && http-server'

## Todo

### Features

+ Keyboard navigation
+ Search
+ Toggle all
+ Build integration
+ Show added
+ Extras
+ Build options (Standard, Minified, Grunt, (Bower?))
+ Show file size options
+ Detail population (currently only name, description and authors)
+ Feature detects feed (remove mocked JSON)
+ *Probably loads more, this is just a quick list...*

### Considerations

+ Usability of using the mouse on the detects list
+ Adapting to viewport sizes
+ IE7 support, and how we could progressively enhance to React.js
+ ARIA

### Dev chores

+ Clean up Grunt; try and get webpack integrated + static server
+ Use Webpack for CSS, compartmentalising to match React components
+ Consider removing `build` in favour of Webpack's in-memory dev build; and create a `dist` folder for production
+ Find somewhere to put logo.svg and other graphics (webpack depedency?)
+ Clean up package.json