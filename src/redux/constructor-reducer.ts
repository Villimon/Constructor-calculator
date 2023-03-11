import { DataType, ItemsType } from "../types/types";
import { InferActionsTypes } from "./store";


let initialState = {
    data: [
        {
            id: 1,
            items: [
                { id: 1, order: 1, items: [{ id: 1, item: '0' }] },
                {
                    id: 2, order: 2, items: [
                        { id: 1, item: '/' },
                        { id: 2, item: 'x' },
                        { id: 3, item: '-' },
                        { id: 4, item: '+' },
                    ]
                },
                {
                    id: 3, order: 3, items: [
                        { id: 1, item: '7' },
                        { id: 2, item: '8' },
                        { id: 3, item: '9' },
                        { id: 4, item: '4' },
                        { id: 5, item: '5' },
                        { id: 6, item: '6' },
                        { id: 7, item: '1' },
                        { id: 8, item: '2' },
                        { id: 9, item: '3' },
                        { id: 10, item: '0', zero: true },
                        { id: 11, item: '.' },
                    ]
                },
                { id: 4, order: 4, items: [{ id: 1, item: '=' }] }
            ]
        },
        {
            id: 2,
            items: []
        },
    ] as DataType[],
    calculatorItems: [] as ItemsType[],
    currentBlock: {} as ItemsType,
    asd: 'hello'
}



type InitialStateType = typeof initialState;

const constructorReducer = (state = initialState, action: ActionsTypes): InitialStateType => {

    switch (action.type) {
        case 'DELETE_BLOCK':
            return {
                ...state,
                calculatorItems: state.calculatorItems.filter((c: ItemsType) => c.id !== action.payload)
            }
        case 'SET_CALCULATOR_ITEMS':
            return {
                ...state,
                calculatorItems: [...state.calculatorItems, action.payload]
            }
        case 'SET_CURRENT_BLOCK':
            return {
                ...state,
                currentBlock: action.payload
            }
        case 'SWAP_CALCULATOR_ITEMS':
            return {
                ...state,
                calculatorItems: state.calculatorItems.map((c: ItemsType) => {
                    if (state.currentBlock?.id === 1) {
                        state.currentBlock.setAttribute('draggable', 'false')
                    }
                    if (c.id === action.payload.id) {
                        if (state.currentBlock) return { ...c, order: state.currentBlock.order }
                    }
                    if (c.id === state.currentBlock?.id) {
                        return { ...c, order: action.payload.order }
                    }
                    return c
                })
            }
        default:
            return state;
    }

}

type ActionsTypes = InferActionsTypes<typeof actions>

export const actions = {
    deleteBlock: (id: number) => ({ type: 'DELETE_BLOCK', payload: id } as const),
    swapCalculatorItems: (elem: ItemsType) => ({ type: 'SWAP_CALCULATOR_ITEMS', payload: elem } as const),
    setCalculatorItems: (obj: ItemsType) => ({ type: 'SET_CALCULATOR_ITEMS', payload: obj } as const),
    setCurrentBlock: (obj: ItemsType) => ({ type: 'SET_CURRENT_BLOCK', payload: obj } as const),
}




export default constructorReducer;