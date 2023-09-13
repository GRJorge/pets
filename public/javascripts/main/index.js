const description = document.querySelector("#description");
const postSubmit = document.querySelector("#postSubmit");

//TEXTAREA AUTORESIZABLE
description.addEventListener("input", () => {
    description.style.height = "auto";
    description.style.height = description.scrollHeight - 16 + "px";

    if (description.value) {
        postSubmit.style.display = "flex";
    } else {
        postSubmit.style.display = "none";
    }
});
//OCULTAR ACCIONES DE PUBLICACION AL DAR RESET
postSubmit.querySelector("button").addEventListener("click", () => {
    postSubmit.style.display = "none";
});
