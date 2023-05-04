import { RpcManager, AuthorizationClient, IModelRpcProps } from "@itwin/core-common";
import { IModelDb } from "@itwin/core-backend";
import { IModelChangeSetRpcInterface } from "../common/IModelChangeSetRpcInterface";

export class IModelChangeSetRpcImpl extends IModelChangeSetRpcInterface {
  public static register() { RpcManager.registerImpl(IModelChangeSetRpcInterface, IModelChangeSetRpcImpl); }

  public override async fetchInfo(_iModelToken: IModelRpcProps): Promise<any> {
    console.log("_iModelToken: ");
    console.log(_iModelToken);
    return {"status": "Done"};


  }

//   private async fetchPositions(info: any[], token: any) {
//     let componentList = "(";
//     const count = info.length;
//     // prepare list of component ids
//     info.forEach((value: any, index: number) => {
//       componentList += "'" + value.component_id + "'";
//       componentList += (++index !== count) ? ", " : ")";
//     });

//     const query = `SELECT piping.Component_id, physical.Origin
//       FROM AutoPlantPDWPersistenceStrategySchema.PipingComponent piping
//       JOIN Bis.ElementOwnsChildElements link ON piping.ECInstanceId = link.SourceECInstanceId
//       JOIN Bis.PhysicalElement physical ON link.TargetECInstanceId = physical.ECInstanceId
//       WHERE piping.Component_id IN ${componentList}`;

//     const imodel = IModelDb.find(token);
//     const rows = [];
//     for await (const row of imodel.query(query)) rows.push(row);

//     rows.forEach((row) => {
//       const index = info.findIndex((x) => x.component_id === row.cOMPONENT_ID);
//       if (index > 0) info[index].position = row.origin;
//     });

//     return info;
//   }
}
