/*---------------------------------------------------------------------------------------------
* Copyright (c) 2019 Bentley Systems, Incorporated. All rights reserved.
* Licensed under the MIT License. See LICENSE.md in the project root for license terms.
*--------------------------------------------------------------------------------------------*/
import { RpcInterfaceDefinition, IModelReadRpcInterface, IModelTileRpcInterface, SnapshotIModelRpcInterface } from "@itwin/core-common";
// import { PresentationRpcInterface } from "@bentley/presentation-common";
import { IModelChangeSetRpcInterface } from "./IModelChangeSetRpcInterface";
import { IModelBriefcaseRpcInterface } from "./RpcInterfaces/IModelBriefcaseRpcInterface";
import { IModelDeleteElementRpcInterface } from "./RpcInterfaces/IModelDeleteElementRpcInterface";
import { IModelUpdateElementRpcInterface } from "./RpcInterfaces/IModelUpdateElementRpcInterface";
import { TowerDetailRpcInterface } from "./RpcInterfaces/TowerDetailRpcInterface";
import { ConnectorIModelCreationInterface } from "./RpcInterfaces/ConnectorIModelCreationInterface";

/**
 * Returns a list of RPCs supported by this application
 */
export default function getSupportedRpcs(): RpcInterfaceDefinition[] {
  return [
    IModelReadRpcInterface,
    IModelTileRpcInterface,
    IModelChangeSetRpcInterface,
    SnapshotIModelRpcInterface,
    IModelBriefcaseRpcInterface,
    IModelDeleteElementRpcInterface,
    IModelUpdateElementRpcInterface,
    TowerDetailRpcInterface,
  ];
}


