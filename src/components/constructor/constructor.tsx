import React from 'react';
import { DataType, ItemsType } from '../../types/types';
import ConstructorEquals from '../constructor-equals/constructor-equals';
import ConstructorNumbers from '../constructor-numbers/constructor-numbers';
import ConstructorPanel from '../constructor-panel/constructor-panel';
import ConstructOroperations from '../constructor-symbols/constructor-operations';

type PropsType = {
    dragOverHandler: (e: React.DragEvent) => void
    dragStartHandler: (e: React.DragEvent, elem: ItemsType) => void
    dragLeaveHandler: (e: React.DragEvent) => void
    dragEndHandler: (e: React.DragEvent) => void
    dropHandler: (e: React.DragEvent, elem: ItemsType) => void
    deleteBlock: (id: number) => void
    onClick: (e: React.MouseEvent<HTMLLabelElement, MouseEvent>) => void
    setOperation: React.Dispatch<React.SetStateAction<string>>
    resultValue: () => void
    calculatorItems?: ItemsType[]
    showConstructor?: boolean
    result: string | number
    firstValue: string
    secontValue: string
    board: DataType
}


const Constructor = (props: PropsType) => {


    return (
        <div className="constructor">
            {props.board && props.board.items.map((item: ItemsType) => {
                if (item.id === 1) {
                    return <ConstructorPanel
                        key={item.id}
                        items={item.items}
                        dragOverHandler={props.dragOverHandler}
                        dragStartHandler={props.dragStartHandler}
                        dragLeaveHandler={props.dragLeaveHandler}
                        dragEndHandler={props.dragEndHandler}
                        dropHandler={props.dropHandler}
                        item={item}
                        deleteBlock={props.deleteBlock}
                        result={props.result}
                        firstValue={props.firstValue}
                        secontValue={props.secontValue}
                        calculatorItems={props.calculatorItems}
                    />
                }
                if (item.id === 2) {
                    return <ConstructOroperations
                        key={item.id}
                        operations={item.items}
                        dragOverHandler={props.dragOverHandler}
                        dragStartHandler={props.dragStartHandler}
                        dragLeaveHandler={props.dragLeaveHandler}
                        dragEndHandler={props.dragEndHandler}
                        dropHandler={props.dropHandler}
                        item={item}
                        deleteBlock={props.deleteBlock}
                        setOperation={props.setOperation}
                        calculatorItems={props.calculatorItems}
                    />
                }
                if (item.id === 3) {
                    return <ConstructorNumbers
                        key={item.id}
                        numbers={item.items}
                        dragOverHandler={props.dragOverHandler}
                        dragStartHandler={props.dragStartHandler}
                        dragLeaveHandler={props.dragLeaveHandler}
                        dragEndHandler={props.dragEndHandler}
                        dropHandler={props.dropHandler}
                        item={item}
                        deleteBlock={props.deleteBlock}
                        onClick={props.onClick}
                        calculatorItems={props.calculatorItems}
                    />
                }
                if (item.id === 4) {
                    return <ConstructorEquals
                        key={item.id}
                        items={item.items}
                        dragOverHandler={props.dragOverHandler}
                        dragStartHandler={props.dragStartHandler}
                        dragLeaveHandler={props.dragLeaveHandler}
                        dragEndHandler={props.dragEndHandler}
                        dropHandler={props.dropHandler}
                        item={item}
                        deleteBlock={props.deleteBlock}
                        resultValue={props.resultValue}
                        calculatorItems={props.calculatorItems}
                    />
                }
            })}
        </div>

    );
}

export default Constructor;