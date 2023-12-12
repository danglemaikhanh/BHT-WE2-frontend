import { LoginResource, ShopItemResource, ShopListResource, ShopperResource } from "../Resources";
import { fetchWithErrorHandling } from "./validation";
import { retrieveJWT } from "../JWTManager";
//import { shopper } from "../components/__test__/data";

const HOST = process.env.REACT_APP_API_SERVER_URL;

/**
 * Ergänzen Sie hier die Anbindung an den Server
 */


export async function getShopper(): Promise<ShopperResource> {
  /* Ersetzen Sie folgenden Demo-Code durch eine echte Server-Anfrage */
  //await new Promise<void>((resolve) => setTimeout(() => { resolve() }, 1000));
  //return Promise.resolve(shopper);
  /* const response = await fetch(`${HOST}/api/shopper`);
  const shopper = await response.json();
  return shopper; */
  const url = `${HOST}/api/shopper`;
  const shopper = await fetchWithErrorHandling<ShopperResource>(url, { headers: headers() });
  return shopper;
}

export async function getShopItems(shopListId: string): Promise<ShopItemResource[]> {
  /* const response = await fetch(`${HOST}/api/shoplist/${shopListId}/shopitems`);
  const shopItems = await response.json();
  return shopItems.shopItems; */
  const url = `${HOST}/api/shoplist/${shopListId}/shopitems`;
  const shopItems = await fetchWithErrorHandling<{ shopItems: ShopItemResource[] }>(url, { headers: headers() });
  return shopItems.shopItems;
}

export async function getShopList(shopListId: string): Promise<ShopListResource> {
  /* const response = await fetch(`${HOST}/api/shoplist/${shopListId}`);
  const shoplist = await response.json();
  return shoplist; */
  const url = `${HOST}/api/shoplist/${shopListId}`;
  const shoplist = await fetchWithErrorHandling<ShopListResource>(url, { headers: headers() });
  return shoplist;
}

export async function getShopItem(shopItemId: string): Promise<ShopItemResource> {
  /* const response = await fetch(`${HOST}/api/shopitem/${shopItemId}`);
  const shopItem = await response.json();
  return shopItem; */
  const url = `${HOST}/api/shopitem/${shopItemId}`;
  const shopItem = await fetchWithErrorHandling<ShopItemResource>(url, { headers: headers() });
  return shopItem;
}

function headers() {
  const headers: any = {
    "Content-Type": "application/json"
  }
  const jwt = retrieveJWT();
  if (jwt) {
    headers.Authorization = `Bearer ${jwt}`;
  }
  return headers;
}

export async function login(email: string, password: string): Promise<string> {
  const url = `${HOST}/api/login`;
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password })
    });
    if (response.ok) {
      const loginResource: LoginResource = await response.json();
      return loginResource.access_token;
    }
    if (response.status === 401) {
      throw new Error("Invalid credentials");
    }
    throw new Error(`Error connecting to ${HOST}: ${response.statusText}`);
  } catch (error) {
    throw error;
  }
}
