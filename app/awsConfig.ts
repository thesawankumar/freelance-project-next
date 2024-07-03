import { Amplify, Auth } from "aws-amplify";

export default async function AwsConfig() {
  const message = (window as any)._env_?.MSG;
  const redirectSignIn = (window as any)._env_?.REDIRECT_SIGN_IN;
  const redirectSignOut = (window as any)._env_?.REDIRECT_SIGN_OUT;
  const cognitoDomain = (window as any)._env_?.COGNITO_DOMAIN;
  console.log("ENV: ", message, cognitoDomain);

  const awsAuth = {
    domain: "aacounty-login.auth.us-east-1.amazoncognito.com",
    scope: ["phone", "email", "openid"],
    redirectSignIn: redirectSignIn,
    redirectSignOut: redirectSignOut,
    responseType: "code",
  };

  const awsconfig = {
    Auth: {
      region: "us-east-1",
      userPoolId: "us-east-1_EqSnZA5qg",
      userPoolWebClientId: "5ghsfd30dte1nd1vm0l5f8rcqk",
      mandatorySignIn: false,
      cookieStorage: {
        domain: cognitoDomain,
        path: "/",
        expires: 365,
        secure: true,
      },
    },
  };

  Amplify.configure(awsconfig);
  Auth.configure({ oauth: awsAuth });
}
