/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
type AuthConfig = {
  authority: string;
  redirectUrl: string;
  scopes: string;
  clientId: string;
  iTwinId: string;
  iModelId: string;
}

class AppConfig {
  auth: AuthConfig;
  iModelsApiUrl: string;
  projectId: string;
  briefcaseKey: string;

  constructor() {
    this.auth = {
      authority: this.getConfigValue("REACT_APP_AUTH_CLIENT_AUTHORITY"),
      redirectUrl: this.getConfigValue("REACT_APP_AUTH_REDIRECT_URL"),
      scopes: this.getConfigValue("REACT_APP_AUTH_CLIENT_SCOPES"),
      clientId: this.getConfigValue("REACT_APP_AUTH_CLIENT_ID"),
      iTwinId: this.getConfigValue("REACT_APP_PROJECT_ID"),
      iModelId: this.getConfigValue("REACT_APP_IMODEL_ID"),
    };
    this.iModelsApiUrl = this.getConfigValue("REACT_APP_IMODELS_API_URL");
    this.projectId = this.getConfigValue("REACT_APP_PROJECT_ID");
    this.briefcaseKey = this.getConfigValue("REACT_APP_VIEWER_CLIENT_BRIEFCASE_KEY");
  }

  private getConfigValue(key: string): string {
    const value = process.env[key];
    if (!value)
      throw new Error(`Missing configuration: key ${key} must have a value. Please provide it in the .env file.`);
    return value;
  }
}

export const appConfig = new AppConfig();
