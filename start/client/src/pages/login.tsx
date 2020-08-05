import React from 'react';
import { gql, useMutation } from '@apollo/client';
import { LoginForm, Loading } from '../components';
import { isLoggedInVar } from '../cache';

const LOGIN_USER = gql`
  mutation login($email: String!) {
    login(email: $email)
  }
`

export default function Login() {
  const [login, { loading, error }] = useMutation(
    LOGIN_USER,
    {
      onCompleted({login}) {
        localStorage.setItem("token", login);
        isLoggedInVar(true);
      }
    }
  );

  if(loading) return <Loading />
  if(error) return <p>An error ocurred</p>

  return <LoginForm login={login} />;
}
