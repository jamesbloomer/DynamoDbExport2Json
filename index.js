var es = require("event-stream"),
    fs = require('fs');

module.exports = function(exportFilePath, outputFilePath, done) {
    fs.createReadStream('test/test-file.txt')
        .pipe(es.replace(String.fromCharCode(3), ':')) // ETX
        .pipe(es.replace(String.fromCharCode(2), ',')) // STX
        .pipe(es.split("\n"))
        .pipe(es.mapSync(function(data) {
            return '{' + data + '}';
         }))
        .pipe(es.join(","))
        //.pipe(es.replace(',{}'), '')
        //.pipe(es.wait())
        //.pipe(es.mapSync(function(data) {
        //    return '{' + data + '}';
        // }))
        .pipe(fs.createWriteStream(outputFilePath));
    return done();
};
