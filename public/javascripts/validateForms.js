const errorsContainer = document.querySelector('#errors')

document.querySelectorAll("form").forEach((form) => {
	form.addEventListener("submit", (event) => {
		//BORRAR TODOS LOS ERRORES
		errorsContainer.innerHTML = ""
		// MINIMO DE CARACTERES EN GENERAL
		form.querySelectorAll("input").forEach((text) => {
			if(text.classList.contains('textAlert')){ //QUITAR INPUTS DE ALERTA
				text.classList.replace('textAlert','textPrimary')
			}
			//
			if (text.value.length < text.getAttribute("maxL")) {
				inputError(text, " debe contener minimo " + text.getAttribute("maxL") + " caracteres", event);
			}
		});
		// VALIDACION DE CORREO
		form.querySelectorAll('input[type="email"]').forEach(email => {
			if (!email.value.toLowerCase().match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)) {
				inputError(email, " es invalido", event);
			}
		})
		// COINCIDENCIA DE CONTRASEÑAS
		const confirmPassword = form.querySelector('#confirmPassword')
		if(confirmPassword){
			if(confirmPassword.value != form.querySelector('#password').value){
				inputError(confirmPassword, " no coincide", event)
			}
		}
	});
});

function inputError(input, msg, event) {
	event.preventDefault() //PARAR ENVIO DE FORMULARIO
	changeClassToAlert(input) //CAMBIAR INPUTS A ALERT
	const tag = '<span class="notError">' + input.getAttribute('placeholder') + msg + '<button id="close"><i class="fi fi-sr-circle-xmark"></i></button></span>'
	errorsContainer.innerHTML += tag //AGREGAR ERROR
	errorsContainer.style.display = "flex" //MOSTRAR CONTENEDOR DE ERRORES
	errorsContainer.querySelectorAll('#close').forEach(close => { //QUITAR ERRORES AL DAR CLICK EN CERRAR
		close.addEventListener('click',()=>{
			close.parentNode.remove()
			if(errorsContainer.childElementCount == 0){
				errorsContainer.style.display = "none" //ESCONDER CONTENEDOR CUANDO NO HAYA ERRORES
			}
		})
	})
}

function changeClassToAlert(input){ //REEMPLAZAR CLASES
	if(input.classList.contains('textPrimary')){
		input.classList.replace('textPrimary', 'textAlert')
	}
}