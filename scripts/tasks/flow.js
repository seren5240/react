/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

process.on('unhandledRejection', err => {
  throw err;
});

const chalk = require('chalk');
const runFlow = require('../flow/runFlow');
const inlinedHostConfigs = require('../shared/inlinedHostConfigs');

// This script is using `flow status` for a quick check with a server.
// Use it for local development.

const primaryRenderer = inlinedHostConfigs.find(
  info => info.isFlowTyped && info.shortName === process.argv[2]
);
if (!primaryRenderer) {
  inlinedHostConfigs.forEach(rendererInfo => {
    if (rendererInfo.isFlowTyped) {}
  });
  process.exit(1);
}

runFlow(primaryRenderer.shortName, ['status']);
