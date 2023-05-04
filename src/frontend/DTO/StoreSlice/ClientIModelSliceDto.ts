import { BrowserAuthorizationClient } from "@itwin/browser-authorization";


// Define a type for the slice state
export interface ClientIModelSliceState {
    serverInitiated: boolean;
    changeSetId: string;
    changeSetIndex: number;
    iModelId: string;
    iTwinId: string;
    error_msg: string;
    accessToken: string;
    viewAuthClient: BrowserAuthorizationClient | undefined;
    briefcaseKey: string;
    initiateServerRequestState: string;
    getChangeSetDetailsRequestState: string;
}