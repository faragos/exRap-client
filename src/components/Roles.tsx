import React from 'react';
import { useRolesGetRolesQuery } from '../service/auth.api';

function Roles() {
  const roles = useRolesGetRolesQuery({});
  // const { data } = roles;
  console.log(roles);
  console.log('roles');
  return (
    <div>
      123
    </div>
  );
}

export default Roles;
