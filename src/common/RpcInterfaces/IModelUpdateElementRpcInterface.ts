

import { IModelRpcProps, RpcInterface, RpcManager } from "@itwin/core-common"

export abstract class IModelUpdateElementRpcInterface extends RpcInterface {

    public static interfaceVersion = "1.0.0";
    public static interfaceName = "IModelUpdateElementRpcInterface";
    
    public static getClient(): IModelUpdateElementRpcInterface { return RpcManager.getClientForInterface(this); }
    public async updateECClassElementById (_requestParams: IModelRpcProps, _elementUpdateData: any): Promise<any> { return this.forward.apply(this, arguments as any) as any; }
  }