import React from "react";
import { ShopItemResource, ShopListResource } from "../Resources";
import ShopItem from "./ShopItem";
import { getShopItems } from "../backend/shopperapi";
import LoadingIndicator from "./LoadingIndicator";

export type ShopListProps = {
    shopList: ShopListResource,
    setSelectedShopList: (shopList: ShopListResource | null) => void;
}

export default function ShopList({ shopList, setSelectedShopList }: ShopListProps) {
    const [shopItems, setShopItems] = React.useState<ShopItemResource[] | null>(null);
    const { store, creatorName, createdAt, shopItemCount } = shopList;
    async function loadItem() {
        const items = await getShopItems(shopList.id!);
        console.log(items);
        setShopItems(items);
    }
    React.useEffect(() => {loadItem();}, []);

    if (!shopItems) {
        console.log("no shop items, loading")
        return <LoadingIndicator />;
    } else {
        console.log("loaded shop items")
        return (
            <React.Fragment>
                <h2>ShopList</h2>
                <h3><span className="badge bg-info">{shopList.store}</span></h3>
                <div className="card border-info mb-3">
                <p>Public: {shopList.public!.toString()}
                    <br />Done: {shopList.done!.toString()}
                    <br />Creator Name: {creatorName}
                    <br />Created at: {createdAt}</p>
                </div>
                <h4><span className="badge bg-info">ShopItem: {shopList.shopItemCount}</span></h4>
                {shopItems.map((shopItem: ShopItemResource) => (
                    <div key={shopItem.id} className="alert alert-dismissible alert-info">
                    <ShopItem key={shopItem.id} shopItem={shopItem} data-testid={`shopItemId-${shopItem.id}`} />
                    </div>
                ))}
                <button type="button" className="btn btn-outline-info mb-3" onClick={() => setSelectedShopList(null)}><h6>Back to Shopper</h6></button>
            </React.Fragment>
        )
    }
}