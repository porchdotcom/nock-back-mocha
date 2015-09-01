'use strict';

var nock = require('nock');

module.exports = function (fixtures, mode) {
    var filenames = [];
    return {
        beforeEach: function (done) {
            var filename = this.currentTest.title + '.json';
            // make sure we're not reusing the nock file
            if (filenames.indexOf(filename) !== -1) {
                return done(new Error('nock-back-mocha does not support multiple tests with the same name. ' + filename + ' cannot be reused.'));
            }
            filenames.push(filename);

            var previousFixtures = nock.back.fixtures;
            nock.back.fixtures = fixtures;

            var previousMode = nock.back.currentMode;
            nock.back.setMode(mode);

            nock.back(filename, function (nockDone) {
                this.currentTest.nockDone = function () {
                    nockDone();
                    nock.back.setMode(previousMode);
                    nock.back.fixtures = previousFixtures;
                };
                done();
            }.bind(this));
        },
        afterEach: function () {
            this.currentTest.nockDone();
        }
    };
};
