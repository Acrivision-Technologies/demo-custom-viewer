
import React from "react";
import { Table, DefaultCell } from '@itwin/itwinui-react';
import type { CellProps, CellRendererProps, Column, Row } from 'react-table';

export const TowerPanelFaceBracingTableComponent = (props: any) => {
    type TableDataType = {
        faceBracingID: string;
        faceBracingName: string;
        segmentName: string;
        memberID: string;
        memberTag: string;
        bBoxHigh: any;
        bBoxLow: any;
        codeSpec: any;
        id: string;
        codeValue: string;
    };

    const columns = React.useMemo(
        (): Column<TableDataType>[] => [
            {
                id: 'faceBracingID',
                Header: 'Face Bracing Id',
                accessor: 'faceBracingID',
                width: 100,
            },
            {
                id: 'faceBracingName',
                Header: 'Face Bracing Name',
                accessor: 'faceBracingName',
                width: 100,
            },
            {
                id: 'segmentName',
                Header: 'Segment Name',
                accessor: 'segmentName',
                width: 100,
            },
            {
                id: 'memberID',
                Header: 'Member ID',
                accessor: 'memberID',
                width: 100,
            },
            {
                id: 'memberTag',
                Header: 'Member Tag',
                accessor: 'memberTag',
                width: 100,
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
        props.onElementToZoomHandler(row.original.id)

    }

    return (
        <div style={{ minWidth: 'min(100%, 350px)' }}>
            <Table
                columns={columns}
                emptyTableContent='No data.'
                data={props.panelFaceBracingData}
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