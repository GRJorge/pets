//SLIDER DE FOTOS
var arrayMultimedia;
var actualPos;

document.querySelectorAll("#pubImg").forEach((img) => {
    const parentImg = img.parentNode.classList.toString();
    //MOSTRAR SLIDER CUANDO SE DA CLICK A UNA IMAGEN
    img.addEventListener("click", () => {
        if (parentImg == "content") {
            showSlider([img.getAttribute("src")], 0);
        } else {
            arrayMultimedia = [];
            img.parentNode.querySelectorAll("#pubImg").forEach((media) => {
                arrayMultimedia.push(media.getAttribute("src"));
            });
            showSlider(arrayMultimedia, parseInt(img.getAttribute("num")));
        }
    });
});

const slider = document.querySelector("#slider");
const next = document.querySelector("#next");
const previous = document.querySelector("#previous");
const close = document.querySelector("#close");

const imgSlider = slider.querySelector("img");

function showSlider(media, position) {
    //ASIGNAR PRIMERA FOTO MOSTRADA
    actualPos = position
    slider.style.display = "flex";
    imgSlider.setAttribute("src", media[position]);
    if (media.length == 1) { //MOSTRAR O OCULTAR CONTROLES SI ES SOLO UNA FOTO
        next.style.display = "none";
        previous.style.display = "none";
    } else {
        next.style.display = "block";
        previous.style.display = "block";
    }
}
//SIGUIENTE FOTO
next.addEventListener("click", () => {
    changeImg(1);
});
//ANTERIOR FOTO
previous.addEventListener("click", () => {
    changeImg(-1);
});
//CERRAR SLIDER
close.addEventListener("click", () => {
    slider.style.display = "none";
});
//SIGUIENTE O ANTERIOR FOTO CON LAS TECLAS DIRECCIONALES
document.addEventListener("keydown", function(event) {
    if(slider.style.display == "flex"){
        if(event.key == "ArrowRight"){
            changeImg(1)
        }else if(event.key == "ArrowLeft"){
            changeImg(-1)
        }else if(event.key == "Escape"){
            slider.style.display = "none";
        }
    }
  });
//CAMBIAR FOTO PRINCIPAL POR LA DE LA POSICION INDICADA
function changeImg(op) {
    actualPos += op
    if (actualPos > arrayMultimedia.length - 1) {
        actualPos = 0;
    } else if (actualPos < 0) {
        actualPos = arrayMultimedia.length - 1;
    }
    
    imgSlider.setAttribute("src", arrayMultimedia[actualPos]);
}
