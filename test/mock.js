const createLightState =  function() {
  return {
    state: [],
    create() {
      return this;
    },
    on() {
      this.state.push('on');
      return this;
    },

    hue(val) {
      this.state.push(`hue(${val})`);
      return this;
    },

    bri(val) {
      this.state.push(`bri(${val})`);
      return this;
    },

    sat(val) {
      this.state.push(`sat(${val})`);
      return this;

    },
    transition(val) {
      this.state.push(`transition(${val})`);
      return this;
    }
  };
};

const api = {
  setLightState(lightId, state) {
    return new Promise((resolve, reject) => {
      resolve(state);
    });
  }
};

const options = {
  transitionTime: 0,
  delayOne: 0,
  delayTwo: 0,
  delayThree: 0
};

exports.createLightState = createLightState;
exports.api = api;
exports.options = options;
