var React = require('react');
var PostsActions = require('../actions/PostsActions');

require('./__styles__/Post.styl');

var Post = React.createClass({
  propTypes: {
    post: React.PropTypes.object.isRequired
  },

  handleDelete() {
    PostsActions.delete(this.props.post)
  },

  render() {
    return (
      <div className="row card post">
        <PostMeta post={this.props.post}/>
        <PostText post={this.props.post}/>
        <button onClick={this.handleDelete}>Delete</button>
      </div>
    );
  }
});

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
      <div className="ten columns body-text"
        dangerouslySetInnerHTML={{__html: this.props.post.postText}}
      />
    );
  }
});

module.exports = Post;
