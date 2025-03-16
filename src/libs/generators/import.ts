/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @file Instantiate a JavascriptGenerator and populate it with the
 * complete set of block generator functions for JavaScript.  This is
 * the entrypoint for javascript_compressed.js.
 */

// Former goog.module ID: Blockly.JavaScript.all

import { JavaGenerator } from './java_generator.js';
import * as lists from './lists.js';
import * as logic from './logic.js';
import * as loops from './loops.js';
import * as math from './math.js';
import * as procedures from './procedures.js';
import * as text from './text.js';
import * as variables from './variables.js';
import * as variablesDynamic from './variables_dynamic.js';

export * from './java_generator.js';

/**
 * Java code generator instance.
 * @type {!JavaGenerator}
 */
export const javaGenerator: JavaGenerator = new JavaGenerator();

// Install per-block-type generator functions:
const generators: typeof javaGenerator.forBlock = {
    ...lists,
    ...logic,
    ...loops,
    ...math,
    ...procedures,
    ...text,
    ...variables,
    ...variablesDynamic,
};
for (const name in generators) {
    javaGenerator.forBlock[name] = generators[name];
}