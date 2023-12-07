module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'standard-with-typescript',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
  ],
  overrides: [
    {
      env: {
        node: true,
      },
      files: [
        '.eslintrc.{js,cjs}',
      ],
      parserOptions: {
        sourceType: 'script',
      },
    },
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
  },
  plugins: [
    'react',
    'react-hooks',
  ],
  settings: {
    react: {
      version: 'detect',
    },
  },
  rules: {
    '@typescript-eslint/comma-dangle': ['error', {
      arrays: 'always-multiline',
      objects: 'always-multiline',
      imports: 'always-multiline',
      exports: 'always-multiline',
      functions: 'only-multiline',
      generics: 'ignore',
    }],
    '@typescript-eslint/explicit-function-return-type': ['off'],
    '@typescript-eslint/promise-function-async': ['off'],
    '@typescript-eslint/no-floating-promises': ['off'],
    '@typescript-eslint/strict-boolean-expressions': ['off'],
    '@typescript-eslint/no-misused-promises': ['error', {
      checksVoidReturn: false,
    }],
    '@typescript-eslint/no-confusing-void-expression': ['off'],
    '@typescript-eslint/no-extraneous-class': ['off'],

    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',

    'react/jsx-indent': ['warn', 2, {
      checkAttributes: true,
      indentLogicalExpressions: true,
    }],
    'react/prop-types': ['off'],
    'react/jsx-indent-props': ['warn', 2],
    'react/jsx-closing-bracket-location': ['warn', 'tag-aligned'],
    'jsx-quotes': ['warn', 'prefer-double'],
    'react/jsx-curly-spacing': ['warn', { when: 'never', children: true }],
    'react/jsx-tag-spacing': ['warn', {
      closingSlash: 'never',
      beforeSelfClosing: 'always',
      afterOpening: 'never',
      beforeClosing: 'never',
    }],
    'react/self-closing-comp': 'warn',
    'react/jsx-fragments': 'warn',
    'react/jsx-equals-spacing': [2, 'never'],
  },
}
