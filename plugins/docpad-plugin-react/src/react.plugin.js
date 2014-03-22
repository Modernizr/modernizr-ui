require('node-jsx').install({extension: '.jsx'});
var React = require('react');
var path = require('path');

module.exports = function (BasePlugin) {
   return BasePlugin.extend({
      name: 'react',
      renderBefore: function(_arg, next) {
         _arg.templateData.react = function(name) {
         	var component = require(path.resolve(__dirname, '../../../src/', name));
         	return React.renderComponentToString(component());
         };
         next();
         return this;
      },
   });
};