// https://github.com/odysseyscience/react-s3-uploader


/**
 * Taken, CommonJS-ified, and heavily modified from:
 * https://github.com/flyingsparx/NodeDirectUploader
 */

var imageresize = require('./imageresize');

S3Upload.prototype.fileElement = null;

S3Upload.prototype.onFinishS3Put = function(signResult) {
    return console.log('base.onFinishS3Put()', signResult.publicUrl);
};

S3Upload.prototype.onProgress = function(percent, status) {
    return console.log('base.onProgress()', percent, status);
};

S3Upload.prototype.onError = function(status) {
    return console.log('base.onError()', status);
};

function S3Upload(options) {
    if (options === null) {
        options = {};
    }
    for (var option in options) {
        if (options.hasOwnProperty(option)) {
            this[option] = options[option];
        }
    }
    this.handleFileSelect(this.fileElement);
}

S3Upload.prototype.handleFileSelect = function(fileElement) {
    this.onProgress(0, 'Upload started.');
    var files = fileElement.files;
    var result = [];
    for (var i=0; i < files.length; i++) {
        var f = files[i];
        result.push(this.uploadFile(f));
    }
    return result;
};

S3Upload.prototype.createCORSRequest = function(method, url) {
    var xhr = new XMLHttpRequest();

    if (xhr.withCredentials != null) {
        xhr.open(method, url, true);
    }
    else if (typeof XDomainRequest !== "undefined") {
        xhr = new XDomainRequest();
        xhr.open(method, url);
    }
    else {
        xhr = null;
    }
    return xhr;
};

// S3Upload.prototype.executeOnSignedUrl = function(file, callback) {
//     var xhr = new XMLHttpRequest();
//     var fileName = this.filename.replace(/\s+/g, "_");
//     xhr.open('GET', this.signingUrl + '?objectName=' + fileName, true);
//     xhr.overrideMimeType && xhr.overrideMimeType('text/plain; charset=x-user-defined');
//     xhr.onreadystatechange = function() {
//         if (xhr.readyState === 4 && xhr.status === 200) {
//             var result;
//             try {
//                 result = JSON.parse(xhr.responseText);
//             } catch (error) {
//                 this.onError('Invalid signing server response JSON: ' + xhr.responseText);
//                 return false;
//             }
//             return callback(result);
//         } else if (xhr.readyState === 4 && xhr.status !== 200) {
//             return this.onError('Could not contact request signing server. Status = ' + xhr.status);
//         }
//     }.bind(this);
//     return xhr.send();
// };

// function upload_file(file, signed_request, url){
//     var xhr = new XMLHttpRequest();
//     xhr.open("PUT", signed_request);
//     xhr.setRequestHeader('x-amz-acl', 'public-read');
//     xhr.onload = function() {
//         if (xhr.status === 200) {
//             document.getElementById("preview").src = url;
//             document.getElementById("avatar_url").value = url;
//         }
//     };
//     xhr.onerror = function() {
//         alert("Could not upload file.");
//     };
//     xhr.send(file);
// }

S3Upload.prototype.uploadToS3 = function(file) {
    var xhr = this.createCORSRequest('PUT', this.signingUrl);
    if (!xhr) {
        this.onError('CORS not supported');
    } else {
        xhr.onload = function() {
            if (xhr.status === 200) {
                this.onProgress(100, 'Upload completed.');
                return this.onFinishS3Put(this.signingData);
            } else {
                return this.onError('Upload error: ' + xhr.status);
            }
        }.bind(this);
        xhr.onerror = function() {
            return this.onError('XHR error.');
        }.bind(this);
        xhr.upload.onprogress = function(e) {
            var percentLoaded;
            if (e.lengthComputable) {
                percentLoaded = Math.round((e.loaded / e.total) * 100);
                return this.onProgress(percentLoaded, percentLoaded === 100 ? 'Finalizing.' : 'Uploading.');
            }
        }.bind(this);
    }
    xhr.setRequestHeader('Content-Type', file.type);
    xhr.setRequestHeader('x-amz-acl', 'public-read');
    return xhr.send(file);
};

S3Upload.prototype.uploadFile = function(file) {
  if (this.size) {
    imageresize.loadAndResize(file, this.size, (smallFile) => {
      this.uploadToS3(smallFile);
    });
  } else {
    this.uploadToS3(file);
  }
};


module.exports = S3Upload;
