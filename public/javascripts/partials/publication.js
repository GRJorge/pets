const d = document;

const socket = io();

d.querySelectorAll("#like").forEach((like) => {
    like.addEventListener("click", () => {
        const icon = like.querySelector("i");
        icon.classList.toggle("fi-rr-heart");
        icon.classList.toggle("fi-sr-heart");
        icon.classList.toggle("liked");

        total = like.querySelector("span");

        if (icon.classList.contains("fi-rr-heart")) {
            total.innerHTML = parseInt(total.innerHTML) - 1;
        } else if (icon.classList.contains("fi-sr-heart")) {
            if (total.innerHTML == "") {
                total.innerHTML = "0";
            }

            total.innerHTML = parseInt(total.innerHTML) + 1;
        }

        socket.emit("like", like.getAttribute("pubId"), like.getAttribute("selfId"));
    });
});
