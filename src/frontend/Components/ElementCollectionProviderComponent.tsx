import React, { useCallback, useEffect, useState } from "react";
import './ElementCollectionProviderComponentStyle.scss'
import { getAllElementsForType, getAllTowerPhysicalTypes, getPhysicalPartition } from "../Services/TowerService";
import { LabeledSelect, Button } from '@itwin/itwinui-react';
import { TowerPoleTableComponent } from "./TowerPoleTableComponent";
import { ZoomOptions, ZoomToElementService } from "../Services/ZoomToElementService";
import { StandardViewId } from "@itwin/core-frontend";
import { TowerMountTableComponent } from "./TowerMountTableComponent";
import { TowerAntennaTableComponent } from "./TowerAntennaTableComponent";
import { TowerAttachmentTableComponent } from "./TowerAttachmentTableComponent";
import { TowerPanelLegTableComponent } from "./TowerPanelLegTableComponent";
import { TowerPanelFaceBracingTableComponent } from "./TowerPanelFaceBracingTableComponent";
import { TowerPanelPlanBracingTableComponent } from "./TowerPanelPlanBracingTableComponent";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { RootState } from "../store";
import { ProgressLinear } from '@itwin/itwinui-react';
import { getAllPhysicalElementsByTypeThunk, getTowerPhysicalElementTypesThunk } from "../store/asyncThunk/elementCollectionUIAsyncThunk";
import { IModelRpcProps } from "@itwin/core-common";
import { SampleTableComponent } from "./SampleTableComponent";
import { ConnectorIModelCreationInterface } from "../../common/RpcInterfaces/ConnectorIModelCreationInterface";
import { createIModelThunk } from "../store/asyncThunk/createIModelAsyncThunk";

