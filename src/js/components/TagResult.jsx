/**
 * @jsx React.DOM
 */

var React = require('react');
var ResultActions = require('../actions/ResultActions');

var Result = React.createClass({
	render: function() {
		var classes = 'result';
		if(this.props.current) classes += ' is-focused';
		return (
			<div className={classes} onClick={this._onClick}>
				<span className="result__name">
					{this.props.tag && this.props.tag.name}
				</span>
			</div>
		);
	},

	_onClick: function(event) {
		event.preventDefault();
		ResultActions.filterByTag(this.props.tag.cid);
	}
});

module.exports = Result;
