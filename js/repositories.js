const fetchData = async () => {
  const repItemsJson = await fetch("https://joaovictordevmeta.github.io/Monitoria-LP/data/data.json");
  return await repItemsJson.json();
};

const filterList = (data, searchTerm) => {
  return data.filter(
    (item) =>
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase())
  );
};

const renderList = (data, container, page, itemsPerPage) => {
  // Sort data by id in descending order
  const sortedData = data.sort((a, b) => b.id - a.id);
  const start = (page - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  const paginatedData = sortedData.slice(start, end);

  const listItems = paginatedData
    .map(
      (item) => `
      <div class="rep-item">
        <h3>${item.title}</h3>
        <p>${item.description}</p>
        <a href="${item.link}">Acessar conteúdo</a>
      </div>
    `
    )
    .join("");

  // Update only the list items
  const listContainer = document.createElement("div");
  listContainer.innerHTML = listItems;
  container.querySelectorAll(".rep-item").forEach((item) => item.remove());
  container.appendChild(listContainer);
};

const setupPagination = (jsonData, repList, searchInput, itemsPerPage) => {
  const prevPageButton = document.getElementById("prev-page");
  const nextPageButton = document.getElementById("next-page");
  const pageInfo = document.getElementById("page-info");

  let currentPage = 1;

  const updatePaginationControls = (data, page, itemsPerPage) => {
    const totalPages = Math.ceil(data.length / itemsPerPage);
    pageInfo.textContent = `Page ${page} of ${totalPages}`;
    prevPageButton.disabled = page === 1;
    nextPageButton.disabled = page === totalPages;
  };

  const handleSearchInput = (e) => {
    const filteredData = filterList(jsonData, e.target.value);
    currentPage = 1; // first page when typed somthing
    renderList(filteredData, repList, currentPage, itemsPerPage);
    updatePaginationControls(filteredData, currentPage, itemsPerPage);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      currentPage--;
      const filteredData = filterList(jsonData, searchInput.value);
      renderList(filteredData, repList, currentPage, itemsPerPage);
      updatePaginationControls(filteredData, currentPage, itemsPerPage);
    }
  };

  const handleNextPage = () => {
    const filteredData = filterList(jsonData, searchInput.value);
    const totalPages = Math.ceil(filteredData.length / itemsPerPage);
    if (currentPage < totalPages) {
      currentPage++;
      renderList(filteredData, repList, currentPage, itemsPerPage);
      updatePaginationControls(filteredData, currentPage, itemsPerPage);
    }
  };

  searchInput.addEventListener("input", handleSearchInput);
  prevPageButton.addEventListener("click", handlePrevPage);
  nextPageButton.addEventListener("click", handleNextPage);

  // Initial render
  renderList(jsonData, repList, currentPage, itemsPerPage);
  updatePaginationControls(jsonData, currentPage, itemsPerPage);
};

document.addEventListener("DOMContentLoaded", async () => {
  const jsonData = await fetchData();

  const repList = document.getElementById("rep-list");
  const searchInput = document.getElementById("search");

  const itemsPerPage = 5;

  setupPagination(jsonData, repList, searchInput, itemsPerPage);
});
