/**
 * @jsx React.DOM
 */

var React = require('react');
var ResultActions = require('../actions/ResultActions');

var TypeFilter = React.createClass({
	render: function() {
		return (
			<a href="#" className="build-state-btn hit c_linkbox" onClick={this._onClick}>
				<strong className="build-state-btn__char t_subtitle">{this.props.count}</strong>
				<span className="build-state-btn__suffix t_label">{this.props.name}</span>
			</a>
		);
	},

	_onClick: function(event) {
		event.preventDefault();
		ResultActions.filterByType(this.props.type);
	}
});

module.exports = TypeFilter;
