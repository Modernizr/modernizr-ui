/**
 * @jsx React.DOM
 */

var React = require('react');
var logo = require('url?mimetype=image/svg+xml!../../img/logo.svg');
var ResultActions = require('../actions/ResultActions');
var cx = require('react/lib/cx');

var MainHeader = React.createClass({

	render: function() {
		return (
			<div className="MainHeader Container">
				<div className="Grid Grid--withGutter">
					<div className="Grid-cell u-size2of10">
						<div className="c-contrast">
							<div className="Grid Grid--withDividers">
								<div className="Grid-cell u-size2of3">
									<div className="MainHeader-block u-gutterLipLeft">
										<div className="u-vcContainer">
											<div className="u-vc CombinationMark">
												<img src={logo} className="CombinationMark-logo" />
												<strong className="CombinationMark-text t-label">Modernizr</strong>
											</div>
										</div>
									</div>
								</div>
								<div className="Grid-cell u-size1of3">
									<div className="MainHeader-block">
										<div className="MainHeader-nav u-fullHeight">
											{this.props.nav}
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div className="Grid-cell u-size5of10 c-reverse">
						<div className="MainHeader-block">
							<div className="u-vcContainer">
								<div className="u-vc">
									{this.props.search}
								</div>
							</div>
						</div>
					</div>
					<div className="Grid-cell u-size3of10 c-reverse">
						<div className="Grid Grid--withDividers">
							<div className="Grid-cell u-size1of3">
								<div className="MainHeader-block c-reverse c-reverseBorder u-gutterLipLeft MainHeader-countList">
									<div className="u-vcContainer">
										<div className="u-vc">
											<ul className="TypeList">
												<li className="u-cf t-body TypeList-item">
													<a href="#" onClick={this._onTypeClick.bind(this, {name: 'Detects', type: 'detect'})} className="u-cf">
														<span className={cx({'TypeList-count': true, 't-action': true, 't-digits': true, 'c-aux': !this.props.detectCount})}>{this.props.detectCount || 0}</span>
														Detects
													</a>
												</li>
												<li className="u-cf t-body TypeList-item">
													<a href="#" onClick={this._onTypeClick.bind(this, {name: 'Extras', type: 'extra'})} className="u-cf">
														<span className={cx({'TypeList-count': true, 't-action': true, 't-digits': true, 'c-aux': !this.props.extraCount})}>{this.props.extraCount || 0}</span>
														Extras
													</a>
												</li>
												<li className="u-cf t-body TypeList-item">
													<a href="#" onClick={this._onTypeClick.bind(this, {name: 'API', type: 'api'})} className="u-cf">
														<span className={cx({'TypeList-count': true, 't-action': true, 't-digits': true, 'c-aux': !this.props.apiCount})}>{this.props.apiCount || 0}</span>
														API
													</a>
												</li>
											</ul>
										</div>
									</div>
								</div>
							</div>
							<div className="Grid-cell u-size2of3 c-reverseBorder">
								<div className={cx({FruitMachine: true, 'FruitMachine--forOpenSide': true, 'MainHeader-block': true, 'u-gutterLipRight': true, 'c-reverse': true, 'is-moved': this.props.selectionCount})}>
									<div className="FruitMachine-transport u-fullHeight">
										<div className="FruitMachine-item u-fullHeight">
											<div className="u-vcContainer u-textCenter">
												<div className="u-vc">
													<div className="NoItemsMessage t-body c-aux">No items have been added to your build yet.</div>
												</div>
											</div>
										</div>
										<div className="FruitMachine-item u-fullHeight">
											<div className="Grid OpenSide u-fullHeight">
												<div className={cx({'Grid-cell': true, 'u-size1of1': !this.props.selectionCount, 'u-size1of2': this.props.selectionCount, 'OpenSide-item': true, 'u-textCenter': true, 'u-fullHeight': true})}>
													<div className="u-vcContainer">
														<div className="u-vc">
															<div className="Ring t-heading c-reverseBorder">
																<div className="Ring-inner">
																	<strong className="t-digits">{this.props.selectionCount}</strong>
																</div>
																<div className="Ring-inner">
																	<strong className="t-digits">{this.props.selectionCount}</strong>
																</div>
															</div>
														</div>
													</div>
												</div>
												<div className={cx({'Grid-cell': true, 'u-size0': !this.props.selectionCount, 'u-size1of2': this.props.selectionCount, 'OpenSide-item': true, 'u-fullHeight': true})}>
													<div className="c-btn u-fullHeight Btn u-textCenter">
														<strong className="t-action t-label">Build</strong>
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	},

	_onTypeClick: function(props) {
		ResultActions.filterByType(props.type);
	}

});

module.exports = MainHeader;