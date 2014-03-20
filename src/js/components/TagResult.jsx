/**
 * @jsx React.DOM
 */

var React = require('react');

var Result = React.createClass({
	render: function() {
		var classes = 'result';
		if(this.props.current) classes += ' is-focused';
		return (
			<div className={classes}>
				<span className="result__name">
					{this.props.tag && this.props.tag.name}
				</span>
			</div>
		);
	}

});

module.exports = Result;
