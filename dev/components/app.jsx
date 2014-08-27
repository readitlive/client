/**
 * @jsx React.DOM
 */
var React = require('react');


var App = React.createClass({


  render: function() {
    var sidenavClass = cx({
      'sidenav-collapsed': this.state.sidenavCollapsed
    });

    return (
      <div className="app">
        <HeaderNav handleSidenavClick={this.handleSidenavClick} route={this.props.route}/>
        <SidenavList sidenavCollapsed={this.state.sidenavCollapsed} />
        <section id="main" className={sidenavClass}>
          <section className="wrapper">
            <div>{this.props.page}</div>
          </section>
        </section>
        <br />
      </div>
    );
  }
});

module.exports = App;
