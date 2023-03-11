import React from 'react';
import { DataType, ItemsType } from '../../types/types';
import CalculatorInfo from '../calculator-info/calculator-info';
import ConstructorEquals from '../constructor-equals/constructor-equals';
import ConstructorNumbers from '../constructor-numbers/constructor-numbers';
import ConstructorPanel from '../constructor-panel/constructor-panel';
import ConstructorOperations from '../constructor-symbols/constructor-operations';

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
    sortBlock: (a: ItemsType, b: ItemsType) => number
    calculatorItems?: ItemsType[]
    showConstructor?: boolean
    result: string | number
    firstValue: string
    secontValue: string
    board: DataType
}


const CalculatorBody = (props: PropsType) => {



    return (
        <div className="calculator__body">
            {props.calculatorItems && props.calculatorItems?.length
                ? <>{props.calculatorItems?.sort(props.sortBlock)
                    .map((item: any) => {
                        if (item && item.id === 1) {
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
                            />
                        }
                        if (item && item.id === 2) {
                            return <ConstructorOperations
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
                            />
                        }
                        if (item && item.id === 3) {
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
                            />
                        }
                        if (item && item.id === 4) {
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
                            />
                        }
                    })}</>
                : <CalculatorInfo />
            }
        </div>
    );
}

export default CalculatorBody;