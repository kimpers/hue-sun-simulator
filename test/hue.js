/* jshint esnext: true */
'use strict'
const expect = require('chai').expect;
const hue = require('../lib/hue');
const mock = require('./mock.js');




const sunriseState = [ 'on', 'hue(46920)', 'sat(254)', 'bri(0)', 'on', 'hue(65280)',
      'bri(128)', 'transition(0)', 'on', 'hue(12750)', 'bri(254)', 'transition(0)',
      'on', 'sat(0)', 'transition(0)' ];

describe('sunrise', () => {
  it('simulates in correct order', (done) => {
    const lightState = mock.createLightState();
    hue.sunrise(mock.api, lightState, mock.options).then((results) => {
      try{
        expect(results.state).to.eql(sunriseState);
        done();
      } catch(e) {
        done(e);
      }
    });
  });
});

describe('sunset', () => {
  it('simulates in correct order', (done) => {
    const lightState = mock.createLightState();
    hue.sunset(mock.api, lightState, mock.options).then((results) => {
      try{
        expect(results.state).to.eql(sunriseState);
        done();
      } catch(e) {
        done(e);
      }
    });
  });
});

