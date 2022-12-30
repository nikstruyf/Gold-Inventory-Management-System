import { GoldDetailDataType, GoldInventoryDataType } from "./GoldData"

export interface TransactionDataType {
    transaction_id: number,
    transaction_type: string,
    date: string,
    gold_price: string,
    weight: number,
    price: number,
    gold_detail_id: number,
    gold_inventory_id: number,
    username: string,
    buy_price: number,
    sell_price: number,
    note: string
}

export interface TransactionDataJoinGold {
    transaction: TransactionDataType,
    gold_detail: GoldDetailDataType,
    gold_inventory: GoldInventoryDataType,
}