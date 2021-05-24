import React, { useEffect } from 'react';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { useAppSelector } from '../hooks';
import { AuthInfo } from '../store/authInfo/types';
import CompanyOverview from '../components/CompanyOverview';
import ProjectContributionOverview from '../components/ProjectContributionOverview';
import ProjectManagerOverview from '../components/ProjectManagerOverview';

const dashboardStyles = makeStyles(() => createStyles({
  container: {
    boxSizing: 'border-box',
    display: 'grid',
    gridGap: '20px',
    gridTemplateColumns: 'repeat(auto-fit, minmax(500px, 1fr))',
  },
}));
/**
 * Renders the dashboard page
 * @constructor
 */
const Dashboard : React.FC = () => {
  const currentUser: AuthInfo = useAppSelector((state) => state.authInfo);

  useEffect(() => {
    document.title = 'exRap - Dashboard';
  }, []);

  const classes = dashboardStyles();

  return (
    <div>
      <h1> Dashboard </h1>
      <div className={classes.container}>
        { currentUser?.roles?.includes('ProjectContributor') && <ProjectContributionOverview /> }
        { currentUser?.roles?.includes('SeniorManager') && <CompanyOverview /> }
        { currentUser?.roles?.includes('ProjectManager') && <ProjectManagerOverview />}
      </div>
    </div>
  );
};

export default Dashboard;
