import React from "react";
import { Table, DefaultCell } from '@itwin/itwinui-react';
import type { CellProps, CellRendererProps, Column, Row } from 'react-table';

export const TowerPanelLegTableComponent = (props: any) => {

    type TableDataType = {
        panelPropertyID: string;
        panelID: string;
        label: string;
        bBoxHigh: any;
        bBoxLow: any;
        codeSpec: any;
        id: string;
        codeValue: string;
        BetaAngle: string;
    };

    const columns = React.useMemo(
        (): Column<TableDataType>[] => [
            {
                id: 'panelPropertyID',
                Header: 'Panel Property Id',
                accessor: 'panelPropertyID',
                width: 100,
            },
            {
                id: 'panelID',
                Header: 'Panel ID',
                accessor: 'panelID',
                width: 100,
            },
            {
                id: 'label',
                Header: 'Label',
                accessor: 'label',
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
        console.log("row");
        console.log(row);
        props.onElementToZoomHandler(row.original.id)

    }

    return (
        <div style={{ minWidth: 'min(100%, 350px)' }}>
            <Table
                columns={columns}
                emptyTableContent='No data.'
                data={props.panelLegData}
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