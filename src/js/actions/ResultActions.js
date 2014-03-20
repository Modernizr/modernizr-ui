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
	}
};

module.exports = ResultActions;