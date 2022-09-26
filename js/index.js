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
                <img class="imgCard" id="img${cuadro.id}" src=${cuadro.imagen} alt=${cuadro.titulo}> 
            </div> 
            <div>   
                <h2 class="h2Ngo"> ${cuadro.titulo} </h2>
                <p class="pNgo"> <span class="spBld">Técnica:</span> ${cuadro.tecnica} </p>
                <p class="pNgo"> <span class="spBld">Medidas:</span> ${cuadro.medidas} </p>
                <p class="pNgo"> <span class="spBld">Precio:</span> $${cuadro.precio} </p>
            </div>
            <div class="divFcenter">
                <button type="button" class="boton" id="agregar${cuadro.id}" onclick="agregarItem(${cuadro.id})">Lo quiero!</button>
            </div>
        </div>
    `;
    contGallery.append(div);
}



// CARRITO DE COMPRAS
let carrito = [];

let itemsCarrito = document.getElementById("itemsCarrito");

// chequear storage
carrito = JSON.parse(localStorage.getItem("carrito"));
if (!carrito || carrito.length === 0) {
    carrito = [];
    let tr = document.createElement("tr");
            tr.id = "noHayNada";
            tr.innerHTML = `
                <td>Todavía no elegiste ninguna obra</td>
            `;
            itemsCarrito.append(tr);
} else if(carrito.length > 0){
    carrito = JSON.parse(localStorage.getItem("carrito"));
    console.log(carrito);
    for (const cuadro of carrito){
        let tr = document.createElement("tr");
        tr.id = "filaCarrito";
        tr.innerHTML = `
            <td>${cuadro.titulo}</td>
            <td>$${cuadro.precio}</td>
            <td><button id="eliminar${cuadro.id}" onclick="borrarItem(${cuadro.id})" type="button" class="btn btn-danger">X</button></td>
        `;
        itemsCarrito.append(tr);
    }
}

// funcionamiento carrito
const guardarStorage = (clave, valor) => {localStorage.setItem(clave, valor)};

let noHayNada = document.getElementById ("noHayNada"); 

function agregarItem (id){
    console.log (id);
    let cuadroElegido = listaCuadros.find (cuadro => id === cuadro.id && cuadro.cantidad === 1);
    if (cuadroElegido){
        let chequearCarro = carrito.find (cuadro => cuadroElegido.id === cuadro.id);
        if (!chequearCarro){
            carrito.push(cuadroElegido);
            noHayNada?.remove();
            let tr = document.createElement("tr");
            tr.id = "filaCarrito";
            tr.innerHTML = `
                <td>${cuadroElegido.titulo}</td>
                <td>$${cuadroElegido.precio}</td>
                <td><button id="eliminar${cuadroElegido.id}" onclick="borrarItem(${cuadroElegido.id})" type="button" class="btn btn-danger">X</button></td>
            `;
            itemsCarrito.append(tr);

            guardarStorage("carrito", JSON.stringify(carrito));
            //alert (`Agregaste "${cuadroElegido.titulo}" al carrito`);
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: `Buena elección!`,
                text: `Agregaste "${cuadroElegido.titulo}" al carrito`,
                showConfirmButton: false,
                timer: 1500
            });

        } else if (chequearCarro){
            //alert ("Oops! Ya agregaste esta obra");
            Swal.fire({
                position: 'center',
                icon: 'warning',
                title: `Oops!`,
                text: `Ya agregaste esta obra`,
                showConfirmButton: false,
                timer: 1000
            });
        }     
    }
}

function sumarCarro (){
        let totalCarro = 0;
        carrito.forEach ( item => {
            totalCarro = totalCarro + item.precio;
        });
    let thTotal = document.getElementById("thTotal");
    thTotal.innerText = `
    $${totalCarro}
    `;    
}

let btnMostrarTotal = document.getElementById ("mostrarTotal");
btnMostrarTotal.addEventListener("click", sumarCarro);

function borrarItem(id){
    let eliminarCuadro = carrito.find(cuadro => id === cuadro.id);
    if (eliminarCuadro){
        console.log("eliminando");
        let eliminado = carrito.indexOf(eliminarCuadro);
        carrito.splice(eliminado, 1);
        let borrarFila = document.getElementById("filaCarrito");
        borrarFila.remove(); 
        localStorage.removeItem("carrito");
        guardarStorage("carrito", JSON.stringify(carrito));
        sumarCarro (); 
    }
    if (carrito.length === 0){
        let tr = document.createElement("tr");
        tr.id = "noHayNada";
        tr.innerHTML = `
            <td>El carrito quedó vacío</td>
        `;
        itemsCarrito.append(tr);
    }
}



