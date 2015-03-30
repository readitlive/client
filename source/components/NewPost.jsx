var React = require('react');
var PostsActions = require('../actions/PostsActions');

var NewPost = React.createClass({
  handleSubmit: function(e) {
    e.preventDefault();
    var post = this.refs.text.getDOMNode().value
    if (post)
      PostsActions.submit(post);
  },

  render: function() {
      return (
        <div className="NewPost card">
          <form className="container" role="form">
            <textarea ref="text"></textarea>
            <button onClick={this.handleSubmit}>Comment</button>
          </form>
        </div>
      );
  }
});

module.exports = NewPost;
