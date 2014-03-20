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
	up: function() {
		AppDispatcher.handleViewAction({
			actionType: 'RESULT_UP'
		});
	},
	down: function() {
		AppDispatcher.handleViewAction({
			actionType: 'RESULT_DOWN'
		});
	}
};

module.exports = ResultActions;