/**
 * @jsx React.DOM
 */

var React = require('react');
var SelectionActions = require('../actions/SelectionActions');
var ResultActions = require('../actions/ResultActions');
var cx = require('react/lib/cx');
var addIcon = require('url?mimetype=image/svg+xml!../../img/add.svg');
var acceptIcon = require('url?mimetype=image/svg+xml!../../img/accept.svg');

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
		return (
			<root onClick={this._onClick} className={cx({Result: true, Box: true, 'is-selected': this.props.current, 'c-selectable': true, 'is-added': this.props.added, 'u-contain': true})}>
				<div onClick={this._onToggleBtnClick} className={cx({'Result-icon': true, 'Ring': true, 'is-moved': this.props.added, 't-label': true, 'c-added': this.props.added})}>
					<div className="Ring-inner">
						<img src={addIcon} alt="Add" className="u-stretch" />
					</div>
					<div className="Ring-inner">
						<img src={acceptIcon} alt="Remove"  className="u-stretch" />
					</div>
				</div>
				<div className="t-heading u-textTruncate">{this.props.result.name}</div>
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

	_onToggleBtnClick: function(event) {
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
