import React from "react";
import { ShopItemResource } from "../Resources";

export type ShopItemProps = {
    shopItem: ShopItemResource
}

export default function ShopItem({ shopItem }: ShopItemProps) {
    const { name, quantity, remarks, createdAt, creatorName, shopListStore } = shopItem;
    return (
        <React.Fragment>
            <h5>{name}</h5>
            <p>Quantity: {quantity}
                <br />Remarks: {remarks}
                <br />Creator Name: {creatorName}
                <br />Created At: {createdAt}
                <br />ShopList Store: {shopListStore}</p>
        </React.Fragment>
    )
}
