export default {
  extends: 'recommended',
  checkHbsTemplateLiterals: false,
  overrides: [
    {
      // The headless containers hand their state to user-provided `@view`
      // components as capitalized args (`@Repeat`, `@End`, ...), and forward
      // `id` both as an attribute and as `@id` so views can use either.
      files: ['src/**/*'],
      rules: {
        'no-capital-arguments': false,
        'no-duplicate-id': false,
      },
    },
    {
      files: ['tests/**/*'],
      rules: {
        'require-input-label': false,
      },
    },
  ],
};
