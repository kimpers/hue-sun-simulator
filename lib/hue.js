/* jshint esnext: true */
'use strict';

function sunrise(api, lightState, options) {
  const TRANSITION_TIME = options && options.TRANSITION_TIME || 180000;
  const DELAY_ONE = options && options.DELAY_ONE || 60000;
  const DELAY_TWO = options && options.DELAY_TWO || 240000;
  const DELAY_THREE = options && options.DELAY_THREE || 420000;
  // Color configurations for sunrise simulation
  const STAGE_1 = lightState.create().on().hue(46920).sat(254).bri(0),
  STAGE_2 = lightState.create().on().hue(65280).bri(128).transition(TRANSITION_TIME),
  STAGE_3 = lightState.create().on().hue(12750).bri(254).transition(TRANSITION_TIME),
  STAGE_4 = lightState.create().on().sat(0).transition(TRANSITION_TIME);

  return api.setLightState(2, STAGE_1)
    .then(() => _delayedLightState(api, 2, STAGE_2, DELAY_ONE))
    .then(() => _delayedLightState(api, 2, STAGE_3, DELAY_TWO))
    .then(() => _delayedLightState(api, 2, STAGE_4, DELAY_THREE))
}


function _delayedLightState(api, lampId, state, delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      api.setLightState(lampId, state).then(resolve);
    }, delay);
  });
}



exports.sunrise =  sunrise;
