import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks';
import { fetchUserById, updateUser } from '../store/user/actions';
import { User } from '../store/user/types';
import { setUser } from '../store/user/reducers';

function Dashboard() {
  const user = useAppSelector((state) => state.user.user);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!user.id) {
      dispatch(fetchUserById(10));
    }
  }, [fetchUserById, user]);

  const handleUpdateUser = async (userData: User) => {
    const resultAction = await dispatch(updateUser(userData));
    if (updateUser.fulfilled.match(resultAction)) {
      const returnedUser = resultAction.payload;
      alert(`Updated ${returnedUser.firstName}`);
    } else if (resultAction.payload) {
      // Since we passed in `MyKnownError` to `rejectValue` in `updateUser`,
      // the type information will be available here.
      // Note: this would also be a good place to do any handling that relies
      // on the `rejectedWithValue` payload, such as setting field errors
      alert(`Update failed: ${resultAction.payload.errorMessage}`);
    } else {
      alert(`Update failed: ${resultAction.error.message}`);
    }
  };

  const changeUser = async () => {
    dispatch(setUser({
      id: 5,
      firstName: 'Max',
      lastName: 'Mustermann',
      username: 'mmu',
    } as User));
  };

  return (
    <div>
      {user.id}
      {' '}
      {user.firstName}
      {' '}
      {user.age}
      <button onClick={() => handleUpdateUser(user)} type="button">Update to the next user from the API</button>
      <button onClick={() => changeUser()} type="button">Change User data in store directly without API</button>
    </div>
  );
}

export default Dashboard;
