import {Amplify} from 'aws-amplify';

Amplify.configure({
  Auth: {
    region: `${import.meta.env.VITE_API_AWS_REGION}`,
    userPoolId: `${import.meta.env.VITE_API_AWS_USER_POOL_ID}`,
    userPoolWebClientId: `${import.meta.env.VITE_API_AWS_USER_POOL_WEB_CLIENT_ID}`,
    authenticationFlowType: `${import.meta.env.VITE_API_AWS_AUTH_FLOW_TYPE}`,
  }
});