import { createAsyncThunk } from "@reduxjs/toolkit";
import { TowerDetailRpcInterface } from "../../../common/RpcInterfaces/TowerDetailRpcInterface";
import { updateTowerElements, updateTowerPhysicalElementTypes } from "../slices/elementCollectionUi";
import { IModelDeleteElementRpcInterface } from "../../../common/RpcInterfaces/IModelDeleteElementRpcInterface";
import { IModelUpdateElementRpcInterface } from "../../../common/RpcInterfaces/IModelUpdateElementRpcInterface";

const asyncThunkName = "ElementCollectionUIAsyncThunk"

export const getTowerPhysicalElementTypesThunk = createAsyncThunk(
    `${asyncThunkName}/getTowerPhysicalElementTypes`,
    async (iModelRpcProps: any, thunkAPI) => {
        try {
            console.log("inside getTowerPhysicalElementTypes");
            console.log(iModelRpcProps);
            const getTowerPhysicalElementTypesResult: any = await TowerDetailRpcInterface.getClient().getTowerPhysicalElementTypes(iModelRpcProps);
            console.log("getTowerPhysicalElementTypesResult response");
            if (getTowerPhysicalElementTypesResult.status == 'SUCCESS') {
                thunkAPI.dispatch(updateTowerPhysicalElementTypes(getTowerPhysicalElementTypesResult.data))
            } else {
                thunkAPI.rejectWithValue("TowerDetailRpcInterface:getTowerPhysicalElementTypes Request Failed")
            }
        } catch (e: any) {
            return thunkAPI.rejectWithValue(e.message);
        }
    }
);

export const getAllPhysicalElementsByTypeThunk = createAsyncThunk(
    `${asyncThunkName}/getAllPhysicalElementsByType`,
    async (data: any, thunkAPI) => {
        try {
            console.log("inside getAllPhysicalElementsByType");
            console.log(data);
            const getAllPhysicalElementsByTypeResult: any = await TowerDetailRpcInterface.getClient().getAllPhysicalElementsByType(data.iModelRpcProps, data.elementType);
            console.log("getAllPhysicalElementsByTypeResult response");
            if (getAllPhysicalElementsByTypeResult.status == 'SUCCESS') {
                thunkAPI.dispatch(updateTowerElements(getAllPhysicalElementsByTypeResult.data))
            } else {
                thunkAPI.rejectWithValue("TowerDetailRpcInterface:getAllPhysicalElementsByType Request Failed")
            }
        } catch (e: any) {
            return thunkAPI.rejectWithValue(e.message);
        }
    }

);

export const deleteElementByIdThunk = createAsyncThunk(
    `${asyncThunkName}/deleteElementById`,
    async (data: any, thunkAPI) => {
        try {
            console.log("inside deleteElementById");
            console.log(data);
            const deleteElementResult: any = await IModelDeleteElementRpcInterface.getClient().deleteElementById(data.iModelRpcProps, data.elementId);
            console.log("deleteElementResult response");
            console.log(deleteElementResult);
            if (deleteElementResult.status == 'SUCCESS') {
                console.log("------ successed")
                // thunkAPI.dispatch(updateTowerElements(deleteElementResult.data))
            } else {
                thunkAPI.rejectWithValue("TowerDetailRpcInterface:deleteElementResult Request Failed")
            }
        } catch (e: any) {
            console.log(e);
            return thunkAPI.rejectWithValue(e);
        }
    }
);

export const updateIModelElementThunk = createAsyncThunk(
    `${asyncThunkName}/updateIModelElementThunk`,
    async(data: any, thunkAPI) => {
        try {
            console.log("inside updateIModelElementThunk");
            console.log(data);
            const updateIModelElementThunkResult: any = await IModelUpdateElementRpcInterface.getClient().updateECClassElementById(data.iModelRpcProps, data.updatedElementData);
            console.log("updateIModelElementThunkResult response");
            console.log(updateIModelElementThunkResult);
            if (updateIModelElementThunkResult.status == 'SUCCESS') {
                console.log("------ successed")
                // thunkAPI.dispatch(updateTowerElements(updateIModelElementThunkResult.data))
            } else {
                thunkAPI.rejectWithValue("TowerDetailRpcInterface:updateIModelElementThunkResult Request Failed")
            }
        } catch (e: any) {
            console.log(e);
            return thunkAPI.rejectWithValue(e);
        }
    }
);