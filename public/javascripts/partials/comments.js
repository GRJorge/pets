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

//NUEVO COMENTARIO

const comSocket = io();

document.querySelector("#btnNewComment").addEventListener("click", () => {
    const comText = document.querySelector("#comText")
    
    if(comText.value.length > 0){
        comSocket.emit("newComment", comments.getAttribute("pubId"), comments.getAttribute("selfId"), comText.value);
    }

    comText.value = "";
});
