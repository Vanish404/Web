var app = require('../app');
var should = require('should');
var supertest = require('supertest');

describe('home page', function () {
   it('should return home page',
       function(done) {
        supertest(app)
            .get('/')
            .expect(200)
            .end(function (err, res) {
                res.status.should
            });
        done();
    });
});