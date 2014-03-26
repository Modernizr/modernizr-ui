/**
 * @jsx React.DOM
 */

var React = require('react');
var SelectionActions = require('../actions/SelectionActions');
var addIcon = require('url?mimetype=image/svg+xml!../../img/add-pink.svg');
var removeIcon = require('url?mimetype=image/svg+xml!../../img/remove-pink.svg');
var cx = require('react/lib/cx');

var ToggleAll = React.createClass({

	render: function() {
		return (
			<div className="Action">
				<a href="#" onClick={this.props.readyToRemove ? this._onRemoveAllClick : this._onAddAllClick} className="u-hit">
					<div className="Action-label">
						<strong className="c-action t-body t-action">{this.props.readyToRemove ? 'Remove' : 'Add'} all</strong>
					</div>
					<div className="Action-icon">
						<div className={cx({'Ring': true, 'Ring--small': true, 'c-actionBorder': true, 'is-moved': this.props.readyToRemove})}>
							<div className="Ring-inner u-contain">
								<img src={addIcon} alt="Toggle" className="u-stretch" />
							</div>
							<div className="Ring-inner u-contain">
								<img src={removeIcon} alt="Toggle" className="u-stretch" />
							</div>
						</div>
					</div>
				</a>
			</div>
		);
	},

	_onRemoveAllClick: function() {
		SelectionActions.remove(this.props.results);
	},


	_onAddAllClick: function() {
		SelectionActions.add(this.props.results);
	}

});

module.exports = ToggleAll;