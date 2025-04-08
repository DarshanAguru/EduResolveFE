import { Amplify } from 'aws-amplify';

Amplify.configure({
  Auth: {
    Cognito: {
       userPoolClientId: import.meta.env.VITE_API_AWS_USER_POOL_CLIENT_ID, 
       userPoolId: import.meta.env.VITE_API_AWS_USER_POOL_ID,
       identityPoolId: import.meta.env.VITE_API_AWS_IDENTITY_POOL_ID,
       loginWith : {
        username: true,
       }
    },
    }
});