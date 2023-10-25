const comments = document.querySelector("#comments");
const comControl = document.querySelector("#comControl");

comControl.querySelectorAll("button").forEach((btn, btnIndex) => {
    btn.addEventListener("click", () => {
        showSections(btnIndex);
        comControl.querySelectorAll("button").forEach((btn2, index) => {
            btn2.classList.replace("btnPrimary", "btnLight2");
        });
        btn.classList.replace("btnLight2", "btnPrimary");
    });
});

function showSections(numSection) {
    document.querySelectorAll("#comSection").forEach((section, index) => {
        if (index === numSection) {
            section.style.display = "flex";
        } else {
            section.style.display = "none";
        }
    });
}

//CERRAR

document.querySelector("#closeComments").addEventListener("click", () => {
    comments.style.display = "none";
});

document.addEventListener("keydown", (event) => {
    if (comments.style.display != "none") {
        if (event.key == "Escape") {
            comments.style.display = "none";
        }
    }
});

//CAMBIAR ESTADO DE BOTON DE ENVIAR
const comText = document.querySelector("#comText");
const btnNewComment = document.querySelector("#btnNewComment");

comText.addEventListener("input", () => {
    if (comText.value.length > 0) {
        btnNewComment.classList.replace("btnDark2", "btnAccent");
    }else{
        btnNewComment.classList.replace("btnAccent","btnDark2");
    }
});

//NUEVO COMENTARIO

const comSocket = io();

btnNewComment.addEventListener("click", () => {
    if (comText.value.length > 0) {
        btnNewComment.classList.replace("btnAccent","btnDark2");
        comSocket.emit("newComment", comments.getAttribute("pubId"), comments.getAttribute("selfId"), comText.value);
    }

    comText.value = "";
});
