
import { AccessToken } from "@itwin/core-bentley";
import { NodeCliAuthorizationClient, NodeCliAuthorizationConfiguration } from "@itwin/node-cli-authorization";
export class NodeCliAuthorization {
    private clientId: string;
    client: NodeCliAuthorizationClient | null;
    constructor(clientId: string) {
        this.clientId = clientId
        this.client = null;
        this.processSignIn();
    }

    private processSignIn = async() => {
        let options: NodeCliAuthorizationConfiguration = {
            clientId: this.clientId,
            scope: "mesh-export:read projects:modify designelementclassification:modify issues:read projects:read synchronization:read imodelaccess:read itwinjs organization profile openid email itwins:modify transformations:modify mesh-export:modify synchronization:modify export:modify transformations:read forms:read validation:modify export:read validation:read issues:modify changedelements:read itwins:read clashdetection:modify users:read sensor-data:modify clashdetection:read imodels:read insights:modify designelementclassification:read insights:read contextcapture:modify contextcapture:read realityconversion:read realitydataanalysis:modify realitydataanalysis:read realityconversion:modify sensor-data:read webhooks:modify realitydata:modify library:read changedelements:modify realitydata:read library:modify savedviews:read storage:read storage:modify imodels:modify savedviews:modify webhooks:read forms:modify"
        }
        this.client = new NodeCliAuthorizationClient(options);
        await this.client.signIn();
    }

    getAccessToken = ():Promise<AccessToken> => {
        return new Promise(async (resolve: any, reject: any) => {
            try {
                resolve(await this.client?.getAccessToken())
            } catch(e: any) {
                reject(e)
            }
        })
    }
}