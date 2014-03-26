/**
 * @jsx React.DOM
 */

var React = require('react');

var DetectsPage = React.createClass({

	render: function() {
		var root = React.DOM['div'];
		return (
			<root>
				<div className="Grid Grid--withGutter">
					<div className="Grid-cell u-size7of10">
						<div className="Grid Grid--withGutter">
							<div className="Grid-cell u-size4of14">
								{this.props.side}
							</div>
							<div className="Grid-cell u-size10of14" style={{minHeight: 1}}>
								{this.props.main}
							</div>
						</div>
					</div>
					<div className="Grid-cell u-size3of10">
						{this.props.detail}
					</div>
				</div>
			</root>
		);
	}

});

module.exports = DetectsPage;