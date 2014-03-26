/**
 * @jsx React.DOM
 */

var React = require('react');

var HomePage = React.createClass({

	render: function() {
		return (
			<div className="Grid Grid--withGutter HomePage">
				<div className="Grid-cell u-size10of10">
					<div className="Box HomePage-hero">
						<div className="t-heading HomePage-heading">
							<strong>Respond to your user’s<br />browser features.</strong>
						</div>
						<div className="HomePage-content">
							<div className="t-heading c-aux HomePage-subHeading">Modernizr tells you what HTML, CSS and JavaScript features the user’s browser has to offer.</div>
							<p style={{'paddingTop': '3em'}} className="t-heading">
								<a href="#" className="HomePage-cta" onClick={this._onClick}>Add your detects</a>
								<a href="#" className="t-label HomePage-secondaryCta">
									<span>Download a development copy</span>
								</a>
							</p>
						</div>
					</div>

					<div className="Grid Grid--withGutter" style={{paddingTop: '7rem', paddingBottom: '4rem'}}>
				<div className="Grid-cell u-size1of2">
				<div className="">
				<div className="t-heading" style={{fontSize: '4rem'}}>What is Modernizr?</div>
				<p className="t-body " style={{color: '#666', maxWidth: '30em', marginTop: '1em', fontSize: '2.2rem', lineHeight: '1.5'}}>It’s a collection of superfast tests – or “detects” as we like to call them – which run as your web page loads, then you can use the results to tailor the experience to the user.</p>
				<div className="t-heading" style={{marginTop: '5rem', fontSize: '4rem'}}>Why do I need it?</div>
				<p className="t-body " style={{color: '#666', maxWidth: '30em', marginTop: '1em', fontSize: '2.2rem', lineHeight: '1.5'}}>All web developers come up against differences between browsers and devices. That’s largely due to different feature sets: the latest versions of the popular browsers can do some awesome things which older browsers can’t – but we still have to support the older ones.</p>
				<p className="t-body " style={{color: '#666', maxWidth: '30em', marginTop: '1em', fontSize: '2.2rem', lineHeight: '1.5'}}>Modernizr makes it easy to deliver tiered experiences: make use of the latest and greatest features in browsers which support them, without leaving less fortunate users high and dry.</p>
				</div>
				</div>
				<div className="Grid-cell u-size1of2">
				<div className="Grid Grid--withGutter">
				<div className="Grid-cell u-size1of2">
				<div className="BoxSet">
				<div className="BoxSet-item">
				<div className="Box c-contrast">
				<div className="t-heading u-textTruncate">Getting started</div>
				</div>
				</div>
				<div className="BoxSet-item">
				<div className="Box c-contrast">
				<ul className="horz-list">
				<li className="t-body"><a href="#">Modernizr explained</a></li>
				<li className="t-body"><a href="#">Which is feature detection?</a></li>
				<li className="t-body"><a href="#">How to detect with JavaScript</a></li>
				<li className="t-body"><a href="#">How to detect with CSS</a></li>
				</ul>
				</div>
				</div>
				</div>
				</div>
				<div className="Grid-cell u-size1of2">
				<div className="BoxSet">
				<div className="BoxSet-item">
				<div className="Box c-contrast">
				<div className="t-heading u-textTruncate">Latest news</div>
				</div>
				</div>
				<div className="BoxSet-item">
				<div className="Box c-contrast">
				<ul className="horz-list">
				<li className="t-body"><a href="#">Modernizr V3.1 released</a></li>
				<li className="t-body"><a href="#">Modernizr 3</a></li>
				<li className="t-body"><a href="#">Stickers!</a></li>
				<li className="t-body"><a href="#">Diversity</a></li>
				</ul>
				</div>
				</div>
				</div>
				</div>
				</div>
				<div className="Grid Grid--withGutter" style={{marginTop: '3rem'}}>
				<div className="Grid-cell u-size1of2">
				<div className="BoxSet">
				<div className="BoxSet-item">
				<div className="Box c-contrast">
				<div className="t-heading u-textTruncate">Talk to us</div>
				</div>
				</div>
				<div className="BoxSet-item">
				<div className="Box c-contrast">
				<ul className="horz-list">
				<li className="t-body"><a href="#">Twitter</a></li>
				<li className="t-body"><a href="#">StackOverflow</a></li>
				<li className="t-body"><a href="#">Contact form</a></li>
				</ul>
				</div>
				</div>
				</div>
				</div>
				<div className="Grid-cell u-size1of2">
				</div>
				</div>
				</div>
				</div>

				</div>
			</div>
		);
	},

	_onClick: function() {
		this.props.onCTAClick();
	}

});

module.exports = HomePage;