// dev-openid
const vinayakAccessToken = "Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6IlFBSU1TLkJFTlRMRVkyMiIsInBpLmF0bSI6ImE4bWUifQ.eyJzY29wZSI6WyJpbW9kZWxodWIiXSwiY2xpZW50X2lkIjoiaW1vZGVsaHViLXN3YWdnZXIiLCJhdWQiOlsiaHR0cHM6Ly9xYS1pbXMuYmVudGxleS5jb20vYXMvdG9rZW4ub2F1dGgyIiwiaHR0cHM6Ly9xYS1pbXNvaWRjLmJlbnRsZXkuY29tL2FzL3Rva2VuLm9hdXRoMiIsImh0dHBzOi8vcWEyLWltcy5iZW50bGV5LmNvbS9hcy90b2tlbi5vYXV0aDIiLCJodHRwczovL3FhMi1pbXNvaWRjLmJlbnRsZXkuY29tL2FzL3Rva2VuLm9hdXRoMiIsImh0dHBzOi8vcWEtaW1zb2lkYy5iZW50bGV5LmNvbS9yZXNvdXJjZXMiLCJodHRwczovL3FhMi1pbXMuYmVudGxleS5jb20vcmVzb3VyY2VzIiwiaW1vZGVsLWh1Yi1zZXJ2aWNlcy0yNDg1Il0sInN1YiI6IjM4ZGJkMmIxLWUyOGQtNDM5OC1hNjI4LWQ3MWE1OWI3M2ZmNyIsInJvbGUiOlsiU0lURV9BRE1JTklTVFJBVE9SIiwiUHJvamVjdFNoYXJlIEZlZGVyYXRlZCBDb25uZWN0aW9ucyAtIFBXREkiLCJCRU5UTEVZX0VNUExPWUVFIiwiRGVzaWduIEluc2lnaHRzIEVhcmx5IEFjY2VzcyIsIkJFTlRMRVlfRU1QTE9ZRUUiXSwib3JnIjoiNzJhZGFkMzAtYzA3Yy00NjVkLWExZmUtMmYyZGZhYzk1MGE0Iiwic3ViamVjdCI6IjM4ZGJkMmIxLWUyOGQtNDM5OC1hNjI4LWQ3MWE1OWI3M2ZmNyIsImlzcyI6Imh0dHBzOi8vcWEtaW1zb2lkYy5iZW50bGV5LmNvbSIsImVudGl0bGVtZW50IjpbIlNFTEVDVF8yMDA2Il0sInByZWZlcnJlZF91c2VybmFtZSI6IlZpbmF5YWsuUGF0aWxAYmVudGxleS5jb20iLCJnaXZlbl9uYW1lIjoiVmluYXlhayIsInNpZCI6Im1NSnZzdURId2xXZVJzcXVpbnRkQWVvWDNKTS5VVUZKVFZNdFFtVnVkR3hsZVMxVFJ3LlhJVmUuanFIaWNHUmxNQU5qYWM1WFc5b0ZUODVOayIsIm5iZiI6MTY4Mzc4ODQyMSwidWx0aW1hdGVfc2l0ZSI6IjEwMDEzODkxMTciLCJ1c2FnZV9jb3VudHJ5X2lzbyI6IlVTIiwiYXV0aF90aW1lIjoxNjgzNzg4NzIxLCJuYW1lIjoiVmluYXlhay5QYXRpbEBiZW50bGV5LmNvbSIsIm9yZ19uYW1lIjoiQmVudGxleSBTeXN0ZW1zIEluYyIsImZhbWlseV9uYW1lIjoiUGF0aWwiLCJlbWFpbCI6IlZpbmF5YWsuUGF0aWxAYmVudGxleS5jb20iLCJleHAiOjE2ODM3OTIzMjR9.UWhhOG0kgIXP-SVbd4nQ-KFLSdkPmdQ-7FwYBLcpcrc3Tlbq8QWEUNKbz2cBoG5Oq6NsI8O2jc_9dUzePmZ1RpjoDpwxsJ4qLhUr5SVjEby7rvjcMJqjZUwQ6LwAf8SvArY6toOzmj0N7zL7wB0wvNkj5uHM9eXbaT3bVeIVnsTsOGHaQ4xwADQaNIbka31b3FUYfwtQOqfwDsyEaqlFUXGHdBSgf8iaWlIMSwWG2IlCM03wAtNgUxsC1mQehgltVxCgf33A9SLPhrWBdyDUPGT1H7m4XLsuu4ScUmxYm6ejn04TGU4T53XHZNBzXkjfiB-5n73Q7t16HS4Fis3bxw";
const vinayakITwinID = "f7e4d119-84fa-4e9b-b31c-94b5647e087f";
const vinayakUserID = "38dbd2b1-e28d-4398-a628-d71a59b73ff7";


