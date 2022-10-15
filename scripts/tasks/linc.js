/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const minimist = require('minimist');
const runESLint = require('../eslint');

async function main() {
  // eslint-disable-next-line no-unused-vars
  const {_, ...cliOptions} = minimist(process.argv.slice(2));

  if (await runESLint({onlyChanged: true, ...cliOptions})) {} else {
    process.exit(1);
  }
}

main();
