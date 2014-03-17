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
			isSearching: false,
			currentDetect: null
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
	addAllDetects: function() {
		var results = this.getResults();
		results.invoke('set', {'added': true});
	},
	removeAllDetects: function() {
		var results = this.getResults();
		results.invoke('set', {'added': false});
	},
	getResults: function() {
		return this.state.isSearching ? this.state.results : this.state.detects;
	},
	handleDetailClose: function(event) {
		this.setState({
			currentDetect: null
		});
	},
	render: function() {
		var results = this.getResults();
		var selectionCount = this.state.selection ? this.state.selection.length : 0;
		var currentDetect = this.state.currentDetect;
		return (
			<div className="app">
				<Header count={selectionCount} />
				<div className="main row">
					{results &&
					<div className="main__sidebar row__column">
						<div className="results-state-label">Showing all {results.length} detects</div>
						<ul className="results-actions">
							{(selectionCount === results.length &&
								<li><a href="#" onClick={this.removeAllDetects} className="t_action t_label c_action">REMOVE ALL ({results.length})</a></li>
							) ||
								<li><a href="#" onClick={this.addAllDetects} className="t_action t_label c_action">ADD ALL ({results.length})</a></li>
							}
						</ul>
					</div>
					}
					<div className="main__results row__column">
						<Results detects={results && results.models || []} onCurrentDetectChange={this.handleCurrentDetectChange} currentDetect={currentDetect} />
					</div>
					<div className="main__detail row__column">
						{(currentDetect &&
						<Detail detect={currentDetect} onClose={this.handleDetailClose} />
						) || 
						<div className="detail detail--intro">
							<h1>Welcome to the<br />detect library.</h1>
							<p>You can browser detects to find out about browser features, and also add detects to a build, ready to use on your project.</p>
							<p><i>[Add more instructions here]</i></p>
						</div>
						}
					</div>
				</div>
			</div>
		);
	}
});

React.renderComponent(<App />, document.getElementById('app-container'));

module.exports = App;
