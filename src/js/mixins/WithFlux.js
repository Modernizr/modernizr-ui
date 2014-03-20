var WithFlux = {
	getInitialState: function() {
		return this.getState();
	},
	componentWillMount: function() {
		this.stores.forEach(function(store) {
			store.on('change', this._onStoreChange);
		}.bind(this));
	},
	componentWillUnmount: function() {
		this.stores.forEach(function(store) {
			store.removeListener('change', this._onStoreChange);
		}.bind(this));
	},
	_onStoreChange: function() {
		this.setState(this.getState());
	}
};

module.exports = WithFlux;