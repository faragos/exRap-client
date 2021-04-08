import jwt_decode from 'jwt-decode';
import { JWTTokenData } from '../types/types';
import { User } from '../store/user/types';
import { setCredentials, clearUser } from '../store/user/reducers';
import { useAppDispatch } from '../hooks';

function validateToken(token: string|null) {
  const dispatch = useAppDispatch();
  if (typeof token === 'string') {
    const decodedToken: JWTTokenData = jwt_decode(token);
    const expDate = new Date(decodedToken.exp * 1000);
    const notValidBeforeDate = new Date(decodedToken.nbf * 1000);
    const dateNow = new Date(Date.now());
    if (dateNow > notValidBeforeDate && dateNow < expDate) {
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
}

export default validateToken;
