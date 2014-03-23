/**
 * @jsx React.DOM
 */

var React = require('react');
var SelectionActions = require('../actions/SelectionActions');
var ResultActions = require('../actions/ResultActions');

var Result = React.createClass({
	getInitialState: function() {
		return {
			isMouseOver: false
		};
	},
	render: function() {
		var classes = 'result';
		if(this.props.current) classes += ' is-focused';
		if(this.props.added) classes += ' is-added';
		return (
			<div className={classes} onClick={this._onClick}>
				<span className="result__name">{this.props.result && this.props.result.name} {this.props.added && '✔'}</span>
				<div className="result__add-action c_action add-action t_action" onClick={this._onToggleBtnClick}>
					{this.props.added ? 'Remove' : 'Add'}
				</div>
			</div>
		);
	},

	_onClick: function() {
		if(this.props.current) {
			this._toggle();
		} else {
			ResultActions.focus(this.props.result.cid);
		}
	},

	_onToggleBtnClick: function() {
		event.stopPropagation();
		this._toggle();
	},

	_toggle: function() {
		if(this.props.added) {
			SelectionActions.remove(this.props.result.cid);
		}
		else {
			SelectionActions.add(this.props.result);
		}
	}
});

module.exports = Result;
