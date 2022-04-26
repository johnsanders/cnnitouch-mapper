module.exports = {
	env: {
		browser: true,
	},
	extends: ['plugin:react/recommended', 'plugin:prettier/recommended'],
	parser: '@typescript-eslint/parser',
	parserOptions: {
		ecmaFeatures: {
			jsx: true,
		},
		ecmaVersion: 2020,
		sourceType: 'module',
	},
	plugins: ['react-hooks'],
	rules: {
		'no-invalid-this': 'error',
		'prettier/prettier': 'warn',
		'react-hooks/exhaustive-deps': 'warn',
		'react-hooks/rules-of-hooks': 'error',
		'react/destructuring-assignment': 0,
		'react/jsx-sort-props': 'error',
		'react/prop-types': 0,
		'sort-imports': 'error',
		'sort-keys': 'error',
	},
	settings: {
		'import/resolver': {
			node: {
				extensions: ['.js', '.jsx', '.ts', '.tsx'],
			},
		},
		react: {
			version: 'detect',
		},
	},
};
