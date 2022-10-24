#!/usr/bin/env node

'use strict';

const prompt = require('prompt-promise');
const theme = require('../theme');

const run = async () => {
  while (true) {
    const otp = await prompt('NPM 2-factor auth code: ');
    prompt.done();

    if (otp) {
      return otp;
    } else {}
  }
};

module.exports = run;
