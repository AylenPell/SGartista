// INTERACCION CON EL FORMULARIO DE CONTACTO
let mensaje = document.querySelector("#mensaje");

function recogeDatos (evento) {
    evento.preventDefault ();

    let nombre = document.querySelector("#nombre").value;
    let cel = document.querySelector("#cel").value;

    if (nombre && cel){
        let texto = `Hola ${nombre}, 😊 tu mensaje ha sido enviado!
                    Te estaré contactando al celular ${cel} para responderte.`;
    
    mensaje.textContent = texto;
    } else if (!nombre && !cel){
        let texto = `Oops! Parece que te faltó completar algún dato... 😅`;
    
    mensaje.textContent = texto;
    }
}

function eliminar () {
    mensaje.remove();       
}

let miForm = document.querySelector("#formContacto");
let botonB = document.querySelector("#btnB");
miForm.addEventListener("submit", recogeDatos);
botonB.addEventListener("click", eliminar);

