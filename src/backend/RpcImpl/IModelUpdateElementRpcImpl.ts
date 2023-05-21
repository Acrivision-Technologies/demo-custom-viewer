
import { IModelRpcProps, RpcManager, SubjectProps } from "@itwin/core-common";
import { IModelUpdateElementRpcInterface } from "../../common/RpcInterfaces/IModelUpdateElementRpcInterface";
import { BriefcaseDb, IModelDb, IModelHost } from "@itwin/core-backend";
export class IModelUpdateElementRpcImpl extends IModelUpdateElementRpcInterface {
  public static register() { RpcManager.registerImpl(IModelUpdateElementRpcInterface, IModelUpdateElementRpcImpl); }


  public override async updateECClassElementById(_requestParams: IModelRpcProps, _elementUpdateData: any): Promise<any> {
    return new Promise(async (resolve: any) => {
      console.log("Updating element: ", _elementUpdateData.id);
      console.log('_elementUpdateData');
      console.log(_elementUpdateData);
      try {
        const access_token = await IModelHost.authorizationClient?.getAccessToken();
        const iModelDb: BriefcaseDb = BriefcaseDb.findByKey(_requestParams.key);
        const rootElement: SubjectProps = await iModelDb.elements.getRootSubject().toJSON();
        const rootSubjectId = rootElement.id ?? '';
        console.log(`rootSubjectId: ${rootSubjectId}`);
        const comment = `Updating ${_elementUpdateData.classFullName} by id: ${_elementUpdateData.id} by Service Agent`;

        // acquireLocks
        await iModelDb.locks.acquireLocks({ shared: rootSubjectId, exclusive: rootSubjectId });

        // pull db changes
        await iModelDb.pullChanges({ accessToken: access_token });

        // perform delete
        await iModelDb.elements.updateElement(_elementUpdateData);

        // save changes
        console.log('comment');
        console.log(comment);
        try {
          await iModelDb.saveChanges(comment);
       
          // push changes
          await iModelDb.pushChanges({ description: comment, accessToken: access_token });
  
          await iModelDb.locks.releaseAllLocks(); 
  
          resolve({ status: "SUCCESS" });
        } catch(e) {
          console.log("updateECClassElementById: Error while saving changes");
          console.log(e);
          resolve({ status: "FAILED", error_msg: "Something went wrong" });
        }


      } catch (e: any) {
        console.log("updateECClassElementById: Canot open the BriefcaseDb");
        console.log(e);
        resolve({ status: "FAILED", error_msg: "Something went wrong" });
      }

    })
  }
}