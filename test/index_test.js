var assert = require('assert'), 
    convert = require('../index.js'),
    fs = require('fs');

describe('dynamoDbExport2Json', function() {

    afterEach(function(done) {
        if(fs.existsSync('output.json')) {
            fs.unlink('output.json', done);
        } else {
            return done();
        }
    });

    it('should run tests', function() {
        console.log('running tests');
    });

    it('should convert file to json', function(done) {
        var expected = 'file contents\n';    
        convert('test-file.txt', 'test/output.json', function(e) {
            fs.readFile('test/output.json', 'utf8', function(e2, data) {
                assert.equal(data, expected);
                return done();
            });
        });
    });
});
