/**
 * @jsx React.DOM
 */

var React = require('react');
var ResultActions = require('../actions/ResultActions');
var cx = require('react/lib/cx');

var Result = React.createClass({
	propTypes: {
		result: React.PropTypes.object.isRequired,
		current: React.PropTypes.bool
	},

	render: function() {
		var root = React.DOM['div'];
		return (
			<root onClick={this._onClick} className={cx({Result: true, Box: true, 'is-selected': this.props.current, 'c-selectable': true, 'u-contain': true})}>
				<div onClick={this._onToggleBtnClick} className="Icon Result-icon"></div>
				<div className="t-heading u-textTruncate">{this.props.result.name}</div>
			</root>
		);
	},

	_onClick: function(event) {
		event.preventDefault();
		ResultActions.filterByTag(this.props.result.cid);
	}
});

module.exports = Result;
