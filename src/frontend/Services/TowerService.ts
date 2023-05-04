import { QueryBinder, QueryRowFormat } from "@itwin/core-common";
import { IModelConnection } from "@itwin/core-frontend";

export const getPhysicalPartition = async (iModel: IModelConnection): Promise<any> => {
    let id: any = null;
    if (!iModel.isClosed) {
        const query = `SELECT * from BisCore.PhysicalPartition `;
        for await (const row of iModel.query(query)) {
            id = row[0];
        }
    }
    return id;
}

export const getAllTowerPhysicalTypes = async(iModel: IModelConnection): Promise<any> => {
    let types = [];
    const physicalPartitionId = await getPhysicalPartition(iModel);
    const query = `select ECClassId from BisCore.Element where model.id = ?`;
    for await (const row of iModel.query(query, QueryBinder.from([physicalPartitionId]), { rowFormat: QueryRowFormat.UseJsPropertyNames })) {
        types.push(row);
    }
    return types;
}

export const getAllElementsForType = async(iModel: IModelConnection, selectedType: string): Promise<any> => {
    let elements = [];
    const query = `Select * from ${selectedType}`;
    for await (const row of iModel.query(query, QueryBinder.from([]), { rowFormat: QueryRowFormat.UseJsPropertyNames })) {
        elements.push(row);
    }
    return elements;
}
