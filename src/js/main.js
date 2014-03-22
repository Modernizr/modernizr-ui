require("../../bower_components/normalize.css/normalize.css");
require("../css/main.scss");

var React = require('react');
var App = require('./components/App.jsx');

React.renderComponent(App(), document.getElementById('app-container'));

$(function() {
	$('html').css({
		fontSize: $(window).width() / 20 + '%'
	});
	$(window).on('resize', function() {
		$('html').css({
			fontSize: $(window).width() / 20 + '%'
		});
	});
});
