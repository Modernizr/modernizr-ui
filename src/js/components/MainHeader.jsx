/**
 * @jsx React.DOM
 */

var React = require('react');
var logo = require('url?limit=0&mimetype=image/svg+xml!../../img/logo.svg');
var ResultActions = require('../actions/ResultActions');
var cx = require('react/lib/cx');
var Router = require('react-router');
var ResultActions = require('../actions/ResultActions');
var Link = Router.Link;

var MainHeader = React.createClass({
  render: function() {

    var browserOpen = this.props.activeRouteName === 'detects';

    return (
      <div className={cx({'MainHeader': true, 'is-browser-open': browserOpen})}>
        <div className="MainHeader-mid">
          <div className="MainHeader-logo">
            <Link to="index" className="CombinationMark">
              <img src={logo} className="CombinationMark-logo" />
              <strong className="CombinationMark-text">Modernizr</strong>
            </Link>
          </div>
          <div className="MainHeader-body">
            <div className="MainNav MainHeader-row">
              <div className="MainNav-item">
                <Link to="detects" className={cx({'NavItem': true, 'is-current': browserOpen})}>
                  <span className="NavItem-inner">Browse features</span>
                </Link>
              </div>
              <div className="MainNav-item">
                <a className="NavItem" href="#">
                  <span className="NavItem-inner">Documentation</span>
                </a>
              </div>
              <div className="MainNav-item">
                <a className="NavItem" href="#">
                  <span className="NavItem-inner">News</span>
                </a>
              </div>
              <div className="MainNav-item">
                <a className="NavItem" href="#">
                  <span className="NavItem-inner">Resources</span>
                </a>
              </div>
            </div>
            <div className="BrowserHeader MainHeader-row">
              <div className="BrowserHeader-col">
                {this.props.search}
              </div>
              <div className="BrowserHeader-col" style={{width: 200}}>
                <div className="c-btn u-fullHeight Btn u-textCenter" style={{lineHeight: '60px'}} onClick={this._onBuildBtnClick}>
                  <strong className="t-action t-label">Build</strong>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/*
        <div className="Grid Grid--withGutter">
          <div className="Grid-cell u-size2of10">
            <div className="c-contrast">
              <div className="Grid Grid--withDividers">
                <div className="Grid-cell u-size2of3">
                  <div className="MainHeader-block u-gutterLipLeft">
                    <div className="u-vcContainer">
                      <div className="u-vc CombinationMark">
                        <img src={logo} className="CombinationMark-logo" />
                        <Link to="index">
                          <strong className="CombinationMark-text t-label">Modernizr</strong>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="Grid-cell u-size5of10 c-reverse">
            <div className="MainHeader-block">
              <div className="u-vcContainer">
                <div className="u-vc">
                  {this.props.search}
                </div>
              </div>
            </div>
          </div>
          <div className="Grid-cell u-size3of10 c-reverse">
            <div className="Grid Grid--withDividers">
              <div className="Grid-cell u-size1of3">
                <div className="MainHeader-block c-reverse c-reverseBorder u-gutterLipLeft MainHeader-countList">
                  <div className="u-vcContainer">
                    <div className="u-vc">
                      <ul className="TypeList">
                        <li className="u-cf t-body TypeList-item">
                          <a href="#" onClick={this._onTypeClick.bind(this, {name: 'Detects', type: 'detect'})} className="u-cf">
                            <span className={cx({'TypeList-count': true, 't-action': true, 't-digits': true, 'c-aux': !this.props.detectCount})}>{this.props.detectCount || 0}</span>
                            Detects
                          </a>
                        </li>
                        <li className="u-cf t-body TypeList-item">
                          <a href="#" onClick={this._onTypeClick.bind(this, {name: 'Extras', type: 'extra'})} className="u-cf">
                            <span className={cx({'TypeList-count': true, 't-action': true, 't-digits': true, 'c-aux': !this.props.extraCount})}>{this.props.extraCount || 0}</span>
                            Extras
                          </a>
                        </li>
                        <li className="u-cf t-body TypeList-item">
                          <a href="#" onClick={this._onTypeClick.bind(this, {name: 'API', type: 'api'})} className="u-cf">
                            <span className={cx({'TypeList-count': true, 't-action': true, 't-digits': true, 'c-aux': !this.props.apiCount})}>{this.props.apiCount || 0}</span>
                            API
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              <div className="Grid-cell u-size2of3 c-reverseBorder">
                <div className={cx({FruitMachine: true, 'FruitMachine--forOpenSide': true, 'MainHeader-block': true, 'u-gutterLipRight': true, 'c-reverse': true, 'is-moved': this.props.selectionCount})}>
                  <div className="FruitMachine-transport u-fullHeight">
                    <div className="FruitMachine-item u-fullHeight">
                      <div className="u-vcContainer u-textCenter">
                        <div className="u-vc">
                          <div className="NoItemsMessage t-body c-aux">No items have been added to your build yet.</div>
                        </div>
                      </div>
                    </div>
                    <div className="FruitMachine-item u-fullHeight">
                      <div className="Grid OpenSide u-fullHeight">
                        <div className={cx({'Grid-cell': true, 'u-size1of1': !this.props.selectionCount, 'u-size1of2': this.props.selectionCount, 'OpenSide-item': true, 'u-textCenter': true, 'u-fullHeight': true})}>
                          <div className="u-vcContainer">
                            <div className="u-vc">
                              <div className={cx({'Ring': true, 'Ring--selection': true, 't-heading': true, 'c-reverseBorder': true, 'is-active': this.props.selectionOnly})} onClick={this._onSelectionCountClick}>
                                <div className="Ring-inner">
                                  <strong className="t-digits">{this.props.selectionCount}</strong>
                                </div>
                                <div className="Ring-inner">
                                  <strong className="t-digits">{this.props.selectionCount}</strong>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className={cx({'Grid-cell': true, 'u-size0': !this.props.selectionCount, 'u-size1of2': this.props.selectionCount, 'OpenSide-item': true, 'u-fullHeight': true})} onClick={this._onBuildBtnClick}>
                          <div className="c-btn u-fullHeight Btn u-textCenter">
                            <strong className="t-action t-label">Build</strong>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        */}
      </div>
    );
  },

  _onSelectionCountClick: function() {
    ResultActions.showSelectionOnly();
  },

  _onTypeClick: function(props) {
    ResultActions.filterByType(props.type);
  },

  _onBuildBtnClick: function(event) {
    this.props.onBuildBtnClick(event);
  }
});

module.exports = MainHeader;
