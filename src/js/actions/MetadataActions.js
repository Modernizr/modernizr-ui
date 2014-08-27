var AppDispatcher = require('../dispatcher/AppDispatcher');

var MetadataActions = {
  fetch: function() {
    AppDispatcher.handleViewAction({
      actionType: 'METADATA_FETCH'
    });
  }
};

module.exports = MetadataActions;
