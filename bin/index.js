#! /usr/bin/env node
'use strict';
/* jshint esnext: true */

const nodeHueApi = require('node-hue-api');
const sunSimulator = require('../lib/hue.js');
const program = require('commander');

program
  .version('0.1.0')
  .command('sunrise <ip> <username> [options...]')
  .action((ip, username, options) => {
    const hueApi = new nodeHueApi.HueApi(ip, username);
    const lightState = nodeHueApi.lightState;
    sunSimulator.sunrise(hueApi, lightState).done(() => console.log('Sunrise simulation successful'),
        (reason) => console.log(`Sunrise simulation failed due to: ${reason}`));
  });
  
program
  .command('sunset <ip> <username> [options...]')
  .action((ip, username, options) => {
    const hueApi = new nodeHueApi.HueApi(ip, username);
    const lightState = nodeHueApi.lightState;
    sunSimulator.sunset(hueApi, lightState).done(() => console.log('Sunset simulation successful'),
        (reason) => console.log(`Sunset simulation failed due to: ${reason}`));
  });

program.parse(process.argv);
