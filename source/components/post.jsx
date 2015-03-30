var React = require('react');

require('./__styles__/Post.styl')

var Post = React.createClass({
  render: function() {
    return (
      <div className="row card post">
        <PostMeta metaData={this.props.metaData}/>
        <PostText text={this.props.text}/>
      </div>
    );
  }
});

var PostMeta = React.createClass({
  render: function() {
    var avatar = this.props.metaData.avatarUrl || '/img/default-avatar.png';
    return (
      <div className="two columns">
        <img className="img-responsive avatar-pic" height="80" width="80" src={avatar} />
        <p className="meta">{this.props.metaData.author}</p>
        <p className="meta meta-time">{this.props.metaData.timeEU}</p>
      </div>
    );
  }
});

var PostText = React.createClass({
  render: function() {
    return (
      <div className="ten columns body-text">
        {this.props.text}
      </div>
    );
  }
});

module.exports = Post;
