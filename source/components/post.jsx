var React = require('react');

require('./__styles__/Post.styl');

var Post = React.createClass({
  propTypes: {
    post: React.PropTypes.object.isRequired
  },

  render: function() {
    return (
      <div className="row card post">
        <PostMeta post={this.props.post}/>
        <PostText post={this.props.post}/>
      </div>
    );
  }
});

var PostMeta = React.createClass({
  propTypes: {
    post: React.PropTypes.object.isRequired
  },

  render: function() {
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

  render: function() {
    return (
      <div className="ten columns body-text"
        dangerouslySetInnerHTML={{__html: this.props.post.postText}}
      />
    );
  }
});

module.exports = Post;
