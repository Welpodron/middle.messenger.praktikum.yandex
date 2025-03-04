import eslint from '@eslint/js';
import stylistic from '@stylistic/eslint-plugin';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  eslint.configs.recommended,
  tseslint.configs.recommended,
  stylistic.configs.customize({
    semi: true,
    jsx: false,
  }),
  {
    rules: {
      '@typescript-eslint/consistent-type-imports': 'error',
    },
  },
);
