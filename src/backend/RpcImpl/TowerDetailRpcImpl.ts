
import { IModelRpcProps, QueryBinder, QueryRowFormat, RpcManager, SubjectProps } from "@itwin/core-common";
import { BriefcaseDb, IModelDb } from "@itwin/core-backend";
import { PerformDbOperationsAsChangeSetService } from "../Services/PerformDbOperationsAsChangeSetService";
import { TowerDetailRpcInterface } from "../../common/RpcInterfaces/TowerDetailRpcInterface";
export class TowerDetailRpcImpl extends TowerDetailRpcInterface {
    public static register() { RpcManager.registerImpl(TowerDetailRpcInterface, TowerDetailRpcImpl); }



    private getPhysicalPartition = async (iModelDb: BriefcaseDb): Promise<any> => {
        return new Promise(async(resolve: any, reject: any) => {
            try {
                let id: any = null;
                const query = `SELECT * from BisCore.PhysicalPartition `;
                for await (const row of iModelDb.query(query)) {
                    id = row[0];
                }
                resolve(id);
            } catch(e) {
                reject(e)
            }
        })
    }

    public override async getTowerPhysicalElementTypes(_requestParams: IModelRpcProps): Promise<any> {
        let types: any[] = [];
        let towerTypes: any = [];
        return new Promise(async (resolve: any) => {
            try {
                const iModelDb: BriefcaseDb = BriefcaseDb.findByKey(_requestParams.key);
                this.getPhysicalPartition(iModelDb)
                    .then(async(physicalPartitionId: any) => {
                        const query = `select ECClassId from BisCore.Element where model.id = ?`;
                        for await (const row of iModelDb.query(query, QueryBinder.from([physicalPartitionId]), { rowFormat: QueryRowFormat.UseJsPropertyNames })) {
                            types.push(row);
                        }

                        const unique = [...new Set(types.map((item: any) => {
                            return item.className;
                        }))];
                        unique.map((value) => {
                            let itemClassName: any = value;
                            const splitValue = itemClassName.split(".");
                            let label = splitValue[splitValue.length - 1];
                            towerTypes.push({ value: itemClassName, label: label })
                        })
                        resolve({ status: "SUCCESS", data: towerTypes });
                    })
                    .catch((error: any) => {
                        resolve({ status: "FAILED", message: error.message })
                    })
            } catch (e:any) {
                console.log(`Error inside getTowerPhysicalElementTypes`);
                console.log(`Error: ${e}`)
                resolve({ status: "FAILED", message: e.message })
            }
        })
    }

    public override async getAllPhysicalElementsByType(_requestParams: IModelRpcProps, _elementType: string): Promise<any> {
        return new Promise(async (resolve: any) =>{
            try {
                const iModelDb: BriefcaseDb = BriefcaseDb.findByKey(_requestParams.key);
                let elements: any = [];
                const query = `Select * from ${_elementType}`;
                for await (const row of iModelDb.query(query, QueryBinder.from([]), { rowFormat: QueryRowFormat.UseJsPropertyNames })) {
                    elements.push(row);
                }
                resolve({ status: "SUCCESS", data: elements });

            } catch (e:any) {
                console.log(`Error inside getAllPhysicalElementsByType`);
                console.log(`Error: ${e}`)
                resolve({ status: "FAILED", message: e.message })
            }
        })
    }
}