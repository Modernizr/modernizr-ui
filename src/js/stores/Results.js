var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var merge = require('react/lib/merge');
var MetadataStore = require('./Metadata');
var Fuse = require('../../../bower_components/fuse/src/fuse');
var SelectionStore = require('./Selection');

var _fuse,
  _value = null,
  _results = [],
  _currentIndex = null,
  _currentTag = null,
  _currentType = null,
  _selectionOnly = false;

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

  // TODO :: filter by any currentType or currentTag

  _value = value;
  if(_value) {
    _results = _fuse.search(_getFuseValue(_value));
    _results = _prioritiseMatchingTag(_results);
    _currentIndex = 0;
  }
  else {
    _results = MetadataStore.getAll();
    _currentIndex = null;
  }
}

function _prioritiseMatchingTag(results) {
  var tagMatch = _.find(results, function(result) {
    return (result.type === 'tag' && result.name === _value);
  });

  if(tagMatch) {
    var restOfResults = _.without(results, tagMatch);

    return [tagMatch].concat(restOfResults);
  }

  return results;
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
  _value = null;
  _currentTag = null;
  _currentType = null;
  _results = MetadataStore.getAll();
  _selectionOnly = false;
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

function filterByTag(cid) {
  var data = MetadataStore.getAll();
  var tags = MetadataStore.getTags();
  _currentType = null;
  _selectionOnly = false;

  _currentTag = _.find(tags, function(tag) {
    return tag.cid === cid;
  });

  _results = data.filter(function(obj) {
    if(obj.tags instanceof Array) {
      var match = _.find(obj.tags, function(tag) {
        return tag.cid === cid;
      });
      if(match) {
        return true;
      }
    }
    return false;
  });

  _value = null;
}

function filterByType(type) {
  var data = MetadataStore.getAll();
  _currentTag = null;
  _selectionOnly = false;
  _currentType = type;

  _results = data.filter(function(obj) {
    return obj.type === type;
  });
}

function showSelectionOnly() {
  if(!_selectionOnly) {
    _selectionOnly = true;
    _currentType = null;
    _currentTag = null;
    _results = _.map(SelectionStore.getSelection(), function(obj) {
      return obj
    });
  } else {
    blur();
  }
}

function _getFuseValue(value) {
  // Modification for better results through Fuse
  // var valueForFuse = value.replace(/\s+/g, '');
  // valueForFuse = valueForFuse.split('').join(' ');
  return value;
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
  },
  getSearchValue: function() {
    return _value || '';
  },
  getCurrentTag: function() {
    return _currentTag;
  },
  getCurrentType: function() {
    return _currentType;
  },
  getSelectionOnly: function() {
    return _selectionOnly;
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
    case 'RESULT_FILTER_BY_TAG':
      filterByTag(action.cid);
    break;
    case 'RESULT_FILTER_BY_TYPE':
      filterByType(action.type);
    break;
    case 'RESULT_SHOW_SELECTION_ONLY':
      showSelectionOnly();
    break;
    default:
      return true;
    break;
  }

  ResultsStore.emit('change');
});

module.exports = ResultsStore;
