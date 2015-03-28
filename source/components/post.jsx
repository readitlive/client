var React = require('react');

var Post = React.createClass({
  render: function() {
    return (
      <div className="row-fluid">
        <div className="col-xs-12 post">
          <div className="row-fluid">
            <PostMeta metaData={this.props.metaData}/>
            <PostText text={this.props.text}/>
          </div>
        </div>
      </div>
    );
  }
});

var PostMeta = React.createClass({
  render: function() {
    var avatar = this.props.metaData.avatarUrl || 'http://higoodbye.com/assets/img/default-avatar.jpg';

    return (
      <div className="col-xs-2 col-md-offset-3 post-side">
        <img className="img-responsive avatar-pic" height="80" width="80" src={avatar} />
        <div className="hidden-xs">
          <p className="post-meta">{this.props.metaData.author}</p>
        </div>
        <p className="post-meta post-meta-time">{this.props.metaData.timeEU}</p>
      </div>
    );
  }
});

var PostText = React.createClass({
  render: function() {
    return (
      <div className="col-xs-10 col-md-7 no-padding">
        <div className="post-body col-xs-12">
          <pre className="post-body-text">{this.props.text}</pre>
        </div>
      </div>
    );
  }
});

module.exports = Post;
