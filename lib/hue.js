/* jshint esnext: true */
'use strict'

const TRANSITION_TIME = 180000
const DELAY_ONE = 60000
const DELAY_TWO = 240000
const DELAY_THREE = 420000

function sunrise (api, lightState, lightId, options = {}) {
  const transitionTime = options.transitionTime >= 0
    ? options.transitionTime : TRANSITION_TIME
  const delayOne = options.delayOne >= 0 ? options.delayOne : DELAY_ONE
  const delayTwo = options.delayTwo >= 0 ? options.delayTwo : DELAY_TWO
  const delayThree = options.delayThree >= 0 ? options.delayThree : DELAY_THREE

  // Color configurations for sunrise simulation
  const stage1 = lightState.create().on().hue(46920).sat(254).bri(0)
  const stage2 = lightState.create().on().hue(65280).bri(128).transition(transitionTime)
  const stage3 = lightState.create().on().hue(12750).bri(254).transition(transitionTime)
  const stage4 = lightState.create().on().sat(0).transition(transitionTime)

  return api.setLightState(lightId, stage1)
    .then(() => _delayedLightState(api, lightId, stage2, delayOne))
    .then(() => _delayedLightState(api, lightId, stage3, delayTwo))
    .then(() => _delayedLightState(api, lightId, stage4, delayThree))
}

function sunset (api, lightState, lightId, options = {}) {
  const transitionTime = options.transitionTime >= 0
    ? options.transitionTime : TRANSITION_TIME
  const delayOne = options.delayOne >= 0 ? options.delayOne : DELAY_ONE
  const delayTwo = options.delayTwo >= 0 ? options.delayTwo : DELAY_TWO
  const delayThree = options.delayThree >= 0 ? options.delayThree : DELAY_THREE

  // Color configurations for sunrise simulation
  const stage1 = lightState.create().on().hue(46920).sat(254).bri(0)
  const stage2 = lightState.create().on().hue(65280).bri(128).transition(transitionTime)
  const stage3 = lightState.create().on().hue(12750).bri(254).transition(transitionTime)
  const stage4 = lightState.create().on().sat(0).transition(transitionTime)

  return api.setLightState(lightId, stage4)
    .then(() => _delayedLightState(api, lightId, stage3, delayThree))
    .then(() => _delayedLightState(api, lightId, stage2, delayTwo))
    .then(() => _delayedLightState(api, lightId, stage1, delayOne))
}

function _delayedLightState (api, lampId, state, delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      api.setLightState(lampId, state).then(resolve)
    }, delay)
  })
}

exports.sunrise = sunrise
exports.sunset = sunset
exports.constants = { TRANSITION_TIME, DELAY_ONE, DELAY_TWO, DELAY_THREE }
