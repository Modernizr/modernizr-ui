var Backbone = require('backbone');
var Fuse = require('../../bower_components/fuse/fuse');
var Events = require('./events');
var _ = require('underscore');

var Detects = function() { };

Detects = _.extend(Detects, {
	attr: {
		fuse: null,
		detectsCollection: null
	},
	initialize: function(name) {
		Events.subscribe('mod/ui/searchValueChanged', _.bind(this.search, this));
		Events.subscribe('mod/ui/appLoaded', _.bind(this.fetch, this));
		this.detectsCollection = new Detects.Collection();
		this.resultsCollection = new Detects.ResultsCollection();
		this.selectedCollection = new Detects.Collection();
		this.tags = new Detects.Tags();
		this.detectsCollection.on('change:added', this.getSelection, this);
	},
	fetch: function(cb) {
		var _this = this;
		$.getJSON('metadata.json').then(function(detects) {
			_this.detectsCollection.reset(detects);
			var tags = _this.getTags(detects);
			_this.tags.reset(tags);
			_this.prepareSearch(_.flatten([tags]));
			Events.publish('mod/data/metadataFetched', {
				detects: _this.detectsCollection,
				tags: _this.tags
			});
			_this.getSelection();
		});
	},
	prepareSearch: function(data) {
		this.attr.fuse = new Fuse(data, {
			keys: ['name', 'property'],
			threshold: 0.8
		});
	},
	getTags: function(detects) {
		var tagArray = _.unique(_.flatten(_.pluck(detects, 'tags')));
		return tagArray.map(function(tag) {
			return {
				name: tag
			}
		});
	},
	search: function(value) {
		var _this = this;

		value = value.replace(/\s+/g, '');
		value = value.split('').join(' ');
		
		if(value) {
			var results = this.attr.fuse.search(value);
			var models = results.map(function(result) {
				return _this.detectsCollection.findWhere({property: result.property});
			});

			this.resultsCollection.reset(models);

			Events.publish('mod/data/resultsFound', this.resultsCollection);
		}
	},
	getSelection: function() {
		var selectedModels = this.detectsCollection.where({added: true});
		this.selectedCollection.reset(selectedModels);
		Events.publish('mod/data/selectionChanged', this.selectedCollection);
	}
});

Detects.Tag = Backbone.Model.extend({

});

Detects.Model = Backbone.Model.extend({

});

Detects.Collection = Backbone.Collection.extend({
	model: Detects.Model
});

Detects.ResultsCollection = Backbone.Collection.extend({
	model: function(attrs, options) {
		debugger;
		if(condition) {
			return new Detects.Tag(attrs, options);
		}
		else {
			return new Detects.Model(attrs, options);
		}
	}
});

Detects.Tags = Backbone.Collection.extend({
	model: Detects.Tag
});

Detects.initialize();

module.exports = Detects;