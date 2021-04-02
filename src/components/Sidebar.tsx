import React from 'react';
import { Button, ButtonGroup, Typography } from '@material-ui/core';
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
      <Typography variant="h1"> ExRap </Typography>
      <ButtonGroup
        orientation="vertical"
        color="primary"
        aria-label="vertical outlined primary button group"
      >
        <Button>Mein Dashboard</Button>
        <Button>Meine Zeiterfassung</Button>
        <Button>Projekte</Button>
        <Button>Administration</Button>
      </ButtonGroup>

      <ButtonGroup
        orientation="vertical"
        color="primary"
        aria-label="vertical outlined primary button group"
      >
        <Button>Ausloggen</Button>
      </ButtonGroup>
    </div>
  );
}
