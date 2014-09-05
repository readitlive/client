/**
 * @jsx React.DOM
 */

var UserBox = require('./login');

var Navbar = React.createClass({
  render: function() {
    return (
      <nav className="navbar navbar-default" role="navigation">
        <div className="container-fluid">
          <Header headerData={this.props.navbarData.headerData}/>
          <UserOptions isLive={this.props.navbarData.isLive} user={this.props.user} />
        </div>
      </nav>
    );
  }
});

var Header = React.createClass({
  render: function() {
    var currentEvent = this.props.headerData.currentEvent || '';
    return (
      <div className="navbar-header">
        <a className="navbar-brand">{this.props.headerData.brand}</a>
        <h4 className="navbar-text hidden-xs">{currentEvent}</h4>
        <button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
          <span className="sr-only">Toggle navigation</span>
          <span className="icon-bar"></span>
          <span className="icon-bar"></span>
          <span className="icon-bar"></span>
        </button>
      </div>
    );
  }
});

var UserOptions = React.createClass({
  render: function() {
    var isLive = this.props.isLive ? 'Live' : 'Event Ended';
    return (
      <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
        <ul className="nav navbar-nav navbar-right">
          <li>
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
          </li>

        	<li>
  	    		<span className="label label-default navbar-text">{isLive}</span>
  	    	</li>

          <li className="navbar-text">
            <UserBox user={this.props.user}/>
          </li>
        </ul>
      </div>
    );
  }
});


module.exports = Navbar;
