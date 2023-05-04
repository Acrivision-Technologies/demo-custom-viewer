

// Define a type for the slice state
export interface ElementCollectionUiProviderSliceState {
    towerElementTypes: any;
    towerElements: any;
    error_msg: string;
    getTowerPhysicalElementTypesRequestState: string;
    getAllPhysicalElementsByTypeThunkRequestState: string;
    deleteElementByIdThunkRequestState: string;
}