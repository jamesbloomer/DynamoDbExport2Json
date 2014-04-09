var assert = require('assert'), 
    convert = require('../index.js'),
    fs = require('fs');

describe('dynamoDbExport2Json', function() {

    afterEach(function() {
        if(fs.existsSync('output.json')) {
            fs.unlinkSync('output.json');
        } 
    });

    it('should convert dynamodb output to json', function(done) {
        var expected = '[{"column1":"1","column2":"abc",astringset,{"sS":[{"column5":"ssaaa","column6":false},{"column7":"ssccc","column8":"ssddd","column9":true}]},"column3":"a","column4":"1"},{"column1":"2","column2":"def","column3":"b","column4":"2"},{"column1":"3","column2":"ghi","column3":"c","column4":"3"},{"column1":"4","column2":"jkl","column3":"d","column4":"4"},{"column1":"5","column2":"mno","column3":"e","column4":"5"},{"column1":"6","column2":"pqr","column3":"f","column4":"6"},{"column1":"7","column2":"stu","column3":"g","column4":"7"},{"column1":"8","column2":"vwx","column3":"h","column4":"8"},{"column1":"9","column2":"yza","column3":"i","column3":"9"}]';    
        convert('test/test-file.txt', 'test/output.json', function(e) {
            var data = fs.readFileSync('test/output.json', 'utf8');
            assert.equal(data, expected);
            var obj = JSON.parse(data);
            assert.equal(obj.length, 9);
            return done();
        });
    });
});
