import { ShopListResource } from "../Resources";
import React from "react";

export type ShopListDescriptionProps = {
    shopList: ShopListResource,
    setSelectedShopList: (shopList: ShopListResource | null) => void;
};
export default function ShopListDescription({ shopList, setSelectedShopList }: ShopListDescriptionProps) {
    const { store, creatorName, createdAt, shopItemCount } = shopList;
    return (
        <React.Fragment>
            <div className="mb-2">
                <p>Owner: {shopList.creatorName}, Created at: {shopList.createdAt}</p>
                <p>ShopItem Count: <span className="badge bg-info">{shopItemCount}</span></p>
            </div>
            <button type="button" className="btn btn-outline-info mb-3" onClick={() => setSelectedShopList(shopList)}><h6>Select ShopList</h6></button>
        </React.Fragment>
    );
}