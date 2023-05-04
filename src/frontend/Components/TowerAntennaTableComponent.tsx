import React from "react";
import { Table, DefaultCell } from '@itwin/itwinui-react';
import type { CellProps, CellRendererProps, Column, Row } from 'react-table';

export const TowerAntennaTableComponent = (props: any) => {
    type TableDataType = {
        antennaID: string;
        name: string;
        label: string;
        elevation: string;
        manufacturer: string;
        modelName: string;
        type: string;
        location: string;
        azimuth: string;
        lateralOffset: string;
        verticalOffset: string;
        horizontalOffset: string;
        height: string;
        width: string;
        depth: string;
        weight: string;
        classification: string;
        componentName: string;
        bBoxHigh: any;
        bBoxLow: any;
        codeSpec: any;
        id: string;
        codeValue: string;
    };

    const columns = React.useMemo(
        (): Column<TableDataType>[] => [
            {
                id: 'antennaID',
                Header: 'Antenna Id',
                accessor: 'antennaID',
                width: 100,
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
                id: 'lateralOffset',
                Header: 'Lateral Offset',
                accessor: 'lateralOffset',
                width: 130,
                Cell: (props: CellProps<TableDataType>) => {
                    return <>{parseFloat(props.value).toFixed(4)}</>;
                },
            },
            {
                id: 'verticalOffset',
                Header: 'Vertical Offset',
                accessor: 'verticalOffset',
                width: 130,
                Cell: (props: CellProps<TableDataType>) => {
                    return <>{parseFloat(props.value).toFixed(4)}</>;
                },
            },
            {
                id: 'horizontalOffset',
                Header: 'Horizontal Offset',
                accessor: 'horizontalOffset',
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
                id: 'depth',
                Header: 'Depth',
                accessor: 'depth',
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
                id: 'codeValue',
                Header: 'Code Value',
                accessor: 'codeValue',
                width: 130,
            }
        ],
        []
    );

    const onRowClickHandler = (e: React.MouseEvent, row: any) => {
        console.log("row");
        console.log(row);
        props.onElementToZoomHandler(row.original.id)

    }

    return (
        <div>
            <Table
                columns={columns}
                emptyTableContent='No data.'
                data={props.antennaData}
                // rowProps={rowProps}
                density='condensed'
                onRowClick={onRowClickHandler}
                selectRowOnClick={true}
                selectionMode={'single'}
                isSelectable={true}
            />

        </div>
    );
}