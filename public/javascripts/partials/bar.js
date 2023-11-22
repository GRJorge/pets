const searchInput = document.querySelector("#generalSearchInput");
const searchBtn = document.querySelector("#generalSearchBtn");

searchInput.addEventListener("input", () => {
    if (searchInput.value.length > 0) {
        searchBtn.style.display = "revert";
    } else {
        searchBtn.style.display = "none";
    }
});