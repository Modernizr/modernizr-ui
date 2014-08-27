/**
 * @jsx React.DOM
 */

var React = require('react');
var ResultActions = require('../actions/ResultActions');
var closeIcon = require('url?limit=0&mimetype=image/svg+xml!../../img/close.svg');

var FilterLabel = React.createClass({

  render: function() {
    return (
      <div className="Box Box--minor c-filter u-gutterLipLeft u-gutterPadLeft">
        <div className="Bar">
          <div className="Bar-item">
            <span className="t-label">{this.props.tag.name}</span>
          </div>
          <div className="Bar-item u-textRight">
            <div className="Ring Ring--small Ring--close" onClick={this._onClick}>
              <div className="Ring-inner u-contain">
                <img src={closeIcon}  alt="Close" className="u-stretch" />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  },

  _onClick: function() {
    ResultActions.blur();
  }

});

module.exports = FilterLabel;
