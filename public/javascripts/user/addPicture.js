const picture = document.querySelector("#picture");
const submit = document.querySelector("#submit")
const picturePreview = document.querySelector("#picturePreview")

picture.addEventListener("change", () => {
    if(picture.files.length > 0){
        const reader = new FileReader();

        reader.onload = (e) => {
            picturePreview.src = e.target.result
        }

        reader.readAsDataURL(picture.files[0])

        submit.style.display = "block"
    }else{
        submit.style.display = "none"
    }
});
