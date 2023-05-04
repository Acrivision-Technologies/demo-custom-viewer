

import { IModelRpcProps, RpcInterface, RpcManager } from "@itwin/core-common"

export abstract class IModelDeleteElementRpcInterface extends RpcInterface {

    public static interfaceVersion = "1.0.0";
    public static interfaceName = "IModelDeleteElementRpcInterface";
    
    public static getClient(): IModelDeleteElementRpcInterface { return RpcManager.getClientForInterface(this); }
    public async deleteElementById (_requestParams: IModelRpcProps, _elementId: number): Promise<any> { return this.forward.apply(this, arguments as any) as any; }
  }