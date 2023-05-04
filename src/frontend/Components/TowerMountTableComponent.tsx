import React, { useCallback, useEffect, useState } from "react";
import { Table, DefaultCell } from '@itwin/itwinui-react';
import type { CellProps, CellRendererProps, Column, Row } from 'react-table';
import { Button, IconButton, LabeledInput } from '@itwin/itwinui-react';
import { MountElementDecorationApi } from "../Decorator/Mount/MountElementDecorationApi";
import { Point3d } from "@itwin/core-geometry";
import "./TowerMountTableComponent.scss";
import { SvgAdd, SvgClose } from '@itwin/itwinui-icons-react';
import { Authorization, GetChangesetListParams, GetSingleChangesetParams, IModelsClient, toArray } from "@itwin/imodels-client-management";
import { useAccessToken } from "@itwin/web-viewer-react";
import { IModelApp } from "@itwin/core-frontend";
import { BentleyCloudRpcManager, BentleyCloudRpcParams, IModelRpcProps } from "@itwin/core-common";
import { IModelChangeSetRpcInterface } from "../../common/IModelChangeSetRpcInterface";
import getSupportedRpcs from "../../common/rpcs";
import { appConfig } from "../Services/AppConfigService";
import { IModelDeleteElementRpcInterface } from "../../common/RpcInterfaces/IModelDeleteElementRpcInterface";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { deleteElementByIdThunk } from "../store/asyncThunk/elementCollectionUIAsyncThunk";
import { RootState } from "../store";

