/* jshint esnext: true */
'use strict';


const TRANSITION_TIME = 180000;
const DELAY_ONE = 60000;
const DELAY_TWO = 240000;
const DELAY_THREE = 420000;

function sunrise(api, lightState, options) {
  const transitionTime = options && options.transitionTime !== undefined ?
    options.transitionTime : TRANSITION_TIME;
  const delayOne = options && options.delayOne !== undefined ?
    options.delayOne : DELAY_ONE;
  const delayTwo = options && options.delayTwo !== undefined ?
    options.delayTwo : DELAY_TWO;
  const delayThree = options && options.delayThree !== undefined ?
    options.delayThree : DELAY_THREE;
  // Color configurations for sunrise simulation
  const stage1 = lightState.create().on().hue(46920).sat(254).bri(0),
  stage2 = lightState.create().on().hue(65280).bri(128).transition(transitionTime),
  stage3 = lightState.create().on().hue(12750).bri(254).transition(transitionTime),
  stage4 = lightState.create().on().sat(0).transition(transitionTime);

  return api.setLightState(2, stage1)
    .then(() => _delayedLightState(api, 2, stage2, delayOne))
    .then(() => _delayedLightState(api, 2, stage3, delayTwo))
    .then(() => _delayedLightState(api, 2, stage4, delayThree));
}

function sunset(api, lightState, options) {
  const transitionTime = options && options.transitionTime !== undefined ?
    options.transitionTime : TRANSITION_TIME;
  const delayOne = options && options.delayOne !== undefined ?
    options.delayOne : DELAY_ONE;
  const delayTwo = options && options.delayTwo !== undefined ?
    options.delayTwo : DELAY_TWO;
  const delayThree = options && options.delayThree !== undefined ?
    options.delayThree : DELAY_THREE;
  // Color configurations for sunrise simulation
  const stage1 = lightState.create().on().hue(46920).sat(254).bri(0),
  stage2 = lightState.create().on().hue(65280).bri(128).transition(transitionTime),
  stage3 = lightState.create().on().hue(12750).bri(254).transition(transitionTime),
  stage4 = lightState.create().on().sat(0).transition(transitionTime);

  return api.setLightState(2, stage4)
    .then(() => _delayedLightState(api, 2, stage3, delayThree))
    .then(() => _delayedLightState(api, 2, stage2, delayTwo))
    .then(() => _delayedLightState(api, 2, stage1, delayOne));
}


function _delayedLightState(api, lampId, state, delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      api.setLightState(lampId, state).then(resolve);
    }, delay);
  });
}

exports.sunrise =  sunrise;
exports.sunset = sunset;
exports.constants = { TRANSITION_TIME, DELAY_ONE, DELAY_TWO, DELAY_THREE };
