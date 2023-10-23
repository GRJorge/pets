const comments = document.querySelector("#comments");
const comControl = document.querySelector("#comControl");

comControl.querySelectorAll("button").forEach((btn, btnIndex) => {
    btn.addEventListener("click", () => {
        showSections(btnIndex);
        comControl.querySelectorAll("button").forEach((btn2,index) => {
            btn2.classList.replace("btnPrimary","btnLight2")
        });
        btn.classList.replace("btnLight2","btnPrimary")
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