// imodelhub 
const hiteshAccessToken = "Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6IkJlbnRsZXlJTVNfMjAyMyIsInBpLmF0bSI6ImE4bWUifQ.eyJzY29wZSI6WyJpbW9kZWxodWIiXSwiY2xpZW50X2lkIjoiaW1vZGVsaHViLXN3YWdnZXIiLCJhdWQiOlsiaHR0cHM6Ly9pbXMuYmVudGxleS5jb20vYXMvdG9rZW4ub2F1dGgyIiwiaHR0cHM6Ly9pbXNvaWRjLmJlbnRsZXkuY29tL2FzL3Rva2VuLm9hdXRoMiIsImh0dHBzOi8vaW1zb2lkYy5iZW50bGV5LmNvbS9yZXNvdXJjZXMiLCJpbW9kZWwtaHViLXNlcnZpY2VzLTI0ODUiXSwic3ViIjoiNWRjODkxMzItNWY2My00MjZmLTlhOGYtMzI0ODhhNTlhZWU5IiwibmJmIjoxNjg0NTAxNTQ3LCJzdWJqZWN0IjoiNWRjODkxMzItNWY2My00MjZmLTlhOGYtMzI0ODhhNTlhZWU5IiwidXNhZ2VfY291bnRyeV9pc28iOiJJTiIsImF1dGhfdGltZSI6MTY4NDUwMTg0NywiaXNzIjoiaHR0cHM6Ly9pbXNvaWRjLmJlbnRsZXkuY29tIiwibmFtZSI6ImhpdGVzaC5tYWMyMDIyQGdtYWlsLmNvbSIsInByZWZlcnJlZF91c2VybmFtZSI6ImhpdGVzaC5tYWMyMDIyQGdtYWlsLmNvbSIsImdpdmVuX25hbWUiOiJIaXRlc2giLCJmYW1pbHlfbmFtZSI6IkRpbmdhbmthciIsImVtYWlsIjoiaGl0ZXNoLm1hYzIwMjJAZ21haWwuY29tIiwic2lkIjoiVF9GaElsX0Zyd3IyS21CSXBsWU9EOU1fQl9ZLlNVMVRMVUpsYm5Sc1pYa3RVMGMuWjNWUi5jUHhFQUtyMm5SeGgxUGtMNkZvbEU5NXUwIiwiZXhwIjoxNjg0NTA1NDQ3fQ.BhH7MUAq9xTtJKUkkM8l9kkHvQgFp-HYMT1nzobtG6FzdkpbeTnAgEpoVNoYhY4zoiDc6Ph9Z-ZYjGKzqICC7ezGIznELKbUH9b-BV8AukMJQYc_huyj9iuY2YcLzaIHIStBoi7Ejv4yLRExTP1eOMneO5VBPnVl5jGY5Kub4i3YUk1WbZ1cFCGw-XUO0kH7_R5xQhRM--a1LykXRjkCrsRWqSquqrnZ61OrEH0vmCWhE7JmmWWKhEg5wHX4AFYpYyVXINAv3-r5_HPVLtAHVpqoKw-BfKVBMDbjD1bQD-k9RkR3ENeczOByqxCWJaLUZq_2uCW2VOKFeqksWn07Bg";
export const ElementCollectionProviderComponent = (props: any) => {

    // const clientIModelState = useAppSelector((state: RootState) => state.clientIModel)

    const { initiateServerRequestState, briefcaseKey, iModelId, iTwinId, accessToken } = useAppSelector((state: RootState) => state.clientIModel);
    const { towerElementTypes, towerElements } = useAppSelector((state: RootState) => state.elementCollectionUi);

    let iModelRpcProps: IModelRpcProps = {
        key: briefcaseKey,
        iModelId,
        iTwinId : iTwinId
    }


    // const [towerElementTypes, setTowerElementTypes] = useState([]);
    const [selectedTowerElement, setSelectedTowerElement] = useState("");
    // const [towerElements, setTowerElements] = useState([]);
    const [elementToZoomId, setElementToZoomId] = useState<any>(null);
    const [elementIdToDelete, setElementIdToDelete] = useState<any>(null);

    const [zoomOptions, setZoomOptions] = useState<ZoomOptions>({
        animateEnable: true,
        zoomView: "current",
        view: StandardViewId.Top,
    });

    const dispatch = useAppDispatch();

    useEffect(() => {
        console.log("*************** main useEffect ElementCollectionProviderComponent")
            dispatch(getTowerPhysicalElementTypesThunk(iModelRpcProps));
    }, []);

    useEffect(() => {
        if (selectedTowerElement) {
            console.log("load element type rows")
            dispatch(getAllPhysicalElementsByTypeThunk({ iModelRpcProps, elementType: selectedTowerElement }))
        }

    }, [selectedTowerElement])

    const onTowerElementChangedHandler = (selectedTowerElement: any) => {
        // console.log(`selectedTowerElement => ${selectedTowerElement}`)
        console.log("onTowerElementChangedHandler");
        console.log(elementToZoomId);
        setSelectedTowerElement(selectedTowerElement);
        if (elementToZoomId) {
            ZoomToElementService.clearOverrideElements([elementToZoomId]);
            ZoomToElementService.clearOverrideAndHiddenElements([elementToZoomId]);
        }
    }

    const onElementToZoom = async (elementId: string) => {
        if (elementToZoomId)
            ZoomToElementService.clearOverrideElements([elementToZoomId]);

        setElementToZoomId(elementId)
        await ZoomToElementService.zoomToElements([elementId], zoomOptions);

    }

    const onElementToZoomAndHide = async (elementId: string) => {
        if (elementToZoomId)
            ZoomToElementService.clearOverrideAndHiddenElements([elementToZoomId]);

        // console.log("--- inside onElementToZoom");
        // console.log(elementId);
        setElementToZoomId(elementId)
        await ZoomToElementService.zoomToAndHideElementsAnd([elementId], zoomOptions);

    }
    
    const hideElementFromView = async (elementId: string) => {

        // console.log("--- inside onElementToZoom");
        // console.log(elementId);
        setElementIdToDelete(elementId)
        await ZoomToElementService.hideElementsFromView([elementId], zoomOptions);

    }

    const iModelCreationHandler = useCallback(() => {

        const requestBody: any = {
            filename: "dummyTrial33.otxml",
            iModelName: "2319_dummyTrial33.otxml",
            accessToekn: hiteshAccessToken
        }

        // let iModelRpcProps: IModelRpcProps = { key: briefcaseKey, iModelId: iModelId, iTwinId: vinayakITwinID }

        dispatch(createIModelThunk({ iModelRpcProps,  requestBody }))

        // ConnectorIModelCreationInterface.getClient().createIModel(iModelRpcProps, requestBody)
        //     .then((res: any) => {
        //         console.log("")
        //     })
        //     .catch((error: any) => {
        //         console.log("Error occured");
        //         console.log(error);
        //     })

    }, [accessToken]);

    const LoaderView = <div>
        <ProgressLinear indeterminate />
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
            Initiating Backend Server
        </div>
  </div>;

    const WidgetView = <div className="provider-container">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <LabeledSelect
                label='Tower Elements'
                message='All the tower elments'
                placeholder='Select Tower Element Type'
                options={towerElementTypes}
                onChange={onTowerElementChangedHandler}
                value={selectedTowerElement}
            />
            <Button size="small" styleType='cta' onClick={iModelCreationHandler}>
                Create IModel
            </Button>
        </div>

        {selectedTowerElement.includes("TowerPole") && <TowerPoleTableComponent poleData={towerElements} onElementToZoomHandler={onElementToZoom} />}
        {selectedTowerElement.includes("TowerPanelLegElement") && <TowerPanelLegTableComponent panelLegData={towerElements} onElementToZoomHandler={onElementToZoom} />}
        {selectedTowerElement.includes("TowerPanelFaceBracingMember") && <TowerPanelFaceBracingTableComponent panelFaceBracingData={towerElements} onElementToZoomHandler={onElementToZoom} />}
        {selectedTowerElement.includes("TowerPanelPlanBracingMember") && <TowerPanelPlanBracingTableComponent panelPlanBracingData={towerElements} onElementToZoomHandler={onElementToZoom} />}
        {selectedTowerElement.includes("TowerMountElement") && <TowerMountTableComponent mountData={towerElements} onElementToZoomHandler={onElementToZoom} imodelConnection={props.imodelConnection} selectedTowerElement={selectedTowerElement} hideElementFromView={hideElementFromView}/>}
        {selectedTowerElement.includes("TowerAntennaElement") && <TowerAntennaTableComponent antennaData={towerElements} onElementToZoomHandler={onElementToZoom} />}
        {selectedTowerElement.includes("TowerAttachmentElement") && <TowerAttachmentTableComponent attachmentData={towerElements} onElementToZoomHandler={onElementToZoom} />}

    </div>


    return <>
        {initiateServerRequestState == 'Pending' && LoaderView}
        { initiateServerRequestState == 'Fulfilled' && WidgetView }
    </>
}