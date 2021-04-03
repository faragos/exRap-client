import React, { useState } from 'react';
import { useUsersCreateUserMutation, useUsersGetUsersQuery } from '../service/auth.api';
import { ExRapAuthDTOUser, UsersCreateUserApiArg } from '../gen/auth.api.generated';

function Administration() {
  const [formState, setFormState] = useState({
    userName: '',
    name: '',
    firstName: '',
    initial: '',
    mailAddress: '',
    status: 'Restricted',
  } as ExRapAuthDTOUser);

  const [
    createUser, // This is the mutation trigger
  ] = useUsersCreateUserMutation();

  const handleChange = ({
    target: { name, value },
  }: React.ChangeEvent<HTMLInputElement>) => setFormState((prev) => ({ ...prev, [name]: value }));

  const handleSubmit = async (event: { preventDefault: () => void; }) => {
    event.preventDefault();
    try {
      const param = { exRapAuthDtoUser: formState } as UsersCreateUserApiArg;
      createUser(param);
    } catch (err) {
      console.log(err);
    }
  };

  const { data } = useUsersGetUsersQuery({});
  let users;
  if (data) {
    users = data.map((user) => <li>{user.userName}</li>);
  }

  return (
    <div>
      <h1> Administration </h1>
      <h2>Alle Benutzer</h2>
      {users}

      <form onSubmit={handleSubmit}>
        <label htmlFor="username">
          username
          <input id="username" name="username" type="text" onChange={handleChange} />
        </label>
        <label htmlFor="name">
          name
          <input id="name" name="name" type="text" onChange={handleChange} />
        </label>
        <label htmlFor="firstName">
          firstName
          <input id="firstName" name="firstName" type="text" onChange={handleChange} />
        </label>
        <label htmlFor="initial">
          initial
          <input id="initial" name="initial" type="text" onChange={handleChange} />
        </label>
        <label htmlFor="mailAddress">
          mailAddress
          <input id="mailAddress" name="mailAddress" type="text" onChange={handleChange} />
        </label>
        <label htmlFor="status">
          status
          <input id="status" name="status" type="text" onChange={handleChange} />
        </label>
        <input type="submit" value="add" />
      </form>
    </div>
  );
}

export default Administration;
