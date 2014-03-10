/**
 * @jsx React.DOM
 */

var React = require('react');
var Result = require('./Result.jsx');

var Results = React.createClass({
	render: function() {
		return (
			<div className="results">
				{this.props.detects.map(function(detect) {
					return <Result detect={detect} />
				})}
			</div>
		);
	}
});

module.exports = Results;