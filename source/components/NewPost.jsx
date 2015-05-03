var React = require('react');
var PostsActions = require('../actions/PostsActions');

require('./__styles__/NewPost.styl');

var NewPost = React.createClass({
  propTypes: {
    isComment: React.PropTypes.bool.isRequired
  },

  handleSubmit(e) {
    e.preventDefault();
    var entryText = this.refs.text.getDOMNode().value;
    if (entryText) {
      PostsActions.submit(entryText, this.props.isComment);
      this.refs.text.getDOMNode().value = '';
    }
  },

  checkSubmit(e) {
    if (e.keyCode === 13 && e.ctrlKey) {
      this.handleSubmit(e);
    }
  },

  render() {
    return (
      <div className="NewPost container">
        <div className="row card">
          <div className="two columns">
            <button onClick={this.handleSubmit}>Comment</button>
          </div>
          <form className="ten columns body-text text-area" role="form">
            <textarea onKeyDown={this.checkSubmit} ref="text"></textarea>
          </form>
        </div>
      </div>
    );
  }
});

module.exports = NewPost;
