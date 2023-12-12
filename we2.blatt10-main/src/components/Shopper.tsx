import React from "react";
import { ShopperResource, ShopListResource } from "../Resources";
import { getShopper } from "../backend/shopperapi";
import LoadingIndicator from "./LoadingIndicator";
import ShopListDescription from "./ShopListDescription";
import ShopList from "./ShopList";
import { useErrorBoundary } from "react-error-boundary";

export default function Shopper() {
    const [shopper, setShopper] = React.useState<ShopperResource | null>(null);
    const [selectedShopList, setSelectedShopList] = React.useState<ShopListResource | null>(null);
    const { showBoundary } = useErrorBoundary();
    async function loadShopper() {
        try {
            const c = await getShopper();
            setShopper(c);
        } catch (error) {
            showBoundary(error);
        }
    }
    React.useEffect(() => { loadShopper() }, []);

    if (!shopper) {
        return <LoadingIndicator />;
    }
    if (selectedShopList) {
        return (
            <div>
                <ShopList shopList={selectedShopList} setSelectedShopList={setSelectedShopList} />
            </div>
        );
    } else {
        return (
            <React.Fragment>
                <h1>Shoppers: ({shopper.shopLists.length})</h1>
                <div className="row mt-4">
                    {shopper.shopLists.map((shopList) => (
                        <div key={shopList.id} className="col-md-4 mb-3">
                            <div>
                                <h4>
                                    <span className="badge bg-info">{shopList.store}</span>
                                </h4>
                                <ShopListDescription
                                    key={shopList.id}
                                    shopList={shopList}
                                    data-testid={`shopListDescId-${shopList.id}`}
                                    setSelectedShopList={setSelectedShopList}
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </React.Fragment>
        );
    }
}



