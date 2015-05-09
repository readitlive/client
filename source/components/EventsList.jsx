var React = require('react');
var {Link} = require('react-router');
var R = require('ramda');
var UserBox = require('./UserBox');
var LoginStore = require('../stores/LoginStore');

var API = require('../helpers/ApiHelper');

var Event = React.createClass({
  propTypes: {
    event: React.PropTypes.object.isRequired
  },

  render() {
    return (
      <div className="row card post">
        <Link to={'write'} params={{eventId: this.props.event._id}}>
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
    if (title) {
      API('POST', 'event', {eventTitle: title}, (err, data) => {
        if (err) {
          console.log(err);
          return;
        }
        //TODO send admin users
        this.context.router.transitionTo('write', {eventId: data._id});
      });
    }
  },

  render() {
    return (
      <div>
        <div className="row card post flex-box">
          <div>Create New Event:</div>
          <input ref="title" placeholder="Event Name" style={{flex: 1, margin: "0 12px"}} />
          <div className="hyperbutton" onClick={this.create}>Create</div>
        </div>
      </div>
    );
  }
});

var EventsList = React.createClass({

  statics: {
    getStateFromStores() {
      return {
        user: LoginStore.getCurrentUser()
      };
    }
  },

  getInitialState() {
    return EventsList.getStateFromStores();
  },

  componentDidMount() {
    API('GET', 'event', {}, (err, data) => {
      this.setState({data: R.reverse(data)});
    });
    LoginStore.addChangeListener(this.handleStoreChange);
  },

  componentWillUnmount() {
    LoginStore.removeChangeListener(this.handleStoreChange);
  },

  handleStoreChange() {
    this.setState(EventsList.getStateFromStores());
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
      <div className="ril-container">
        <div className="flex-right">
          <UserBox user={this.state.user}/>
        </div>
        {this.state.user && <NewEvent />}
        {events}
      </div>
    );
  }
});

module.exports = EventsList;
