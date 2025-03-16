/**
 * @license
 * Copyright 2012 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @file Generating JavaScript for variable blocks.
 */

// Former goog.module ID: Blockly.JavaScript.variables

import * as Blockly from 'blockly';
import type {JavaGenerator} from './java_generator.ts';
import {Order} from './java_generator.ts';

export function variables_get(
  block: Blockly.Block,
  generator: JavaGenerator,
): [string, Order] {
  // Variable getter.
  const code = generator.getVariableName(block.getFieldValue('VAR'));
  return [code, Order.ATOMIC];
}

export function variables_set(block: Blockly.Block, generator: JavaGenerator) {
  // Variable setter.
  const argument0 =
    generator.valueToCode(block, 'VALUE', Order.ASSIGNMENT) || '0';
  const varName = generator.getVariableName(block.getFieldValue('VAR'));
  return varName + ' = ' + argument0 + ';\n';
}
