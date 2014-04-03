var es = require("event-stream"),
    fs = require('fs');

module.exports = function(exportFilePath, outputFilePath, done) {
    fs.createReadStream('test/test-file.txt')
        .pipe(es.replace(String.fromCharCode(3), ':')) // ETX
        .pipe(es.replace(String.fromCharCode(2), ',')) // STX
        .pipe(es.replace(String.fromCharCode(10), '},{')) // STX
        .pipe(fs.createWriteStream(outputFilePath));
    return done();
};
