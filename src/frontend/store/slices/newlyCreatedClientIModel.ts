import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { NewlyCreatedClientIModelsSliceDto } from '../../DTO/StoreSlice/NewlyCreatedClientIModelsSliceDto';
import { createIModelThunk } from '../asyncThunk/createIModelAsyncThunk';


// Define the initial state using that type
const initialState: NewlyCreatedClientIModelsSliceDto = {
    iModels: [],
    iModelCreationRequestStatus: "",
}

// getLatestChangesetDetailsThunk
const createIModelActionPending = (state: any) => {
    console.log("inside createIModelActionPending");
    state.error_msg = '';
    state.createIModelRequestState = "Pending";
};
const createIModelActionFulFilled = (state: any, action: any) => {
    console.log("inside createIModelActionFulFilled");
    state.error_msg = '';
    state.createIModelRequestState = "Fulfilled";
};
const createIModelActionRejected = (state: any, action: PayloadAction<any>) => {
    console.log("inside createIModelActionRejected");
    state.error_msg = action.payload;
    state.createIModelRequestState = "Rejected";
};

export const iModelCreatedSlice = createSlice({
    name: 'iModelCreated',
    // `createSlice` will infer the state type from the `initialState` argument
    initialState,
    reducers: {
        updateIModels: (state: any, action: PayloadAction<any>) => {
            console.log("updateIModels");
            console.log('action');
            console.log(action);
            // state.iModels = action.payload;
        },

    },
    extraReducers: (builder) => {
        builder.addCase(createIModelThunk.pending, createIModelActionPending);
        builder.addCase(createIModelThunk.fulfilled, createIModelActionFulFilled);
        builder.addCase(createIModelThunk.rejected, createIModelActionRejected);
        
    },
})

export const { updateIModels } = iModelCreatedSlice.actions;

export default iModelCreatedSlice.reducer;