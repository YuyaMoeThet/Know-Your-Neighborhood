import React from "react";
import { GoogleOAuthProvider, useGoogleLogin } from "@react-oauth/google";

const GoogleLoginButton = ({ onHandleSuccess, onHandleFail }) => {
  const clientId ="661359056290-i5sf4uhvskg53h0jhq41eclnh9oa868q.apps.googleusercontent.com";
  

  const login = useGoogleLogin({
    clientId,
    onSuccess: onHandleSuccess,
    onError: onHandleFail,
    scope: "email profile",
    // accessType: "offline",
    // responseType: "token id_token",
    prompt: "consent",
  });

  return (
    <>
      <button onClick={() => login()} className="Google">
        Join with <span className="blue">G</span>
        <span className="red">o</span>
        <span className="yellow">o</span>
        <span className="blue">g</span>
        <span className="green">l</span>
        <span className="red">e</span>
      </button>
    </>
  );
};

export default GoogleLoginButton;
