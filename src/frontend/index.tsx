import "./index.scss";

import { BrowserAuthorizationCallbackHandler } from "@itwin/browser-authorization";
import React from "react";
import ReactDOM from "react-dom";

import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { Provider } from "react-redux";
import { store } from "./store";
import { BentleyCloudRpcManager, BentleyCloudRpcParams } from "@itwin/core-common";
import getSupportedRpcs from "../common/rpcs";


console.log('process.env');
console.log(process.env);

// if (!process.env.IMJS_AUTH_CLIENT_CLIENT_ID) {
//   throw new Error(
//     "Please add a valid OIDC client id to the .env file and restart the application. See the README for more information."
//   );
// }
// if (!process.env.IMJS_AUTH_CLIENT_SCOPES) {
//   throw new Error(
//     "Please add valid scopes for your OIDC client to the .env file and restart the application. See the README for more information."
//   );
// }
if (!process.env.IMJS_AUTH_CLIENT_REDIRECT_URI) {
  throw new Error(
    "Please add a valid redirect URI to the .env file and restart the application. See the README for more information."
  );
}

const redirectUrl = new URL(process.env.IMJS_AUTH_CLIENT_REDIRECT_URI);
if (redirectUrl.pathname === window.location.pathname) {
  BrowserAuthorizationCallbackHandler.handleSigninCallback(redirectUrl.toString())
    .then((res: any) => {
      // console.log("inside the first siginin handler")
      // const cloudParams: BentleyCloudRpcParams = { info: { title: "local-backend-for-bff-concept", version: "v1.0" }, uriPrefix: "http://localhost:3001" };
      // BentleyCloudRpcManager.initializeClient(cloudParams, getSupportedRpcs());
     })
    .catch(console.error);
} else {
  ReactDOM.render(
    // <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>,
    // </React.StrictMode>,
    document.getElementById("root")
  );
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
