

import { IModelRpcProps, RpcInterface, RpcManager } from "@itwin/core-common"

export abstract class IModelBriefcaseRpcInterface extends RpcInterface {

    public static interfaceVersion = "1.0.0";
    public static interfaceName = "IModelBriefcaseRpcInterface";
  
    public static getClient(): IModelBriefcaseRpcInterface { return RpcManager.getClientForInterface(this); }
    public async loadBriefcaseAndRetriveBriefcaseId (_requestParams: IModelRpcProps, _changeSetIndex: number): Promise<any> { return this.forward.apply(this, arguments as any) as any; }
  }