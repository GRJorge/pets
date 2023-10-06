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

function follow(_id){
    socket.emit("follow", _id)
}