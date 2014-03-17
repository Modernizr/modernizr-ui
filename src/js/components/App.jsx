/**
 * @jsx React.DOM
 */

var FetchingMixin = require('../mixins/fetching');
var Events = require('../events');
var React = require('react/react');

var Header = require('./Header.jsx');
var Results = require('./Results.jsx');
var Detail = require('./Detail.jsx');
var Search = require('./Search.jsx');

var App = React.createClass({
	mixins: [FetchingMixin],
	modelState: ['detects', 'results', 'selection'],
	getInitialState: function() {
		return {
			searchValue: '',
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
		$(window).on('keydown', this.handleKeyDown);
	},
	componentWillUpdate: function(next) {

	},
	handleSearchChange: function(event) {
		var value = event.target.value;
		this.setState({
			isSearching: !!value,
			currentDetect: null,
			searchValue: value
		});
	},
	handleSearchFocus: function(event) {
		this.setState({
			isSearchFocused: true
		});
	},
	handleSearchBlur: function(event) {
		this.setState({
			isSearchFocused: false
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
	handleKeyDown: function(event) {
		var results = this.getResults();

		// Get the current index
		var currentIndex;
		if(this.state.currentDetect) {
			results.models.forEach(function(result, index) {
				if(result === this.state.currentDetect) {
					currentIndex = index;
					return false;
				}
			}.bind(this));
		}

		// Resolve the key pressed
		if(this.state.isSearchFocused) {
			if(event.which === 38) { // Up
				this.setState({
					currentDetect: (currentIndex > 0) ? results.models[currentIndex - 1] : null
				});
			} else if(event.which === 40 || (event.which === 13 && !this.state.currentDetect)) { // Down
				if(this.state.currentDetect) {
					this.setState({
						currentDetect: (currentIndex + 1 < results.models.length) ? results.models[currentIndex + 1] : null
					});
				}
				else {
					this.setState({
						currentDetect: results.models[0]
					});
				}
			}
			else if(event.which === 13 && this.state.currentDetect) {
				Events.publish('mod/ui/currentDetectToggled');
			}
			else if(event.which === 27) { // Esc
				this.setState({
					currentDetect: null,
					searchValue: ''
				});
			}
		}
	},
	render: function() {
		var results = this.getResults();
		var selectionCount = this.state.selection ? this.state.selection.length : 0;
		var currentDetect = this.state.currentDetect;
		var search = <Search onSearchFocus={this.handleSearchFocus} onSearchBlur={this.handleSearchBlur} onSearchChange={this.handleSearchChange} searchValue={this.state.searchValue} />;
		return (
			<div className="app">
				<Header count={selectionCount} searchComponent={search} />
				<div className="main row">
					{results &&
					<div className="main__sidebar row__column">

						{(this.state.isSearching && 
							<div className="results-state-label">
								{results.length} results
							</div>
						) || 
						<div className="results-state-label">
							Showing all {results.length} detects
						</div>
						}

						<ul className="results-actions">
							{(selectionCount === results.length &&
								<li><a href="#" onClick={this.removeAllDetects} className="t_action t_label c_action">REMOVE THESE ({results.length})</a></li>
							) ||
								<li><a href="#" onClick={this.addAllDetects} className="t_action t_label c_action">ADD THESE ({results.length})</a></li>
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
							<h1>Welcome to the <br />Modernizr detect library.</h1>
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
