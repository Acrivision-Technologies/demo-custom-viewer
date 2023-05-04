
import { AccessToken } from "@itwin/core-bentley";
import { AuthorizationClient } from "@itwin/core-common";
import { OidcClient, OidcClientSettings } from "oidc-client";
export class OIDCAuthorizationClient implements AuthorizationClient {

    getAccessToken(): Promise<AccessToken> {
        return new Promise(async (resolve: any) => {
            const oidcSetttings: OidcClientSettings = {
                authority: "https://ims.bentley.com",
                client_id: "service-rOfGle0HKXXOcJOsCpTterIFF",
                client_secret: 'fQr9/4fgLGSOUMzTSOrzHf6i5YfBWRHIb3gC+2dhjEflN7H+NUC7/nA3MjcqbxwTZKorOVWGvj5dNX9pCfUCMA==',
                scope: "mesh-export:read projects:modify designelementclassification:modify issues:read projects:read synchronization:read imodelaccess:read itwinjs organization profile openid email itwins:modify transformations:modify mesh-export:modify synchronization:modify export:modify transformations:read forms:read validation:modify export:read validation:read issues:modify changedelements:read itwins:read clashdetection:modify users:read sensor-data:modify clashdetection:read imodels:read insights:modify designelementclassification:read insights:read contextcapture:modify contextcapture:read realityconversion:read realitydataanalysis:modify realitydataanalysis:read realityconversion:modify sensor-data:read webhooks:modify realitydata:modify library:read changedelements:modify realitydata:read library:modify savedviews:read storage:read storage:modify imodels:modify savedviews:modify webhooks:read forms:modify"
            }
            const oidcClient = new OidcClient(oidcSetttings)
            // const signinRequest = await oidcClient.createSigninRequest();
            console.log('oidcClient');
            console.log(oidcClient);

            resolve("test");
            
        })
    }
}