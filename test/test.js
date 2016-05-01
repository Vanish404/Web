var app = require('../app');
var should = require('should');
var supertest = require('supertest');

describe('homepage', function () {
    it('should return home page',
        function (done) {
            supertest(app)
                .get('/news')
                .expect(200)
                .end(function (err, res) {
                    res.status.should.equal(200);
                    done();
                });
        });
    it('should return an err',
        function (done) {
            supertest(app)
                .get('/1234')
                .expect(404)
                .end(function (err, res) {
                    res.status.should.equal(404);
                    done();
                });
        });
});
