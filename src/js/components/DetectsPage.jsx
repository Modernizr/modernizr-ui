/**
 * @jsx React.DOM
 */

var React = require('react');

var ToggleAll = require('jsx-loader!./ToggleAll.jsx');
var ResultList = require('jsx-loader!./ResultList.jsx');
var Detail = require('jsx-loader!./Detail.jsx');
var FilterLabel = require('jsx-loader!./FilterLabel.jsx');

var DetectsPage = React.createClass({

	render: function() {
		var root = React.DOM['div'];
		return (
			<root>
				<div className="Grid Grid--withGutter">
					<div className="Grid-cell u-size7of10">
						<div className="Grid Grid--withGutter">
							<div className="Grid-cell u-size4of14" style={{width: '19.4% !important', position: 'fixed'}}>
								<div className="BoxSet">
									{this.props.selectionOnly &&
									<div className="BoxSet-item">
										<FilterLabel tag={{name: 'Your selection'}} />
									</div>
									}
									{this.props.currentTag &&
									<div className="BoxSet-item">
										<FilterLabel tag={this.props.currentTag} />
									</div>
									}
									{this.props.currentType &&
									<div className="BoxSet-item">
										<FilterLabel tag={{type: this.props.currentType, name: this._getResultNameByType(this.props.currentType)}} />
									</div>
									}
									<div className="BoxSet-item">
										<div className="Box Box--minor c-contrast u-gutterLipLeft u-gutterPadLeft">
											<div className="Bar">
												<div className="Bar-item">
													<strong className="t-body c-aux">{this.props.results.length} results</strong>
												</div>
												<div className="Bar-item u-textRight">
													<ToggleAll results={this.props.results} readyToRemove={this.props.selectionCount === this.props.results.length} />
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
							<div className="Grid-cell u-size10of14" style={{left: '29%', position: 'relative', minHeight: 1}}>
								{this.props.results ?
									<ResultList currentResult={this.props.currentResult} results={this.props.results} selection={this.props.selection} currentIndex={this.props.currentIndex} />
									: null}
							</div>
						</div>
					</div>
					<div className="Grid-cell u-size3of10" style={{position: 'fixed'}}>
						{this.props.currentResult ?
							<Detail detect={this.props.currentResult} />
							: null}
					</div>
				</div>
			</root>
		);
	},

	_getResultNameByType: function(type) {
		switch(type) {
			case 'detect':
				return 'detects';
			break;
			case 'extra':
				return 'extras';
			break;
			case 'api':
				return 'API methods'
			break;
			default:
				return 'results';
			break;
		}
	}

});

module.exports = DetectsPage;