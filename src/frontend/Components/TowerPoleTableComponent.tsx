import React from "react";
import { Table, DefaultCell } from '@itwin/itwinui-react';
import type { CellProps, CellRendererProps, Column, Row } from 'react-table';


export const TowerPoleTableComponent = (props: any) => {


    type TableDataType = {
        poleID: string;
        label: string;
        sectionLength: string;
        thickness: string;
        topElevation: string;
        topFlatDiameter: string;
        topFlatWidth: string;
        topTipDiameter: string;
        bottomTipDiameter: string;
        bottomFlatWidth: string;
        bottomFlatDiameter: string;
        bottomElevation: string;
        bBoxHigh: any;
        bBoxLow: any;
        codeSpec: any;
        id: string;
    };

    // const rowProps = React.useCallback((row: any) => {
    //     console.log("--- row");
    //     console.log(row)
    //     return {
    //         status: 'positive'
    //     };
    // }, []);

    const columns = React.useMemo(
        (): Column<TableDataType>[] => [
            {
                id: 'poleID',
                Header: 'Pole Id',
                accessor: 'poleID',
                width:  100,
            },
            {
                id: 'label',
                Header: 'Label',
                accessor: 'label',
                width: 100,
            },
            {
                id: 'sectionLength',
                Header: 'Section Length',
                accessor: 'sectionLength',
                width: 100,
            },
            {
                id: 'thickness',
                Header: 'Thickness',
                accessor: 'thickness',
                width: 130,
                Cell: (props: CellProps<TableDataType>) => {
                    return <>{parseFloat(props.value).toFixed(4)}</>;
                },
            },
            {
                id: 'topElevation',
                Header: 'Top Elevation',
                accessor: 'topElevation',
                width: 100,
            },
            {
                id: 'topFlatDiameter',
                Header: 'Top Flat Diameter',
                accessor: 'topFlatDiameter',
                width: 130,
                Cell: (props: CellProps<TableDataType>) => {
                    return <>{parseFloat(props.value).toFixed(4)}</>;
                },
            },
            {
                id: 'topFlatWidth',
                Header: 'Top Flat Width',
                accessor: 'topFlatWidth',
                width: 100,
                Cell: (props: CellProps<TableDataType>) => {
                    return <>{props.value ? props.value : 0}</>;
                },
            },
            {
                id: 'topTipDiameter',
                Header: 'Top Tip Diameter',
                accessor: 'topTipDiameter',
                width: 130,
                Cell: (props: CellProps<TableDataType>) => {
                    return <>{parseFloat(props.value).toFixed(4)}</>;
                },
            },
            {
                id: 'bottomTipDiameter',
                Header: 'Bottom Tip Diameter',
                accessor: 'bottomTipDiameter',
                width: 130,
                Cell: (props: CellProps<TableDataType>) => {
                    return <>{parseFloat(props.value).toFixed(4)}</>;
                },
            },
            {
                id: 'bottomFlatWidth',
                Header: 'Bottom Flat Width',
                accessor: 'bottomFlatWidth',
                width: 100,
                Cell: (props: CellProps<TableDataType>) => {
                    return <>{props.value ? props.value : 0}</>;
                },
            },
            {
                id: 'bottomFlatDiameter',
                Header: 'Bottom Flat Diameter',
                accessor: 'bottomFlatDiameter',
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
            data={props.poleData}
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