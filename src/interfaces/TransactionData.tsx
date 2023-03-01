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

export interface TransactionDasghboard {
    buy_price: number,
    buy_transaction: TransactionDataJoinGold[],
    change_incone_price: number,
    change_outcome_price: number,
    change_transaction: TransactionDataJoinGold[],
    gold_type_count: {
        necklace: number,
        bracelet: number,
        ring: number,
        pendant: number,
        earring: number,
        bangle: number,
    },
    income_price: number,
    outcome_price: number,
    sell_price: number,
    sell_transaction: TransactionDataJoinGold[],
    total_change_price: number,
    total_price: number,
}