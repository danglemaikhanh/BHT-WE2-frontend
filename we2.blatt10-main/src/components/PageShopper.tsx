import React from 'react';
import { ShopperResource } from '../Resources';
import { useErrorBoundary } from 'react-error-boundary';
import { getShopper } from '../backend/shopperapi';
import LoadingIndicator from './LoadingIndicator';
import { Link } from 'react-router-dom';

export default function PageShopper() {
    const [shopper, setShopper] = React.useState<ShopperResource | null>(null);
    const { showBoundary } = useErrorBoundary();
    async function loadShopper() {
        try {
            const c = await getShopper();
            setShopper(c);
        } catch (error) {
            showBoundary(error);
        }
    }
    React.useEffect(() => { loadShopper(); }, []);
    if (shopper) {
        return (
            <React.Fragment>
                <div className="row align-items-center">
                    <div className="col">
                        <h1>View Shopping Lists</h1>
                    </div>
                    <div className="col-auto mt-2">
                        <ul className="navbar-nav ml-auto">
                            <button type="button" className="btn btn-outline-info"><h6>Create new list</h6></button>
                        </ul>
                    </div>
                </div>
                <div className="row">
                    {shopper.shopLists.map((shopList) => (
                        <div key={shopList.id} className="col-md-4 mt-4">
                            <div key={shopList.id}>
                                <h4>
                                    <span className="badge bg-info">{shopList.store}</span>
                                </h4>
                                <div className="mb-4">
                                    <p>
                                        Owner: {shopList.creatorName}, Created at: {shopList.createdAt}
                                    </p>
                                    <p>
                                        ShopItem Count:{" "}
                                        <span className="badge bg-info">{shopList.shopItemCount}</span>
                                    </p>
                                    <p>
                                        <Link to={`/shoplist/${shopList.id}`}>Go to ShopList</Link>
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </React.Fragment>
        )
    }
    else {
        return <LoadingIndicator />;
    }
}
