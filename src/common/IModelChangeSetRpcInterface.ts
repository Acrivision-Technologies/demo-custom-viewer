

import { IModelRpcProps, RpcInterface, RpcManager } from "@itwin/core-common"

export abstract class IModelChangeSetRpcInterface extends RpcInterface {

    public static interfaceVersion = "1.0.0";
    public static interfaceName = "IModelChangeSetRpcInterface";
  
    public static getClient(): IModelChangeSetRpcInterface { return RpcManager.getClientForInterface(this); }
    public async fetchInfo (_iModelToken: IModelRpcProps): Promise<any> { return this.forward.apply(this, arguments as any) as any; }
  }