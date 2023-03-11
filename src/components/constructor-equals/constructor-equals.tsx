import React from 'react'
import { ItemsType, NestedItemsType } from '../../types/types'


type PropsType = {
    dragOverHandler: (e: React.DragEvent) => void
    dragStartHandler: (e: React.DragEvent, elem: ItemsType) => void
    dragLeaveHandler: (e: React.DragEvent) => void
    dragEndHandler: (e: React.DragEvent) => void
    dropHandler: (e: React.DragEvent, elem: ItemsType) => void
    deleteBlock: (id: number) => void
    resultValue: () => void
    items: NestedItemsType[]
    item: ItemsType
    calculatorItems?: ItemsType[]
}

const ConstructorEquals = (props: PropsType) => {

    return (
        <div
            className={!!props.calculatorItems?.find((c: any) => c.id === props.item.id)
                ? "constructor__equals disabled"
                : "constructor__equals"
            }
            onDoubleClick={() => props.deleteBlock(props.item.id)}
            onDragStart={(e) => props.dragStartHandler(e, props.item)}
            onDrop={(e) => props.dropHandler(e, props.item)}
            draggable={true}
        >
            {props.items.map((i: any) => <div
                key={i.id}
                onClick={props.resultValue}
                className="constructor__equals-operation"
            >
                {i.item}
            </div>
            )}
        </div>
    )
}


export default ConstructorEquals


