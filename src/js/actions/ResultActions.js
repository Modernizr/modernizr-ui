var AppDispatcher = require('../dispatcher/AppDispatcher');

var ResultActions = {
	search: function(text) {
		AppDispatcher.handleViewAction({
			actionType: 'RESULT_SEARCH',
			text: text
		});
	},
	focus: function(cid) {
		AppDispatcher.handleViewAction({
			actionType: 'RESULT_FOCUS',
			cid: cid
		});
	},
	blur: function() {
		AppDispatcher.handleViewAction({
			actionType: 'RESULT_BLUR'
		});
	},
	up: function() {
		AppDispatcher.handleViewAction({
			actionType: 'RESULT_UP'
		});
	},
	down: function() {
		AppDispatcher.handleViewAction({
			actionType: 'RESULT_DOWN'
		});
	},
	filterByTag: function(cid) {
		AppDispatcher.handleViewAction({
			actionType: 'RESULT_FILTER_BY_TAG',
			cid: cid
		});
	},
	filterByType: function(type, typeName) {
		AppDispatcher.handleViewAction({
			actionType: 'RESULT_FILTER_BY_TYPE',
			type: type
		});
	}
};

module.exports = ResultActions;