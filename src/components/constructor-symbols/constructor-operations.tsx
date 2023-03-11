import React from 'react'
import { ItemsType, NestedItemsType } from '../../types/types'
import ConstructorOperation from './constructor-operation'




type PropsType = {
    dragOverHandler: (e: React.DragEvent) => void
    dragStartHandler: (e: React.DragEvent, elem: ItemsType) => void
    dragLeaveHandler: (e: React.DragEvent) => void
    dragEndHandler: (e: React.DragEvent) => void
    dropHandler: (e: React.DragEvent, elem: ItemsType) => void
    deleteBlock: (id: number) => void
    setOperation: React.Dispatch<React.SetStateAction<string>>
    item: ItemsType
    operations: NestedItemsType[]
    calculatorItems?: ItemsType[]
}

const ConstructOroperations = (props: PropsType) => {

    const setOperation = (operation: string) => {
        if (operation === '+') {
            props.setOperation('+')
        }
        if (operation === '-') {
            props.setOperation('-')
        }
        if (operation === 'x') {
            props.setOperation('x')
        }
        if (operation === '/') {
            props.setOperation('/')
        }
    }

    return (
        <div className={!!props.calculatorItems?.find((c: any) => c.id === props.item.id)
            ? "constructor__operations disabled"
            : "constructor__operations"
        }
            onDoubleClick={() => props.deleteBlock(props.item.id)}
            onDragStart={(e) => props.dragStartHandler(e, props.item)}
            onDrop={(e) => props.dropHandler(e, props.item)}
            draggable={true}
        >
            {props.operations.map(operation =>
                <ConstructorOperation
                    key={operation.id}
                    onClick={() => setOperation(operation.item)}
                    operation={operation.item}
                />
            )}
        </div>
    )
}


export default ConstructOroperations