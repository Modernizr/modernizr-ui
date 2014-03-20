var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var merge = require('react/lib/merge');
var _ = require('lodash');

var _detects = [], _tags = [], _data = [];

function fetch() {
	$.getJSON('/metadata.json').then(function(response) {
		_detects = response;
		_tags = _.unique(_.flatten(_.pluck(response, 'tags')));
		_detects = _detects.map(function(detect) {
			return _.extend(detect, {
				cid: _.uniqueId('detect_'),
				type: 'detect'
			});
		});
		_tags = _tags.map(function(tag) {
			return {
				cid: _.uniqueId('tag_'),
				type: 'tag',
				name: tag
			}
		});
		_data = _.union(_detects, _tags);
		MetadataStore.emit('change');
	});
}

var MetadataStore = merge(EventEmitter.prototype, {
	getAll: function() {
		return _data;
	},
	getDetects: function() {
		return _detects;
	},
	getTags: function() {
		return _tags;
	}
});

MetadataStore.name = 'MetadataStore';

AppDispatcher.register(function(payload) {
	var action = payload.action;
	switch(action.actionType) {
		case 'METADATA_FETCH':
			fetch();
			return true; // Async
		break;
		default:
			return true;
		break;
	}
	MetadataStore.emit('change');
});

module.exports = MetadataStore;