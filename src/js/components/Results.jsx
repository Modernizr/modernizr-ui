/**
 * @jsx React.DOM
 */

var React = require('react');
var Result = require('./Result.jsx');

var Results = React.createClass({
	handleClick: function(detect) {
		this.props.onCurrentDetectChange(detect);
	},
	render: function() {
		return (
			<div className="results">
				{this.props.detects.map(function(detect) {
					return <Result detect={detect} onClick={this.handleClick} currentDetect={this.props.currentDetect} />
				}.bind(this))}
			</div>
		);
	}
});

module.exports = Results;