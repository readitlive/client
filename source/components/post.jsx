var React = require('react');
var PostsActions = require('../actions/PostsActions');

require('./__styles__/Post.styl');

var PostMeta = React.createClass({
  propTypes: {
    post: React.PropTypes.object.isRequired
  },

  render() {
    var avatar = this.props.post.avatarUrl || '/img/default-avatar.png';
    return (
      <div className="two columns">
        <img className="img-responsive avatar-pic" height="80" width="80" src={avatar} />
        <p className="meta">{this.props.post.author}</p>
        <p className="meta meta-time">{this.props.post.timeEU}</p>
      </div>
    );
  }
});

var PostText = React.createClass({
  propTypes: {
    post: React.PropTypes.object.isRequired
  },

  render() {
    return (
      <div className="eight columns body-text"
        dangerouslySetInnerHTML={{__html: this.props.post.postText}}/>
    );
  }
});

var AdminArea = React.createClass({
  propTypes: {
    post: React.PropTypes.object.isRequired,
    editing: React.PropTypes.bool.isRequired
  },

  handleDelete() {
    PostsActions.delete(this.props.post)
  },

  render() {
    if (this.props.editing) {
      return (
        <div className="ten columns">
          <Editor
            post={this.props.post}
            handleCancel={() => this.setState({editing: false}) }
            handleSubmit={this.handleSubmit} />
        </div>
      );
    } else {
      return (
        <div className="two columns">
          <button onClick={this.handleDelete}>Delete</button>
          <button onClick={this.props.handleEdit}>Edit</button>
        </div>
      );
    }
  }
});

var Editor = React.createClass({
  propTypes: {
    post: React.PropTypes.object.isRequired,
    handleCancel: React.PropTypes.func.isRequired,
    handleSubmit: React.PropTypes.func.isRequired
  },

  handleSubmit(e) {
    e.preventDefault();
    var entryText = this.refs.text.getDOMNode().value;
    if (entryText) {
      this.props.handleSubmit(entryText);
    }
  },

  checkSubmit(e) {
    if (e.keyCode === 13 && e.ctrlKey) {
      this.handleSubmit(e);
    }
  },

  render() {
    return (
      <div className="eight columns body-text">
        <form className="ten columns body-text text-area" role="form">
          <textarea
            value={this.props.post.postText}
            onKeyDown={this.checkSubmit}
            ref="text" />
        </form>
      </div>
    );
  }
});

var Post = React.createClass({
  propTypes: {
    post: React.PropTypes.object.isRequired
  },

  getInitialState() {
    return {
      editing: false
    };
  },

  handleSubmit(entry) {
    PostActions.update(this.props.post._id, entry)
  },

  render() {
    var post = (<PostText post={this.props.post}/>);

    return (
      <div className="row card post">
        <PostMeta post={this.props.post}/>
        {!this.state.editing && post}
        <AdminArea
          editing={this.state.editing}
          post={this.props.post}
          handleEdit={() => this.setState({editing: true})}
        />
      </div>
    );
  }
});

module.exports = Post;
