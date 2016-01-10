/* jshint esnext: true */
const expect = require('chai').expect;
const hue = require('../lib/hue');



describe("Hue lightning", () => {
  const mockAPI = {
    setLightState(id, state){
      return new Promise((resolve, reject) => {
        setTimeout(() => resolve());
      });
    }

  };

  
  it("calls the hue api successfully", () => {
    // TODO
    expect(true).to.equal(false);
  });
});

