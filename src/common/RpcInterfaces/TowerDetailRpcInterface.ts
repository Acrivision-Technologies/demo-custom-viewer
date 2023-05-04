

import { IModelRpcProps, RpcInterface, RpcManager } from "@itwin/core-common"

export abstract class TowerDetailRpcInterface extends RpcInterface {

    public static interfaceVersion = "1.0.0";
    public static interfaceName = "TowerDetailRpcInterface";
    
    public static getClient(): TowerDetailRpcInterface { return RpcManager.getClientForInterface(this); }
    public async getTowerPhysicalElementTypes (_requestParams: IModelRpcProps): Promise<any> { return this.forward.apply(this, arguments as any) as any; }
    public async getAllPhysicalElementsByType (_requestParams: IModelRpcProps, _elementType: string): Promise<any> { return this.forward.apply(this, arguments as any) as any; }
  }