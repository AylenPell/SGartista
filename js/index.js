function init(){

let listaCuadros = [
    {id: 1, titulo: "Maria de Bs As", medidas: "1.40 x 1m", tecnica: "acrílico sobre tela", precio: 14000, cantidad: 1},
    {id: 2, titulo: "El sueño de un niño", medidas: "50 x 30cm", tecnica: "aquarela sobre papel", precio: 5000, cantidad: 1},
    {id: 3, titulo: "Poesía", medidas: "30 x 40cm" , tecnica: "tinta y aquarela sobre papel", precio: 4500, cantidad: 1},
    {id: 4, titulo: "Extrañas", medidas: "30 x 40cm", tecnica: "tinta y carbonilla sobre papel", precio: 4500, cantidad: 1},
    {id: 5, titulo: "Volar", medidas: "50 x 40cm", tecnica: "aquarela y grafito sobre papel", precio: 5500, cantidad: 1},
    {id: 6, titulo: "La ternura", medidas: "25 x 23cm", tecnica: "óleo sobre papel", precio: 4300, cantidad: 1},
    {id: 7, titulo: "Butih", medidas: "35 x 25cm", tecnica: "acrílico y tinta sobre papel", precio: 4700, cantidad: 1},
    {id: 8, titulo: "Metamorfosis", medidas: "24 x 32cm", tecnica: "acrílico y tinta sobre papel", precio: 4100, cantidad: 1},
    {id: 9, titulo: "Árbol de la vida", medidas: "1 x 1m", tecnica: "óleo sobre tels", precio: 11000, cantidad: 1}
]

let nombre = prompt("Hola!🙂​ Bienvenido/a a la galería de arte de Silvia Gentile... Cómo es tu nombre?");
while (!nombre){
    nombre = prompt("Oops!😓​ Vuelve a ingresar tu nombre!");
}

let iniciar = prompt(`Un gusto en saludarte ${nombre}! Gracias por pasar a conocer mi obra 🥰​ Tenés interés en adquirir alguna pieza? SI/NO`);

if (iniciar.toUpperCase() === "SI"){

let carrito = [];

let menuCuadros = listaCuadros.map (cuadro => {
    return `ID: ${cuadro.id} | Titulo: ${cuadro.titulo} | Medidas: ${cuadro.medidas} | Tecnica: ${cuadro.tecnica} | Precio $${cuadro.precio} \n`
});

let idElegido = "";
const comprar = function (mensaje){
    idElegido = prompt (`${mensaje} \n ${menuCuadros}`).toUpperCase(); 
    let cuadroElegido = listaCuadros.find (cuadro => cuadro.id === parseInt(idElegido));
    if (cuadroElegido) { 
        carrito.push(cuadroElegido);
    }
    else if (idElegido === "X"){
        return
    }
    else {
        alert ("Oops!😓​ El ID no existe");
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

}
if (iniciar.toUpperCase() === "NO"){
alert("Ya habra oportunidad!😊​ Te espero cuando quieras");
}

if (iniciar === ""){
iniciar = prompt("Oops!😓 Parece que no ingresaste nada... Tenés interés en adquirir alguna pieza? SI/NO");
}


}
window.onload = init;