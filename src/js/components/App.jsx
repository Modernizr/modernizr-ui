/**
 * @jsx React.DOM
 */

var React = require('react/react');
var MetadataActions = require('../actions/MetadataActions');
var SelectionActions = require('../actions/SelectionActions');
var MetadataStore = require('../stores/Metadata');
var ResultsStore = require('../stores/Results');
var SelectionStore = require('../stores/Selection');
var WithFlux = require('../mixins/WithFlux');
var _ = require('lodash');

var Header = require('./Header.jsx');
var Results = require('./Results.jsx');
var Detail = require('./Detail.jsx');
var Search = require('./Search.jsx');

var App = React.createClass({
	mixins: [WithFlux],
	stores: [MetadataStore, ResultsStore, SelectionStore],
	getState: function() {
		return {
			allDetects: MetadataStore.getDetects(),
			results: ResultsStore.getResults(),
			selection: SelectionStore.getSelection(),
			currentResult: ResultsStore.getCurrent(),
			isFiltered: ResultsStore.isFiltered()
		};
	},
	componentWillMount: function() {
		MetadataActions.fetch();
	},
	componentDidMount: function() {
		// $(window).on('keydown', this.handleKeyDown);
	},
	/*
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
			if(this.state.searchValue) {
				this.setState({
					searchValue: '',
					currentDetect: null
				});
			}
		}
		else if(event.which === 27) { // Esc
			this.setState({
				currentDetect: null,
				searchValue: ''
			});
		}
	},
	*/
	render: function() {
		var selectionCount = _.size(this.state.selection) || 0;
		return (
			<div className="app">
				<Header count={selectionCount} searchComponent={
					<Search onSearchChange={this.handleSearchChange} searchValue={this.state.searchValue} />
				} />
				<div className="main row">
					{this.state.results &&
					<div className="main__sidebar row__column">

						{(this.state.isFiltered && 
							<div className="results-state-label">
								{this.state.results.length} results
							</div>
						) || 
						<div className="results-state-label">
							Showing all {this.state.results.length} detects
						</div>
						}

						<ul className="results-actions">
							{(selectionCount === this.state.results.length &&
								<li><a href="#" onClick={this._onRemoveAllClick} className="t_action t_label c_action">REMOVE THESE ({this.state.results.length})</a></li>
							) ||
								<li><a href="#" onClick={this._onAddAllClick} className="t_action t_label c_action">ADD THESE ({this.state.results.length})</a></li>
							}
						</ul>
					</div>
					}
					<div className="main__results row__column">
						<Results results={this.state.results} currentResult={this.state.currentResult} selection={this.state.selection} />
					</div>
					<div className="main__detail row__column">
						{(this.state.currentResult &&
						<Detail detect={this.state.currentResult} onClose={this.handleDetailClose} />
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
	},

	_onRemoveAllClick: function() {
		SelectionActions.remove(this.state.results);
	},


	_onAddAllClick: function() {
		SelectionActions.add(this.state.results);
	}
});

React.renderComponent(<App />, document.getElementById('app-container'));

module.exports = App;
