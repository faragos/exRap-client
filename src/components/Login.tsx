import React from 'react';
import { useLoginLoginMutation } from '../service/auth.api';
import { ExRapAuthDTOCredential, LoginLoginApiArg } from '../gen/auth.api.generated';

function Login() {
  const [
    login, // This is the mutation trigger
  ] = useLoginLoginMutation();

  const arg = {
    loginName: 'asd',
    password: 'asd',
    passwordHint: 'sad',
  } as ExRapAuthDTOCredential;

  const param = { exRapAuthDtoCredential: arg } as LoginLoginApiArg;

  return (
    <div>
      <h1>login</h1>
      <button type="button" onClick={() => login(param)}> Login </button>
    </div>
  );
}
export default Login;
