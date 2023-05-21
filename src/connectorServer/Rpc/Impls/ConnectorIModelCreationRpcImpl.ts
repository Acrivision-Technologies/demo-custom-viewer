import { RpcManager, IModelRpcProps } from "@itwin/core-common";
import { ConnectorIModelCreationInterface } from "../../../common/RpcInterfaces/ConnectorIModelCreationInterface";

export class ConnectorIModelCreationRpcImpl extends ConnectorIModelCreationInterface {
  public static register() { RpcManager.registerImpl(ConnectorIModelCreationInterface, ConnectorIModelCreationRpcImpl); }

  public override createIModel(_requestParams: IModelRpcProps, _requestBody: any): Promise<any> {
    console.log("inside the ConnectorIModelCreationRpcImpl createIModel")
    return new Promise(async (resolve: any) => {
        console.log('_req');
        console.log(_requestBody?.filename);
        console.log('respond with a resource');
        let params: any = {
            filename: _requestBody?.filename ?? '',
            iModelName: _requestBody?.iModelName ?? '',
            accessToekn: _requestBody?.accessToekn ?? '',
        }
        resolve("Done");
        // ConnectorController.processIModelCreationRequest(params)
        //     .then((response: any) => {
        //         console.log('response');
        //         console.log(response);
        //         resolve({ status: "Success" })
        //     })
        //     .catch((error: any) => {
        //         console.log('error');
        //         console.log(error);
        //         resolve({ status: "Failed" })
        //     })


    })

  }

}
