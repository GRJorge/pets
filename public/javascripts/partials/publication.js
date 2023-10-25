const d = document;

//LIKE
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

        socket.emit("like", like.parentNode.getAttribute("pubId"), like.parentNode.getAttribute("selfId"));
    });
});

//COMENTARIOS
const btnComments = d.querySelector("#btnComments");
btnComments.addEventListener("click", () => {
    const comments = d.querySelector("#comments");
    comments.style.display = "flex";
    comments.setAttribute("pubId", btnComments.parentNode.getAttribute("pubId"));
    comments.setAttribute("selfId", btnComments.parentNode.getAttribute("selfId"));

    socket.emit("onFillComments", comments.getAttribute("pubId"));
});
