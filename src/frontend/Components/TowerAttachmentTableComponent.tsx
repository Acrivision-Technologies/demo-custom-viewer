import React from "react";
import { Table, DefaultCell } from '@itwin/itwinui-react';
import type { CellProps, CellRendererProps, Column, Row } from 'react-table';

export const TowerAttachmentTableComponent = (props: any) => {
    type TableDataType = {
        attachmentMemberID: string;
        attachmentPropertyID: string;
        label: string;
        attachmentName: string;
        topElevation: string;
        bottomElevation: string;
        attachmentType: string;
        location: string;
        azimuth: string;
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
                id: 'attachmentMemberID',
                Header: 'Attachement Member Id',
                accessor: 'attachmentMemberID',
                width: 100,
            },
            {
                id: 'attachmentPropertyID',
                Header: 'Attachment Property ID',
                accessor: 'attachmentPropertyID',
                width: 100,
            },
            {
                id: 'label',
                Header: 'Label',
                accessor: 'label',
                width: 100,
            },
            {
                id: 'attachmentName',
                Header: 'Attachment Name',
                accessor: 'attachmentName',
                width: 100,
            },
            {
                id: 'topElevation',
                Header: 'Top Elevation',
                accessor: 'topElevation',
                width: 130,
                Cell: (props: CellProps<TableDataType>) => {
                    return <>{parseFloat(props.value).toFixed(4)}</>;
                },
            },
            {
                id: 'bottomElevation',
                Header: 'Bottom Elevation',
                accessor: 'bottomElevation',
                width: 130,
                Cell: (props: CellProps<TableDataType>) => {
                    return <>{parseFloat(props.value).toFixed(4)}</>;
                },
            },
            {
                id: 'attachmentType',
                Header: 'Attachment Type',
                accessor: 'attachmentType',
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
                data={props.attachmentData}
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