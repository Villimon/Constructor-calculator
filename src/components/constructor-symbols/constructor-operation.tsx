import React from 'react'

type PropsType = {
    operation: string
    onClick: (e: any) => void
}

const ConstructorOperation = (props: PropsType) => {

    return (
        <div onClick={props.onClick} className="constructor__operations-operation">{props.operation}</div>
    )
}


export default ConstructorOperation