import React from 'react';
import { ShopItemResource } from '../Resources';
import { useErrorBoundary } from 'react-error-boundary';
import { Link, useParams } from 'react-router-dom';
import { getShopItem } from '../backend/shopperapi';
import LoadingIndicator from './LoadingIndicator';

export default function PageShopItem() {
  const [shopItem, setShopItem] = React.useState<ShopItemResource | null>(null);
  const { showBoundary } = useErrorBoundary();
  const shopItemId = useParams().shopitemID!;
  async function loadItem() {
    try {
      const item = await getShopItem(shopItemId);
      setShopItem(item);
    } catch (error) {
      showBoundary(error);
    }
  }
  React.useEffect(() => { loadItem(); }, []);
  if (!shopItem) {
    return <LoadingIndicator />;
  }
  return (
    <React.Fragment>
      <div className="row align-items-center">
        <div className="col">
          <h2>Edit Items</h2>
        </div>
        <div className="col-auto mt-2">
          <ul className="navbar-nav ml-auto">
            <button type="button" className="btn btn-outline-info mb-2"><h6>Edit Shopitem</h6></button>
            <button type="button" className="btn btn-outline-info"><h6>Delete Shopitem</h6></button>
          </ul>
        </div>
      </div>
      <h3><span className="badge bg-info">{shopItem.name}</span></h3>
      <div className="card border-info mb-3">
        <p>Quantity: {shopItem.quantity}</p>
        <p>Remarks: {shopItem.remarks}</p>
        <p>Owner: {shopItem.creatorName}</p>
        <p>Created At: {shopItem.createdAt}</p>
        <p>ShopList Store: {shopItem.shopListStore}</p>
      </div>
      <p><Link to={`/shopper`}>Back to Shopper</Link></p>
    </React.Fragment>
  );
}