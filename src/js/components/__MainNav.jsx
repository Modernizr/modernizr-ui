/**
 * @jsx React.DOM
 */

var React = require('react');
var cx = require('react/lib/cx');


var MainNav = React.createClass({

	getInitialState: function() {
		return {
			active: false
		};
	},

	componentDidMount: function() {
		this._cacheWidths();
		$(window).on('resize', this._cacheWidths);
	},

	componentWillUnmount: function() {
		$(window).off('resize', this._cacheWidths);
	},

	render: function() {
		return (
			<div className={cx({MainNav: true, 'u-fullHeight': true, 'is-active': this.state.active})}>
				<div ref="mid" className="MainNav-mid u-removeWhitespace u-fullHeight" style={{
					marginRight: this.state.active ? -9999 : 0
				}}>
					{/* this is the bit that needs to move. this needs the width from MainNav */}
					<div ref="inner" className="MainNav-inner u-contain" style={{
						'WebkitTransform': 'translate3d(' + (this.state.active ? offset : 0) +  'px, 0px, 0px)',
						width: this.rootWidth
					}}>
						<ul className="NavList u-stretch u-removeWhitespace" style={{
							marginLeft: this.state.active ? (0 - offset) : 0,
							paddingLeft: this.state.active ? offset : 0
						}}>
							<li className="NavList-item"><a href="#" class="t-label"><span>Detects</span></a></li>
							<li className="NavList-item"><a href="#" class="t-label"><span>Guide</span></a></li>
							<li className="NavList-item"><a href="#" class="t-label"><span>News</span></a></li>
							<li className="NavList-item"><a href="#" class="t-label"><span>Resources</span></a></li>
						</ul>
						<div className="MainHeader-block u-fullHeight">
							MENU!
						</div>
					</div>
				</div>
			</div>
		);
	},

	_toggle: function() {
		this.setState({
			active: !this.state.active
		});
	},

	_cacheWidths: function() {
		var $root = $(this.getDOMNode());
		var $inner = $(this.refs.inner.getDOMNode());
		this.windowWidth = $(window).width();
		this.rootWidth = $root.width();
		this.offsetLeft = this.windowWidth -  this.rootWidth - $inner.offset().left;
		this.forceUpdate();
	}

});

module.exports = MainNav;