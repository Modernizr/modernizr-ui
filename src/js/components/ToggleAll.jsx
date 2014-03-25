/**
 * @jsx React.DOM
 */

var React = require('react');
var SelectionActions = require('../actions/SelectionActions');
var addIcon = require('url?mimetype=image/svg+xml!../../img/add-alt.svg');

var ToggleAll = React.createClass({

	render: function() {
		return (
			<div className="Action">
				<a href="#" onClick={this.props.readyToRemove ? this._onRemoveAllClick : this._onAddAllClick} className="u-hit">
					<div className="Action-label">
						<strong className="c-action t-body t-action">{this.props.readyToRemove ? 'Remove' : 'Add'} all</strong>
					</div>
					<div className="Action-icon">
						<img className="Icon" src={addIcon} />
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