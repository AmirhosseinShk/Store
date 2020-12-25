export function addToStorage(Items, data) {
  var ShopItems = JSON.parse(Items);
  ShopItems.push(data);
  return JSON.stringify(ShopItems);
}

export function removeFromStorage(Items, data) {
  var ShopItems = JSON.parse(Items);
  ShopItems = ShopItems.filter((item) => item.id !== data.id);
  return JSON.stringify(ShopItems);
}
