/**
 * @jsx React.DOM
 */

var Comment = React.createClass({
  render: function() {
    return (
      <div id="comments-form" className="row-fluid hidden-xs">
        <form className="form-inline" role="form">
          <div className="col-xs-8 col-md-6 col-md-offset-4">
            <textarea className='animated col-xs-12' id="commentText"></textarea>
          </div>
          <div className="col-xs-4 col-md-2">
            <button type="submit" className="btn btn-primary" id="submitComment">Comment</button>
          </div>
        </form>
      </div>
    );
  }
});

module.exports = Comment; 
