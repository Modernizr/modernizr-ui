/**
 * @jsx React.DOM
 */

var React = require('react');
var ResultActions = require('../actions/ResultActions');

var Detail = React.createClass({
  propTypes: {
    detect: React.PropTypes.object.isRequired
  },

  closePanel: function(event) {

  },
  render: function() {
    var root = React.DOM['div'];
    var authors = this.props.detect.authors && this.props.detect.authors.join(', ');
    var notes = this.props.detect.notes;
    var doc = this.props.detect.doc;
    return (
      <root className="BoxSet">
        <div className="BoxSet-item">
          <div className="Box c-contrast">
            <div className="t-heading u-textTruncate">{this.props.detect.name}</div>
          </div>
        </div>
        {doc &&
        <div className="BoxSet-item">
          <div className="Box c-contrast">
            <div className="t-label">Description</div>
            <div className="t-content" dangerouslySetInnerHTML={{__html: doc}} />
          </div>
        </div>
        }
        {notes && notes.length &&
        <div className="BoxSet-item">
          <div className="Box c-contrast">
            <div className="t-label">More detail</div>
            <ul className="t-content">
              {this.props.detect.notes.map(function(result, i) {
                return (
                    <li><a href={result.href} target="_blank">{result.name}</a></li>
                );
              }.bind(this))}
            </ul>
          </div>
        </div>
        }
        {authors &&
        <div className="BoxSet-item">
          <div className="Box c-contrast">
            <div className="t-label">Authors</div>
            <div className="t-content">
              <p>{authors}</p>
            </div>
          </div>
        </div>
        }
      </root>
    );

    // var authors = this.props.detect.authors && this.props.detect.authors.join(', ');
    // return (
    //   <div className="detail c_box">
    //     <a href="#" className="detail__close" onClick={this.closePanel}>CLOSE</a>
    //     <ul className="tags">
    //       <li>
    //         <a href="#" className="t_label c_linkbox">css</a>
    //       </li><li>
    //         <a href="#" className="t_label c_linkbox">animation</a>
    //       </li></ul>
    //       <h1>{this.props.detect.name}</h1>
    //       {authors &&
    //         <p>by {authors}</p>
    //       }
    //       {this.props.detect.doc &&
    //       <div className="desc" dangerouslySetInnerHTML={{__html: this.props.detect.doc}} />
    //       }
    //       <h2>Usage</h2>
    //       <dl className="cf">
    //       <dt>CSS</dt>
    //       <dd><code>{'.css-transitions .foo { }'}</code></dd>
    //       <dt>JS</dt>
    //       <dd><code>{'if(Modernizr.csstransitions)'}</code></dd>
    //     </dl>
    //   </div>
    // );
  }

});

module.exports = Detail;

