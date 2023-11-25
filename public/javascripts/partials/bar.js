const searchInput = document.querySelector("#generalSearchInput");
const searchBtn = document.querySelector("#generalSearchBtn");

searchInput.addEventListener("input", () => {
    if (searchInput.value.length > 0) {
        searchBtn.style.display = "revert";
    } else {
        searchBtn.style.display = "none";
    }
});

//NOTIFICACIONES
const btnNot = document.querySelector("#btnNotifications");
const notifications = document.querySelector("#notifications");

btnNot.addEventListener("click", () => {
    notifications.classList.toggle("hide");
});

socket.on("newNot", (person, text) => {
    const nots = document.querySelector("#notifications");
    nots.innerHTML += `<a class="notification shadow" href="/chat/${person._id}"><img class="shadow" src="/images/profiles/${person.picture}">${text}${person.name} ${person.lastname}<button><i class="fi fi-sr-circle-xmark"></i></button></a>`
});
