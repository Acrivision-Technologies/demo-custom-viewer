import { Button, LabeledInput } from "@itwin/itwinui-react";
import React, { useState } from "react";
import { useAppDispatch } from "../../store/hooks";
import { updateIModelElementThunk } from "../../store/asyncThunk/elementCollectionUIAsyncThunk";

export const TableInputBlockComponent = (props: any) => {

    const [value, setValue] = useState(props.value);

    const dispatch = useAppDispatch();

    const inputChangeHandler = React.useCallback((e: any) => {
        console.log("e.target.value");
        console.log(e.target.value);
        setValue(e.target.value);
    }, [])

    const saveInputChangedData = React.useCallback((e: any, row: any) => {
        e.stopPropagation();
        console.log("inside saveInputChangedData");
        console.log('row.id: ', row.id);
        console.log('value: ', value);
        let updatedElementData: any = {
            id: row.original.id,
            classFullName: row.original.className,
            model: row.original.model.id,
            code: {
                spec: row.original.codeSpec.id,
                scope: row.original.codeScope.id
            },
            [props.field]: value
        }
        console.log("updatedElementData");
        console.log(updatedElementData);
        let data: any = {
            iModelRpcProps: props.iModelRpcProps,
            updatedElementData: updatedElementData
        }
        dispatch(updateIModelElementThunk(data))

    }, [value]);
    const constructInputButtons = (row: any, inputValue: string) => {
        return <div style={{ display:"flex" }}>
            <Button size='small' onClick={(e: any) => saveInputChangedData(e, row)}>Save</Button>
            <Button size='small'>Reset {inputValue}</Button>
        </div>
    }

    return <>
        <LabeledInput placeholder='Placeholder' message={constructInputButtons(props.row, props.value)} defaultValue={props.value} onChange={inputChangeHandler} />
    </>
}
