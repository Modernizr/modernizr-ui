var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var merge = require('react/lib/merge');
var _ = require('lodash');
var DetectsData = require("../../metadata.json");
var ExtrasData = require('../../extras.json');
var APIData = require('../../api.json');

var _detects = [],
	_tags = [],
	_data = [],
	_extras = [],
	_api = [];

function fetch() {

	_tags = _.unique(_.flatten(_.pluck(DetectsData, 'tags')))
	_tags = _tags.map(function(tag) {
		return {
			cid: _.uniqueId('tag_'),
			type: 'tag',
			name: tag
		}
	});

	_detects = DetectsData.map(function(detect) {
		return _.extend(detect, {
			cid: _.uniqueId('detect_'),
			type: 'detect',
			tags: detect.tags.map(function(tagName) {
				return _.find(_tags, function(tagObj) {
					return tagObj.name === tagName;
				});
			})
		});
	});

	_extras = ExtrasData.map(function(extra) {
		return _.extend(extra, {
			cid: _.uniqueId('extra_'),
			type: 'extra'
		});
	});

	_api = APIData.map(function(api) {
		return _.extend(api, {
			cid: _.uniqueId('api'),
			type: 'api'
		});
	});

	_data = _.union(_detects, _tags, _extras, _api);

	MetadataStore.emit('change');
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
	},
	getAPI: function() {
		return _api;
	},
	getExtras: function() {
		return _extras;
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