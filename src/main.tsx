import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { Amplify } from "aws-amplify";

// Configure Amplify with Cognito
Amplify.configure({
  Auth: {
    Cognito: {
      userPoolId: "us-east-1_B77Adsx73",
      userPoolClientId: "24nqema7p0t5r3oa7c4dvaeiu4",
      identityPoolId: "us-east-1:048e6aca-c5a6-4eb3-b546-9bfaeee06501",
      loginWith: {
        email: true
      },
      signUpVerificationMethod: "code",
      userAttributes: {
        email: {
          required: true
        }
      },
      allowGuestAccess: false,
      passwordFormat: {
        minLength: 8,
        requireLowercase: true,
        requireUppercase: true,
        requireNumbers: true,
        requireSpecialCharacters: true
      }
    }
  }
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
