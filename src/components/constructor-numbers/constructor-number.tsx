import React from 'react'

type PropsType = {
    number: string
    zero?: boolean
    onClick: (e: any) => void
}

const ConstructorNumber = (props: PropsType) => {

    return (
        <div onClick={props.onClick} className={props.zero ? "constructor__numbers-number zero" : 'constructor__numbers-number'}>{props.number}</div>
    )
}


export default ConstructorNumber