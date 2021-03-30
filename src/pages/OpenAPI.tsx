import * as React from 'react';
import {
  useDashboardsGetDashboardsQuery,
  useDashboardsCreateDashboardMutation,
} from '../service/dashboard.api';
import { DashboardsCreateDashboardApiArg, ExRapDashDTODashboard } from '../gen/dashboard.api.generated';

function Dashboard() {
  const result = useDashboardsGetDashboardsQuery({});
  const { data, error, isLoading } = result;

  const [
    createDashboard, // This is the mutation trigger
  ] = useDashboardsCreateDashboardMutation();

  const arg = {
    title: 'string',
    description: 'string',
    type: "UserDashboard",
  } as ExRapDashDTODashboard;

  const param = { exRapDashDtoDashboard: arg } as DashboardsCreateDashboardApiArg;

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
