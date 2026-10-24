export const renderOptions = (selectId, values) => {
  const select = document.getElementById(selectId);

  values.forEach((value) => {
    select.innerHTML += `<option value="${value}">${value}</option>`;
  });
};

export const renderStats = (stats) => {
  document.getElementById("customersCount").textContent = stats.customersCount;
  document.getElementById("productsCount").textContent = stats.productsCount;
  document.getElementById("ordersCount").textContent = stats.ordersCount;
  document.getElementById("totalAmount").textContent = stats.totalAmount + " MAD";
  document.getElementById("visibleCount").textContent = stats.visibleCount;
};

const getStatusBadge = (status) => {
  let color = "secondary";

  if (status === "Livree") {
    color = "success";
  }

  if (status === "En attente") {
    color = "warning";
  }

  if (status === "Annulee") {
    color = "danger";
  }

  return `<span class="badge text-bg-${color}">${status}</span>`;
};

export const renderOrders = (rows) => {
  const tableBody = document.getElementById("ordersTableBody");

  if (rows.length === 0) {
    tableBody.innerHTML = `
      <tr>
        <td colspan="6" class="text-center text-muted">Aucune commande ne correspond à vos critères.</td>
      </tr>
    `;
    return;
  }

  const htmlRows = rows.map((row) => {
    return `
      <tr>
        <td>#${row.id}</td>
        <td>${row.customerName}</td>
        <td>${row.date}</td>
        <td>${getStatusBadge(row.status)}</td>
        <td class="text-end">${row.total} MAD</td>
        <td class="text-end">
          <button class="btn btn-sm btn-primary" data-id="${row.id}">Détail</button>
        </td>
      </tr>
    `;
  });

  tableBody.innerHTML = htmlRows.join("");
};

export const renderOrderDetails = (details) => {
  const detailsZone = document.getElementById("orderDetails");

  if (details === undefined) {
    detailsZone.innerHTML = `<p class="text-muted mb-0">Cliquez sur « Détail » pour afficher une commande.</p>`;
    return;
  }

  const htmlLines = details.lines.map((line) => {
    return `
      <tr>
        <td>${line.name}</td>
        <td class="text-end">${line.price} MAD</td>
        <td class="text-center">${line.quantity}</td>
        <td class="text-end">${line.amount} MAD</td>
      </tr>
    `;
  });

  detailsZone.innerHTML = `
    <h4>Commande #${details.id}</h4>
    <p class="mb-1">Client : ${details.customerName}</p>
    <p class="mb-1">Ville : ${details.city}</p>
    <p class="mb-1">Date : ${details.date}</p>
    <p class="mb-3">Statut : ${getStatusBadge(details.status)}</p>

    <table class="table table-sm">
      <thead>
        <tr>
          <th>Produit</th>
          <th class="text-end">Prix</th>
          <th class="text-center">Qté</th>
          <th class="text-end">Montant</th>
        </tr>
      </thead>
      <tbody>${htmlLines.join("")}</tbody>
      <tfoot>
        <tr>
          <th colspan="3">Total</th>
          <th class="text-end">${details.total} MAD</th>
        </tr>
      </tfoot>
    </table>
  `;
};

export const renderError = (message) => {
  const errorMessage = document.getElementById("errorMessage");
  errorMessage.textContent = message;
  errorMessage.classList.remove("d-none");
};
