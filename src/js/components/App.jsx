/**
 * @jsx React.DOM
 */

var FetchingMixin = require('../mixins/fetching');
var Events = require('../events');
var React = require('react/react');

var Header = require('./Header.jsx');
var Results = require('./Results.jsx');
var Detail = require('./Detail.jsx');

var App = React.createClass({
	mixins: [FetchingMixin],
	modelState: ['detects', 'results', 'selection'],
	getInitialState: function() {
		return {
			isSearching: false
		};
	},
	fetchData: function() {
		Events.publish('mod/ui/appLoaded');
	},
	componentDidMount: function() {
		Events.subscribe('mod/data/detectsFetched', this.stateSetter('detects'));
		Events.subscribe('mod/data/resultsFound', this.stateSetter('results'));
		Events.subscribe('mod/data/selectionChanged', this.stateSetter('selection'));
		Events.subscribe('mod/ui/searchValueChanged', this.resolveSearching);
	},
	resolveSearching: function(value) {
		this.setState({
			isSearching: !!value
		});
	},
	handleCurrentDetectChange: function(detect) {
		this.setState({
			currentDetect: detect
		});
	},
	render: function() {
		var results = this.state.isSearching ? this.state.results : this.state.detects;
		var selectionCount = this.state.selection ? this.state.selection.length : 0;
		var currentDetect = this.state.currentDetect || (results && results.models[0]);
		return (
			<div className="app">
				<Header count={selectionCount} />
				<div className="main row">
					<div className="main__sidebar row__column">
						<div className="results-state-label">Showing all detects</div>
						<ul className="results-actions">
							<li><a href="#" className="t_action t_label c_action">Toggle all</a></li>
						</ul>
					</div>
					<div className="main__results row__column">
						<Results detects={results && results.models || []} onCurrentDetectChange={this.handleCurrentDetectChange} currentDetect={currentDetect} />
					</div>
					<div className="main__detail row__column">
						{currentDetect &&
						<Detail detect={currentDetect} />
						}
					</div>
				</div>
			</div>
		);
	}
});

React.renderComponent(<App />, document.getElementById('app-container'));

module.exports = App;
