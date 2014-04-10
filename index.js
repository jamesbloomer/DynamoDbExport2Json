var es = require("event-stream"),
    fs = require('fs');

module.exports = function(exportFilePath, outputFilePath, done) {

    var s = fs.createReadStream(exportFilePath)
        .pipe(es.replace('{"n":', '{'))
        .pipe(es.replace('{"s":', '{'))
        .pipe(es.replace('{"sS":[', '{['))
        .pipe(es.replace(String.fromCharCode(3) + '{', ':')) // ETX
        .pipe(es.replace('}' + String.fromCharCode(2), ',')) // STX
        .pipe(es.replace('}' + String.fromCharCode(10), String.fromCharCode(10))) // EOL
        .pipe(es.replace('["', '['))
        .pipe(es.replace('"]', ']'))
        .pipe(es.replace('}","{','},{'))
        .pipe(es.replace('\\"', '"'))
        .pipe(es.split("\n"))
        .pipe(es.mapSync(function(data) {
            if(data.length > 0) {
                return '{' + data + '}';
            }
         }))
        .pipe(es.mapSync(function(data) {
           var changed = data.replace(/{(?!")([^{:,]+):/g, '{"$1":');
           return changed;
        }))
        .pipe(es.mapSync(function(data) {
           var changed = data.replace(/,(?!")([^{:,]+):/g, ',"$1":');
           return changed;
        }))
        .pipe(es.join(","))
        .pipe(es.wait())
        .pipe(es.mapSync(function(data) {
            return '[' + data + ']';
         }))
        .pipe(fs.createWriteStream(outputFilePath));

    return s.on('close', done);
};
