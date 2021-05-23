import jwt_decode from 'jwt-decode';
import { JWTTokenData } from '../types/types';
import { clearUser, setCredentials } from '../store/authInfo/reducers';
import { AuthInfo } from '../store/authInfo/types';
import { AppDispatch } from '../store/store';

/**
 * Verifies if a token is valid
 * @param token - JWT token
 */
export function isTokenValid(token: string): boolean {
  const decodedToken: JWTTokenData = jwt_decode(token);
  const expDate = new Date(decodedToken.exp * 1000);
  const notValidBeforeDate = new Date(decodedToken.nbf * 1000);
  const dateNow = new Date(Date.now());
  return dateNow > notValidBeforeDate && dateNow < expDate;
}

/**
 * Updates the auth info user store
 * @param token - JWT Token of the user
 * @param dispatch - dispatch function
 */
function updateStore(token: string, dispatch: AppDispatch) {
  const result: boolean = isTokenValid(token);
  const decodedToken: JWTTokenData = jwt_decode(token);

  if (result) {
    const authInfo: AuthInfo = {
      username: decodedToken.name,
      token,
      isAuthenticated: true,
    };
    dispatch(setCredentials(authInfo));
  } else {
    dispatch(clearUser());
  }
}

export default updateStore;
