# nock-back-mocha

Thin wrapper around [nock.back](https://github.com/pgte/nock#nock-back) that uses different nock files for each test, and cleans up when the mocha test is done.

### Arguments
- directory - where do you want the nock files stored?

### Usage
```js
describe('Tests that make http requests', function () {
    var nockFixtureDirectory = path.resolve(__dirname, './fixtures');
    var nockBackMocha = require('nock-back-mocha')(nockFixtureDirectory);
    beforeEach(nockBackMocha.beforeEach);
    afterEach(nockBackMocha.afterEach);
    
    it('makes an http request', function (done) {
        request('http://example.com', function (err, res, body) {
            done(err);
        });
    });
});
```

> Pro Tip: use in combination with [NOCK_BACK_MODE](https://github.com/pgte/nock#modes) to generate http fixtures for your tests
