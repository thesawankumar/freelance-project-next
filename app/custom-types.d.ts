declare global {
    interface Window {
      _env_: {
        BACKEND_URL: string;
        REDIRECT_SIGN_IN: string;
        REDIRECT_SIGN_OUT: string;
        COGNITO_DOMAIN: string;
        MSG: string;
      };
    }
  }
  
  export {};