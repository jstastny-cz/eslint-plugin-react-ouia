import { RuleTester } from 'eslint';
import rule from '../../../lib/rules/ouia-props';

const parserOptions = {
  ecmaVersion: 2018,
  sourceType: 'module',
  ecmaFeatures: {
    jsx: true
  }
};

const ruleTester = new RuleTester({ parserOptions });
ruleTester.run('ouia-props', rule, {
  valid: [
    { code: '<Component />' },
    { code: '<Component foo="abc" />' },
    { code: '<Component data-ouia-component-id="id1" />' },
    { code: '<Component data-ouia-component-type="type1" />' }
  ],
  invalid: [
    {
      code: '<Component data-ouia-whatever="wrong-attribute" />',
      errors: [{
        type: 'JSXAttribute',
        messageId: 'valid-names'
      }]
    },
    {
      code: '<Component data-ouia-component-di="typo-in-attribute-name" />',
      errors: [{
        type: 'JSXAttribute',
        messageId: 'valid-names'
      }]
    }
  ]
});
