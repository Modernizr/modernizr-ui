require("../../bower_components/normalize.css/normalize.css");
require("../css/main.scss");
var App = require('./components/App.jsx');

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