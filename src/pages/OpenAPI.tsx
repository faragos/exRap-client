import * as React from 'react';
import {
  useDashboardsGetDashboardsQuery,
  useDashboardsCreateDashboardMutation,
} from '../service/dashboard.api';
import { DashboardsCreateDashboardApiArg, ExRapDashDTODashboard } from '../gen/dashboard.api.generated';

function Dashboard() {
  const { data, error, isLoading } = useDashboardsGetDashboardsQuery({});

  const [
    createDashboard, // This is the mutation trigger
  ] = useDashboardsCreateDashboardMutation();

  const arg: ExRapDashDTODashboard = {
    title: 'string',
    description: 'string',
    type: 'UserDashboard',
  };

  const param: DashboardsCreateDashboardApiArg = { exRapDashDtoDashboard: arg };

  const handleUpdate = () => createDashboard(param);

  if (error) {
    return <>Oh no, there was an error</>;
  }

  if (isLoading) {
    return <>Loading...</>;
  }

  if (data) {
    return (
      <div className="App">
        <button
          onClick={handleUpdate}
          type="button"
        >
          Neuer Eintrag
        </button>
        {data.map((object) => (
          <h3>
            {object.title}
            {' '}
            {object.description}
          </h3>
        ))}
      </div>
    );
  }

  return (
    <div className="App">Empty</div>
  );
}

export default Dashboard;
