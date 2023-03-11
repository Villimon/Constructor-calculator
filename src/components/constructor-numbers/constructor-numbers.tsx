import React from 'react'
import { ItemsType, NestedItemsType } from '../../types/types'
import ConstructorNumber from './constructor-number'



type PropsType = {
    dragOverHandler: (e: React.DragEvent) => void
    dragStartHandler: (e: React.DragEvent, elem: ItemsType) => void
    dragLeaveHandler: (e: React.DragEvent) => void
    dragEndHandler: (e: React.DragEvent) => void
    dropHandler: (e: React.DragEvent, elem: ItemsType) => void
    deleteBlock: (id: number) => void
    onClick: (e: React.MouseEvent<HTMLLabelElement, MouseEvent>) => void
    item: ItemsType
    numbers: NestedItemsType[]
    calculatorItems?: ItemsType[]
    showConstructor?: boolean
}

const ConstructorNumbers = (props: PropsType) => {

    return (
        <div className={!!props.calculatorItems?.find((c: any) => c.id === props.item.id)
            ? "constructor__numbers disabled"
            : "constructor__numbers"
        }
            onDoubleClick={() => props.deleteBlock(props.item.id)}
            onDragStart={(e) => props.dragStartHandler(e, props.item)}
            onDrop={(e) => props.dropHandler(e, props.item)}
            draggable={true}
        >
            {props.numbers.map((number: any) => <ConstructorNumber
                key={number.id}
                onClick={props.onClick}
                zero={number.zero}
                number={number.item}
            />)
            }
        </div>
    )
}


export default ConstructorNumbers