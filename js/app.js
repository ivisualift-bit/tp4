import { state } from "./state.js";
import { loadAllData } from "./dataService.js";
import {
  getCategories,
  getStatuses,
  getVisibleOrders,
  getOrderRows,
  getOrderDetails,
  getStats,
} from "./selectors.js";
import {
  renderOptions,
  renderStats,
  renderOrders,
  renderOrderDetails,
  renderError,
} from "./view.js";

const render = () => {
  const visibleOrders = getVisibleOrders();

  renderStats(getStats(visibleOrders));
  renderOrders(getOrderRows(visibleOrders));
  renderOrderDetails(getOrderDetails(state.selectedOrderId));
};

document.getElementById("searchInput").addEventListener("input", (event) => {
  state.search = event.target.value;
  render();
});

document.getElementById("statusFilter").addEventListener("change", (event) => {
  state.status = event.target.value;
  render();
});

document.getElementById("categoryFilter").addEventListener("change", (event) => {
  state.category = event.target.value;
  render();
});

document.getElementById("ordersTableBody").addEventListener("click", (event) => {
  if (event.target.dataset.id) {
    state.selectedOrderId = Number(event.target.dataset.id);
    render();
  }
});

const init = async () => {
  try {
    const data = await loadAllData();

    state.customers = data.customers;
    state.products = data.products;
    state.orders = data.orders;

    renderOptions("statusFilter", getStatuses());
    renderOptions("categoryFilter", getCategories());
    render();
  } catch (error) {
    console.error(error);
    renderError("Impossible de charger les données. " + error.message);
  }
};

init();
