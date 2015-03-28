
var LoginStore = require('../stores/LoginStore');
var React = require('react');

var Navbar = require('./navbar');
var Comment = require('./comment');
var Post = require('./post');

var WriteApp = React.createClass({

  getInitialState: function () {
    return {
      user: dummyUser,
      postData: dummyPostData,
      header: dummyHeader
    };
  },

  // render: function() {
  //
  //   var isAuthenticated = dummyAuthentication;
  //
  //   if (isAuthenticated) {
  //     var comment = <Comment />;
  //   }
  // },

  render: function() {
    var postNodes = this.state.postData.map(function(post) {
      return (
        <div>
          <Post metaData={post.metaData} text={post.text} />
        </div>
      );
    }.bind(this));

    var isAuthenticated = function() {
      if (this.state.user) {
        return (
          <div>
            <div />
          </div>
        );
      }
    }.bind(this);

    return (
      <div>
        <Navbar navbarData={this.state.header} user={this.state.user} />
        {isAuthenticated()}
        {postNodes}
      </div>
    );
  }
});

var dummyUser = {
  username: 'bob',
  eventAdmin: true,
  avatarUrl: 'http://liveblogphotos.s3-us-west-2.amazonaws.com/c1b8987d-9a4a-4f32-b8db-86e5e3e1a662.jpeg'
};

var dummyPostData = [
  {
    metaData: {author: 'Forest', timeEU: 'ten minutes ago'},
    text: 'Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts. Separated they live in Bookmarksgrove right at the coast of the Semantics, a large language ocean. A small river named Duden flows by their place and supplies it with the necessary regelialia. It is a paradisematic country, in which roasted parts of sentences fly into your mouth. Even the all-powerful Pointing has no control about the blind texts it is an almost unorthographic life One day however a small line of blind text by the name of Lorem Ipsum decided to leave for the far World of Grammar. The Big Oxmox advised her not to do so, because there were thousands of bad Commas, wild Question Marks and devious Semikoli, but the Little Blind Text didn’t listen. She packed her seven versalia, put her initial into the belt and made herself on the way. When she reached the first hills of the Italic Mountains, she had a last view back on the skyline of her hometown Bookmarksgrove, the headline of Alphabet Village and the subline of her own road, the Line Lane. Pityful a rethoric question ran over her cheek, then'
  },
  {
    metaData: {author: 'Greg', timeEU: 'ten minutes ago'},
    text: 'Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts. Separated they live in Bookmarksgrove right at the coast of the Semantics, a large language ocean. A small river named Duden flows by their place and supplies it with the necessary regelialia. It is a paradisematic country, in which roasted parts of sentences fly into your mouth. Even the all-powerful Pointing has no control about the blind texts it is an almost unorthographic life One day however a small line of blind text by the name of Lorem Ipsum decided to leave for the far World of Grammar. The Big Oxmox advised her not to do so, because there were thousands of bad Commas, wild Question Marks and devious Semikoli, but the Little Blind Text didn’t listen. She packed her seven versalia, put her initial into the belt and made herself on the way. When she reached the first hills of the Italic Mountains, she had a last view back on the skyline of her hometown Bookmarksgrove, the headline of Alphabet Village and the subline of her own road, the Line Lane. Pityful a rethoric question ran over her cheek, then'
  },
  {
    metaData: {author: 'Forest', timeEU: 'ten minutes ago'},
    text: 'Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts. Separated they live in Bookmarksgrove right at the coast of the Semantics, a large language ocean. A small river named Duden flows by their place and supplies it with the necessary regelialia. It is a paradisematic country, in which roasted parts of sentences fly into your mouth. Even the all-powerful Pointing has no control about the blind texts it is an almost unorthographic life One day however a small line of blind text by the name of Lorem Ipsum decided to leave for the far World of Grammar. The Big Oxmox advised her not to do so, because there were thousands of bad Commas, wild Question Marks and devious Semikoli, but the Little Blind Text didn’t listen. She packed her seven versalia, put her initial into the belt and made herself on the way. When she reached the first hills of the Italic Mountains, she had a last view back on the skyline of her hometown Bookmarksgrove, the headline of Alphabet Village and the subline of her own road, the Line Lane. Pityful a rethoric question ran over her cheek, then'
  },
  {
    metaData: {author: 'Steve', timeEU: 'ten minutes ago'},
    text: 'Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts. Separated they live in Bookmarksgrove right at the coast of the Semantics, a large language ocean. A small river named Duden flows by their place and supplies it with the necessary regelialia. It is a paradisematic country, in which roasted parts of sentences fly into your mouth. Even the all-powerful Pointing has no control about the blind texts it is an almost unorthographic life One day however a small line of blind text by the name of Lorem Ipsum decided to leave for the far World of Grammar. The Big Oxmox advised her not to do so, because there were thousands of bad Commas, wild Question Marks and devious Semikoli, but the Little Blind Text didn’t listen. She packed her seven versalia, put her initial into the belt and made herself on the way. When she reached the first hills of the Italic Mountains, she had a last view back on the skyline of her hometown Bookmarksgrove, the headline of Alphabet Village and the subline of her own road, the Line Lane. Pityful a rethoric question ran over her cheek, then'
  }
];

var dummyHeader = {headerData: { brand: 'Live Update Guy', currentEvent: 'Vuelta a España 2014: Stage 4: Mairena del Alcor to Córdoba, 164.7km'}, isLive: 'true' };

module.exports = WriteApp;
