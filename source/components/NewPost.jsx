var React = require('react');
var PostsActions = require('../actions/PostsActions');

require('./__styles__/NewPost.styl');

var NewPost = React.createClass({
  handleSubmit: function(e) {
    e.preventDefault();
    var entryText = this.refs.text.getDOMNode().value;
    if (entryText)
      PostsActions.submit(entryText);
  },

  render: function() {
      return (
        <div className="NewPost container">
          <div className="row card">
            <div className="two columns">
              <button onClick={this.handleSubmit}>Comment</button>
            </div>
            <form className="ten columns body-text text-area" role="form">
              <textarea ref="text"></textarea>
            </form>
          </div>
        </div>
      );
  }
});

module.exports = NewPost;
