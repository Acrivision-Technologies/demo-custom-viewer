import { RpcInterfaceDefinition } from "@itwin/core-common";
import { ConnectorIModelCreationInterface } from "./RpcInterfaces/ConnectorIModelCreationInterface";


export default function getConnectServerRpcs(): RpcInterfaceDefinition[] {
    return [
      ConnectorIModelCreationInterface
    ];
  }