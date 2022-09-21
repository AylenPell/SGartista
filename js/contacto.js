// INTERACCION CON EL FORMULARIO DE CONTACTO
let mensaje = document.querySelector("#mensaje");

function recogeDatos (evento) {
    evento.preventDefault ();

    let nombre = document.querySelector("#nombre").value;
    let cel = document.querySelector("#cel").value;
   // let mensaje = document.querySelector("#mensaje");
    let texto = `Hola ${nombre}, 😊 tu mensaje ha sido enviado!
                Te estare contactando al celular ${cel} para responderte.`;
    
    mensaje.textContent = texto;
}
function eliminar () {
    mensaje.remove();       
}

let miForm = document.querySelector("#formContacto");
let botonB = document.querySelector("#btnB");
miForm.addEventListener("submit", recogeDatos);
botonB.addEventListener("click", eliminar);

