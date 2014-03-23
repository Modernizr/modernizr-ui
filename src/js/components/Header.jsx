/**
 * @jsx React.DOM
 */

var React = require('react');
var logo = require("url?mimetype=image/svg+xml!../../img/logo.svg");

var TypeFilter = require('./TypeFilter.jsx');

var Header = React.createClass({

	render: function() {
		return (
			<div className="header cf row">
					<div className="header__logo row__column">
						<a href="#" className="logo-nav c_linkbox">
							<span className="logo">
								<img src="logo.svg" alt="Modernizr" />
							</span>
						</a>
					</div>
					<div className="header__search row__column">
						{this.props.searchComponent}
					</div>
					<div className="header__util">
						<ul className="util">
							<li className="util__item">
								<TypeFilter type="detect" name="Detects" count="0" />
							</li><li className="util__item">
								<TypeFilter type="extra" name="Extras" count="0" />
							</li><li className="util__item">
								<TypeFilter type="api" name="API" count="0" />
							</li><li className="util__item">
								<a href="#" className="t_action t_action--primary hit build-state-btn c_primary build-state-label">
									Build
								</a>
							</li>
						</ul>
					</div>
				</div>
			);
		}

});

module.exports = Header;

