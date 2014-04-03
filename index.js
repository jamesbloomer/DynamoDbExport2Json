var fs = require('fs');

module.exports = function(exportFilePath, outputFilePath, done) {
    fs.createReadStream('test/test-file.txt')
        .pipe(fs.createWriteStream(outputFilePath));
    return done();
};
