export interface GoldInventoryDataType {
    gold_inventory_id: number,
    gold_detail_id: number,
    status: string,
    date_in: string,
    date_sold: string,
    note: string,
}

export interface GoldDetailDataType {
    gold_detail_id: number,
    code: string,
    type: string,
    detail: string,
    status: string,
    weight: number,
    gold_percent: number,
    gold_smith_fee: number,
    picture: string,
    inventories: GoldInventoryDataType[]
}
