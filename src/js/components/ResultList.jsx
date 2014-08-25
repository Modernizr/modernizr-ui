/**
 * @jsx React.DOM
 */

var React = require('react');
var Result = require('jsx-loader!./Result.jsx');
var TagResult = require('jsx-loader!./TagResult.jsx');
var ResultActions = require('../actions/ResultActions');
var SelectionActions = require('../actions/SelectionActions');

var ResultList = React.createClass({
	componentDidMount: function() {
		$(window).on('keydown', this._onKeyDown);
		$(document).on('keydown', function(e) {
			if(e.which === 38 || e.which === 40) {
				e.preventDefault();
			}
		});
	},

	componentDidUpdate: function(prevProps, prevState) {
		if(this.refs.firstResult) {
			this._updateScrollPosition();
		}
	},

	render: function() {
		var root = React.DOM['div'];
		return (
			<root className="ResultList BoxSet">
				{this.props.results.map(function(result, i) {
					var current = this.props.currentResult && this.props.currentResult.cid === result.cid;
					var ref = i === 0 ? 'firstResult' : null
					if(result.type === 'tag') {
						return (
							<div key={result.cid} className="BoxSet-item">
								<TagResult ref={ref} result={result} current={current} />
							</div>
						);
					}
					else {
						var added = this.props.selection && this.props.selection[result.cid];
						return (
							<div key={result.cid} className="BoxSet-item">
								<Result ref={ref} result={result} current={current} added={added} />
							</div>
						);
					}
				}.bind(this))}
			</root>
		);
	},

	_onKeyDown: function(e) {
		switch(e.which) {
			case 38: // Up
				ResultActions.up();
			break;
			case 40: // Down
				ResultActions.down();
			break;
			case 13: // Enter
				if(this.props.currentResult && this.props.currentResult.type !== 'tag') {
					var added = this.props.selection && this.props.selection[this.props.currentResult.cid];
					if(added) {
						SelectionActions.remove(this.props.currentResult.cid);
					}
					else {
						SelectionActions.add(this.props.currentResult);
					}
				}
				else if(this.props.currentResult && this.props.currentResult.type === 'tag') {
					ResultActions.filterByTag(this.props.currentResult.cid);
				}
				else {
					ResultActions.down();
				}
			break;
			case 27: // Esc
				ResultActions.blur();
			break;
		}
	},

	_updateScrollPosition: function() {
		var scrollTop = $(this.getDOMNode()).scrollTop();
		var resultHeight = $(this.refs.firstResult.getDOMNode()).outerHeight();

		var index = this.props.currentIndex || 0;
		var offset = index * (resultHeight + 1) - 1;
		var resultListHeight = $(this.getDOMNode()).height();
		var bottomOffset = resultHeight / 2;

		if((offset + resultHeight) > (scrollTop + resultListHeight)) {
			scrollTop = (offset + resultHeight) - resultListHeight;
			$(this.getDOMNode()).animate({
				scrollTop: scrollTop + bottomOffset
			}, {
				duration: 200
			});
		}
		else if(offset < scrollTop) {
			$(this.getDOMNode()).animate({
				scrollTop: offset
			}, {
				duration: 200
			});
		}
	}
});

module.exports = ResultList;