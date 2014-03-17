/**
 * @jsx React.DOM
 */

var React = require('react');
var Events = require('../events');

var Search = React.createClass({
	getDefaultProps: function() {
		return {
			searchValue: ''
		};
	},
	handleChange: function(event) {
		Events.publish('mod/ui/searchValueChanged',  event.target.value);
		this.props.onSearchChange(event);
	},
	handleFocus: function(event) {
		this.props.onSearchFocus(event);
	},
	handleBlur: function(event) {
		this.props.onSearchBlur(event);
	},
	render: function() {
		return (
			<div className="search">
				<input value={this.props.searchValue} ref="input" type="text" autoFocus onChange={this.handleChange} className="search__input t_search-label" placeholder="Type a browser feature" onFocus={this.handleFocus} onBlur={this.handleBlur} />
			</div>
		);
	}
});

module.exports = Search;