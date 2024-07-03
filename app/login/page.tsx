"use client";
import { useAuth } from "../context/authContext";
import styles from './login.module.css'
import React, { useEffect } from "react";
import { Auth, Hub } from "aws-amplify";
// import aacoLogo from "../icons/aacoLogo.svg";
// import Image from "next/image";
// import "./login.css";
import { Spinner } from "react-activity";
import "react-activity/dist/library.css";
import { error } from "console";

export default function Login() {
  const [loggedIn, setLoggedin] = React.useState(false);
  const { setAuth } = useAuth() || {} as any; // Workaround for weird type error
  useEffect(() => {
    Hub.listen("auth", ({ payload: { event, data } }) => {
      switch (event) {
        case "signIn":
          console.log("sign in", event, data);
          getTokenFromSession();
          break;
        case "signOut":
          console.log("sign out");
          setAuth(null);
          localStorage.removeItem("header_token");
          break;
        case "tokenRefresh":
          console.log("tokens refreshed", event, data);
          break;
      }
    });
  }, []);

  const [idToken, setIdToken] = React.useState<string | null>(null);

  async function checkLoggedIn() {
    try {
      await Auth.currentAuthenticatedUser();
      setLoggedin(true);
    } catch {
      setLoggedin(false);
    }
  }
  console.log("Logged In?", loggedIn);

  async function getUser() {
    try {
      console.log("Header token: ", idToken);
      const backendUrl = `${(window as any)._env_.BACKEND_URL}/alluser/api/user`;
      console.log("backendUrl: ", backendUrl);
      const response = await fetch(backendUrl,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${idToken}`,
          },
        }
      );
      const result = await response.json();
      if (result.hasOwnProperty("error")) {
        console.error("Error in user obect.") // Without this, it sets your user as the error.
      } else {
        localStorage.setItem("current_user", JSON.stringify(result));
      }
      return result;
    } catch (error) {
      console.error("API request error:", error);
      throw error;
    }
  }

  async function getTokenFromSession() {
    try {
      const session = await Auth.currentSession();
      const idToken = session.getIdToken().getJwtToken();
      setIdToken(idToken);
      // console.log("Header token: ", idToken);
      localStorage.setItem("header_token", idToken);
    } catch (error) {
      console.error("Error fetching token:", error);
    }
  }

  useEffect(() => {
    checkLoggedIn();
    if (loggedIn === true) {
      getTokenFromSession();
    }
  }, [loggedIn]);

  useEffect(() => {
    if (idToken !== null) {
      getUser().then((result) => {
        setAuth(result);
      });
    } else {
      console.log("ID token not found.");
    }
  }, [idToken]);

  return (
    <main className="gradient-container center">
      <div className={styles.logincontainer}>
        <div className={styles.elementcontainer}>
          <h1 className="title">Waste Tracking</h1>
          <p className="subtitle">Updated: 6/6/24 9:05am</p>
          <div className={styles.buttoncontainer}>
            <button className={styles.loginbutton}
              onClick={() => {
                Auth.federatedSignIn();
              }}
            >
              {loggedIn ? <Spinner color="white" className={styles.loginspinner}/> : "Login"}
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
