document.querySelectorAll("form").forEach((form) => {
	form.addEventListener("submit", (event) => {
		// MINIMO DE CARACTERES EN GENERAL
		form.querySelectorAll("input").forEach((text) => {
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
	alert(input.getAttribute("placeholder") + msg);
	event.preventDefault();
}