export const TowerMountTableComponent = (props: any) => {
    type TableDataType = {
        mountID: string;
        name: string;
        label: string;
        elevation: string;
        manufacturer: string;
        modelName: string;
        type: string;
        location: string;
        azimuth: string;
        height: string;
        width: string;
        standoff: string;
        weight: string;
        classification: string;
        componentName: string;
        bBoxHigh: any;
        bBoxLow: any;
        codeSpec: any;
        id: string;
        codeValue: string;
    };


    const { briefcaseKey, iModelId, iTwinId } = useAppSelector((state: RootState) => state.clientIModel);
    const iModelRpcProps: IModelRpcProps = {
        key: briefcaseKey,
        iModelId,
        iTwinId
    }


    const [currentRowId, setCurrentRowId] = useState("");
    const [editedMountElementCollector, setEditedMountElementCollector] = useState<any[]>([]);
    const [tableData, setTableData] = useState<any>([]);
    const accessToken = useAccessToken();

    const dispatch = useAppDispatch();

    useEffect(() => {
        const info: any = IModelChangeSetRpcInterface.getClient().fetchInfo({ key:"hello", iModelId: appConfig.auth.iModelId, iTwinId: appConfig.auth.iTwinId });
        console.log("info");
        console.log(info);
    }, []);

    useEffect(() => {
        setTableData(props.mountData);
    }, [props.mountData])


    const columns = React.useMemo(
        (): Column<TableDataType>[] => [
            {
                id: 'mountID',
                Header: 'Mount Id',
                accessor: 'mountID',
                width: 100,
            },
            {
                id: 'codeValue',
                Header: 'Code Value',
                accessor: 'codeValue',
                width: 130,
            },
            {
                id: 'name',
                Header: 'Name',
                accessor: 'name',
                width: 100,
            },
            {
                id: 'label',
                Header: 'Label',
                accessor: 'label',
                width: 100,
            },
            {
                id: 'elevation',
                Header: 'Elevation',
                accessor: 'elevation',
                width: 130,
                Cell: (props: CellProps<TableDataType>) => {
                    return <>{parseFloat(props.value).toFixed(4)}</>;
                },
            },
            {
                id: 'manufacturer',
                Header: 'Manufacturer',
                accessor: 'manufacturer',
                width: 100,
            },
            {
                id: 'modelName',
                Header: 'Model Name',
                accessor: 'modelName',
                width: 130,
            },
            {
                id: 'type',
                Header: 'Type',
                accessor: 'type',
                width: 100,
            },
            {
                id: 'bBoxLow',
                Header: 'Box Low',
                accessor: 'bBoxLow',
                width: 130,
                Cell: (props: CellProps<TableDataType>) => {
                    return <>
                        {JSON.stringify(props.value)}
                    </>;
                },
            },
            {
                id: 'bBoxHigh',
                Header: 'Box High',
                accessor: 'bBoxHigh',
                width: 130,
                Cell: (props: CellProps<TableDataType>) => {
                    return <>
                        {JSON.stringify(props.value)}
                    </>;
                },
            },
            {
                id: 'location',
                Header: 'Location',
                accessor: 'location',
                width: 130,
            },
            {
                id: 'azimuth',
                Header: 'Azimuth',
                accessor: 'azimuth',
                width: 130,
                Cell: (props: CellProps<TableDataType>) => {
                    return <>{parseFloat(props.value).toFixed(4)}</>;
                },
            },
            {
                id: 'height',
                Header: 'Height',
                accessor: 'height',
                width: 100,
                Cell: (props: CellProps<TableDataType>) => {
                    return <>{props.value ? props.value : 0}</>;
                },
            },
            {
                id: 'width',
                Header: 'Width',
                accessor: 'width',
                width: 130,
                Cell: (props: CellProps<TableDataType>) => {
                    return <>{parseFloat(props.value).toFixed(4)}</>;
                },
            },
            {
                id: 'standoff',
                Header: 'Standoff',
                accessor: 'standoff',
                width: 130,
                Cell: (props: CellProps<TableDataType>) => {
                    return <>{parseFloat(props.value).toFixed(4)}</>;
                },
            },
            {
                id: 'weight',
                Header: 'weight',
                accessor: 'weight',
                width: 130,
                Cell: (props: CellProps<TableDataType>) => {
                    return <>{parseFloat(props.value).toFixed(4)}</>;
                },
            },
            {
                id: 'classification',
                Header: 'Classification',
                accessor: 'classification',
                width: 130,
            },
            {
                id: 'componentName',
                Header: 'Component Name',
                accessor: 'componentName',
                width: 130,
            },
            {
                id: 'delete',
                Header: 'Delete',
                width: 130,
                Cell: (props: CellProps<TableDataType>) => {
                    return <IconButton size="small" styleType='high-visibility' as="button" onClick={(e: any) => onDeleteButtonClickHandler(e, props.row)}>
                        <SvgClose />
                    </IconButton>
                },
            },
        ],
        [currentRowId, tableData]
    );


    const onRowClickHandler = async (e: React.MouseEvent, row: any) => {

        console.log("inside onRowClickHandler");
        console.log(row);
        // props.onElementToZoomHandler(row.original.id)

        
    }

    const getAuthorization = async(): Promise<Authorization> => {
        if (!IModelApp.authorizationClient)
          throw new Error("AuthorizationClient is not defined. Most likely IModelApp.startup was not called yet.");
    
        const token = await IModelApp.authorizationClient.getAccessToken();
        const parts = token.split(" ");
        return parts.length === 2
          ? { scheme: parts[0], token: parts[1] }
          : { scheme: "Bearer", token };
    }

    const onDeleteButtonClickHandler = async(e: any, row: any) => {

        e.preventDefault();
        // console.log('props.imodelConnection');
        // console.log(props.imodelConnection);
        console.log('onDeleteButtonClickHandler row');
        console.log(row);
        let rowId = row.original.id
        console.log("rowId: ", rowId);
        // props.hideElementFromView(row.original.id);
        dispatch(deleteElementByIdThunk({iModelRpcProps, elementId: row.original.id}))
        const tableDataCollection = [...tableData];
        tableDataCollection.splice(row.id, 1);
        setTableData(tableDataCollection);

        // const result = await IModelDeleteElementRpcInterface.getClient().deleteElementById(iModelRpcProps, rowId)
        // console.log("delete result");
        // console.log(result);
            // .then((res: any) => {
            //     console.log("deleteElementById success");
            //     console.log(res);
            //     // props.hideElementFromView(row.original.id);
            //     // const tableDataCollection = [...tableData];
            //     // tableDataCollection.splice(row.id, 1);
            //     // setTableData(tableDataCollection);
            // })

            // .catch((error: any) => {
            //     console.log("deleteElementById error");
            //     console.log(error);
            // })

        // const result: any = await IModelDeleteElementRpcInterface.getClient().deleteElementById({ key: appConfig.briefcaseKey, iModelId: appConfig.auth.iModelId, iTwinId: appConfig.auth.iTwinId }, rowId)
        // console.log('result');
        // console.log(result);
        // const imodelClient = new IModelsClient();
        // console.log('imodelClient');
        // console.log(imodelClient);

        // console.log('imodelClient briefcase');
        // console.log(imodelClient.briefcases.getMinimalList({ iModelId: appConfig.auth.iModelId }));
        // const token = IModelApp.authorizationClient?.getAccessToken()
        // const changeSets: any[] = [];
        // const modelid: string  = process.env.IMJS_IMODEL_ID ? process.env.IMJS_IMODEL_ID : '';
        // const options:  GetChangesetListParams = {
        //     iModelId: modelid,
        //     authorization: getAuthorization
        // }
        // const client = new IModelsClient();
        // const clientChangesets = client.changesets;
        // const result: any = await clientChangesets.getMinimalList(options);
        // (await toArray(result)).map((data) => changeSets.push(data));
        // let lastChangeSetId = changeSets[changeSets.length - 1].id;
        // console.log(`lastChangeSetId: ${lastChangeSetId}`);

        // console.log('client.userPermissions')
        // console.log(client.userPermissions)
        // // createChangeSet(modelid, token, lastChangeSetId)

    }

    return (
        <div className="mount-table-view-block">
            <Table
                columns={columns}
                emptyTableContent='No data.'
                data={tableData}
                density='condensed'
                onRowClick={onRowClickHandler}
                selectRowOnClick={true}
                selectionMode={'single'}
                isSelectable={true}
            />

        </div>
    );
}