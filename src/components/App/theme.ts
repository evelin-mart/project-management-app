import { createTheme } from '@mui/material';

export const theme = createTheme({
  palette: {
    primary: {
      main: '#4f5285',
      contrastText: '#fe6b61',
    },
    secondary: {
      main: '#ffc967',
    },
    error: {
      main: '#fe6b61',
    },
    text: {
      primary: '#404040',
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        html: {
          height: '100%',
        },
        body: {
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
        },
        '#root': {
          display: 'flex',
          flex: '1 1 auto',
          flexDirection: 'column',
        },
      },
    },
  },
});
