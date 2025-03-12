import { createTheme, styled, ThemeProvider } from "@mui/material/styles";

import Paper from '@mui/material/Paper';

export const Item = styled(Paper)(({ theme: siteTheme }) => ({
	...siteTheme.typography.body2,
	padding: siteTheme.spacing(1),
	color: siteTheme.palette.text.primary,
	...siteTheme.applyStyles("dark", {
	}),
}));

const siteTheme = createTheme({
	palette: {
		mode: "dark",
		primary: {
			main: "#3f51b5",
		},
		secondary: {
			main: "#f50057",
		},
		background: {
			default: "#000000",
			paper: "#000000",
		},
	},
	typography: {
		fontFamily: "Montserrat, Helvetica, Arial, sans-serif",
	},
});

export const SiteTheme = ({children}) => {

	return (

		<ThemeProvider theme={siteTheme}>

			{children}

		</ThemeProvider>

	)

}
