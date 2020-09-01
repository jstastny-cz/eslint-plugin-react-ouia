/**
 * @fileoverview Enforce all data-ouia-* properties are valid.
 * @author Jan Stastny
 */

// ----------------------------------------------------------------------------
// Rule Definition
// ----------------------------------------------------------------------------

import { propName } from 'jsx-ast-utils';
import { messages } from '../utils/messages';
import { ouiaAttributes } from '../utils/ouia-attributes';

module.exports = {
  meta: {
    type: 'problem',
    docs: {
      description: 'check valid OUIA property names',
      recommended: true,
      category: 'Possible Errors',
      url: 'https://github.com/jstastny-cz/eslint-plugin-react-ouia/docs/rules/ouia-props.md',
    },
    fixable: 'code',
    schema: [],
    messages: messages['ouia-props']
  },
  create: (context) => ({
    JSXAttribute: (attribute) => {
      const name = propName(attribute);
      if (name.indexOf('data-ouia-') !== 0) {
        return;
      }
      const isValid = ouiaAttributes.includes(name);
      if (isValid === false) {
        context.report({
          node: attribute,
          messageId: 'valid-names',
          data: {
            name
          }
        });
      }
    }
  })
}
