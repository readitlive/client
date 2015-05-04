var React = require('react');
var {Link} = require('react-router');

var UserBox = require('./UserBox');
var ViewerCountStore = require('../stores/ViewerCountStore');

require('./__styles__/TopBar.styl');

var TopBar = React.createClass({
  propTypes: {
    event: React.PropTypes.object,
    user: React.PropTypes.object
  },

  getInitialState() {
    return {
      viewerCount: 0
    };
  },

  //if the user is not logged in, show sign in/up
  componentDidMount() {
    ViewerCountStore.addChangeListener(this.checkStores);
  },
  componentWillUnmount() {
    ViewerCountStore.removeChangeListener(this.checkStores);
  },
  checkStores() {
    this.setState({
      viewerCount: ViewerCountStore.getViewerCount()
    });
  },

  getDefaultProps() {
    return {event: {}};
  },

  render: function() {
    var isLive = this.props.event.isLive ? 'Live' : 'Event Ended';
    return (
      <nav className="card TopBar" role="navigation">
        <Link to="events" className="navbar-brand">Live Update Guy</Link>
        <h5 className="navbar-text" style={{flex: 1}}>{this.props.event.eventTitle}</h5>
        <form action="https://www.paypal.com/cgi-bin/webscr" method="post" className="navbar-text paypal-button" target="_blank">
          <input type="hidden" name="cmd" value="_donations" />
          <input type="hidden" name="business" value="charles@pelkey.com" />
          <input type="hidden" name="lc" value="US" />
          <input type="hidden" name="item_name" value="Charles Pelkey" />
          <input type="hidden" name="no_note" value="0" />
          <input type="hidden" name="currency_code" value="USD" />
          <input type="hidden" name="bn" value="PP-DonationsBF:btn_donateCC_LG.gif:NonHostedGuest" />
          <input type="image" src="https://www.paypalobjects.com/en_US/i/btn/btn_donate_LG.gif" border="0" name="submit" alt="PayPal - The safer, easier way to pay online!" />
          <img alt="" border="0" src="https://www.paypalobjects.com/en_US/i/scr/pixel.gif" width="1" height="1" />
        </form>
        <span>{isLive}</span>
        <span className="navbar-text">Viewer Count: {this.state.viewerCount}</span>
        <UserBox userLogin={this.props.handleLogin} user={this.props.user}/>
      </nav>
    );
  }
});


module.exports = TopBar;
