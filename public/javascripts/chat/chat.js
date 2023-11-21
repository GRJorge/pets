const selfId = document.querySelector("main").getAttribute("selfId");

const newMsgInput = document.querySelector("#newMsgInput");
const btnSend = document.querySelector("#btnSendMsg");
//CAMBIAR APARIENCIA DEL BOTON AL INGRESAR TEXTO
newMsgInput.addEventListener("input", () => {
    if (newMsgInput.value.length > 0) {
        btnSend.classList.replace("btnDark2", "btnAccent");
    } else {
        btnSend.classList.replace("btnAccent", "btnDark2");
    }
});

const socket = io();
const messages = document.querySelector("#messages");

socket.emit("userConnected", selfId);

btnSend.addEventListener("click", () => {
    sendMsg();
});

let newMsgFocus = false;
newMsgInput.addEventListener("focus", () => {
    newMsgFocus = true;
});
newMsgInput.addEventListener("blur", () => {
    newMsgFocus = false;
});
//EJECUTAR NUEVO MENSAJE AL DAR CLICK EN ENTER
document.addEventListener("keydown", (event) => {
    if (event.key == "Enter" && newMsgFocus) {
        sendMsg();
    }
});
//MANDAR NUEVO MENSAJE
function sendMsg() {
    const newMsg = newMsgInput.value;
    if (newMsgInput.value.replace(/\s/g, "") !== "" && btnSend.getAttribute("idReceiver")) {
        const idReceiver = btnSend.getAttribute("idReceiver");

        socket.emit("sendMsg", selfId, idReceiver, newMsgInput.value);

        newMsgInput.value = "";
        btnSend.classList.replace("btnAccent", "btnDark2");

        messages.innerHTML += `<span class="sender">${newMsg}</span>`;
        scrollMessages();
        updateLastMessage(idReceiver, newMsg, true);
    }
}
//EMITIR SEÑAL PARA OBTENER MENSAJES DE UN CHAT
document.querySelectorAll("#chatProfile").forEach((chat) => {
    chat.addEventListener("click", () => {
        socket.emit("getMsgs", chat.getAttribute("chatId"), selfId);
        chat.classList.add("chatActive");
        btnSend.setAttribute("idReceiver", chat.getAttribute("userId"));
    });
    //INICIAR CHAT INICIAL SI SE EJECUTA DESDE UN PERFIL
    const initUserId = document.querySelector("#chatProfiles").getAttribute("initUserId");
    if (initUserId != "home") {
        if (chat.getAttribute("userId") == initUserId) {
            chat.classList.add("chatActive");
            chat.click();
        }
    }
});
//OBTENER NUEVO MENSAJE RECIBIDO
socket.on("receiveNewMsg", (senderId, msg) => {
    if (btnSend.getAttribute("idReceiver") == senderId) {
        messages.innerHTML += `<span class="receiver">${msg}</span>`;
        scrollMessages();
    }
    updateLastMessage(senderId, msg, false);
});
//RECIBIR TODOS LOS MENSAJES DE UN CHAT
socket.on("fillMsgs", (chatMsgs) => {
    messages.innerHTML = "";

    for (const msg of chatMsgs) {
        if (msg.msg !== "") {
            messages.innerHTML += `<span class="${msg.class}">${msg.msg}</span>`;
        }
    }

    scrollMessages();
});
//MANTENER SIEMPRE ABAJO EN LOS MENSAJES
function scrollMessages() {
    messages.scrollTop = messages.scrollHeight;
}
//CAMBIAR ULTIMO MENSAJE EN CHAT
function updateLastMessage(userId, msg, selfMsg) {
    const chats = document.querySelectorAll("#chatProfile");

    for (const chat of chats) {
        if (chat.getAttribute("userId").toString() == userId) {
            let lastMsg = chat.querySelector("#lastMsg");
            if (selfMsg) {
                lastMsg.innerHTML = '<i class="fi fi-sr-bullet"></i> ' + msg;
            } else {
                lastMsg.innerHTML = msg;
            }
            break;
        }
    }
}
//BUSQUEDA DE CHATS
const searchChat = document.querySelector("#searchChat");

searchChat.addEventListener("input", () => {
    document.querySelectorAll("#chatProfile").forEach((chat) => {
        chat.style.display = "none";
        if (chat.querySelector(".chatName").innerHTML.toString().toLowerCase().includes(searchChat.value.toLowerCase())) {
            chat.style.display = "revert";
            return true;
        }
    });
});
