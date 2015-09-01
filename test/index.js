'use strict';

var path = require('path');
var assert = require('assert');

describe('nock-back-mocha', function () {
    it('dangles nockDone on the currentTest', function (done) {
        var nockBackMocha = require('..')(path.resolve(__dirname, 'fixtures'));
        var mochaContext = {
            currentTest: {
                title: 'current test title'
            }
        };
        nockBackMocha.beforeEach.call(mochaContext, function (err) {
            assert(typeof mochaContext.currentTest.nockDone === 'function', 'nockDone must be set by beforeEach');
            done(err);
        });
    });

    it('throws if file path is used more than once', function (done) {
        var nockBackMocha = require('..')(path.resolve(__dirname, 'fixtures'));
        var mochaContext = {
            currentTest: {
                title: 'current test title'
            }
        };
        nockBackMocha.beforeEach.call(mochaContext, function () {
            nockBackMocha.beforeEach.call(mochaContext, function (err) {
                assert(err && err.message === 'nock-back-mocha does not support multiple tests with the same name. current test title.json cannot be reused.');
                done();
            });
        });
    });
});
