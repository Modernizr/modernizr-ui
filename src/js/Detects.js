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
		this.detectsCollection.on('change:added', this.getSelection, this);
	},
	fetch: function(cb) {
		var _this = this;
		$.getJSON('feature-detects.json').then(function(detects) {
			_this.prepareSearch(detects);
			_this.detectsCollection.reset(detects);
			Events.publish('mod/data/detectsFetched', _this.detectsCollection);
			_this.getSelection();
		});
	},
	prepareSearch: function(data) {
		this.attr.fuse = new Fuse(data, {
			keys: ['name', 'property'],
			threshold: 0.8
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
			console.log(this.resultsCollection);
			Events.publish('mod/data/resultsFound', this.resultsCollection);
		}
	},
	getSelection: function() {
		var selectedModels = this.detectsCollection.where({added: true});
		this.selectedCollection.reset(selectedModels);
		Events.publish('mod/data/selectionChanged', this.selectedCollection);
	}
});

Detects.Model = Backbone.Model.extend({

});

Detects.Collection = Backbone.Collection.extend({
	model: Detects.Model
});

Detects.ResultsCollection = Backbone.Collection.extend({
	model: Detects.Model
});

Detects.initialize();

module.exports = Detects;