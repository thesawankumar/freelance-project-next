const isTest = 1;
const isProduction = 2;
const isDevelopment = 3;
const isJar = 4;

const determineEnvironment = (url) => {
  if (url.includes("3000")) {
    return isDevelopment;
  } else if (url.includes("8080")) {
    return isJar;
  } else if (url.includes("wastetrackingtest")) {
    return isTest;
  } else {
    return isProduction;
  }
};

window._env_ = (function (env) {
  switch (env) {
    case isDevelopment:
      return {
        BACKEND_URL: "http://localhost:8080",
        REDIRECT_SIGN_IN: "http://localhost:3000/login",
        REDIRECT_SIGN_OUT: "http://localhost:3000/logout",
        COGNITO_DOMAIN: "localhost",
        MSG: "dev mode",

        // COGNITO_CLIENT: "2ub8d4pn9j80dko54ao468ff2h",
        // COGNITO_SECRET: "15ljnbam1a1usmmjqkvmrttlj78m3969liipet77obaac6odrvp5",
        // COGNITO_ISSUER: "https://cognito-idp.us-east-1.amazonaws.com/us-east-1_EqSnZA5qg",

        // ONELOGIN_CLIENT_ID: "63840550-de64-0139-1f54-0675a67e5233192439",
        // ONELOGIN_CLIENT_SECRET: "0528cd1cd1482bc02e6cb687029be0c636872465b92081eb2f5ad405ac21ad8d"
      };
    case isTest:
      return {
        BACKEND_URL: "https://wastetrackingtest.aacounty.org",
        REDIRECT_SIGN_IN: "https://wastetrackingtest.aacounty.org/login.html",
        REDIRECT_SIGN_OUT: "https://wastetrackingtest.aacounty.org/logout.html",
        COGNITO_DOMAIN: "wastetrackingtest.aacounty.org",
        MSG: "test mode",

        // COGNITO_CLIENT: "2ub8d4pn9j80dko54ao468ff2h",
        // COGNITO_SECRET: "15ljnbam1a1usmmjqkvmrttlj78m3969liipet77obaac6odrvp5",
        // COGNITO_ISSUER: "https://cognito-idp.us-east-1.amazonaws.com/us-east-1_EqSnZA5qg",

        // ONELOGIN_CLIENT_ID: "63840550-de64-0139-1f54-0675a67e5233192439",
        // ONELOGIN_CLIENT_SECRET: "0528cd1cd1482bc02e6cb687029be0c636872465b92081eb2f5ad405ac21ad8d"
      };
    case isProduction:
      return {
        BACKEND_URL: "https://wastetracking.aacounty.org",
        REDIRECT_SIGN_IN: "https://wastetracking.aacounty.org/login.html",
        REDIRECT_SIGN_OUT: "https://wastetracking.aacounty.org/logout.html",
        COGNITO_DOMAIN: "wastetracking.aacounty.org",
        MSG: "prod mode",
      };
    case isJar:
      return {
        BACKEND_URL: "http://localhost:8080",
        REDIRECT_SIGN_IN: "http://localhost:8080/login.html",
        REDIRECT_SIGN_OUT: "http://localhost:8080/logout.html",
        COGNITO_DOMAIN: "localhost",
        MSG: "Java Build mode",
      };
  }
})(determineEnvironment(window.location.origin));
