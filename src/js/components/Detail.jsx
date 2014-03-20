/**
 * @jsx React.DOM
 */

var React = require('react');

var Detail = React.createClass({
	closePanel: function(event) {
		if(this.props.onClose) this.props.onClose(event);
	},
	render: function() {
		var authors = this.props.detect.authors && this.props.detect.authors.join(', ');
		return (
		<div className="detail c_box">
			<a href="#" className="detail__close" onClick={this.closePanel}>CLOSE</a>
			<ul className="tags">
				<li>
					<a href="#" className="t_label c_linkbox">css</a>
				</li><li>
					<a href="#" className="t_label c_linkbox">animation</a>
				</li></ul>
				<h1>{this.props.detect.name}</h1>
				{authors &&
					<p>by {authors}</p>
				}
				{this.props.detect.doc &&
				<div className="desc" dangerouslySetInnerHTML={{__html: this.props.detect.doc}} />
				}
				<h2>Usage</h2>
				<dl className="cf">
				<dt>CSS</dt>
				<dd><code>{'.css-transitions .foo { }'}</code></dd>
				<dt>JS</dt>
				<dd><code>{'if(Modernizr.csstransitions)'}</code></dd>
			</dl>
		</div>
		);
	}

});

module.exports = Detail;

