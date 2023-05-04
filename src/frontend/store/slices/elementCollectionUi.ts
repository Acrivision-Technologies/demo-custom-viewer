import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ElementCollectionUiProviderSliceState } from '../../DTO/StoreSlice/ElementCollectionUiProviderSliceDto';
import { getAllPhysicalElementsByTypeThunk, getTowerPhysicalElementTypesThunk, deleteElementByIdThunk } from '../asyncThunk/elementCollectionUIAsyncThunk';


// Define the initial state using that type
const initialState: ElementCollectionUiProviderSliceState = {
    towerElementTypes: [],
    towerElements: [],
    error_msg: "",
    getTowerPhysicalElementTypesRequestState: "",
    getAllPhysicalElementsByTypeThunkRequestState: "",
    deleteElementByIdThunkRequestState: ""
}

// getLatestChangesetDetailsThunk
const getTowerPhysicalElementTypesActionPending = (state: any) => {
    console.log("inside getTowerPhysicalElementTypesActionPending");
    state.error_msg = '';
    state.getTowerPhysicalElementTypesRequestState = "Pending";
};
const getTowerPhysicalElementTypesActionFulFilled = (state: any, action: any) => {
    console.log("inside getTowerPhysicalElementTypesActionFulFilled");
    state.error_msg = '';
    state.getTowerPhysicalElementTypesRequestState = "Fulfilled";
};
const getTowerPhysicalElementTypesActionRejected = (state: any, action: PayloadAction<any>) => {
    console.log("inside getTowerPhysicalElementTypesActionRejected");
    state.error_msg = action.payload;
    state.getTowerPhysicalElementTypesRequestState = "Rejected";
};

const getAllPhysicalElementsByTypeThunkActionPending = (state: any) => {
    console.log("inside getAllPhysicalElementsByTypeThunkActionPending");
    state.error_msg = '';
    state.getAllPhysicalElementsByTypeThunkRequestState = "Pending";
};
const getAllPhysicalElementsByTypeThunkActionFulFilled = (state: any, action: any) => {
    console.log("inside getAllPhysicalElementsByTypeThunkActionFulFilled");
    state.error_msg = '';
    state.getAllPhysicalElementsByTypeThunkRequestState = "Fulfilled";
};
const getAllPhysicalElementsByTypeThunkActionRejected = (state: any, action: PayloadAction<any>) => {
    console.log("inside getAllPhysicalElementsByTypeThunkActionRejected");
    state.error_msg = action.payload;
    state.getAllPhysicalElementsByTypeThunkRequestState = "Rejected";
};

const deleteElementByIdThunkActionPending = (state: any) => {
    console.log("inside deleteElementByIdThunkActionPending");
    state.error_msg = '';
    state.deleteElementByIdThunkRequestState = "Pending";
};
const deleteElementByIdThunkActionFulFilled = (state: any, action: any) => {
    console.log("inside deleteElementByIdThunkActionFulFilled");
    state.error_msg = '';
    state.deleteElementByIdThunkRequestState = "Fulfilled";
};
const deleteElementByIdThunkActionRejected = (state: any, action: PayloadAction<any>) => {
    console.log("inside deleteElementByIdThunkActionRejected");
    state.error_msg = action.payload;
    state.deleteElementByIdThunkRequestState = "Rejected";
};

export const elementCollectionUiSlice = createSlice({
    name: 'elementCollectionUi',
    // `createSlice` will infer the state type from the `initialState` argument
    initialState,
    reducers: {
        updateTowerPhysicalElementTypes: (state: any, action: PayloadAction<any>) => {
            console.log("updateTowerPhysicalElementTypes");
            console.log('action');
            console.log(action);
            state.towerElementTypes = action.payload;
        },
        updateTowerElements: (state: any, action: PayloadAction<any>) => {
            console.log("updateTowerElements");
            console.log('action');
            console.log(action);
            state.towerElements = action.payload;
        },

    },
    extraReducers: (builder) => {
        builder.addCase(getTowerPhysicalElementTypesThunk.pending, getTowerPhysicalElementTypesActionPending);
        builder.addCase(getTowerPhysicalElementTypesThunk.fulfilled, getTowerPhysicalElementTypesActionFulFilled);
        builder.addCase(getTowerPhysicalElementTypesThunk.rejected, getTowerPhysicalElementTypesActionRejected);
        
        // getAllPhysicalElementsByTypeThunk
        builder.addCase(getAllPhysicalElementsByTypeThunk.pending, getAllPhysicalElementsByTypeThunkActionPending);
        builder.addCase(getAllPhysicalElementsByTypeThunk.fulfilled, getAllPhysicalElementsByTypeThunkActionFulFilled);
        builder.addCase(getAllPhysicalElementsByTypeThunk.rejected, getAllPhysicalElementsByTypeThunkActionRejected);
        
        // deleteElementByIdThunk
        builder.addCase(deleteElementByIdThunk.pending, deleteElementByIdThunkActionPending);
        builder.addCase(deleteElementByIdThunk.fulfilled, deleteElementByIdThunkActionFulFilled);
        builder.addCase(deleteElementByIdThunk.rejected, deleteElementByIdThunkActionRejected);
        
    },
})

export const { updateTowerPhysicalElementTypes, updateTowerElements } = elementCollectionUiSlice.actions;

export default elementCollectionUiSlice.reducer;