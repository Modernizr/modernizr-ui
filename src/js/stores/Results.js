var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var merge = require('react/lib/merge');
var MetadataStore = require('./Metadata');
var Fuse = require('../../../bower_components/fuse/fuse');

var _fuse,
	_value,
	_results = [],
	_currentIndex = null;

MetadataStore.on('change', function() {
	prepare();
	if(!_results.length) {
		_results = MetadataStore.getAll();
		ResultsStore.emit('change');
	}
});

function prepare() {
	var data = MetadataStore.getAll();
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
		_currentIndex = 0;
	}
	else {
		_results = MetadataStore.getAll();
		_currentIndex = null;
	}
}

function focus(cid) {
	var data = _results || MetadataStore.getAll();
	for(var i in data) {
		if(data[i].cid === cid) {
			_currentIndex = parseInt(i, null);
			break;
		}
	}
}

function blur() {
	_currentIndex = null;
}

function move(delta) {
	if(isNaN(_currentIndex)) {
		_currentIndex = _results[0];
	}
	else {
		var maxIndex = _results.length - 1;
		_currentIndex = _currentIndex + delta;
		if(_currentIndex < 0) _currentIndex = 0;
		else if(_currentIndex > maxIndex) _currentIndex = maxIndex;
	}
}

var ResultsStore = merge(EventEmitter.prototype, {
	getResults: function() {
		return _results;
	},
	isFiltered: function() {
		return !!_value;
	},
	getCurrentIndex: function() {
		return _currentIndex;
	}
});

ResultsStore.name = 'ResultsStore';

AppDispatcher.register(function(payload) {
	var action = payload.action;
	switch(action.actionType) {
		case 'RESULT_SEARCH':
			search(action.text);
		break;
		case 'RESULT_FOCUS':
			focus(action.cid);
		break;
		case 'RESULT_BLUR':
			blur();
		break;
		case 'RESULT_UP':
			move(-1);
		break;
		case 'RESULT_DOWN':
			move(1);
		break;
		default:
			return true;
		break;
	}

	ResultsStore.emit('change');
});

module.exports = ResultsStore;