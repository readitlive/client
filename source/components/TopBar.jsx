var React = require('react');

var UserBox = require('./UserBox');

var TopBar = React.createClass({
  render: function() {
    var isLive = this.props.navbarData.isLive ? 'Live' : 'Event Ended';
    var currentEvent = this.props.navbarData.headerData.currentEvent || '';
    return (
      <nav className="top-bar" role="navigation" style={{display: 'flex', 'flex-direction': 'row'}} >
        <a className="navbar-brand">{this.props.navbarData.headerData.brand}</a>
        <h5 className="navbar-text">{currentEvent}</h5>
        <button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
          <span className="sr-only">Toggle navigation</span>
          <span className="icon-bar"></span>
          <span className="icon-bar"></span>
          <span className="icon-bar"></span>
        </button>
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
        <UserBox userLogin={this.props.handleLogin} user={this.props.user}/>
      </nav>
    );
  }
});


module.exports = TopBar;
