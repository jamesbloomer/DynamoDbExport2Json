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

    it('should copy simple text file', function(done) {
        var expected = 'file contents\n';    
        convert('simple-test-file.txt', 'test/output1.json', function(e) {
            fs.readFile('test/output1.json', 'utf8', function(e2, data) {
                assert.equal(data, expected);
                return done();
            });
        });
    });

    it('should convert dynamodb output to json', function(done) {
        var expected = '{}';    
        convert('test-file.txt', 'test/output2.json', function(e) {
            fs.readFile('test/output2.json', 'utf8', function(e2, data) {
                assert.equal(data, expected);
                return done();
            });
        });
    });
});
