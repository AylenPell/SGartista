// LISTADO DE PRODUCTOS
let listaCuadros = [
    {id: 1, titulo: "María de Bs As", medidas: "1.40 x 1m", tecnica: "acrílico sobre tela", precio: 14000, imagen: `./img/maria.jpg`, cantidad: 1},
    {id: 2, titulo: "El sueño de un niño", medidas: "50 x 30cm", tecnica: "aquarela sobre papel", precio: 5000, imagen: `./img/sueno.jpg`, cantidad: 1},
    {id: 3, titulo: "La Poesía", medidas: "30 x 40cm" , tecnica: "tinta y aquarela sobre papel", precio: 4500, imagen: `./img/laPoesia.jpg`, cantidad: 1},
    {id: 4, titulo: "La Doma", medidas: "40 x 50cm", tecnica: "lápiz y carbonilla sobre papel, técnica mixta", precio: 6000, imagen: `./img/laDoma.jpg`, cantidad: 1},
    {id: 5, titulo: "Volar", medidas: "50 x 40cm", tecnica: "aquarela y grafito sobre papel", precio: 5500, imagen: `./img/volar.jpg`, cantidad: 1},
    {id: 6, titulo: "La Ternura", medidas: "25 x 23cm", tecnica: "óleo sobre papel", precio: 4300, imagen: `./img/laTernura.jpg`, cantidad: 1},
    {id: 7, titulo: "Butih", medidas: "35 x 25cm", tecnica: "acrílico y tinta sobre papel", precio: 4700, imagen: `./img/butih.jpg`, cantidad: 1},
    {id: 8, titulo: "Metamorfosis", medidas: "24 x 32cm", tecnica: "acrílico y tinta sobre papel", precio: 4100, imagen: `./img/metamorfosis.jpg`, cantidad: 1},
    {id: 9, titulo: "Árbol de la vida", medidas: "1 x 1m", tecnica: "óleo sobre tela", precio: 11000, imagen: `./img/arbolVida.jpg`, cantidad: 1},
    {id: 10, titulo: "Madre tierra", medidas: "1 x 0.8m", tecnica: "óleo sobre tela, técnica mixta", precio: 11000, imagen: `./img/madreTierra.jpg`, cantidad: 1},
    {id: 11, titulo: "El rapto de Proserpina", medidas: "60 x 40cm", tecnica: "tinta y aquarela sobre papel", precio: 6800, imagen: `./img/proserpina.jpg`, cantidad: 1},
    {id: 12, titulo: "Discapacidades", medidas: "60 x 40cm", tecnica: "aquarela y grafito sobre papel", precio: 6800, imagen: `./img/discapacidad.jpg`, cantidad: 1}
]

// CONSTRUCCION DE LA GALERIA
let contGallery = document.getElementById("contGallery");
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
                <button type="button" class="boton" id="agregar${cuadro.id}" onclick="agregar(${cuadro.id})">Lo quiero!</button>
            </div>
        </div>
    `;
    contGallery.append(div);
}

// CARRITO DE COMPRAS
let carrito = [];

let itemsCarrito = document.getElementById("itemsCarrito");

function agregar (id){
    console.log (id);
    let cuadroElegido = listaCuadros.find (cuadro => id === cuadro.id && cuadro.cantidad === 1);

    if (cuadroElegido){
        carrito.push(cuadroElegido);
        let tr = document.createElement("tr");
        tr.innerHTML = `
            <td>${cuadroElegido.titulo}</td>
            <td>$${cuadroElegido.precio}</td>
            <td><button id="eliminar${cuadroElegido.id}" onclick="eliminar(${cuadroElegido.id})" type="button" class="btn btn-danger">X</button></td>
        `;
        itemsCarrito.append(tr);        
    } 
    
}

if (carrito.length ===0){
    let tr = document.createElement("tr");
        tr.innerHTML = `
            <td>Todavia no elegiste ninguna obra</td>
            
        `;
        itemsCarrito.append(tr);        
}

function eliminar (id){
    console.log (id);
    let eliminarCuadro = carrito.find (cuadro => id === cuadro.id);
    if (eliminarCuadro){
        let eliminado = carrito.indexOf(cuadro);
        carrito.splice(eliminado, 1);
    }
} 




/* 

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
