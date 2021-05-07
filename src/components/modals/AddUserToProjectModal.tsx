import React, { SyntheticEvent, useEffect, useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Autocomplete from '@material-ui/core/Autocomplete';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import {
  IconButton, Table, TableBody, TableCell, TableRow,
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import { UsersGetUsersApiArg, UserOverview as UserOverviewAuth } from '../../gen/auth.api.generated';
import { useUsersGetUsersQuery } from '../../service/auth.api';
import {
  useProjectContributorsAddContributorMutation,
  useProjectContributorsGetContributorsQuery, useProjectContributorsRemoveContributorMutation,
} from '../../service/timeTrack.api';
import {
  ManageProjectMemberRequest,
  ProjectContributorsAddContributorApiArg,
  ProjectContributorsGetContributorsApiArg, ProjectContributorsRemoveContributorApiArg,
  ProjectOverview,
  UserOverview,
} from '../../gen/timeTrack.api.generated';

const useStyles = makeStyles((theme: Theme) => createStyles({
  root: {
    '& > * + *': {
      marginTop: theme.spacing(3),
    },
  },
}));

type ChildComponentProps = {
  isModalOpen: boolean,
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>,
  project: ProjectOverview,
};

const AddUserToProjectModal : React.FC<ChildComponentProps> = ({
  setIsModalOpen,
  isModalOpen,
  project,
}: ChildComponentProps) => {
  const handleClose = () => {
    setIsModalOpen(false);
  };
  const userDto: UserOverview[] = [];
  const [possibleNewContributors, setPossibleNewContributors] = useState(userDto);

  const usersArg: UsersGetUsersApiArg = {};
  const { data: users = [] } = useUsersGetUsersQuery(usersArg);

  const contributorsArg: ProjectContributorsGetContributorsApiArg = { projectId: project.id };
  const {
    data: usersInProject = [],
  } = useProjectContributorsGetContributorsQuery(contributorsArg);
  const [contributors, setContributors] = useState<UserOverviewAuth[]>([]);

  // Differenzmenge - A\B - A ohne B
  const getPossibleContributors = (
    userList: UserOverview[],
    contributorList: UserOverview[],
  ): UserOverview[] => {
    let result: UserOverview[] = [];
    if (contributorList.length === 0) return users;

    result = userList.filter((u) => !contributorList.some((c) => c.userName === u.userName));
    return result;
  };

  const mapTimeToAuthUser = () => users.filter(
    (u) => usersInProject.some((c) => c.userName === u.userName),
  );

  useEffect(() => {
    setPossibleNewContributors(getPossibleContributors(users, usersInProject));
    setContributors(mapTimeToAuthUser());
  }, [usersInProject]);

  const [
    addUserToProjectMutation,
  ] = useProjectContributorsAddContributorMutation();

  const addUserToProject = (
    event: SyntheticEvent<Element, Event>,
    value: UserOverview | null,
  ) => {
    if (value === null) return;

    const user: ManageProjectMemberRequest = {
      userName: value?.userName,
    };
    const arg: ProjectContributorsAddContributorApiArg = {
      projectId: project.id,
      manageProjectMemberRequest: user,
    };
    addUserToProjectMutation(arg);
  };

  const [
    removeContributor,
  ] = useProjectContributorsRemoveContributorMutation();

  const deleteContributorHandler = (user: UserOverview) => {
    const arg: ProjectContributorsRemoveContributorApiArg = {
      projectId: project.id,
      contributorName: user.userName,
    };
    removeContributor(arg);
  };

  const classes = useStyles();

  return (
    <div>
      <Dialog open={isModalOpen} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">
          Mitarbeiterverwaltung
          {' '}
          { project.name }
        </DialogTitle>
        <DialogContent className={classes.root}>
          <Autocomplete
            id="addUser"
            options={possibleNewContributors}
            getOptionLabel={(option) => option.userName}
            filterSelectedOptions
            /* props need to be forwarded https://material-ui.com/components/autocomplete/#checkboxes */
            /* eslint-disable-next-line react/jsx-props-no-spreading */
            renderInput={(params) => (<TextField {...params} variant="standard" label="Mitarbeiter hinzufügen" placeholder="Mitarbeiter" />)}
            onChange={addUserToProject}
            getOptionSelected={(option, value) => option.userName === value.userName}
          />
          <Table>
            <TableBody>
              {
                contributors.map((item) => (
                  <TableRow key={item.userName}>
                    <TableCell>{item.firstName}</TableCell>
                    <TableCell>{item.name}</TableCell>
                    <TableCell>{item.userName}</TableCell>
                    <TableCell>
                      <IconButton onClick={() => deleteContributorHandler(item)}>
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))
                }
            </TableBody>
          </Table>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Schliessen
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AddUserToProjectModal;
