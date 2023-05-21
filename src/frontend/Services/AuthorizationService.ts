/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { BrowserAuthorizationClient, BrowserAuthorizationClientConfiguration } from "@itwin/browser-authorization";
// import { NodeCliAuthorizationClient, NodeCliAuthorizationConfiguration } from "@itwin/node-cli-authorization";

import { appConfig } from "./AppConfigService";
// import { AuthorizationClient } from "@itwin/core-common";

class AuthorizationService {
  public _authorizationClient: BrowserAuthorizationClient | undefined;

  public async createAuthorizationClient(): Promise<BrowserAuthorizationClient> {
    const authorizationClientConfiguration: BrowserAuthorizationClientConfiguration = {
      authority: appConfig.auth.authority,
      clientId: appConfig.auth.clientId,
      redirectUri: appConfig.auth.redirectUrl,
      postSignoutRedirectUri: undefined,
      scope: appConfig.auth.scopes,
      responseType: "code",
    };

    const client = new BrowserAuthorizationClient(authorizationClientConfiguration);
    return client;
  }

  public async getAccessToken(): Promise<string> {
    if (!this._authorizationClient) {
      this._authorizationClient = await this.createAuthorizationClient();
      await this._authorizationClient.signIn();
    }

    return this._authorizationClient.getAccessToken();
  }
}

// class AuthorizationService {
//   public _authorizationClient: NodeCliAuthorizationClient | undefined;

//   public async createAuthorizationClient(): Promise<NodeCliAuthorizationClient> {
//     const authorizationClientConfiguration: NodeCliAuthorizationConfiguration = {
//       issuerUrl: appConfig.auth.authority,
//       clientId: appConfig.auth.clientId,
//       redirectUri: appConfig.auth.redirectUrl,
//       scope: appConfig.auth.scopes
//     };

//     const client = new NodeCliAuthorizationClient(authorizationClientConfiguration);
//     return client;
//   }

//   public async getAccessToken(): Promise<string> {
//     if (!this._authorizationClient) {
//       this._authorizationClient = await this.createAuthorizationClient();
//       await this._authorizationClient.signIn();
//     }

//     return this._authorizationClient.getAccessToken();
//   }
// }

export const authorizationService = new AuthorizationService();
