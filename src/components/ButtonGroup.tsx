import React from 'react';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    float: 'left',
    '& > *': {
      margin: theme.spacing(1),
    },
  },
}));

export default function GroupOrientation() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <ButtonGroup
        orientation="vertical"
        color="secondary"
        aria-label="vertical outlined primary button group"
      >
        <Button>Mein Dashboard</Button>
        <Button>Meine Zeiterfassung</Button>
        <Button>Projekte</Button>
        <Button>Administration</Button>
      </ButtonGroup>
    </div>
  );
}
