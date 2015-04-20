var assert = require('assert');
var config2env = require('../src/config2env');
var data;

describe('config2env', function() {
  it('should not fail', function() {
     data = config2env('../test/assets/development.json');
  });

  it('should convert keys to CONSTANT_CASE', function() {
    assert.equal(data[4].env, 'MONGO_URL');
    assert.equal(data[5].env, 'CORS_DOMAINS');
  });

  it('should convert nested keys to CONSTANT_CASE', function() {
    assert.equal(data[8].env, 'AUTH_BASIC_USERNAME');

  });

  it('should handle string values', function() {
    assert.equal(data[0].env, 'PROTOCOL');
    assert.equal(data[0].value, 'http');
  });

  it('should handle array values', function() {
    assert.equal(data[5].env, 'CORS_DOMAINS');
    assert.equal(data[5].value, 'http://localhost:3001,https://localhost:4443');
  });
});
