/*---------------------------------------------------------------------------------------------
* Copyright (c) 2019 Bentley Systems, Incorporated. All rights reserved.
* Licensed under the MIT License. See LICENSE.md in the project root for license terms.
*--------------------------------------------------------------------------------------------*/
import * as path from "path";
import { AccessToken, Logger } from "@itwin/core-bentley";
import { IModelDb, IModelHost, IModelHostConfiguration } from "@itwin/core-backend";
import getConnectServerRpcs from "../common/connectorServerRpcs";
import { RpcInterfaceDefinition } from "@itwin/core-common";
import { BackendIModelsAccess } from "@itwin/imodels-access-backend";
import * as dotenv from "dotenv";
import { ConnectorIModelCreationRpcImpl } from "./Rpc/Impls/ConnectorIModelCreationRpcImpl";

const envconfigs = dotenv.config();
console.log('envconfigs');
console.log(envconfigs);

// setup environment
// setupEnv();

// initialize logging
Logger.initializeToConsole();

// initialize imodeljs-backend
const config = new IModelHostConfiguration();
config.hubAccess = new BackendIModelsAccess()
config.cacheDir = path.join(__dirname, "connectorIModelServer");

// Start IModelHost
IModelHost.startup(config);


// RpcInterface registration
ConnectorIModelCreationRpcImpl.register();


// Start up the server
(async () => {
    console.log("backend first async call");
    // get platform-specific initialization function
    let init: (rpcs: RpcInterfaceDefinition[]) => void;
    init = (await import("./BackendServer")).default;
    // get RPCs supported by this backend
    const rpcs = getConnectServerRpcs()
    // do initialize
    init(rpcs);
})();
