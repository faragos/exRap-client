import { createMuiTheme } from '@material-ui/core/styles';
import { brown, blueGrey } from '@material-ui/core/colors';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: brown[300], // #a1887f
      light: '#d3b8ae',
      dark: '#725b53',
      contrastText: '#000',
    },
    secondary: {
      main: blueGrey[700], // #455a64
      light: '#718792',
      dark: '#1c313a',
      contrastText: '#fff',
    },
  },
});

export default theme;
