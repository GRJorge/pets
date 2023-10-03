const description = document.querySelector("#description");
const postSubmit = document.querySelector("#postSubmit");
const multimediaButton = document.querySelector("#multimedia");
const gallery = document.querySelector("#gallery");

//TEXTAREA AUTORESIZABLE
description.addEventListener("input", () => {
    descriptionAutoresizable();
});
//OCULTAR ACCIONES DE PUBLICACION AL DAR RESET
postSubmit.querySelector("button").addEventListener("click", () => {
    description.value = " ";
    descriptionAutoresizable();
    postSubmit.style.display = "none";
    gallery.style.display = "none";
    gallery.innerHTML = "";
});
//AGREGAR FOTO AL PREVIEW
multimediaButton.addEventListener("change", () => {
    gallery.style.display = "flex";
    gallery.innerHTML = "";

    for (let i = 0; i < multimediaButton.files.length; i++) {
        const file = multimediaButton.files[i];
        const img = document.createElement("img");
        const reader = new FileReader();

        reader.onload = (e) => {
            img.src = e.target.result;
        };

        reader.readAsDataURL(file);

        gallery.appendChild(img);
        postSubmit.style.display = "flex";
    }
});

//FUNCION QUE CAMBIA EL TAMAÑO DEL TEXTAREA
function descriptionAutoresizable() {
    description.style.height = "auto";
    description.style.height = description.scrollHeight - 16 + "px";

    if (description.value) {
        postSubmit.style.display = "flex";
    } else {
        postSubmit.style.display = "none";
    }
}