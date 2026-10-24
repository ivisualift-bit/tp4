import { state } from "./state.js";

export const getCustomerById = (customerId) => {
  return state.customers.find((customer) => customer.id === customerId);
};

export const getProductById = (productId) => {
  return state.products.find((product) => product.id === productId);
};

const getCustomerName = (order) => {
  const customer = getCustomerById(order.customerId);

  if (customer === undefined) {
    return "Client inconnu";
  }

  return customer.name;
};

export const getLineAmount = (item) => {
  const product = getProductById(item.productId);

  if (product === undefined) {
    return 0;
  }

  return product.price * item.quantity;
};

export const getOrderTotal = (order) => {
  let total = 0;

  order.items.forEach((item) => {
    total = total + getLineAmount(item);
  });

  return total;
};

const orderHasCategory = (order, category) => {
  const matchingItem = order.items.find((item) => {
    const product = getProductById(item.productId);
    return product !== undefined && product.category === category;
  });

  return matchingItem !== undefined;
};

export const getCategories = () => {
  const categories = [];

  state.products.forEach((product) => {
    if (!categories.includes(product.category)) {
      categories.push(product.category);
    }
  });

  return categories;
};

export const getStatuses = () => {
  const statuses = [];

  state.orders.forEach((order) => {
    if (!statuses.includes(order.status)) {
      statuses.push(order.status);
    }
  });

  return statuses;
};

export const getVisibleOrders = () => {
  return state.orders.filter((order) => {
    const customerName = getCustomerName(order).toLowerCase();

    const okSearch = customerName.includes(state.search.toLowerCase());
    const okStatus = state.status === "all" || order.status === state.status;
    const okCategory = state.category === "all" || orderHasCategory(order, state.category);

    return okSearch && okStatus && okCategory;
  });
};

export const getOrderRows = (orders) => {
  return orders.map((order) => {
    return {
      id: order.id,
      customerName: getCustomerName(order),
      date: order.date,
      status: order.status,
      total: getOrderTotal(order),
    };
  });
};

export const getOrderDetails = (orderId) => {
  const order = state.orders.find((order) => order.id === orderId);

  if (order === undefined) {
    return undefined;
  }

  const customer = getCustomerById(order.customerId);
  let city = "-";

  if (customer !== undefined) {
    city = customer.city;
  }

  const lines = order.items.map((item) => {
    const product = getProductById(item.productId);
    let name = "Produit inconnu";
    let price = 0;

    if (product !== undefined) {
      name = product.name;
      price = product.price;
    }

    return {
      name: name,
      price: price,
      quantity: item.quantity,
      amount: getLineAmount(item),
    };
  });

  return {
    id: order.id,
    customerName: getCustomerName(order),
    city: city,
    date: order.date,
    status: order.status,
    lines: lines,
    total: getOrderTotal(order),
  };
};

export const getStats = (visibleOrders) => {
  let totalAmount = 0;

  state.orders.forEach((order) => {
    totalAmount = totalAmount + getOrderTotal(order);
  });

  return {
    customersCount: state.customers.length,
    productsCount: state.products.length,
    ordersCount: state.orders.length,
    totalAmount: totalAmount,
    visibleCount: visibleOrders.length,
  };
};
