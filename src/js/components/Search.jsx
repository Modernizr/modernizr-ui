/**
 * @jsx React.DOM
 */

var React = require('react');
var ResultActions = require('../actions/ResultActions');

var Search = React.createClass({

	componentWillReceiveProps: function(nextProps) {
		// Ensure the search box is focused whenever the search value is removed,
		// ready for searching again.
		if(nextProps.searchValue === '' && nextProps.searchValue !== this.props.searchValue) {
			this.refs.input.getDOMNode().focus();
		}
	},

	render: function() {
		return (
			<input ref="input" type="text" value={this.props.searchValue} autoFocus onChange={this._onInputChange} className="SearchBar t-heading t-instruction" placeholder="Type a browser feature" />
		);
	},
	_onInputChange: function(event) {
		ResultActions.search(event.target.value);
	},
});

module.exports = Search;