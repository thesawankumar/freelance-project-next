"use client";
import { createContext, useContext } from "react";
import AwsConfig from "../awsConfig";
import React from "react";

type CognitoContextType = {
    AwsConfig: () => Promise<void>;
  } | null; // get around strict typing ts error

export const CognitoContext = createContext<CognitoContextType>(null);

export function useCognito() {
  return useContext(CognitoContext);
}

export function Provider(props: any) {
  React.useEffect(() => {
    AwsConfig();
  }, []);
  return (
    <CognitoContext.Provider value={{ AwsConfig }}>
      {props.children}
    </CognitoContext.Provider>
  );
}
