function init(){

// CONSTRUCCION DE LA GALERIA DESDE JS PARA QUE FUNCIONE COMO CARDS DE UN CARRITO
let contGallery = document.getElementById("contGallery");
let listaCuadros = [
    {id: 1, titulo: "María de Bs As", medidas: "1.40 x 1m", tecnica: "acrílico sobre tela", precio: 14000, imagen: `../img/maria.jpg`, cantidad: 1},
    {id: 2, titulo: "El sueño de un niño", medidas: "50 x 30cm", tecnica: "aquarela sobre papel", precio: 5000, imagen: `../img/sueno.jpg`, cantidad: 1},
    {id: 3, titulo: "La Poesía", medidas: "30 x 40cm" , tecnica: "tinta y aquarela sobre papel", precio: 4500, imagen: `../img/laPoesia.jpg`, cantidad: 1},
    {id: 4, titulo: "La Doma", medidas: "40 x 50cm", tecnica: "lápiz y carbonilla sobre papel, técnica mixta", precio: 6000, imagen: `../img/laDoma.jpg`, cantidad: 1},
    {id: 5, titulo: "Volar", medidas: "50 x 40cm", tecnica: "aquarela y grafito sobre papel", precio: 5500, imagen: `../img/volar.jpg`, cantidad: 1},
    {id: 6, titulo: "La Ternura", medidas: "25 x 23cm", tecnica: "óleo sobre papel", precio: 4300, imagen: `../img/laTernura.jpg`, cantidad: 1},
    {id: 7, titulo: "Butih", medidas: "35 x 25cm", tecnica: "acrílico y tinta sobre papel", precio: 4700, imagen: `../img/butih.jpg`, cantidad: 1},
    {id: 8, titulo: "Metamorfosis", medidas: "24 x 32cm", tecnica: "acrílico y tinta sobre papel", precio: 4100, imagen: `../img/metamorfosis.jpg`, cantidad: 1},
    {id: 9, titulo: "Árbol de la vida", medidas: "1 x 1m", tecnica: "óleo sobre tela", precio: 11000, imagen: `../img/arbolVida.jpg`, cantidad: 1},
    {id: 10, titulo: "Madre tierra", medidas: "1 x 0.8m", tecnica: "óleo sobre tela, técnica mixta", precio: 11000, imagen: `../img/madreTierra.jpg`, cantidad: 1}
]

for(const cuadro of listaCuadros){
    let div = document.createElement("div");
    div.innerHTML = `
                    <div class="divCard"> 
                        <div class="divFcenter">
                            <img class="imgCard" src=${cuadro.imagen} alt=${cuadro.titulo}> 
                        </div> 
                        <div>   
                            <h2 class="h2Ngo"> ${cuadro.titulo} </h2>
                            <p class="pNgo"> <span class="spBld">Técnica:</span> ${cuadro.tecnica} </p>
                            <p class="pNgo"> <span class="spBld">Medidas:</span> ${cuadro.medidas} </p>
                            <p class="pNgo"> <span class="spBld">Precio:</span> $${cuadro.precio} </p>
                        </div>
                        <div class="divFcenter">
                            <button type="button" class="boton">Lo quiero!</button>
                        </div>
                    </div>
    `;
    contGallery.append(div);
}

// INTERACCION CON EL FORMULARIO DE CONTACTO
function recogeDatos (evento) {
    evento.preventDefault ();

    let nombre = document.querySelector("#nombre").value;
    let cel = document.querySelector("#cel").value;
    let mensaje = document.querySelector("#mensaje");
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



/*     BORRE LOS PROMPTS Y ALERTS, FALTA ARMAR LA PARTE DEL CARRITO
let carrito = [];

let menuCuadros = listaCuadros.map (cuadro => {
    return `ID: ${cuadro.id} | Titulo: ${cuadro.titulo} | Medidas: ${cuadro.medidas} | Tecnica: ${cuadro.tecnica} | Precio $${cuadro.precio} \n`
});

let boton = document.getElementsByClassName("boton");
boton.addEventListener("click", comprar);  

let idElegido = "";
const comprar = function (mensaje){
    idElegido = //como identifica que boton apreto???
    let cuadroElegido = listaCuadros.find (cuadro => cuadro.id === idElegido);
    if (cuadroElegido) { 
        carrito.push(cuadroElegido);
        alert("Se agrego la obra a tu carrito")
    }
}

comprar (`Ingresa el ID de la obra para agregarla al carrito o "x" para terminar.`);

while (idElegido != "X"){
    comprar (`Queres sumar otra? Ingresa el ID de la obra para agregarla al carrito o "x" para terminar.`);
}
console.log(carrito);

let total = 0;
let seleccion = carrito.map (cuadro => {
    total = total + cuadro.precio;
    
    return `Titulo: ${cuadro.titulo} | Precio $${cuadro.precio} \n`
});

alert(`Buena eleccion! Seleccionaste:
${seleccion}
El total a abonar es de $${total}

Gracias por comprar arte ❤️`);

 */


}
window.onload = init;