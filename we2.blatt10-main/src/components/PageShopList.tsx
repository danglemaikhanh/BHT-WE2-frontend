import React from 'react';
import { ShopItemResource, ShopListResource } from '../Resources';
import { getShopItems, getShopList } from '../backend/shopperapi';
import { Link, useParams } from 'react-router-dom';
import LoadingIndicator from './LoadingIndicator';
import { useErrorBoundary } from 'react-error-boundary';

export default function PageShopList() {
  const [shopList, setShopList] = React.useState<ShopListResource | null>(null);
  const [shopItems, setShopItems] = React.useState<ShopItemResource[] | null>(null);

  const shopListId = useParams().shoplistID!;
  async function load() {
      const list = await getShopList(shopListId);
      setShopList(list);
      const items = await getShopItems(shopListId);
      setShopItems(items);
  }
  React.useEffect(() => { load(); }, []);
  if (!shopList || !shopItems) {
    return <LoadingIndicator />;
  }
  return (
    <React.Fragment>
      <div className="row align-items-center">
        <div className="col">
          <h2>Manage Shopping List</h2>
        </div>
        <div className="col-auto mt-2">
          <ul className="navbar-nav ml-auto">
            <button type="button" className="btn btn-outline-info mb-2"><h6>Edit Shoplist</h6></button>
            <button type="button" className="btn btn-outline-info"><h6>Delete Shoplist</h6></button>
          </ul>
        </div>
      </div>
      <h3><span className="badge bg-info">{shopList.store}</span></h3>
      <div className="card border-info mb-3">
        <fieldset className="form-group">
          <div className="form-check">
            <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
            <label className="form-check-label" htmlFor="flexCheckDefault">
              Public
            </label>
          </div>
          <div className="form-check">
            <input className="form-check-input" type="checkbox" value="" id="flexCheckChecked" />
            <label className="form-check-label" htmlFor="flexCheckChecked">
              Done
            </label>
          </div>
        </fieldset>
        <p>Owner: {shopList.creatorName} <br /> Created at: {shopList.createdAt}</p>
      </div>
      <h4><span className="badge bg-info">ShopItem: {shopList.shopItemCount}</span></h4>
      {shopItems.map((shopItem) => (
        <div key={shopItem.id} className="alert alert-dismissible alert-info">
          <div key={shopItem.id}>
            <h5>{shopItem.name}</h5>
            <p>{shopItem.creatorName}, {shopItem.createdAt}</p>
            <p><Link to={`/shopitem/${shopItem.id}`}>Go to shopitem</Link></p>
          </div>
        </div>
      ))}
      <button type="button" className="btn btn-outline-info mb-2"><h6>Add item</h6></button>
      <p><Link to={`/shopper`}>Back to Shopper</Link></p>
    </React.Fragment>
  );
}