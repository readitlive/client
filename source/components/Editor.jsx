var React = require('react');
var PostsActions = require('../actions/PostsActions');

require('./__styles__/NewPost.styl');

var NewPost = React.createClass({
  handleSubmit(e) {
    e.preventDefault();
    var entryText = this.refs.text.getDOMNode().value;
    if (entryText) {
      PostsActions.submit(entryText);
    }
    this.refs.text.getDOMNode().value = '';
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
            <div className="hyperbutton" onClick={this.handleSubmit}>Comment</div>
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
