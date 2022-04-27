import { createTheme } from '@mui/material/styles';

const palette = {
	primary: {
		main: '#007bff',
	},
	secondary: {
		main: '#6c757d',
	},
};

const theme = createTheme({
	components: {
		MuiListItem: {
			styleOverrides: {
				root: {
					backgroundColor: '#f5f5f5',
					marginBottom: '5px',
				},
			},
		},
	},
	palette,
	typography: {
		fontFamily: 'Cnn, "Helvetica Neue", Arial, sans-serif',
	},
});

export default theme;
