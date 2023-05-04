import { RpcManager, AuthorizationClient, IModelRpcProps, IModelNotFoundResponse, LocalBriefcaseProps } from "@itwin/core-common";
import { BriefcaseDb, BriefcaseManager, IModelDb, IModelHost, OpenBriefcaseArgs, RequestNewBriefcaseArg } from "@itwin/core-backend";
import { IModelBriefcaseRpcInterface } from "../../common/RpcInterfaces/IModelBriefcaseRpcInterface";
import { IModelsClient, GetBriefcaseListParams, AuthorizationCallback, Authorization, toArray } from "@itwin/imodels-client-management"
import * as fs from 'fs';
export class IModelBriefcaseRpcImpl extends IModelBriefcaseRpcInterface {
  public static register() { RpcManager.registerImpl(IModelBriefcaseRpcInterface, IModelBriefcaseRpcImpl); }


  private async getAgentIModelBriefcases(_requestParams: IModelRpcProps): Promise<any> {
    return new Promise((resolve: any, reject: any) => {
      const imodelId = _requestParams.iModelId ? _requestParams.iModelId : '';
      IModelHost.hubAccess.getMyBriefcaseIds({ iModelId: imodelId })
        .then((res: any) => {
          console.log("getAgentIModelBriefcases success");
          console.log(res);
          resolve(res);
        })
        .catch((error: any) => {
          console.log("Error while getAgentIModelBriefcases and error: ");
          console.log(error);
          reject(error);
        })

    })

  }

  private async aquireNewBriefaceId(_requestParams: IModelRpcProps): Promise<any> {
    return new Promise((resolve: any, reject: any) => {
      const imodelId = _requestParams.iModelId ? _requestParams.iModelId : '';
      IModelHost.hubAccess.acquireNewBriefcaseId({ iModelId: imodelId })
        .then((briefcaseId: any) => {
          console.log("aquireNewBriefaceId success");
          console.log(briefcaseId);
          resolve(briefcaseId);
        })
        .catch((error: any) => {
          console.log("Error while aquiring a new BriefcaseId and error: ");
          console.log(error);
          reject(error);
        })
    })
  }


  private getAgentIModelBriefcaseId(_requestParams: IModelRpcProps): Promise<any> {
    return new Promise((resolve: any, reject: any) => {
      this.getAgentIModelBriefcases(_requestParams)
        .then((briefcases: any) => {
          console.log("getAgentIModelBriefcaseId success +++");
          console.log('briefcases');
          console.log(briefcases);

          if (briefcases.length == 0) {
            this.aquireNewBriefaceId(_requestParams)
              .then((briefcaseId: any) => {
                console.log("aquireNewBriefaceId success");
                console.log(briefcaseId);
                resolve(briefcaseId);
              })
              .catch((error: any) => {
                console.log("Error while aquiring a new BriefcaseId and error: ");
                console.log(error);
                reject(error);
              })
          } else {

            resolve(briefcases[0]);

          }

        })
        .catch((error: any) => {
          console.log("getAgentIModelBriefcaseId error +++");
          console.log('error');
          console.log(error);
          reject(error);
        })

    })
  }

  private async checkForDbByKey(key: string, _changeSetIndex: number, accessToken: any): Promise<any> {
    return new Promise(async (resolve: any) => {
      try {
        const iModelDb: BriefcaseDb = BriefcaseDb.findByKey(key);
        // console.log(`_changeSetIndex: ${_changeSetIndex}`);
        // console.log(`key: ${key}`);
        // const isBriefcase = iModelDb.isBriefcase;
        // console.log("isBriefcase: ", isBriefcase);
        // console.log("iModelDb: ");
        // console.log(iModelDb);
        if (iModelDb.changeset.index !== _changeSetIndex) {
          await iModelDb.pullChanges({ toIndex: _changeSetIndex, accessToken: accessToken });
          // console.log('------------ +++++++++++++ iModelDb');
          // console.log(iModelDb);
          resolve(true);
        } else {
          resolve(true);
        }
      } catch (e) {
        console.log('------------ +++++++++++++ iModelDb eRror');
        console.log(e);
        resolve(false);
      }

    })
  }

  private openBreifcase(breifcaseProps: OpenBriefcaseArgs): Promise<any> {

    return new Promise((resolve: any) => {
      BriefcaseDb.open(breifcaseProps)
        .then((result: any) => {
          console.log('isBriefcase');
          console.log(result.isBriefcase);
          console.log("breifcaseProps.key");
          console.log(breifcaseProps.key);
          console.log('------------------')
          resolve({ status: "SUCCESS" });
        })
        .catch((error: any) => {
          console.log("error while opening the breifcase db");
          console.log(error);
          resolve({ status: "FAILED", error_msg: `Error while opening the Briefcase Db` });
        })
    })

  }


  public override async loadBriefcaseAndRetriveBriefcaseId(_requestParams: IModelRpcProps, _changeSetIndex: number): Promise<any> {
    return new Promise(async (resolve: any) => {
      const imodelId = _requestParams.iModelId ? _requestParams.iModelId : '';
      const accessToken = await IModelHost.authorizationClient?.getAccessToken();
      this.checkForDbByKey(_requestParams.key, _changeSetIndex, accessToken)
        .then((iModelExists: any) => {
          console.log("------- checkForDbByKey response");
          console.log(iModelExists);

          if (!iModelExists) {
            this.getAgentIModelBriefcaseId(_requestParams)
              .then((briefcaseId: number) => {
                let options: RequestNewBriefcaseArg = {
                  accessToken: accessToken,
                  iModelId: _requestParams.iModelId ? _requestParams.iModelId : '',
                  iTwinId: _requestParams.iTwinId ? _requestParams.iTwinId : '',
                  briefcaseId: briefcaseId
                }
                BriefcaseManager.downloadBriefcase(options)
                  .then((briefcase: LocalBriefcaseProps) => {

                    console.log('briefcase +++++');
                    console.log(briefcase);

                    const breifcaseProps: OpenBriefcaseArgs = {
                      fileName: briefcase.fileName,
                      key: _requestParams.key
                    }
                    console.log('breifcaseProps');
                    console.log(breifcaseProps);

                    this.openBreifcase(breifcaseProps)
                      .then((res: any) => {
                        resolve(res)
                      })
                  })
                  .catch((error: Error) => {
                    console.log("Not able to download briefcase locally");
                    console.log(error);
                    if (error.name) {
                      // console.log(error.name);
                      // console.log(error.message);
                      if (error.name == 'File Already Exists') {
                        const fileName = BriefcaseManager.getFileName({ iModelId: imodelId, briefcaseId: briefcaseId })
                        console.log("filename: ", fileName)
                        const breifcaseProps: OpenBriefcaseArgs = {
                          fileName: fileName,
                          key: _requestParams.key
                        }
                        this.openBreifcase(breifcaseProps)
                          .then((res: any) => {
                            resolve(res)
                          })
                      }
                    } else {
                      resolve({ status: "FAILED", error_msg: `Not able to download briefcase locally` });
                    }
                  })
              })
              .catch((error: any) => {
                console.log(`loadBriefcaseAndRetriveBriefcaseId:getAgentIModelBriefcaseId error:`);
                console.log(error);

                resolve("loadBriefcaseAndRetriveBriefcaseId Error")
                resolve({ status: "FAILED", error_msg: `loadBriefcaseAndRetriveBriefcaseId Error` });

              })
          } else {
            resolve("loadBriefcaseAndRetriveBriefcaseId Success iModelExists: ", iModelExists)
            resolve({ status: "SUCCESS" });
          }

        })

    })

  }

}
