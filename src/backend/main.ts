/*---------------------------------------------------------------------------------------------
* Copyright (c) 2019 Bentley Systems, Incorporated. All rights reserved.
* Licensed under the MIT License. See LICENSE.md in the project root for license terms.
*--------------------------------------------------------------------------------------------*/
import * as path from "path";
import { AccessToken, Logger } from "@itwin/core-bentley";
import { IModelDb, IModelHost, IModelHostConfiguration } from "@itwin/core-backend";
import getSupportedRpcs from "../common/rpcs";
import { RpcInterfaceDefinition } from "@itwin/core-common";
// import setupEnv from "../common/configuration";
import { IModelChangeSetRpcImpl } from "./IModelChangeSetRpcImpl";
import { BackendIModelsAccess } from "@itwin/imodels-access-backend";
import { IModelBriefcaseRpcImpl } from "./RpcImpl/IModelBriefcaseRpcImpl";
import { OIDCAuthorizationClient } from "./OIDCAuthorizationClient";
import { NodeCliAuthorization } from "./NodeCliAuthorization";
import { ClientAuthorization } from "./ClientAuthorization";
import * as dotenv from "dotenv";
import { IModelDeleteElementRpcImpl } from "./RpcImpl/IModelDeleteElementRpcImpl";
import { TowerDetailRpcImpl } from "./RpcImpl/TowerDetailRpcImpl";

const envconfigs = dotenv.config();
console.log('envconfigs');
console.log(envconfigs);

// setup environment
// setupEnv();

// initialize logging
Logger.initializeToConsole();

const clientid: string = "service-rOfGle0HKXXOcJOsCpTterIFF";
const clientSecret: string = "hOG6p5YjArNZyt6RlahFp7zx0U7bzMyfylGyF4ie3IH4CmrqsXW45bayqwtOvr4ZnS6EcGt65HHStUW417CxHw==";
const scope: string = "mesh-export:read projects:modify designelementclassification:modify issues:read projects:read synchronization:read imodelaccess:read itwinjs organization profile openid email itwins:modify transformations:modify mesh-export:modify synchronization:modify export:modify transformations:read forms:read validation:modify export:read validation:read issues:modify changedelements:read itwins:read clashdetection:modify users:read sensor-data:modify clashdetection:read imodels:read insights:modify designelementclassification:read insights:read contextcapture:modify contextcapture:read realityconversion:read realitydataanalysis:modify realitydataanalysis:read realityconversion:modify sensor-data:read webhooks:modify realitydata:modify library:read changedelements:modify realitydata:read library:modify savedviews:read storage:read storage:modify imodels:modify savedviews:modify webhooks:read forms:modify"

// initialize imodeljs-backend
const config = new IModelHostConfiguration();
config.hubAccess = new BackendIModelsAccess()
config.authorizationClient = new ClientAuthorization(clientid, clientSecret, scope)
config.cacheDir = path.join(__dirname, "output");

// Start IModelHost
IModelHost.startup(config);


// RpcInterface registration
IModelChangeSetRpcImpl.register();
IModelBriefcaseRpcImpl.register();
IModelDeleteElementRpcImpl.register();
TowerDetailRpcImpl.register();


// Start up the server
(async () => {
    console.log("backend first async call");
    // get platform-specific initialization function
    let init: (rpcs: RpcInterfaceDefinition[]) => void;
    init = (await import("./web/BackendServer")).default;
    // get RPCs supported by this backend
    const rpcs = getSupportedRpcs();
    // do initialize
    init(rpcs);
})();
