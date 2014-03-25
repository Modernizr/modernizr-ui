/**
 * @jsx React.DOM
 */

var React = require('react');
var SelectionActions = require('../actions/SelectionActions');
var ResultActions = require('../actions/ResultActions');
var cx = require('react/lib/cx');

var Result = React.createClass({
	propTypes: {
		result: React.PropTypes.object.isRequired,
		added: React.PropTypes.object,
		current: React.PropTypes.bool
	},

	getDefaultProps: function() {
		return {
			current: false
		};
	},

	getInitialState: function() {
		return {
			isMouseOver: false
		};
	},
	render: function() {
		var root = React.DOM['div'];

		if(this.props.added) console.log('added!')
		return (
			<root onClick={this._onClick} className={cx({Result: true, Box: true, 'is-selected': this.props.current, 'c-selectable': true, 'is-added': this.props.added, 'u-contain': true})}>
				<div onClick={this._onToggleBtnClick} className="Icon Result-icon"></div>
				<div className="t-heading u-textTruncate">{this.props.result.name} {this.props.added && '✔'}</div>
			</root>
		);

		// return (
		// 	<div className={classes} onClick={this._onClick}>
		// 		<span className="result__name">{this.props.result && this.props.result.name} {this.props.added && '✔'}</span>
		// 		<div className="result__add-action c_action add-action t_action" onClick={this._onToggleBtnClick}>
		// 			{this.props.added ? 'Remove' : 'Add'}
		// 		</div>
		// 	</div>
		// );
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
