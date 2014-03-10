/**
 * @jsx React.DOM
 */

var React = require('react');
var FetchingMixin = require('../mixins/fetching');

var Result = React.createClass({
	mixins: [FetchingMixin],
	modelState: ['detect'],
	getInitialState: function() {
		return {
			detect: null,
			isMouseOver: false
		};
	},
	fetchData: function() {
		// noop — data is set from parent component
		// but fetchData function is required by FetchingMixin
	},
	handleClick: function(event) {
		this.props.detect.set('active', !this.props.detect.get('active'));
	},
	handleMouseOver: function() {
		this.setState({
			isMouseOver: true
		});
	},
	handleMouseOut: function() {
		this.setState({
			isMouseOver: false
		});
	},
	render: function() {
		var classes = 'result';
		if(this.state.isMouseOver) classes += ' is-focused';
		if(this.props.detect.get('active')) classes += ' is-added';
		return (
		<div className={classes} onClick={this.handleClick} onMouseOver={this.handleMouseOver} onMouseOut={this.handleMouseOut}>
			{this.props.detect.get('name')}
			{this.state.isMouseOver &&
			<div className="result__add-action c_action add-action t_action">
				{this.props.detect.get('active') ? 'Remove' : 'Add'}
			</div>
			}
		</div>
		);
	}

});

module.exports = Result;
