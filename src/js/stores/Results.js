var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var merge = require('react/lib/merge');
var MetadataStore = require('./Metadata');
var Fuse = require('fuse/fuse');

var _fuse,
	_value,
	_results = [],
	_current = null;

MetadataStore.on('change', prepare);

function prepare(data) {
	var data = MetadataStore.getAll();
	_results = data;
	_fuse = new Fuse(data, {
		keys: ['name', 'property'],
		threshold: 0.8
	});
}

function search(value) {
	if(value) {
		// Modification for better results through Fuse
		value = value.replace(/\s+/g, '');
		value = value.split('').join(' ');
		_results = _fuse.search(value);
		_value = value;
	}
	else {
		_results = MetadataStore.getAll();
	}
}

function focus(cid) {
	var data = _results || MetadataStore.getAll();
	_current = _.find(data, function(obj) {
		return obj.cid === cid;
	});
}

var ResultsStore = merge(EventEmitter.prototype, {
	getResults: function() {
		return _results;
	},
	getCurrent: function() {
		return _current;
	},
	isFiltered: function() {
		return !!_value;
	}
});

AppDispatcher.register(function(payload) {
	var action = payload.action;
	switch(action.actionType) {
		case 'RESULT_SEARCH':
			search(action.text);
		break;
		case 'RESULT_FOCUS':
			focus(action.cid);
		break;
		default:
			return true;
		break;
	}

	ResultsStore.emit('change');
});

module.exports = ResultsStore;