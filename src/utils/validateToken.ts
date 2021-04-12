import jwt_decode from 'jwt-decode';
import { JWTTokenData } from '../types/types';
import { clearUser, setCredentials } from '../store/user/reducers';
import { User } from '../store/user/types';
import { useAppDispatch } from '../hooks';

export function isTokenValid(token: string): boolean {
  const decodedToken: JWTTokenData = jwt_decode(token);
  const expDate = new Date(decodedToken.exp * 1000);
  const notValidBeforeDate = new Date(decodedToken.nbf * 1000);
  const dateNow = new Date(Date.now());
  return dateNow > notValidBeforeDate && dateNow < expDate;
}

function updateStore(token: string) {
  const dispatch = useAppDispatch();
  const result: boolean = isTokenValid(token);
  const decodedToken: JWTTokenData = jwt_decode(token);

  if (result) {
    const user: User = {
      username: decodedToken.name,
      token,
      isAuthenticated: true,
    };
    dispatch(setCredentials(user));
  } else {
    dispatch(clearUser());
  }
}

export default updateStore;