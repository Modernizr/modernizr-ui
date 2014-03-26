var React = require('react');
var App = require('./components/App.jsx');

var app = App();

React.renderComponent(app, document.getElementById('app-container'));

// app.setProps({
	// page: 'detects/'
// });