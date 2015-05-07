// https://github.com/odysseyscience/react-s3-uploader
var React = require('react');
var S3Upload = require('./s3upload.js');
var objectAssign = require('object-assign');
var API = require('../helpers/ApiHelper');

var ReactS3Uploader = React.createClass({

    propTypes: {
        onProgress: React.PropTypes.func,
        onFinish: React.PropTypes.func,
        onError: React.PropTypes.func,
        size: React.PropTypes.number
    },

    getDefaultProps: function() {
        return {
            onProgress: function(percent, message) {
                console.log('Upload progress: ' + percent + '% ' + message);
            },
            onFinish: function(signResult) {
                console.log("Upload finished: " + signResult.publicUrl)
            },
            onError: function(message) {
                console.log("Upload error: " + message);
            }
        };
    },

    uploadFile: function(e) {
      e.stopPropagation();
      API('POST', 'sign', {filename: this.getDOMNode().files[0].name}, (err, data) => {
        new S3Upload({
          size: this.props.size,
          signingData: data,
          fileElement: this.getDOMNode(),
          signingUrl: data.signedUrl,
          onProgress: this.props.onProgress,
          onFinishS3Put: this.props.onFinish,
          onError: this.props.onError
        });
      });
    },

    render: function() {
        return React.DOM.input(objectAssign({}, this.props, {type: 'file', onChange: this.uploadFile, onClick: (e) => e.stopPropagation()}));
    }

});


module.exports = ReactS3Uploader;
