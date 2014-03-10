/**
 * @jsx React.DOM
 */

var React = require('react');

var Search = React.createClass({
	render: function() {
		return (
			<div className="search">
				<div className="search__label t_search-label">Type a browser feature</div>
			</div>
		);
	}
});

module.exports = Search;