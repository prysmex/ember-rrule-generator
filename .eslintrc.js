'use strict';

const ImportSortGroups = [
  // Side effect imports.
  // eslint-disable-next-line no-useless-escape
  [`^\u0000`],
  // Packages.
  // Things that start with a letter (or digit or underscore), or `@` followed by a letter.
  // But not our packages, ember/glimmer/ember-data packages, or potential addons (things starting with ember- or @ember-)
  [
    // eslint-disable-next-line no-useless-escape
    `^(?!@ember\-data)(?!ember)(?!@ember\-)(?!@glimmer)(?!@prysmex/)(?!prysmex\-)(@?\\w)`,
  ],
  // Glimmer & Ember & EmberData Dependencies
  // eslint-disable-next-line no-useless-escape
  [`^(@ember/|@glimmer|ember|@ember\-data/$)`],
  // Potential Addons (Packages starting with ember-)
  // eslint-disable-next-line no-useless-escape
  [`^(ember\-|@ember\-)`],
  // Our sub packages (engines / addons)
  // eslint-disable-next-line no-useless-escape
  [`^@prysmex/`],
  // Our Main Package.
  // eslint-disable-next-line no-useless-escape
  [`^prysmex\-`],
  // Absolute imports and other imports such as Vue-style `@/foo`.
  // Anything that does not start with a dot.
  ['^[^.]'],
  // Relative imports.
  // Anything that starts with a dot.
  // eslint-disable-next-line no-useless-escape
  [`^\.`],
];

