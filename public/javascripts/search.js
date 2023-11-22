document.querySelector("#searchSections").querySelectorAll("button").forEach((button, btnIndex) => {
    button.addEventListener("click",() => {
        document.querySelector("#searchContent").querySelectorAll("div").forEach((section, scIndex) => {
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
    document.querySelector("#searchSections").querySelectorAll("button").forEach((button, index) => {
        if(index == btnIndex){
            button.classList.replace("btnLight2","btnPrimary")
        }else{
            button.classList.replace("btnPrimary","btnLight2")
        }
    })
}