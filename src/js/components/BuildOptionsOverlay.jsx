/**
 * @jsx React.DOM
 */

var React = require('react');
var LayeredComponentMixin = require('../mixins/LayeredComponentMixin');

var BuildOptionsOverlay = React.createClass({

	mixins: [
		LayeredComponentMixin
	],

	renderLayer: function() {
		return (
			<div className="Overlay" onClick={this.props.onClick}>
				<div className="Overlay-inner">
					<div className="Overlay-content" style={{pointerEvents: 'none'}}>
						<div className="Overlay-contentInner" onClick={this._onContentClick}>
							<div className="BoxSet" style={{pointerEvents: 'auto'}}>
								<div className="BoxSet-item c-base">
									<div className="Box t-body" style={{overflow: 'hidden'}}>
										<div style={{'float': 'left'}}>Unminfied</div>
										<div style={{'float': 'right'}}>(<a className="c-action" href="#">Download</a> | <a className="c-action" href="#">Copy to clipboard</a>)</div>
									</div>
								</div>
								<div className="BoxSet-item c-base">
									<div className="Box t-body" style={{overflow: 'hidden'}}>
										<div style={{'float': 'left'}}>Minified</div>
										<div style={{'float': 'right'}}>(<a className="c-action" href="#">Download</a> | <a className="c-action" href="#">Copy to clipboard</a>)</div>
									</div>
								</div>
								<div className="BoxSet-item c-base">
									<div className="Box t-body" style={{overflow: 'hidden'}}>
										<div style={{'float': 'left'}}>Grunt configuration</div>
										<div style={{'float': 'right'}}>(<a className="c-action" href="#">Download</a> | <a className="c-action" href="#">Copy to clipboard</a>)</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	},

	_onContentClick: function(event) {
		event.stopPropagation();
	},

	render: function() {
		return (<span />);
	}
});

module.exports = BuildOptionsOverlay;