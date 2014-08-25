var React = require('react');
var Router = require('react-router');
var Route = Router.Route;
var Routes = Router.Routes;

var App = require('./components/App.jsx');
var HomePage = require('jsx-loader!./components/HomePage.jsx');
var DetectsPage = require('jsx-loader!./components/DetectsPage.jsx');

var app = Routes(null,
	Route({handler: App},
		Route({name: 'index', path: '/', handler: HomePage}),
		Route({name: 'detects', path: '/detects', handler: DetectsPage})
	)
);

React.renderComponent(app, document.getElementById('app-container'));