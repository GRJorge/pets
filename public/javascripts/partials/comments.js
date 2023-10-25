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
    } else {
        btnNewComment.classList.replace("btnAccent", "btnDark2");
    }
});

//NUEVO COMENTARIO

btnNewComment.addEventListener("click", () => {
    if (comText.value.length > 0) {
        btnNewComment.classList.replace("btnAccent", "btnDark2");
        socket.emit("newComment", comments.getAttribute("pubId"), comments.getAttribute("selfId"), comText.value);
    }

    comText.value = "";
});

//RELLENAR COMENTARIOS
socket.on("fillComments", (commentsJSON) => {
    const comSection = document.querySelector(".comments");
    comSection.innerHTML = "";

    for (const com of commentsJSON) {
        let comDate = new Date(com.createdAt).toLocaleDateString(); //FORMAT FECHA DE CREACION DE COMENTARIO

        if (new Date(com.createdAt).toLocaleDateString() === new Date().toLocaleDateString()) {
            comDate = new Date(com.createdAt).toLocaleTimeString(); //CAMBIAR A HORA SI ES DE HOY
        }
        //AGREGAR COMENTARIO AL DOM
        comSection.innerHTML += `
        <div class="comment">
            <div>
                <a class="comProfile" href="/user/profile/${com.user._id}">
                    <img class="shadow" src="/images/profiles/${com.user.picture}">
                    <span>${com.user.name} ${com.user.lastname}</span>
                </a>
                <span>${comDate}</span>
            </div>
            <p class="msj">
                ${com.text}
            </p>
        </div>`;
    }
});

socket.on("fillLikes", (likesJSON) => {
    const likesSection = document.querySelector(".comReactions");
    likesSection.innerHTML = "";

    for (const like of likesJSON) {
        likesSection.innerHTML += `
        <a class="comProfile" href="/user/profile/${like._id}">
            <img class="shadow" src="/images/profiles/${like.picture}" alt="">
            <span>${like.name} ${like.lastname}</span>
        </a>
        `;
    }
});
