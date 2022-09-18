import { createMuiTheme } from '@material-ui/core/styles';
import { red } from '@material-ui/core/colors';

const baseTheme = createMuiTheme();

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#556cd6',
    },
    text: {
      primary: "#e0e0e0",
      secondary: "rgba(0, 0, 0, 0.54)",
      disabled: "rgba(0, 0, 0, 0.38)",
      hint: "rgba(0, 0, 0, 0.38)"
    },
    secondary: {
      main: '#19857b',
    },
    error: {
      main: red.A400,
    },
    color: { default: 'white' },
    background: {
      default: '#1b1b1b'
    },
  },
  common: {
    dialog: {
      header: {
        display: 'flex',
        alignItems: 'center',
        padding: '0.25em 0.5em',
        borderBottom: `1px solid ${baseTheme.palette.divider}`,
      },
      close: {
        marginLeft: 'auto'
      },
      title: {
        fontSize: '1.35em',
        fontWeight: '500'
      },
      content: {
        padding: '0.25em',
        background: '#ffffffbf'
      },
      paper: {
        // background: 'transparent',
        background: 'white',
        minWidth: '50%'
      },
      actions: {
        textAlign: 'right',
        paddingTop: '0.5em',
      },
      actionIcon: {
        marginLeft: '0.25em'
      },
    },
    gameEntityTable: {
      header: {},
      headerCell: {
        color: '#313131',
      },
      tableContentWrapper: {

      },
      infoTable: {
    
      },
      infoRow: {
        
      },
      rowCell: {
        color: '#1c1c1c',
      },
      actionsWrapper: {
        textAlign: 'right',
        padding: '1em'
      },
      emptyTable: {
        padding: '1em',
        textAlign: 'center',
        fontWeight: 'bold',
        color: '#d50002',
      }
    }
  }
});

export default theme;
