const d = document;

const errors = d.querySelector("#errors");

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
