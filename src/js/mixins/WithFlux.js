var WithFlux = {
  getInitialState: function() {
    console.log(this.getState());
    return this.getState();
  },
  getStoreByName: function(name) {
    for(var i = 0; i < this.stores.length; i++) {
      if(this.stores[i].name === name) {
        return this.stores[i];
      }
    }
  },
  getState: function(name) {
    var states = {}
    for(var storeName in this.storeStates) {
      if(!name || storeName === name) {
        for(var varName in this.storeStates[storeName]) {
          states[varName] = this.storeStates[storeName][varName].call(this);
        }
      }
    }
    return states;
  },
  componentWillMount: function() {
    this.storeListeners = {};
    var _this = this;
    for(var storeName in this.storeStates) {
      (function(name) {
        var store = _this.getStoreByName(name);
        var onStoreChange = function() {
          _this.setState(_this.getState(name));
        };
        store.on('change', onStoreChange);
        _this.storeListeners[name] = onStoreChange;
      })(storeName);
    }
  },
  componentWillUnmount: function() {
    var _this = this;
    for(var storeName in this.stores) {
      (function(name) {
        var store = _this.getStoreByName(name);
        store.removeListener('change', _this.storeListeners[name]);
      })(storeName);
    }
  }
};

module.exports = WithFlux;
