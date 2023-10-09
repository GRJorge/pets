document.querySelector("#sections").querySelectorAll("button").forEach((button, btnIndex) => {
    button.addEventListener("click",() => {
        document.querySelectorAll("#section").forEach((section, scIndex) => {
            if(btnIndex == scIndex){
                section.style.display = "flex"
                resetButtons(btnIndex)
            }else{
                section.style.display = "none"
            }
        })
    })
})

function resetButtons(btnIndex){
    document.querySelector("#sections").querySelectorAll("button").forEach((button, index) => {
        if(index == btnIndex){
            button.classList.replace("btnLight2","btnPrimary")
        }else{
            button.classList.replace("btnPrimary","btnLight2")
        }
    })
}

// SOCKETS

const socket = io()

const btnFollow = document.querySelector("#follow")

btnFollow.addEventListener("click",() => {
    socket.emit("follow",btnFollow.getAttribute("profileId"),btnFollow.getAttribute("selfId"))

    btnFollow.classList.toggle("btnAccent")
    btnFollow.classList.toggle("btnPrimary")

    if(btnFollow.classList.contains("btnAccent")){
        btnFollow.innerHTML = "Seguir"
    }else{
        btnFollow.innerHTML = "Siguiendo"
    }
})