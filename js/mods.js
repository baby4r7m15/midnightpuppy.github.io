const filterButtons = document.querySelectorAll(".filter-pill");
const searchInput = document.getElementById("searchInput");
const cards = document.querySelectorAll(".mod-card");
const resultsCount = document.getElementById("resultsCount");
const emptyState = document.getElementById("emptyState");

let activeFilter = "all";

function updateCollection() {
  const searchValue = searchInput.value.trim().toLowerCase();
  let visibleCount = 0;

  cards.forEach((card) => {
    const categories = (card.dataset.category || "").toLowerCase().split(" ");
    const title = (card.dataset.title || "").toLowerCase();
    const description = (card.dataset.description || "").toLowerCase();

    const matchesFilter =
      activeFilter === "all" || categories.includes(activeFilter);

    const matchesSearch =
      !searchValue ||
      title.includes(searchValue) ||
      description.includes(searchValue) ||
      categories.join(" ").includes(searchValue);

    if (matchesFilter && matchesSearch) {
      card.classList.remove("hidden");
      visibleCount++;
    } else {
      card.classList.add("hidden");
    }
  });

  resultsCount.textContent = `Showing ${visibleCount} item${visibleCount === 1 ? "" : "s"}`;

  if (visibleCount === 0) {
    emptyState.classList.remove("hidden");
  } else {
    emptyState.classList.add("hidden");
  }
}

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    filterButtons.forEach((btn) => btn.classList.remove("active"));
    button.classList.add("active");
    activeFilter = button.dataset.filter;
    updateCollection();
  });
});

searchInput.addEventListener("input", updateCollection);

updateCollection();
