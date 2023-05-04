import React, { useCallback, useEffect, useState } from "react";
import './ElementCollectionProviderComponentStyle.scss'
import { getAllElementsForType, getAllTowerPhysicalTypes, getPhysicalPartition } from "../Services/TowerService";
import { LabeledSelect } from '@itwin/itwinui-react';
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

export const ElementCollectionProviderComponent = (props: any) => {

    // const clientIModelState = useAppSelector((state: RootState) => state.clientIModel)

    const { initiateServerRequestState, briefcaseKey, iModelId, iTwinId } = useAppSelector((state: RootState) => state.clientIModel);
    const { towerElementTypes, towerElements } = useAppSelector((state: RootState) => state.elementCollectionUi);

    const iModelRpcProps: IModelRpcProps = {
        key: briefcaseKey,
        iModelId,
        iTwinId
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

    const LoaderView = <div>
        <ProgressLinear indeterminate />
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
            Initiating Backend Server
        </div>
  </div>;

    const WidgetView = <div className="provider-container">

        <LabeledSelect
            label='Tower Elements'
            message='All the tower elments'
            placeholder='Select Tower Element Type'
            options={towerElementTypes}
            onChange={onTowerElementChangedHandler}
            value={selectedTowerElement}
        />

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