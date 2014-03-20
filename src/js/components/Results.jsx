/**
 * @jsx React.DOM
 */

var React = require('react');
var Result = require('./Result.jsx');
var TagResult = require('./TagResult.jsx');
var Detects = require('../Detects');

var Results = React.createClass({
	render: function() {
		return (
			<div className="results">
				{this.props.results.map(function(result) {
					var isDetect = result.property; // TODO :: Have a better point of call for this
					var current = this.props.currentResult && this.props.currentResult.cid === result.cid;
					if(isDetect) {
						var added = this.props.selection && this.props.selection[result.cid];
						return <Result detect={result} current={current} added={added} />
					}
					else {
						// return <TagResult tag={result} currentDetect={null} />
					}
				}.bind(this))}
			</div>
		);
	}
});

module.exports = Results;