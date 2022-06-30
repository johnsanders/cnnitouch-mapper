module.exports = {
	env: {
		browser: true,
	},
	extends: [
		'plugin:@typescript-eslint/recommended',
		'plugin:prettier/recommended',
		'plugin:react/recommended',
		'plugin:react-hooks/recommended',
	],
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
		'@typescript-eslint/no-explicit-any': 0,
		'no-invalid-this': 'error',
		'prettier/prettier': 'warn',
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
