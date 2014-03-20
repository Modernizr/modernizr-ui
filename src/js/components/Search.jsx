/**
 * @jsx React.DOM
 */

var React = require('react');
var Events = require('../events');
var ResultActions = require('../actions/ResultActions');

var Search = React.createClass({
	handleFocus: function(event) {
		// this.props.onSearchFocus(event);
	},
	handleBlur: function(event) {
		// this.props.onSearchBlur(event);
	},
	render: function() {
		return (
			<div className="search">
				<input ref="input" type="text" autoFocus onChange={this._onInputChange} className="search__input t_search-label" placeholder="Type a browser feature" onFocus={this.handleFocus} onBlur={this.handleBlur} />
			</div>
		);
	},
	_onInputChange: function(event) {
		// Events.publish('mod/ui/searchValueChanged',  event.target.value);
		// this.props.onSearchChange(event);
		ResultActions.search(event.target.value);
	},
});

module.exports = Search;