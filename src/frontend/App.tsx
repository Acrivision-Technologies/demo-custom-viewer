import "./App.scss";

import { BrowserAuthorizationClient } from "@itwin/browser-authorization";
import type { ScreenViewport } from "@itwin/core-frontend";
import { FitViewTool, IModelApp, StandardViewId } from "@itwin/core-frontend";
import { FillCentered } from "@itwin/core-react";
import { ProgressLinear } from "@itwin/itwinui-react";

import React, { useCallback, useEffect, useState } from "react";

import { history } from "./history";
import { authorizationService } from "./Services/AuthorizationService";
import { ChangeSetService } from "./Services/ChangeSetService";
import { iModelsService } from "./Services/IModelsService";
import { appConfig } from "./Services/AppConfigService";
import { CustomViewer } from "./Viewer";
import { BentleyCloudRpcManager, BentleyCloudRpcParams } from "@itwin/core-common";
import getSupportedRpcs from "../common/rpcs";
import { IModelBriefcaseRpcInterface } from "../common/RpcInterfaces/IModelBriefcaseRpcInterface";
import { Guid } from "@itwin/core-bentley";
import { useAppDispatch, useAppSelector } from "./store/hooks";
import { RootState } from "./store";
import { updateChangeSetDetails, updateViewClientAndAccessTokenDetails } from "./store/slices/clientIModel";
import { InitiatedServerThunkDataDto, getLatestChangesetDetailsThunk, initiatedServerThunk } from "./store/asyncThunk/InitiateBackendServerAsyncThunk";
import getConnectServerRpcs from "../common/connectorServerRpcs";


const briefcaseID = Guid.createValue();

console.log('process.env');
console.log(process.env);

const App: React.FC = () => {
    const { briefcaseKey, accessToken, iModelId, iTwinId, changeSetId, changeSetIndex, viewAuthClient, serverInitiated } = useAppSelector((state: RootState) => state.clientIModel);
    const dispatch = useAppDispatch();

    const login = useCallback(async () => {
        console.log("inside login callback")
        try {
            const result = await authorizationService.getAccessToken();
            console.log("------ access token +++++++");
            console.log(result);
            dispatch(updateViewClientAndAccessTokenDetails({ accessToken: result, viewAuthClient: authorizationService._authorizationClient }))
        } catch {
            throw new Error("Login failed");
        }
    }, []);

    useEffect(() => {
        console.log("calling login")
        const connectorServerParams: BentleyCloudRpcParams = { info: { title: "shema-connector-express-server", version: "v1.0" }, uriPrefix: "http://localhost:4003" };
        BentleyCloudRpcManager.initializeClient(connectorServerParams, getConnectServerRpcs());
        
        console.log('getConnectServerRpcs()');
        console.log(getConnectServerRpcs());
        
        const cloudParams: BentleyCloudRpcParams = { info: { title: "local-backend-for-bff-concept", version: "v1.0" }, uriPrefix: "http://localhost:3001" };
        BentleyCloudRpcManager.initializeClient(cloudParams, getSupportedRpcs());

        console.log('getSupportedRpcs()');
        console.log(getSupportedRpcs());


        void login();
    }, [login]);

    useEffect(() => {
        console.log("changing the url")
        if (accessToken && iTwinId) {
            let queryString = `?iTwinId=${iTwinId}`;
            if (iModelId) {
                queryString += `&iModelId=${iModelId}`;
            }

            history.push(queryString);
        }
    }, [accessToken, iTwinId, iModelId]);


    useEffect(() => {
        if (accessToken) {
            console.log("inside getChangesets");
            console.log("iModelId: ", iModelId)
            dispatch(getLatestChangesetDetailsThunk(iModelId))
        }
    }, [accessToken, iModelId]);

    useEffect(() => {
        if (accessToken && changeSetId && changeSetIndex > 0) {
            console.log('------- initiatedServerThunk');
            (async () => {
                console.log("changes applied");
                console.log('changeSetId')
                console.log(changeSetId)
                console.log('changeSetIndex')
                console.log(changeSetIndex)
                const data: InitiatedServerThunkDataDto = {
                    iModelRpcProps: {
                        key: briefcaseKey,
                        iModelId: iModelId,
                        iTwinId: iTwinId
                    },
                    _changeSetIndex: changeSetIndex
                }
                dispatch(initiatedServerThunk(data));
            })();
        }

    }, [accessToken, changeSetId, changeSetIndex])

    return (
        <div className="viewer-container">
            {!accessToken && (
                <FillCentered>
                    <div className="signin-content">
                        <ProgressLinear indeterminate={true} labels={["Signing in..."]} />
                    </div>
                </FillCentered>
            )}
            {accessToken && changeSetId && <CustomViewer iTwinId={iTwinId} iModelId={iModelId} changeSetId={changeSetId} viewAuthClient={viewAuthClient} serverInitiated={serverInitiated} />}
        </div>
    );
};

export default App;
