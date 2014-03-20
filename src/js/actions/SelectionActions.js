var AppDispatcher = require('../dispatcher/AppDispatcher');

var SelectionActions = {
	add: function(data) {
		if(data instanceof Array) {
			AppDispatcher.handleViewAction({
				actionType: 'SELECTION_ADD_ALL',
				data: data
			});
		}
		else {
			AppDispatcher.handleViewAction({
				actionType: 'SELECTION_ADD',
				data: data
			});
		}
	},
	remove: function() {
		if(arguments[0] instanceof Array) {
			AppDispatcher.handleViewAction({
				actionType: 'SELECTION_REMOVE_ALL',
				data: arguments[0]
			});
		}
		else {
			AppDispatcher.handleViewAction({
				actionType: 'SELECTION_REMOVE',
				cid: arguments[0]
			});
		}
	}
};

module.exports = SelectionActions;