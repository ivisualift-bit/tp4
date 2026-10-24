const loadJson = async (path) => {
  const response = await fetch(path);

  if (!response.ok) {
    throw new Error(`Impossible de charger ${path} (erreur ${response.status})`);
  }

  const data = await response.json();
  return data;
};

export const loadAllData = async () => {
  const customers = await loadJson("data/customers.json");
  const products = await loadJson("data/products.json");
  const orders = await loadJson("data/orders.json");

  return {
    customers: customers,
    products: products,
    orders: orders,
  };
};
