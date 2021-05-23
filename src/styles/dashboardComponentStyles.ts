import { createStyles, makeStyles } from '@material-ui/core/styles';

const dashboardComponentStyles = makeStyles(() => createStyles({
  table: {
    '& tbody td': {
      fontWeight: '300',
    },
    '& tbody tr:hover': {
      backgroundColor: '#fffbf2',
      cursor: 'pointed',
    },
  },
}));

export default dashboardComponentStyles;
