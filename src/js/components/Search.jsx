/**
 * @jsx React.DOM
 */

var React = require('react');
var ResultActions = require('../actions/ResultActions');

var Search = React.createClass({
	render: function() {
		return (
			<div className="search">
				<input type="text" autoFocus onChange={this._onInputChange} className="search__input t_search-label" placeholder="Type a browser feature" />
			</div>
		);
	},
	_onInputChange: function(event) {
		ResultActions.search(event.target.value);
	},
});

module.exports = Search;