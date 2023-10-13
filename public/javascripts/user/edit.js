const d = document;

const errors = d.querySelector("#errors");

/*---- EDICION DE FOTO DE PERFIL ----*/

const picture = document.querySelector("#picture");
const picturePreview = document.querySelector("#picturePreview");
const oldSrcPicture = picturePreview.src;

picture.addEventListener("change", () => {
    const reader = new FileReader();

    reader.onload = (e) => {
        picturePreview.src = e.target.result;
    };

    reader.readAsDataURL(picture.files[0]);

    showControlsImage(true);
});

d.querySelector("#cancelEditPicture").addEventListener("click", () => {
    showControlsImage(false);
});

function showControlsImage(show) {
    if (show) {
        d.querySelector("#controlsImage").style.display = "flex";
        picture.labels[1].style.display = "none";
    } else {
        d.querySelector("#controlsImage").style.display = "none";
        picture.labels[1].style.display = "block";
        picturePreview.src = oldSrcPicture;
    }
}

/*---- EDICION DE NOMBRE ----*/

const editName = d.querySelector("#editName");
const showEditNameBtn = d.querySelector("#showEditName");
//CUANDO SE PRESIONA BOTON DE EDITAR NOMBRE
showEditNameBtn.addEventListener("click", () => {
    showEditName(true);
});
//BOTON DE CANCELAR EDICION
d.querySelector("#cancelEditName").addEventListener("click", () => {
    showEditName(false);
    //Borrar errores
    errors.innerHTML = "";
});

//MOSTRAR U OCULTAR FORMULARIO DE CAMBIO DE NOMBRE
function showEditName(show) {
    if (show) {
        showEditNameBtn.parentNode.style.display = "none";
        editName.style.display = "flex";
        //Reiniciar clases de los inputs
        editName.querySelector("#name").classList.replace("textAlert", "textPrimary");
        editName.querySelector("#lastname").classList.replace("textAlert", "textPrimary");
    } else {
        showEditNameBtn.parentNode.style.display = "block";
        editName.style.display = "none";
    }
}
