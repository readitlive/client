var React = require('react');
var {Link} = require('react-router');
var R = require('ramda');

var API = require('../helpers/ApiHelper');

var Event = React.createClass({
  propTypes: {
    event: React.PropTypes.object.isRequired
  },

  render() {
    return (
      <div className="row card post">
        <Link to={'/write/' + this.props.event._id}>
          {this.props.event.eventTitle}
        </Link>
        <span>{this.props.event.eventIsLive ? 'Live' : 'Ended'}</span>
      </div>
    );
  }
});

var NewEvent = React.createClass({
  contextTypes: {
    router: React.PropTypes.func
  },

  create() {
    var title = this.refs.title.getDOMNode().value;
    API('POST', 'event', {eventTitle: title}, (err, data) => {
      if (err) {
        console.log(err);
        return;
      }
      //TODO send admin users
      this.context.router.transitionTo('write', {eventId: data._id});
    });
  },

  render() {
    return (
      <div className="row card post">
        <span>Create New Event:</span>
        <input ref="title" placeholder="Event Name" />
        <div className="hyperbutton" onClick={this.create}>Create</div>
      </div>
    );
  }
});

var EventsList = React.createClass({

  getInitialState() {
    return {};
  },

  componentDidMount() {
    API('GET', 'event', {}, (err, data) => {
      this.setState({data: data});
    });
  },


  render() {
    var events;
    if (this.state.data) {
      events = R.map((event, i) => {
        return (
          <Event event={event} key={i}/>
        );
      }, this.state.data);
    }

    return (
      <div className="container">
        <NewEvent />
        {events}
      </div>
    );
  }
});

module.exports = EventsList;
