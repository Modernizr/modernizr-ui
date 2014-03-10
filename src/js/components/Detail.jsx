/**
 * @jsx React.DOM
 */

var React = require('react');

var Detail = React.createClass({

	render: function() {
		return (
		<div className="detail c_box">
			<ul className="tags">
				<li>
					<a href="#" className="t_label c_linkbox">css</a>
				</li><li>
					<a href="#" className="t_label c_linkbox">animation</a>
				</li></ul>
				<h1>CSS transitions</h1>
				<p>by Joe Critchley</p>
				<p className="desc">Detects support for the `window.registerProtocolHandler()` API to allow web sites to register themselves as possible handlers for particular protocols.</p>
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

