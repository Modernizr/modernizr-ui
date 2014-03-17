/**
 * @jsx React.DOM
 */

var React = require('react');
var Events = require('../events');

var Search = React.createClass({
	handleChange: function(event) {
		Events.publish('mod/ui/searchValueChanged',  event.target.value);
	},
	render: function() {
		return (
			<div className="search">
				<input type="text" onChange={this.handleChange} className="search__input t_search-label" placeholder="Type a browser feature" />
			</div>
		);
	}
});

module.exports = Search;