module.exports = {
  root: true,
  parser: '@babel/eslint-parser',
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
    babelOptions: {
      plugins: [
        [
          require.resolve('@babel/plugin-proposal-decorators'),
          { legacy: true },
        ],
      ],
    },
    requireConfigFile: false,
  },
  plugins: ['ember', 'qunit', 'import', 'unused-imports', 'no-useless-assign'],
  extends: [
    'eslint:recommended',
    'plugin:ember/recommended',
    'plugin:prettier/recommended',
    'plugin:qunit/recommended',
  ],
  globals: {},
  env: {
    browser: true,
  },
  rules: {
    eqeqeq: 'error',
    'no-eq-null': 'error',
    'prefer-rest-params': 'error',
    'no-shadow': 'error',
    'no-loop-func': 'error',
    'no-lonely-if': 'error',
    'no-labels': 'error',
    'no-dupe-keys': 'error',
    'no-dupe-else-if': 'error',
    'no-var': 'error',
    'no-prototype-builtins': 'error',

    // these are a nice proxy measurement of where there is complexity to pay down
    // but not hugely important to always follow since they are easily trollish
    'max-params': ['error', { max: 4 }],
    'max-depth': ['error', { max: 4 }],
    'max-statements': ['error', { max: 40 }],
    
    complexity: ['error', { max: 20 }],

    'no-unused-vars': 'off', // or "@typescript-eslint/no-unused-vars": "off",
    'unused-imports/no-unused-imports': 'error',
    'unused-imports/no-unused-vars': [
      'error',
      {
        vars: 'all',
        varsIgnorePattern: '^_',
        args: 'after-used',
        argsIgnorePattern: '^_',
      },
    ],

    // Activated general rules
    'object-shorthand': ['error', 'always'],
    'no-restricted-imports': [
      'error',
      {
        paths: ['@ember/runloop'],
      },
    ],
    'no-restricted-properties': [
      'error',
      {
        object: '$',
        property: 'get',
        message:
          'use the requests service method requests.$get instead of $.get',
      },
      {
        object: '$',
        property: 'post',
        message:
          'use the requests service method requests.$post instead of $.post',
      },
      {
        object: '$',
        property: 'ajax',
        message:
          'use the requests service method requests.$ajax instead of $.ajax',
      },
      {
        object: '$',
        property: 'ajaxSetup',
        message:
          'use the requests service method requests.$ajaxSetup instead of $.ajaxSetup',
      },
      {
        object: '$',
        property: 'ajaxPrefilter',
        message:
          'use the requests service method requests.$ajaxPrefilter instead of $.ajaxPrefilter',
      },
      {
        object: '$',
        property: 'getJSON',
        message:
          'use the requests service method requests.$getJSON instead of $.getJSON',
      },
    ],
    'one-var': ['error', 'never'],
    'prefer-const': 'error',
    'require-await': 'error',
    'prefer-spread': 'error',
    'no-unreachable-loop': 'error',
    'no-lone-blocks': 'error',
    'no-useless-call': 'error',
    'no-useless-concat': 'error',
    'no-useless-rename': 'error',
    'no-useless-computed-key': 'error',
    'prefer-destructuring': [
      'error',
      {
        VariableDeclarator: {
          array: false,
          object: true,
        },
        AssignmentExpression: {
          array: false,
          object: false,
        },
      },
      { enforceForRenamedProperties: false },
    ],
    'no-implicit-globals': 'error',
    'dot-notation': 'error',
    'no-redeclare': 'error',
    'no-cond-assign': ['error', 'except-parens'],
    'no-unmodified-loop-condition': 'error',
    'no-use-before-define': 'error',
    'no-console': 'error',
    'no-eval': 'error',
    'no-else-return': 'error',
    'no-self-assign': 'error',
    'no-self-compare': 'error',
    'new-cap': [
      'error',
      { capIsNewExceptions: ['Stripe', 'A'], newIsCapExceptions: ['jsPDF'] },
    ],
    'no-caller': 'error',

    // Easy to activate cleanups
    'no-useless-assign/no-useless-assign': 'error',
    'ember/no-incorrect-calls-with-inline-anonymous-functions': 'error',
    'ember/no-deeply-nested-dependent-keys-with-each': 'error',
    'ember/jquery-ember-run': 'error',
    'qunit/no-assert-equal-boolean': 'error',
    'qunit/require-expect': 'error',
    'qunit/no-compare-relation-boolean': 'error',
    'no-restricted-globals': [
      'error',
      {
        name: 'localStorage',
        message: 'Use the local-storage service instead',
      },
    ],

    // Too many false positives
    // See https://github.com/eslint/eslint/issues/11899 and similar
    'require-atomic-updates': 'off',

    'ember/routes-segments-snake-case': 'off', // We should leave this off permanently
    'ember/use-brace-expansion': 'off', // has bugs and is annoying + only applies to computeds

    'ember/no-classic-classes': 'error',
    'ember/no-get': 'error',
    'ember/no-jquery': 'error',
    'ember/require-return-from-computed': 'error',
    'ember/no-actions-hash': 'error',
    'ember/avoid-leaking-state-in-ember-objects': 'error',
    'ember/no-mixins': 'error',
    'ember/no-new-mixins': 'error',
    'ember/no-controller-access-in-routes': 'error',
    'ember/closure-actions': 'error',
    'ember/no-component-lifecycle-hooks': 'error',
    'ember/no-observers': 'error',
    'ember/require-tagless-components': 'error',
    'ember/no-classic-components': 'error',
    'ember/no-side-effects': 'error',
  },
  overrides: [
    // TypeScript files in strict-mode
    {
      files: ['**/*.ts'],
      parser: '@typescript-eslint/parser',
      parserOptions: {
        sourceType: 'module',
        tsConfigRootDir: __dirname,
        project: ['./tsconfig.json'],
      },
      plugins: ['@typescript-eslint'],
      extends: [
        'plugin:@typescript-eslint/eslint-recommended',
        'plugin:@typescript-eslint/recommended-requiring-type-checking',
      ],
      rules: {
        '@typescript-eslint/no-explicit-any': 'error',
        '@typescript-eslint/no-unused-vars': ['error', { args: 'none' }],
        'no-unused-vars': 'off',
        'unused-imports/no-unused-vars': 'off',
        'no-use-before-define': 'off',
        '@typescript-eslint/no-use-before-define': ['error'],
      },
    },
    // typescript files in non-strict mode
    {
      parser: '@typescript-eslint/parser',
      parserOptions: {
        sourceType: 'module',
        tsConfigRootDir: __dirname,
        project: ['./tsconfig.json'],
      },
      plugins: ['@typescript-eslint'],
      extends: [
        'plugin:@typescript-eslint/eslint-recommended',
        'plugin:@typescript-eslint/recommended-requiring-type-checking',
      ],
      rules: {
        '@typescript-eslint/no-unsafe-argument': 'off',
        '@typescript-eslint/no-unused-vars': ['error', { args: 'none' }],
        'ember-data/prefer-static-type-import': 'error',
        'no-unused-vars': 'off',
        // rules we should likely activate but which currently have too many violations
        // files converted to strict must pass these rules before they can be removed from
        // the files list here and the files list in tsconfig.json
        // see https://github.com/emberjs/data/issues/6233#issuecomment-849279594
        '@typescript-eslint/no-explicit-any': 'off', // TODO activate this and use // eslint-disable-line @typescript-eslint/no-explicit-any
        '@typescript-eslint/no-floating-promises': 'off',
        '@typescript-eslint/no-misused-promises': 'off',
        '@typescript-eslint/no-unnecessary-type-assertion': 'off',
        '@typescript-eslint/no-unsafe-assignment': 'off',
        '@typescript-eslint/no-unsafe-call': 'off',
        '@typescript-eslint/no-unsafe-member-access': 'off',
        '@typescript-eslint/no-unsafe-return': 'off',
        '@typescript-eslint/require-await': 'off',
        '@typescript-eslint/restrict-plus-operands': 'off',
        '@typescript-eslint/restrict-template-expressions': 'off',
        '@typescript-eslint/unbound-method': 'off',
      },
      files: ['./not-a-real-file.ts'],
    },
    // node files
    {
      files: [
        'bin/**/*.js',
        'addons/*/addon-main.js',
        '.eslintrc.js',
        '.lint-todorc.js',
        '.prettierrc.js',
        '.template-lintrc.js',
        'ember-cli-build.js',
        '*/*/ember-cli-build.js',
        'lib/**/*.js',
        '*/*/testem.js',
        'addons/*/blueprints/*/index.js',
        'apps/*/config/**/*.js',
        'engines/*/config/**/*.js',
        'apps/*/tests/dummy/config/**/*.js',
        'addons/*/tests/dummy/config/**/*.js',
        'engines/*/tests/dummy/config/**/*.js',
        'apps/*/index.js',
        'engines/*/index.js',
        'addons/*/index.js',
      ],
      parserOptions: {
        sourceType: 'script',
      },
      env: {
        browser: false,
        node: true,
      },
      plugins: ['node'],
      extends: ['plugin:node/recommended'],
      rules: {
        // this can be removed once the following is fixed
        // https://github.com/mysticatea/eslint-plugin-node/issues/77
        'node/no-unpublished-require': 'off',
      },
    },
  ],
};
