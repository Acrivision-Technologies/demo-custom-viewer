import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ClientIModelSliceState } from '../../DTO/StoreSlice/ClientIModelSliceDto';
import { appConfig } from '../../Services/AppConfigService';
import { getLatestChangesetDetailsThunk, initiatedServerThunk } from '../asyncThunk/InitiateBackendServerAsyncThunk';


// Define the initial state using that type
const initialState: ClientIModelSliceState = {
    serverInitiated: false,
    changeSetId: '',
    changeSetIndex: 0,
    iModelId: appConfig.auth.iModelId,
    iTwinId: appConfig.auth.iTwinId,
    error_msg: '',
    accessToken: "",
    viewAuthClient: undefined,
    briefcaseKey: appConfig.briefcaseKey,
    initiateServerRequestState: "Pending",
    getChangeSetDetailsRequestState: "Pending"
}

const serverInitiationActionPending = (state: any) => {
    console.log("inside serverInitiationActionPending");
    state.error_msg = '';
    state.initiateServerRequestState = "Pending";
};
const serverInitiationActionFulFilled = (state: any, action: PayloadAction<any>) => {
    console.log("inside serverInitiationActionFulFilled");
    console.log('action.payload')
    console.log(action.payload)
    state.error_msg = '';
    state.initiateServerRequestState = "Fulfilled";
    state.serverInitiated = action.payload
};
const serverInitiationActionRejected = (state: any, action: PayloadAction<any>) => {
    console.log("inside serverInitiationActionRejected");
    console.log('action.payload')
    console.log(action.payload)
    state.error_msg = action.payload;
    state.initiateServerRequestState = "Rejected";
};


// getLatestChangesetDetailsThunk
const getChangeSetDetailsActionPending = (state: any) => {
    console.log("inside getChangeSetDetailsActionPending");
    state.error_msg = '';
    state.getChangeSetDetailsRequestState = "Pending";
};
const getChangeSetDetailsActionFulFilled = (state: any, action: any) => {
    console.log("inside getChangeSetDetailsActionFulFilled");
    state.error_msg = '';
    state.getChangeSetDetailsRequestState = "Fulfilled";
};
const getChangeSetDetailsActionRejected = (state: any, action: PayloadAction<any>) => {
    console.log("inside getChangeSetDetailsActionRejected");
    state.error_msg = action.payload;
    state.getChangeSetDetailsRequestState = "Rejected";
};


export const clientIModelSlice = createSlice({
    name: 'clientIModel',
    // `createSlice` will infer the state type from the `initialState` argument
    initialState,
    reducers: {
        updateChangeSetDetails: (state, action: PayloadAction<any>) => {
            console.log("updateChangeSetDetails");
            console.log('action');
            console.log(action);
            state.changeSetId = action.payload.changeSetId;
            state.changeSetIndex = action.payload.changeSetIndex;
        },
        updateViewClientAndAccessTokenDetails: (state, action: PayloadAction<any>) => {
            console.log("updateViewClientAndAccessTokenDetails");
            console.log('action');
            console.log(action);
            state.accessToken = action.payload.accessToken;
            state.viewAuthClient = action.payload.viewAuthClient;

        }

    },
    extraReducers: (builder) => {
          builder.addCase(initiatedServerThunk.pending, serverInitiationActionPending);
          builder.addCase(initiatedServerThunk.fulfilled, serverInitiationActionFulFilled);
          builder.addCase(initiatedServerThunk.rejected, serverInitiationActionRejected);
        
        //   getLatestChangesetDetails
          builder.addCase(getLatestChangesetDetailsThunk.pending, getChangeSetDetailsActionPending);
          builder.addCase(getLatestChangesetDetailsThunk.fulfilled, getChangeSetDetailsActionFulFilled);
          builder.addCase(getLatestChangesetDetailsThunk.rejected, getChangeSetDetailsActionRejected);
    },
})

export const { updateChangeSetDetails, updateViewClientAndAccessTokenDetails } = clientIModelSlice.actions;

export default clientIModelSlice.reducer;