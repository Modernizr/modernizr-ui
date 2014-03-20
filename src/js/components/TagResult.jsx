/**
 * @jsx React.DOM
 */

var React = require('react');
var FetchingMixin = require('../mixins/fetching');
var Events = require('../events');

var Result = React.createClass({
	getInitialState: function() {
		return {
			// tag: null
		};
	},
	fetchData: function() {
		// noop — data is set from parent component
		// but fetchData function is required by FetchingMixin
	},
	componentDidMount: function() {
		// Events.subscribe('mod/ui/currentDetectToggled', this.toggleIfCurrent);
	},
	toggleIfCurrent: function() {
		// if(this.props.detect && this.props.currentDetect && this.props.detect.cid === this.props.currentDetect.cid) {
		// 	this.toggleDetect();
		// 	return true;
		// }
		// else {
		// 	return false;
		// }
	},
	handleClick: function(event) {
		debugger;
		// var toggled = this.toggleIfCurrent();
		// if(!toggled) {
		// 	this.props.onClick(this.props.detect);
		// }
	},
	handleAddClick: function(event) {
		// event.stopPropagation();
		// this.toggleDetect();
	},
	toggleDetect: function() {
		// this.props.detect.set('added', !this.props.detect.get('added'));
		// Force a render of this component...
		// TODO — we need to find a better way of doing this, in case the model appears elsewhere
		// this.setState({
		// 	detect: this.props.detect
		// });
	},
	render: function() {
		var classes = 'result';
		var isCurrent = this.props.tag && this.props.currentDetect && this.props.tag.cid === this.props.currentDetect.cid;
		if(isCurrent) classes += ' is-focused';
		// if(this.props.detect && this.props.detect.get('added')) classes += ' is-added';

		return (
		<div className={classes} onClick={this.handleClick}>
			<span className="result__name">
				{this.props.tag && this.props.tag.get('name')}
			</span>
		</div>
		);
	}

});

module.exports = Result;
