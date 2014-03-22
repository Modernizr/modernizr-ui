/**
 * @jsx React.DOM
 */

var React = require('react');
// var logo = require("../../img/logo.svg");
var logo = "";

var Header = React.createClass({

	render: function() {
		return (
			<div className="header cf row">
					<div className="header__logo row__column">
						<a href="#" className="logo-nav c_linkbox">
							<span className="logo">
								<img src={logo} alt="Modernizr" />
							</span>
						</a>
					</div>
					<div className="header__search row__column">
						{this.props.searchComponent}
					</div>
					<div className="header__util">
						<ul className="util">
							<li className="util__item">
								<a href="#" className="build-state-btn hit c_linkbox">
									<strong className="build-state-btn__char t_subtitle">{this.props.count}</strong>
									<span className="build-state-btn__suffix t_label">Detects</span>
								</a>
							</li><li className="util__item">
								<a href="#" className="build-state-btn hit c_linkbox">
									<strong className="build-state-btn__char t_subtitle">0</strong>
									<span className="build-state-btn__suffix t_label">Extras</span>
								</a>
							</li><li className="util__item">
								<a href="#" className="build-state-btn hit c_linkbox">
									<strong className="build-state-btn__char t_subtitle">&nbsp;</strong>
									<span className="build-state-btn__suffix t_label">Standard</span>
								</a>
							</li><li className="util__item">
								<div className="build-state-btn build-state-label t_label">
									10KB
								</div>
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

