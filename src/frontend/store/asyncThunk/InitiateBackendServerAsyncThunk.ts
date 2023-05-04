import { createAsyncThunk } from "@reduxjs/toolkit";
import { IModelBriefcaseRpcInterface } from "../../../common/RpcInterfaces/IModelBriefcaseRpcInterface";
import { IModelRpcProps } from "@itwin/core-common";
import { iModelsService } from "../../Services/IModelsService";
import { updateChangeSetDetails } from "../slices/clientIModel";

export interface InitiatedServerThunkDataDto {
    iModelRpcProps: IModelRpcProps,
    _changeSetIndex: number
}

export const initiatedServerThunk = createAsyncThunk(
    "ClientIModel/initiateBackendServer",
    async (data: any, thunkAPI) => {
        try {
            console.log("inside initiatedServerThunk")
            const serverDownloadBriefcaseResult: any = await IModelBriefcaseRpcInterface.getClient().loadBriefcaseAndRetriveBriefcaseId(data.iModelRpcProps, data._changeSetIndex);
            if(serverDownloadBriefcaseResult.status == 'SUCCESS') {
                thunkAPI.fulfillWithValue(true);
            } else {
                thunkAPI.rejectWithValue("Request Failed")
            }
            // const serverDownloadBriefcaseResult: any = await IModelBriefcaseRpcInterface.getClient().loadBriefcaseAndRetriveBriefcaseId({ key: appConfig.briefcaseKey, iModelId: appConfig.auth.iModelId, iTwinId: appConfig.auth.iTwinId }, changeSetIdIndex)
        }catch(e: any) {
            return thunkAPI.rejectWithValue(e.message);
        }
    }
);

export const getLatestChangesetDetailsThunk = createAsyncThunk(
    "ClientIModel/getLatestChangesetDetailsThunk",
    async (iModelId: any, thunkAPI) => {
        try {
            console.log("ClientIModel/getLatestChangesetDetailsThunk inside ")
            console.log('data');
            console.log(iModelId);
            await iModelsService.getChangesets(iModelId)
                .then((queriedChangesets) => {
                    if(queriedChangesets.length > 0) {
                        console.log('queriedChangesets');
                        console.log(queriedChangesets);
                        const lastChangesetId = queriedChangesets[queriedChangesets.length - 1].id;
                        const lastChangesetIndex = queriedChangesets[queriedChangesets.length - 1].index;
                        thunkAPI.dispatch(updateChangeSetDetails({ changeSetId: lastChangesetId, changeSetIndex: lastChangesetIndex }));
                    }
                })
                .catch((e) => {
                    console.log(`Changesets query failed with status code ${e.message}.`)
                    thunkAPI.rejectWithValue(`Changesets query failed with status code ${e.message}.`)
                });
        }catch(e: any) {
            return thunkAPI.rejectWithValue(e.message);
        }
    }

);