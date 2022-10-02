// CONSTRUCCION DE LA GALERIA, data en el JSON

let contGallery = document.getElementById("contGallery");
let listaCuadros = [];

const buildGallery = async () => {
    try{
        let response = await fetch("../json/cuadros.json");
        listaCuadros = await response.json();

        listaCuadros.forEach(cuadro => {
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
        });
    } catch (error) {
        let div = document.createElement ("div");
        div.innerHTML = `
                    <h3>Oops! Algo pasó! 💣 Intentalo de nuevo más tarde</h3>
        `;
        contGallery.append(div);
    };
};
    
buildGallery ();

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
    Total: $${totalCarro}
    `;    
}

if (carrito){
    sumarCarro ();
}

/* let btnMostrarTotal = document.getElementById ("mostrarTotal");
btnMostrarTotal.addEventListener("click", sumarCarro); */

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


