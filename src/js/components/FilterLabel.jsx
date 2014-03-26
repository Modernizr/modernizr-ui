/**
 * @jsx React.DOM
 */

var React = require('react');
var ResultActions = require('../actions/ResultActions');

var FilterLabel = React.createClass({

	render: function() {
		return (
			<div className="Box Box--minor c-filter u-gutterLipLeft u-gutterPadLeft">
				<div className="Bar">
					<div className="Bar-item">
						<span className="t-label">{this.props.tag.name}</span>
					</div>
					<div className="Bar-item u-textRight">
						<div className="Icon" onClick={this._onClick} style={{background: '#000'}} />
					</div>
				</div>
			</div>
		);
	},

	_onClick: function() {
		ResultActions.blur();
	}

});

module.exports = FilterLabel;