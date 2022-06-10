var fs = require('fs')
import * as sharp from 'sharp';
function getDestination (req, file, cb) {
  cb(null, '/dev/null')
}

function MyCustomStorage (opts) {
  this.getDestination = (opts.destination || getDestination)
}

MyCustomStorage.prototype._handleFile = function _handleFile (req, file, cb) {
  this.getDestination(req, file, async function (err, path) {
    if (err) return cb(err)

    console.log(path);
    const image = sharp(path);
    image.metadata();
    console.log(image);

    var outStream = fs.createWriteStream(path)
    file.stream.pipe(outStream)
    outStream.on('error', cb)
    outStream.on('finish', function () {
      cb(null, {
        path: path,
        size: outStream.bytesWritten
      })
    })
  })
}

MyCustomStorage.prototype._removeFile = function _removeFile (req, file, cb) {
  fs.unlink(file.path, cb)
}

export default (opts) => {
  return new MyCustomStorage(opts)
}