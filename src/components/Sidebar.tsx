import React from 'react';
import { Button, ButtonGroup, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';

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
      >
        <Button component={Link} to="/dashboard">Mein Dashboard</Button>
        <Button component={Link} to="/timetracking">Meine Zeiterfassung</Button>
        <Button component={Link} to="/projects">Projekte</Button>
        <Button component={Link} to="/administration">Administration</Button>
      </ButtonGroup>

      <ButtonGroup
        orientation="vertical"
        color="primary"
      >
        <Button component={Link} to="/signout">Ausloggen</Button>
      </ButtonGroup>
    </div>
  );
}
