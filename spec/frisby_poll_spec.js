var frisby = require('../lib/frisby');
var express = require('./fixtures/poll_express/pollwebservice.js'); // Start the express server to test against


describe('Frisby polling system', function() {

  it('Poll until body is "ok"', function() {
    
    frisby.create('Polling should work if the maximum retries is not reached')
      .pollUntil( function ( err, res, body ){
        return body == "ok"
      }, 200, 2 )
      .get('http://localhost:1339/succeed-every-third-req')
      .expectStatus(200)
    .toss();

    frisby.create('Polling should fail if the maximum retries is passed')
      .pollUntil( function ( err, res, body ){
        return body == "ok"
      }, 200, 1 )
      .get('http://localhost:1339/succeed-every-third-req')
      .expectStatus(404)
    .toss();
  
  });


  it('Poll until body.content is "ok"', function() {

    frisby.create('Polling should work if the maximum retries is not reached')
      .pollUntilJSON( function ( json ){
        return (json && json.content == "ok")
      }, 200, 2 )
      .get('http://localhost:1339/succeed-every-third-req-json')
      .expectStatus(200)
    .toss();

    frisby.create('Polling should fail if the maximum retries is passed')
      .pollUntilJSON( function ( json ){
        return (json && json.content == "ok")
      }, 200, 1 )
      .get('http://localhost:1339/succeed-every-third-req-json')
      .expectStatus(404)
      .after(function(){ express.close(); }) //close express on last call
    .toss();

  });

});