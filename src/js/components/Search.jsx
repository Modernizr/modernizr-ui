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
			<input type="text" className="t-heading t-instruction BrowserHeader-input" value={this.props.searchValue} onChange={this._onInputChange} placeholder="Type a browser feature" ref="input" />
		);
	},

	_onInputChange: function(event) {
		ResultActions.search(event.target.value);
	},
});

module.exports = Search;