/**
 * @jsx React.DOM
 */

var React = require('react');
var ResultActions = require('../actions/ResultActions');

var Search = React.createClass({

	componentWillReceiveProps: function(nextProps) {
		// Ensure the search box is focused whenever the search value is removed,
		// ready for searching again.
		if(nextProps.searchValue === '') {
			this.refs.input.getDOMNode().focus();
		}
	},

	render: function() {
		return (
			<div className="search">
				<input ref="input" type="text" value={this.props.searchValue} autoFocus onChange={this._onInputChange} className="search__input t_search-label" placeholder="Type a browser feature" />
			</div>
		);
	},
	_onInputChange: function(event) {
		ResultActions.search(event.target.value);
	},
});

module.exports = Search;