import * as React from 'react';
import { Table, DefaultCell, LabeledInput, Button } from '@itwin/itwinui-react';
import type { CellProps, CellRendererProps, Column } from 'react-table';

export const SampleTableComponent = () => {
    type TableDataType = {
        product: string;
        price: number;
        quantity: number;
        rating: number;
        status: 'positive' | 'negative' | 'warning' | undefined;
        subRows: TableDataType[];
    };

    const [selectedRow, setSelectedRow] = React.useState(''); 

    const generateItem = React.useCallback(
        (index: number, parentRow = '', depth = 0): TableDataType => {
            const keyValue = parentRow ? `${parentRow}.${index + 1}` : `${index + 1}`;
            const rating = Math.round(Math.random() * 5);
            return {
                product: `Product ${keyValue}`,
                price: ((index % 10) + 1) * 15,
                quantity: ((index % 10) + 1) * 150,
                rating: rating,
                status: rating >= 4 ? 'positive' : rating === 3 ? 'warning' : 'negative',
                subRows:
                    depth < 1
                        ? Array(Math.round(index % 2))
                            .fill(null)
                            .map((_, index) => generateItem(index, keyValue, depth + 1))
                        : [],
            };
        },
        []
    );

    const data = React.useMemo(
        () =>
            Array(3)
                .fill(null)
                .map((_, index) => generateItem(index)),
        [generateItem]
    );
    const inputChangeHandler = React.useCallback((e: any) => {
        console.log("e.target.value");
        console.log(e.target.value);
    }, [])

    const saveInputChangedData = React.useCallback((e: any, row: any, value: any) => {
        console.log("inside saveInputChangedData");
        console.log('row.id: ', row.id);
        console.log('value: ', value);
    }, []);
    const constructInoutButtons = (row: any, inputValue: string) => {
        return <div style={{ display:"flex" }}>
            <Button size='small' onClick={(e: any) => saveInputChangedData(e, row, 'sdf')}>Save</Button>
            <Button size='small'>Reset {inputValue}</Button>
        </div>
    }

    const columns = React.useMemo(
        (): Column<TableDataType>[] => [
            {
                id: 'product',
                Header: 'Product',
                accessor: 'product',
                width: '40%',
            },
            {
                id: 'price',
                Header: 'Price',
                accessor: 'price',
                Cell: (props: CellProps<TableDataType>) => {
                    if(selectedRow == props.row.id) {
                        return <LabeledInput label='Label' placeholder='Placeholder' message={constructInoutButtons(props.row, props.value)} defaultValue={props.value} onChange={inputChangeHandler} />


                    } else {
                        return <>${props.value}</>;
                    }
                },
            },
            {
                id: 'rating',
                Header: 'Rating',
                accessor: 'rating',
                cellRenderer: (props: CellRendererProps<TableDataType>) => {
                    return (
                        <DefaultCell {...props} status={props.cellProps.row.original.status}>
                            {props.cellProps.row.original.rating}/5
                        </DefaultCell>
                    );
                },
            },
        ],
        [selectedRow]
    );

    const rowProps = React.useCallback((row: any) => {
        return {
            status: row.original.status,
        };
    }, []);

    const onRowClickHandler  = React.useCallback((e: any, row: any) => {
        console.log(`Row clicked: ${row.id} : data : ${JSON.stringify(row.original)}`);
        setSelectedRow(row.id);
    }, [])

    return (
        <div style={{ minWidth: 'min(100%, 350px)' }}>
            <Table
                columns={columns}
                emptyTableContent='No data.'
                data={data}
                rowProps={rowProps}
                density='condensed'
                onRowClick={onRowClickHandler}
            />
        </div>
    );
};
