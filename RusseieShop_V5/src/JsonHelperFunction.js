export function addToStorage(Items, data) {
  console.log(Items);
  console.log(data);
  var ShopItems = JSON.parse(Items);
  ShopItems.push(data);
  console.log(ShopItems);
  return JSON.stringify(ShopItems);
}

export function removeFromStorage(Items, data) {
  console.log(Items);
  console.log(data);
  var ShopItems = JSON.parse(Items);
  ShopItems = ShopItems.filter((item) => item.id !== data.id);
  console.log(ShopItems);
  return JSON.stringify(ShopItems);
}
