/**
 * @jsx React.DOM
 */

var React = require('react');
var FetchingMixin = require('../mixins/fetching');

var Result = React.createClass({
	// mixins: [FetchingMixin],
	// modelState: ['detect'],
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
		// Already current, so add it
		if(this.props.detect && this.props.currentDetect && this.props.detect.cid === this.props.currentDetect.cid) {
			this.props.detect.set('added', !this.props.detect.get('added'));
			// Force a render of this component...
			// TODO — we need to find a better way of doing this, in case the model appears elsewhere
			this.setState({
				detect: this.props.detect
			});
		}
		// Make it current
		else {
			this.props.onClick(this.props.detect);
		}
	},
	render: function() {
		var classes = 'result';
		var isCurrent = this.props.detect && this.props.currentDetect && this.props.detect.cid === this.props.currentDetect.cid;
		if(isCurrent) classes += ' is-focused';
		if(this.props.detect && this.props.detect.get('added')) classes += ' is-added';
		console.log('added?',this.props.detect && this.props.detect.get('added'));
		console.log('detect', this.props.detect);
		return (
		<div className={classes} onClick={this.handleClick}>
			{this.props.detect && this.props.detect.get('name')}
			{isCurrent &&
			<div className="result__add-action c_action add-action t_action">
				{this.props.detect.get('added') ? 'Remove' : 'Add'}
			</div>
			}
		</div>
		);
	}

});

module.exports = Result;
