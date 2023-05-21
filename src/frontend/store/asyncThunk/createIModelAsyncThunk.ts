import { createAsyncThunk } from "@reduxjs/toolkit";
import { ConnectorIModelCreationInterface } from "../../../common/RpcInterfaces/ConnectorIModelCreationInterface";
import { updateIModels } from "../slices/newlyCreatedClientIModel";

const asyncThunkName = "CreateIModelAsyncThunk"

export const createIModelThunk = createAsyncThunk(
    `${asyncThunkName}/createIModel`,
    async (data: any, thunkAPI) => {
        try {
            console.log("inside createIModel");
            console.log(data.iModelRpcProps);
            console.log('ConnectorIModelCreationInterface');
            console.log(ConnectorIModelCreationInterface);
            console.log('ConnectorIModelCreationInterface.getClient');
            console.log(ConnectorIModelCreationInterface.getClient());
            const result: any = await ConnectorIModelCreationInterface.getClient().createIModel(data.iModelRpcProps, data.requestBody)
            console.log('CreateIModelAsyncThunk result');
            console.log(result);
                // .then((res: any) => {
                //     console.log("createIModelResult response");
                //     thunkAPI.dispatch(updateIModels(res))
                // })
                // .catch((error: any) => {
                //     console.log("Error occured");
                //     console.log(error);
                //     thunkAPI.rejectWithValue("ConnectorIModelCreationInterface:createIModel Request Failed")
                // })

        } catch (e: any) {
            return thunkAPI.rejectWithValue(e.message);
        }
    }
);
