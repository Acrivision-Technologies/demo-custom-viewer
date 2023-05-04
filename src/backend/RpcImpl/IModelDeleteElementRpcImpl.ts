
import { IModelRpcProps, RpcManager, SubjectProps } from "@itwin/core-common";
import { IModelDeleteElementRpcInterface } from "../../common/RpcInterfaces/IModelDeleteElementRpcInterface";
import { BriefcaseDb, IModelDb, IModelHost } from "@itwin/core-backend";
import { PerformDbOperationsAsChangeSetService } from "../Services/PerformDbOperationsAsChangeSetService";
export class IModelDeleteElementRpcImpl extends IModelDeleteElementRpcInterface {
  public static register() { RpcManager.registerImpl(IModelDeleteElementRpcInterface, IModelDeleteElementRpcImpl); }


  public override async deleteElementById(_requestParams: IModelRpcProps, _elementId: any): Promise<any> {
    return new Promise(async (resolve: any) => {
      console.log("Deleting element: ", _elementId);
      try {
        const access_token = await IModelHost.authorizationClient?.getAccessToken();
        const iModelDb: BriefcaseDb = BriefcaseDb.findByKey(_requestParams.key);
        const rootElement: SubjectProps = await iModelDb.elements.getRootSubject().toJSON();
        const rootSubjectId = rootElement.id ?? '';
        console.log(`rootSubjectId: ${rootSubjectId}`);
        const comment = `Delete MountElement by id: ${_elementId} by Service Agent`;

        // acquireLocks
        await iModelDb.locks.acquireLocks({ shared: rootSubjectId, exclusive: rootSubjectId });

        // pull db changes
        await iModelDb.pullChanges({ accessToken: access_token });

        // perform delete
        await iModelDb.elements.deleteElement(_elementId);

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
          console.log("Error while saving changes");
          console.log(e);
          resolve({ status: "FAILED", error_msg: "Something went wrong" });
        }


      } catch (e: any) {
        console.log("Canot open the BriefcaseDb");
        console.log(e);
        resolve({ status: "FAILED", error_msg: "Something went wrong" });
      }

    })
  }
}