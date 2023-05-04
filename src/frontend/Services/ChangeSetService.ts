import { IModelApp } from "@itwin/core-frontend";
import { Authorization, GetChangesetListParams, IModelsClient, toArray } from "@itwin/imodels-client-management";


export class ChangeSetService {
    private client: IModelsClient;
    private iModelId: any;
    constructor() {
        this.client = new IModelsClient()
        this.iModelId = process.env.IMJS_IMODEL_ID
    }

    private getAuthorization = async(): Promise<Authorization> => {
        console.log("IModelApp");
        console.log(IModelApp)
        if (!IModelApp.authorizationClient)
          throw new Error("AuthorizationClient is not defined. Most likely IModelApp.startup was not called yet.");
    
        const token = await IModelApp.authorizationClient.getAccessToken();
        const parts = token.split(" ");
        return parts.length === 2
          ? { scheme: parts[0], token: parts[1] }
          : { scheme: "Bearer", token };
    }

    getAllChangeSets = async () => {
        // this.client.iModels
        console.log("insife getAllChangeSets")
        const changeSets: any[] = [];
        const clientChangesets = this.client.changesets;
        const options:  GetChangesetListParams = {
            iModelId: this.iModelId,
            authorization: this.getAuthorization
        }
        const result: any = await clientChangesets.getMinimalList(options);

        (await toArray(result)).map((data: any) => changeSets.push(data));

        return changeSets;
        
    }

    latestChangeSetId = async () => {

        const allChangeSets: any = await this.getAllChangeSets();
        console.log('allChangeSets');
        console.log(allChangeSets);
        let lastChangeSetId = allChangeSets[allChangeSets.length - 1].id;
        console.log(`lastChangeSetId: ${lastChangeSetId}`);
        return lastChangeSetId;

    }
}