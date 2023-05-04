
import React from "react";
import { Table, DefaultCell } from '@itwin/itwinui-react';
import type { CellProps, CellRendererProps, Column, Row } from 'react-table';

export const TowerPanelPlanBracingTableComponent = (props: any) => {
    type TableDataType = {
        label: string;
        panelID: string;
        panelPropertyID: string;
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
                id: 'panelID',
                Header: 'Panel Id',
                accessor: 'panelID',
                width: 100,
            },
            {
                id: 'panelPropertyID',
                Header: 'Panel Property ID',
                accessor: 'panelPropertyID',
                width: 100,
            },
            {
                id: 'label',
                Header: 'Lable',
                accessor: 'label',
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
                data={props.panelPlanBracingData}
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