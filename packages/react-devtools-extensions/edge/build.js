#!/usr/bin/env node

'use strict';

const chalk = require('chalk');
const {execSync} = require('child_process');
const {join} = require('path');
const {argv} = require('yargs');
const build = require('../build');

const main = async () => {
  const {crx} = argv;

  await build('edge');

  const cwd = join(__dirname, 'build');
  if (crx) {
    const crxPath = join(
      __dirname,
      '..',
      '..',
      '..',
      'node_modules',
      '.bin',
      'crx'
    );

    execSync(`${crxPath} pack ./unpacked -o ReactDevTools.crx`, {
      cwd,
    });
  }
};

main();
