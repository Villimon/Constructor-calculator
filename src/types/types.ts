export type DataType = {
    id: number
    items: ItemsType[]
}

export type ItemsType = {
    setAttribute(arg0: string, arg1: string): unknown
    id: number
    order: 1
    items: NestedItemsType[]
}

export type NestedItemsType = {
    id: number
    item: string
    zero?: boolean

}