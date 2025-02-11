import React from 'react';
import { useAuth } from '@/frontend/src/util/use-auth-client';

export default function Logout() {
  const { login } = useAuth();

  return (
    <div className="container">
      <h1>Internet Identity Client</h1>
      <h2>You are not authenticated</h2>
      <p>To log in, click this button!</p>
      <button type="button" id="loginButton" onClick={login}>
        Log in
      </button>
    </div>
  );
}
